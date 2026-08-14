"use client";

import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import {
  departmentLabels,
  getPositionName,
  growthLevelLabels,
  qualificationStatusLabels,
} from "@/lib/volunteer/labels";
import {
  getActiveAssignment,
  getActiveQualification,
} from "@/lib/volunteer/session";
import { volunteerUi } from "@/lib/volunteer/ui";

export function GrowthSnapshot() {
  const session = useVolunteerSession();
  const assignment = getActiveAssignment(session);
  const qualification = getActiveQualification(session);
  if (!assignment) return null;

  const positionName = getPositionName(
    session.positions,
    assignment.assignedPositionIds[0] ?? ""
  );

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
        <div>
          <p className="text-[12px] text-white/40">{positionName}</p>
          <p className="mt-0.5 text-[15px] font-semibold text-white">
            {qualification
              ? qualificationStatusLabels[qualification.status]
              : "Not Started"}
          </p>
        </div>
      </div>
    </section>
  );
}
