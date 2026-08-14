import type {
  DepartmentId,
  Position,
  PositionQualificationRecord,
  RequirementProgress,
  VolunteerSession,
} from "@/lib/volunteer/types";

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

export function getActiveDepartments(session: VolunteerSession) {
  return session.departmentAssignments.filter((assignment) => assignment.active);
}

export function getActiveQualification(session: VolunteerSession) {
  const assignment = getActiveAssignment(session);
  const positionId = assignment?.assignedPositionIds[0];
  if (!positionId) return undefined;
  return getQualificationForPosition(session, positionId);
}

export function getQualificationForPosition(
  session: VolunteerSession,
  positionId: string
): PositionQualificationRecord | undefined {
  return session.qualifications.find(
    (record) =>
      record.positionId === positionId &&
      record.membershipId === session.membership.id
  );
}

export function getDepartmentPositions(
  session: VolunteerSession,
  departmentId: DepartmentId = session.activeDepartmentId
): Position[] {
  const assignment = session.departmentAssignments.find(
    (item) => item.departmentId === departmentId && item.active
  );
  const assigned = new Set(assignment?.assignedPositionIds ?? []);

  return session.positions
    .filter((position) => position.departmentId === departmentId && position.active)
    .sort((a, b) => Number(assigned.has(b.id)) - Number(assigned.has(a.id)));
}

export function arePositionPrerequisitesMet(
  session: VolunteerSession,
  position: Position
): boolean {
  const required = position.prerequisitePositionIds ?? [];
  if (required.length === 0) return true;

  return required.every((positionId) => {
    const record = getQualificationForPosition(session, positionId);
    return record?.status === "qualified" || record?.status === "advanced";
  });
}

export function getCompetencyProgress(record: PositionQualificationRecord | undefined) {
  const done = record?.completedCompetencyIds.length ?? 0;
  const total = record?.requiredCompetencyIds.length ?? 0;
  return { done, total };
}

export function getCourseProgress(
  record: PositionQualificationRecord | undefined
): RequirementProgress {
  if (!record || record.requiredCourseIds.length === 0) {
    return record?.trainingProgress === 100 ? "complete" : "not-started";
  }
  if (record.completedCourseIds.length >= record.requiredCourseIds.length) {
    return "complete";
  }
  if (record.completedCourseIds.length > 0 || record.trainingProgress > 0) {
    return "in-progress";
  }
  return "not-started";
}

export function getShadowProgress(
  record: PositionQualificationRecord | undefined
): RequirementProgress {
  if (!record) return "not-started";
  if (record.completedShadowServices >= record.requiredShadowServices) {
    return "complete";
  }
  if (record.completedShadowServices > 0) return "in-progress";
  return "not-started";
}

export function getAssistedProgress(
  record: PositionQualificationRecord | undefined
): RequirementProgress {
  if (!record) return "not-started";
  if (record.completedAssistedServices >= record.requiredAssistedServices) {
    return "complete";
  }
  if (record.completedAssistedServices > 0) return "in-progress";
  return "not-started";
}
