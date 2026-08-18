export function logBuilderEvent(
  event: string,
  details?: { code?: string | null }
): void {
  if (details?.code) {
    console.error(`[builder] ${event}`, { code: details.code });
    return;
  }
  console.error(`[builder] ${event}`);
}
