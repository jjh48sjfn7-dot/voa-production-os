"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  teamAssignmentAction,
  type AssignActionState,
} from "@/app/admin/team/actions";
import type {
  AdminTeamDepartmentOption,
  AdminTeamMember,
} from "@/lib/admin/load-team";
import { volunteerUi } from "@/lib/volunteer/ui";

const initialState: AssignActionState = {};

function AssignSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${volunteerUi.cta} w-full disabled:opacity-70`}
    >
      {pending ? "Assigning…" : "Assign"}
    </button>
  );
}

function RemoveSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="min-h-[36px] rounded-lg px-3 text-[13px] font-medium text-white/55 hover:bg-white/[0.05] hover:text-white disabled:opacity-70"
    >
      {pending ? "Removing…" : "Remove from department"}
    </button>
  );
}

export function TeamAssignmentPanel({
  members,
  departments,
}: {
  members: AdminTeamMember[];
  departments: AdminTeamDepartmentOption[];
}) {
  const [state, formAction] = useActionState(teamAssignmentAction, initialState);

  return (
    <div className="space-y-4">
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

      {members.map((member) => {
        const activeAssignments = member.assignments.filter(
          (assignment) => assignment.active
        );
        return (
          <section
            key={member.membershipId}
            className={`${volunteerUi.card} ${volunteerUi.cardPad}`}
          >
            <p className={volunteerUi.eyebrow}>Member</p>
            <h2 className={`mt-1.5 ${volunteerUi.title}`}>{member.label}</h2>

            {activeAssignments.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {activeAssignments.map((assignment) => (
                  <li
                    key={assignment.workspaceDepartmentId}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5"
                  >
                    <p className="text-[14px] text-white">
                      {assignment.departmentName}
                      <span className="text-white/45">
                        {" "}
                        · {assignment.growthLabel}
                      </span>
                    </p>
                    <form action={formAction}>
                      <input type="hidden" name="intent" value="remove" />
                      <input
                        type="hidden"
                        name="membershipId"
                        value={member.membershipId}
                      />
                      <input
                        type="hidden"
                        name="workspaceDepartmentId"
                        value={assignment.workspaceDepartmentId}
                      />
                      <RemoveSubmit />
                    </form>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`mt-3 ${volunteerUi.muted}`}>
                Not assigned to a Production department yet.
              </p>
            )}

            <form action={formAction} className="mt-5 space-y-3">
              <input type="hidden" name="intent" value="assign" />
              <input
                type="hidden"
                name="membershipId"
                value={member.membershipId}
              />
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-white/70">
                  Department
                </span>
                <select
                  name="workspaceDepartmentId"
                  required
                  defaultValue={departments[0]?.workspaceDepartmentId ?? ""}
                  className="min-h-[44px] w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-[16px] text-white outline-none transition-[border-color,box-shadow] focus:border-[#FF5A00]/35 focus:ring-2 focus:ring-[#FF5A00]/20 sm:text-sm"
                >
                  {departments.map((department) => (
                    <option
                      key={department.workspaceDepartmentId}
                      value={department.workspaceDepartmentId}
                      className="bg-[#1A1A1A] text-white"
                    >
                      {department.name}
                    </option>
                  ))}
                </select>
              </label>
              <AssignSubmit />
            </form>
          </section>
        );
      })}
    </div>
  );
}
