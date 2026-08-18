"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  revokeInvitationAction,
  type RevokeInvitationState,
} from "@/app/admin/team/invite-actions";
import type { AdminPendingInvitation } from "@/lib/admin/load-invitations";
import { volunteerUi } from "@/lib/volunteer/ui";

const initialState: RevokeInvitationState = {};

function RevokeSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="min-h-[36px] rounded-lg px-3 text-[13px] font-medium text-white/55 hover:bg-white/[0.05] hover:text-white disabled:opacity-70"
    >
      {pending ? "Revoking…" : "Revoke"}
    </button>
  );
}

function formatExpiry(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString();
}

export function PendingInvitationsPanel({
  invitations,
}: {
  invitations: AdminPendingInvitation[];
}) {
  const [state, formAction] = useActionState(revokeInvitationAction, initialState);

  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
      <p className={volunteerUi.eyebrow}>Pending Invitations</p>
      {state.error ? (
        <p
          role="alert"
          className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-[13px] text-red-200"
        >
          {state.error}
        </p>
      ) : null}
      {state.message ? (
        <p
          role="status"
          className="mt-3 rounded-xl border border-[#FF5A00]/25 bg-[#FF5A00]/10 px-3 py-2 text-[13px] text-[#FF8A4C]"
        >
          {state.message}
        </p>
      ) : null}
      {invitations.length === 0 ? (
        <p className={`mt-2 ${volunteerUi.body}`}>No pending invitations.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {invitations.map((invitation) => {
            const expiredLabel = invitation.expiredByTime;
            return (
              <li
                key={invitation.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3"
              >
                <p className="text-[14px] font-medium text-white">
                  {invitation.email}
                </p>
                <p className={`mt-1 ${volunteerUi.muted}`}>
                  {expiredLabel ? "Expired" : "Pending"}
                  {" · "}
                  Expires {formatExpiry(invitation.expiresAt)}
                </p>
                <form action={formAction} className="mt-2">
                  <input
                    type="hidden"
                    name="invitationId"
                    value={invitation.id}
                  />
                  <RevokeSubmit />
                </form>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
