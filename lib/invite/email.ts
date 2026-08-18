import { Resend } from "resend";
import { getSiteUrl } from "@/lib/auth/site-url";
import { logInviteEvent } from "@/lib/invite/log";

export const INVITE_FROM = "Production OS <noreply@auth.productionos.run.place>";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function isInviteEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

export async function sendChurchInvitationEmail(input: {
  invitationId: string;
  to: string;
  workspaceName: string;
  rawToken: string;
}): Promise<{ ok: true } | { ok: false }> {
  const resend = getResendClient();
  if (!resend) {
    logInviteEvent("resend_unconfigured");
    return { ok: false };
  }

  const joinUrl = `${getSiteUrl()}/invite/${input.rawToken}`;
  const church = input.workspaceName.trim() || "this church";
  const subject = `You’re invited to join ${church} on Production OS`;
  const safeChurch = escapeHtml(church);

  const { error } = await resend.emails.send(
    {
      from: INVITE_FROM,
      to: input.to,
      subject,
      html: `<p>You’ve been invited to join <strong>${safeChurch}</strong> on Production OS.</p>
<p><a href="${joinUrl}" style="display:inline-block;background:#FF5A00;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:600;">Join Church</a></p>
<p>This invitation expires in 7 days.</p>
<p>If you did not expect this invitation, you can ignore this email.</p>`,
      text: `You’ve been invited to join ${church} on Production OS.

Join Church:
${joinUrl}

This invitation expires in 7 days.

If you did not expect this invitation, you can ignore this email.`,
    },
    { idempotencyKey: `team-invitation/${input.invitationId}` }
  );

  if (error) {
    logInviteEvent("resend_send_failed", {
      code: error.name,
      invitationId: input.invitationId,
    });
    return { ok: false };
  }

  return { ok: true };
}
