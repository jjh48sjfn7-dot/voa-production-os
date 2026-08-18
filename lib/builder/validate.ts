const POSITION_NAME_MAX = 120;

export function validatePositionName(raw: string): string | null {
  const name = raw.trim();
  if (!name) return "Enter a position name.";
  if (name.length > POSITION_NAME_MAX) {
    return "Position name must be 120 characters or fewer.";
  }
  return null;
}
