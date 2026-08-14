"use client";

import { PositionQualificationCard } from "@/components/volunteer/journey/PositionQualificationCard";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { getPositionQualificationViews } from "@/lib/volunteer/journey";
import type { DepartmentId } from "@/lib/volunteer/types";
import { volunteerUi } from "@/lib/volunteer/ui";

interface PositionQualificationsSectionProps {
  departmentId: DepartmentId;
}

export function PositionQualificationsSection({
  departmentId,
}: PositionQualificationsSectionProps) {
  const session = useVolunteerSession();
  const views = getPositionQualificationViews(session, departmentId);

  if (views.length === 0) return null;

  return (
    <section>
      <p className={volunteerUi.eyebrow}>Position qualifications</p>
      <h2 className={`mt-1.5 ${volunteerUi.title}`}>Your positions</h2>
      <p className={`mt-1 ${volunteerUi.muted}`}>
        Specific serving roles, separate from department Growth Level.
      </p>
      <div className="mt-3 space-y-3">
        {views.map((view) => (
          <PositionQualificationCard key={view.positionId} view={view} />
        ))}
      </div>
    </section>
  );
}
