import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { getSupabasePublicConfig } from "@/lib/supabase/env";

/** Browser client. Returns null when Supabase env is not configured. */
export function createSupabaseBrowserClient(): SupabaseClient<Database> | null {
  const config = getSupabasePublicConfig();
  if (!config) return null;

  return createBrowserClient<Database>(config.url, config.publishableKey);
}
