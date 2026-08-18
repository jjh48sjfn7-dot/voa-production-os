"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  inviteVolunteerAction,
  type InviteVolunteerState,
} from "@/app/admin/team/invite-actions";
import { volunteerUi } from "@/lib/volunteer/ui";

const initialState: InviteVolunteerState = {};

function SendSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${volunteerUi.cta} w-full disabled:opacity-70`}
    >
      {pending ? "Sending…" : "Send invitation"}
    </button>
  );
}

export function InviteVolunteerPanel() {
  const [state, formAction] = useActionState(inviteVolunteerAction, initialState);

  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
      <p className={volunteerUi.eyebrow}>Invite Volunteer</p>
      <p className={`mt-1 ${volunteerUi.body}`}>
        Send a church membership invitation. Department assignment stays a
        separate Admin action.
      </p>
      <form action={formAction} className="mt-4 space-y-3">
        {state.error ? (
          <p
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-[13px] text-red-200"
          >
            {state.error}
          </p>
        ) : null}
        {state.message ? (
          <p
            role="status"
            className="rounded-xl border border-[#FF5A00]/25 bg-[#FF5A00]/10 px-3 py-2 text-[13px] text-[#FF8A4C]"
          >
            {state.message}
          </p>
        ) : null}
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-white/70">
            Email address
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-h-[44px] w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-[16px] text-white outline-none focus:border-[#FF5A00]/35 focus:ring-2 focus:ring-[#FF5A00]/20 sm:text-sm"
          />
        </label>
        <SendSubmit />
      </form>
    </section>
  );
}
