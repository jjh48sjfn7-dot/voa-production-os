import type { VolunteerSession } from "@/lib/volunteer/types";

export function isScheduledForService(session: VolunteerSession): boolean {
  return session.sundayAssignment !== null;
}

export function isServingToday(session: VolunteerSession): boolean {
  const assignment = session.sundayAssignment;
  if (!assignment) return false;
  const today = new Date();
  const local = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return assignment.serviceDate === local;
}

export function getActiveAssignment(session: VolunteerSession) {
  return session.departmentAssignments.find(
    (assignment) => assignment.departmentId === session.activeDepartmentId
  );
}

export function getActiveQualification(session: VolunteerSession) {
  const assignment = getActiveAssignment(session);
  const positionId = assignment?.assignedPositionIds[0];
  if (!positionId) return undefined;
  return session.qualifications.find(
    (record) =>
      record.positionId === positionId && record.membershipId === session.membership.id
  );
}
