import type {
  DepartmentId,
  Position,
  PositionQualificationRecord,
  VolunteerPositionQualification,
  RequirementProgress,
  VolunteerSession,
  VolunteerServingPosition,
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

export function isPersonalTrainingConnected(session: VolunteerSession): boolean {
  return session.journey !== null;
}

export function getActiveAssignment(session: VolunteerSession) {
  if (!session.activeDepartmentId) return undefined;
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
): VolunteerPositionQualification | undefined {
  if (!session.membership) return undefined;
  return session.qualifications.find(
    (record) =>
      record.positionId === positionId &&
      record.membershipId === session.membership?.id
  );
}

export function getDepartmentPositions(
  session: VolunteerSession,
  departmentId: DepartmentId | null = session.activeDepartmentId
): VolunteerServingPosition[] {
  if (!departmentId) return [];
  return session.positions
    .filter(
      (position) => position.departmentId === departmentId && position.isActive
    )
    .sort((a, b) => a.name.localeCompare(b.name));
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
