"use client";

import { useActionState } from "react";
import {
  acceptInviteAction,
  logoutForInviteAction,
  type InviteActionState,
} from "@/app/invite/actions";
import { volunteerUi } from "@/lib/volunteer/ui";

const initialState: InviteActionState = {};

export function InviteJoinForm() {
  const [state, formAction] = useActionState(acceptInviteAction, initialState);

  return (
    <div className="space-y-3">
      {state.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-[13px] text-red-200"
        >
          {state.error}
        </p>
      ) : null}
      {state.status === "wrong_account" ? (
        <div className="space-y-3">
          <p className={volunteerUi.body}>
            This invitation was sent to another email. Sign out and use the
            invited account.
          </p>
          <form action={logoutForInviteAction}>
            <button type="submit" className={`${volunteerUi.cta} w-full`}>
              Sign out
            </button>
          </form>
        </div>
      ) : null}
      {state.status === "unverified" ? (
        <p className={volunteerUi.body}>
          Confirm your email before joining this church. Check your inbox, then
          return to this invitation.
        </p>
      ) : null}
      {state.status === "expired" ? (
        <p className={volunteerUi.body}>Invitation expired.</p>
      ) : null}
      {state.status === "revoked" ? (
        <p className={volunteerUi.body}>Invitation no longer valid.</p>
      ) : null}
      {state.status === "accepted" ? (
        <p className={volunteerUi.body}>
          This invitation has already been used.
        </p>
      ) : null}
      {state.status === "archived" || state.status === "blocked" ? (
        <p className={volunteerUi.body}>
          This invitation cannot be used with this account.
        </p>
      ) : null}
      {state.status === "invalid" ? (
        <p className={volunteerUi.body}>Invitation link is invalid.</p>
      ) : null}
      {state.status === "unauthenticated" ? (
        <p className={volunteerUi.body}>Sign in to join this church.</p>
      ) : null}
      {!state.status && !state.error ? (
        <>
          <form action={formAction}>
            <button type="submit" className={`${volunteerUi.cta} w-full`}>
              Join church
            </button>
          </form>
          <form action={logoutForInviteAction} className="text-center">
            <button type="submit" className={volunteerUi.ghost}>
              Sign out
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
}
