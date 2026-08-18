const POSITION_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Derive a stable per-department slug once from the display name.
 * "Audio Operator" → "audio-operator"
 */
export function derivePositionSlug(name: string): string | null {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!slug || !POSITION_SLUG_RE.test(slug)) return null;
  return slug;
}
