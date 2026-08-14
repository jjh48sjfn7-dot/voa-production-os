import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/**
 * Server Component / Server Action / Route Handler client.
 * Uses the user session cookies. Returns null when unconfigured.
 * Do not import this file from Client Components.
 */
export async function createSupabaseServerClient(): Promise<
  SupabaseClient<Database> | null
> {
  const config = getSupabasePublicConfig();
  if (!config) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet, _headers) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component. proxy.ts refreshes the session.
        }
      },
    },
  });
}
