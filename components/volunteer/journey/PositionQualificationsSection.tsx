"use client";

import { PositionQualificationCard } from "@/components/volunteer/journey/PositionQualificationCard";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { getPositionQualificationViews } from "@/lib/volunteer/journey";
import { volunteerEmptyCopy } from "@/lib/volunteer/labels";
import type { DepartmentId } from "@/lib/volunteer/types";
import { volunteerUi } from "@/lib/volunteer/ui";

interface PositionQualificationsSectionProps {
  departmentId: DepartmentId | null;
}

export function PositionQualificationsSection({
  departmentId,
}: PositionQualificationsSectionProps) {
  const session = useVolunteerSession();
  const views = getPositionQualificationViews(session, departmentId);

  return (
    <section>
      <p className={volunteerUi.eyebrow}>Position qualifications</p>
      <h2 className={`mt-1.5 ${volunteerUi.title}`}>Your positions</h2>
      <p className={`mt-1 ${volunteerUi.muted}`}>
        Specific serving roles, separate from department Growth Level.
      </p>
      {views.length === 0 ? (
        <div className={`${volunteerUi.card} ${volunteerUi.cardPad} mt-3`}>
          <p className={volunteerUi.title}>{volunteerEmptyCopy.noQualification}</p>
          <p className={`mt-1 ${volunteerUi.body}`}>
            {volunteerEmptyCopy.noQualificationDetail}
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          {views.map((view) => (
            <PositionQualificationCard key={view.positionId} view={view} />
          ))}
        </div>
      )}
    </section>
  );
}
