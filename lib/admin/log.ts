export function logAdminEvent(
  event: string,
  details?: { code?: string | null }
): void {
  if (details?.code) {
    console.error(`[admin] ${event}`, { code: details.code });
    return;
  }
  console.error(`[admin] ${event}`);
}
