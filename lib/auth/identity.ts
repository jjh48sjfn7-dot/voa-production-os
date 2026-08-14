import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthIdentity = {
  sub: string;
};

/**
 * Verified Auth identity from getClaims().
 * Does not load church membership. A user may be authenticated with no team.
 */
export async function getAuthIdentity(): Promise<AuthIdentity | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) return null;

  const sub = data.claims.sub;
  if (typeof sub !== "string" || !sub) return null;
  return { sub };
}
