/**
 * Public Supabase configuration helpers.
 *
 * Only NEXT_PUBLIC_ values are read here. Service-role keys are not used in
 * Phase 4B and must never be prefixed with NEXT_PUBLIC_.
 */
export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

function readPublicEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  };
}

export function isSupabaseConfigured(): boolean {
  const { url, publishableKey } = readPublicEnv();
  return Boolean(url?.trim() && publishableKey?.trim());
}

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const { url, publishableKey } = readPublicEnv();
  const trimmedUrl = url?.trim();
  const trimmedKey = publishableKey?.trim();
  if (!trimmedUrl || !trimmedKey) return null;
  return { url: trimmedUrl, publishableKey: trimmedKey };
}
