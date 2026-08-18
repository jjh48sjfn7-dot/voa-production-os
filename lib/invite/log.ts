export function logInviteEvent(
  event: string,
  details?: { code?: string | null; invitationId?: string }
): void {
  const payload: { code?: string; invitationId?: string } = {};
  if (details?.code) payload.code = details.code;
  if (details?.invitationId) payload.invitationId = details.invitationId;
  if (Object.keys(payload).length > 0) {
    console.error(`[invite] ${event}`, payload);
    return;
  }
  console.error(`[invite] ${event}`);
}
