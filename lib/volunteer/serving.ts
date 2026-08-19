import { departmentLabels } from "@/lib/volunteer/labels";
import { mapQualificationStatus } from "@/lib/volunteer/map-records";
import type {
  DepartmentId,
  PositionQualificationStatus,
  VolunteerSession,
} from "@/lib/volunteer/types";

export type VolunteerServingPositionView = {
  positionId: string;
  positionName: string;
  departmentId: DepartmentId;
  departmentName: string;
  status: PositionQualificationStatus;
};

export function getServingPositionViews(
  session: VolunteerSession,
  departmentId: DepartmentId | null = session.activeDepartmentId
): VolunteerServingPositionView[] {
  if (!departmentId) return [];

  const assignment = session.departmentAssignments.find(
    (item) => item.departmentId === departmentId && item.active
  );
  if (!assignment) return [];

  const qualificationByPositionId = new Map(
    session.qualifications.map((row) => [row.positionId, row])
  );

  return session.positions
    .filter(
      (position) =>
        position.departmentId === departmentId && position.isActive
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((position) => ({
      positionId: position.id,
      positionName: position.name,
      departmentId: position.departmentId,
      departmentName: departmentLabels[position.departmentId],
      status: mapQualificationStatus(
        qualificationByPositionId.get(position.id)?.status
      ),
    }));
}
