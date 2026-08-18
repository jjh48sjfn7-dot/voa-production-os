import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/database.types";
import { getSupabasePublicConfig } from "@/lib/supabase/env";
import {
  getSafeNextPath,
  isAdminPath,
  isLoginOrSignupPath,
  isVolunteerPath,
} from "@/lib/auth/paths";

function copyCookies(from: NextResponse, to: NextResponse): NextResponse {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie);
  });
  return to;
}

/**
 * Refresh Supabase auth cookies. Does not load membership or authorize in full.
 * Volunteer and Admin protection still run in their layouts via getClaims()
 * plus membership/permission checks.
 */
export async function refreshSupabaseSession(
  request: NextRequest
): Promise<NextResponse> {
  const config = getSupabasePublicConfig();
  if (!config) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });
  let hasIdentity = false;

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

    const { data } = await supabase.auth.getClaims();
    hasIdentity = Boolean(data?.claims);
  } catch {
    return NextResponse.next({ request });
  }

  const pathname = request.nextUrl.pathname;

  if ((isVolunteerPath(pathname) || isAdminPath(pathname)) && !hasIdentity) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return copyCookies(supabaseResponse, NextResponse.redirect(url));
  }

  if (isLoginOrSignupPath(pathname) && hasIdentity) {
    const url = request.nextUrl.clone();
    url.pathname = getSafeNextPath(
      request.nextUrl.searchParams.get("next"),
      "/volunteer"
    );
    url.search = "";
    return copyCookies(supabaseResponse, NextResponse.redirect(url));
  }

  return supabaseResponse;
}
