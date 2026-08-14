"use client";

import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { departmentLabels, volunteerEmptyCopy } from "@/lib/volunteer/labels";
import { getActiveDepartments } from "@/lib/volunteer/session";
import type { DepartmentId } from "@/lib/volunteer/types";

interface DepartmentJourneySwitcherProps {
  selectedDepartmentId: DepartmentId | null;
  onSelect: (departmentId: DepartmentId) => void;
}

export function DepartmentJourneySwitcher({
  selectedDepartmentId,
  onSelect,
}: DepartmentJourneySwitcherProps) {
  const session = useVolunteerSession();
  const assignments = getActiveDepartments(session);

  if (assignments.length === 0) {
    const available = session.availableDepartmentIds
      .map((id) => departmentLabels[id])
      .join(" · ");
    return (
      <div className="mt-1">
        <p className="text-[14px] text-white/55">{volunteerEmptyCopy.notAssigned}</p>
        {available && (
          <p className="mt-0.5 text-[13px] text-white/35">{available}</p>
        )}
      </div>
    );
  }

  if (assignments.length === 1) {
    return (
      <p className="text-[14px] text-white/55">
        {departmentLabels[assignments[0].departmentId]}
      </p>
    );
  }

  return (
    <div className="mt-1 flex flex-wrap gap-1.5">
      {assignments.map((assignment) => {
        const selected = assignment.departmentId === selectedDepartmentId;
        return (
          <button
            key={assignment.id}
            type="button"
            onClick={() => onSelect(assignment.departmentId)}
            className={`min-h-[36px] rounded-full px-3 text-[13px] font-medium ${
              selected
                ? "bg-[#FF5A00]/18 text-[#FF8A4C]"
                : "text-white/50 hover:bg-white/[0.05] hover:text-white/80"
            }`}
          >
            {departmentLabels[assignment.departmentId]}
          </button>
        );
      })}
    </div>
  );
}
