"use client";

import Link from "next/link";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import {
  departmentLabels,
  growthLevelLabels,
  qualificationStatusLabels,
  volunteerEmptyCopy,
} from "@/lib/volunteer/labels";
import { getServingPositionViews } from "@/lib/volunteer/serving";
import { getActiveAssignment } from "@/lib/volunteer/session";
import { volunteerUi } from "@/lib/volunteer/ui";

export function GrowthSnapshot() {
  const session = useVolunteerSession();
  const assignment = getActiveAssignment(session);
  const views = getServingPositionViews(session, assignment?.departmentId ?? null);

  if (!assignment) {
    return (
      <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
        <p className={volunteerUi.eyebrow}>Growth snapshot</p>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[12px] text-white/40">Department</p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">
              {volunteerEmptyCopy.notAssigned}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-white/40">Position</p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">
              {volunteerEmptyCopy.noServingPosition}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
      <p className={volunteerUi.eyebrow}>Growth snapshot</p>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[12px] text-white/40">
            {departmentLabels[assignment.departmentId]} growth
          </p>
          <p className="mt-0.5 text-[15px] font-semibold text-white">
            {growthLevelLabels[assignment.growthLevel]}
          </p>
        </div>
        {views.length === 0 ? (
          <div>
            <p className="text-[12px] text-white/40">Position</p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">
              {volunteerEmptyCopy.noServingPosition}
            </p>
          </div>
        ) : null}
        {views.length === 1 ? (
          <div>
            <p className="text-[12px] text-white/40">{views[0].positionName}</p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">
              {qualificationStatusLabels[views[0].status]}
            </p>
          </div>
        ) : null}
        {views.length > 1 ? (
          <div>
            <p className="text-[12px] text-white/40">Positions</p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">
              {views.length} positions
            </p>
            <Link
              href="/volunteer/journey"
              className="mt-1 inline-block text-[13px] font-medium text-[#FF8A4C]"
            >
              View My Journey
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
