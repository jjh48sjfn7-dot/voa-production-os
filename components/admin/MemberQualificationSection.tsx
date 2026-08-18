"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  startMemberPositionQualification,
  type StartQualificationState,
} from "@/app/admin/team/qualification-actions";
import type { AdminTeamMember } from "@/lib/admin/load-team";
import { qualificationStatusLabels } from "@/lib/volunteer/labels";
import { volunteerUi } from "@/lib/volunteer/ui";

const initialState: StartQualificationState = {};

function StartLearningSubmit({ positionName }: { positionName: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={`Start Learning for ${positionName}`}
      className="min-h-[36px] rounded-lg bg-[#FF5A00] px-3 text-[13px] font-semibold text-white hover:bg-[#E65100] disabled:opacity-70"
    >
      {pending ? "Starting…" : "Start Learning"}
    </button>
  );
}

export function MemberQualificationSection({
  member,
}: {
  member: AdminTeamMember;
}) {
  const [state, formAction] = useActionState(
    startMemberPositionQualification,
    initialState
  );

  return (
    <div className="mt-5">
      <p className={volunteerUi.eyebrow}>Qualification</p>
      {state.error ? (
        <p
          role="alert"
          className="mt-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-[13px] text-red-200"
        >
          {state.error}
        </p>
      ) : null}
      {state.message ? (
        <p
          role="status"
          className="mt-2 rounded-xl border border-[#FF5A00]/25 bg-[#FF5A00]/10 px-3 py-2 text-[13px] text-[#FF8A4C]"
        >
          {state.message}
        </p>
      ) : null}

      {member.positions.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {member.positions.map((position) => (
            <li
              key={position.positionId}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
            >
              <div>
                <p className="text-[14px] text-white">{position.positionName}</p>
                <p className="text-[13px] text-white/45">
                  {position.departmentName} ·{" "}
                  {qualificationStatusLabels[position.status]}
                </p>
              </div>
              {!member.isCurrentUser && position.status === "not-started" ? (
                <form action={formAction}>
                  <input
                    type="hidden"
                    name="membershipId"
                    value={member.membershipId}
                  />
                  <input
                    type="hidden"
                    name="positionId"
                    value={position.positionId}
                  />
                  <StartLearningSubmit positionName={position.positionName} />
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className={`mt-2 ${volunteerUi.muted}`}>
          No positions in assigned departments yet.
        </p>
      )}

      {member.isCurrentUser ? (
        <p className={`mt-2 ${volunteerUi.muted}`}>
          You cannot start your own qualification.
        </p>
      ) : null}
    </div>
  );
}
