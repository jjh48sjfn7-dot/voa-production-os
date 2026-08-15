export function logVolunteerSessionEvent(
  event: string,
  details?: { code?: string | null }
): void {
  if (details?.code) {
    console.error(`[volunteer-session] ${event}`, { code: details.code });
    return;
  }
  console.error(`[volunteer-session] ${event}`);
}
