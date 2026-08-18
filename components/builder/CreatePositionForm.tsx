"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  createPositionAction,
  type CreatePositionState,
} from "@/app/builder/positions/actions";
import type { BuilderDepartment } from "@/lib/builder/load-positions";
import { volunteerUi } from "@/lib/volunteer/ui";

const initialState: CreatePositionState = {};

function CreateSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${volunteerUi.cta} w-full disabled:opacity-70`}
    >
      {pending ? "Creating…" : "Create Position"}
    </button>
  );
}

export function CreatePositionForm({
  departments,
}: {
  departments: BuilderDepartment[];
}) {
  const [state, formAction] = useActionState(createPositionAction, initialState);

  if (departments.length === 0) {
    return (
      <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
        <p className={volunteerUi.eyebrow}>Create Position</p>
        <p className={`mt-2 ${volunteerUi.body}`}>
          No Production departments are available to configure yet.
        </p>
      </section>
    );
  }

  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
      <p className={volunteerUi.eyebrow}>Create Position</p>
      <p className={`mt-1 ${volunteerUi.body}`}>
        Add a serving role for a department. Qualification happens later.
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
            Department
          </span>
          <select
            name="workspaceDepartmentId"
            required
            className="min-h-[44px] w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-[16px] text-white outline-none focus:border-[#FF5A00]/35 focus:ring-2 focus:ring-[#FF5A00]/20 sm:text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              Choose a department
            </option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-white/70">
            Position Name
          </span>
          <input
            name="name"
            type="text"
            maxLength={120}
            required
            autoComplete="off"
            className="min-h-[44px] w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-[16px] text-white outline-none focus:border-[#FF5A00]/35 focus:ring-2 focus:ring-[#FF5A00]/20 sm:text-sm"
          />
        </label>
        <CreateSubmit />
      </form>
    </section>
  );
}
