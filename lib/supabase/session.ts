import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/database.types";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/**
 * Refresh Supabase auth cookies. Does not authorize routes.
 * Operational Production OS stays public. /volunteer is not redirected in 4B.
 */
export async function refreshSupabaseSession(
  request: NextRequest
): Promise<NextResponse> {
  const config = getSupabasePublicConfig();
  if (!config) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient<Database>(config.url, config.publishableKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          );
        },
      },
    });

    // Verify/refresh via claims. Do not authorize from getSession().user.
    await supabase.auth.getClaims();
  } catch {
    return NextResponse.next({ request });
  }

  return supabaseResponse;
}
