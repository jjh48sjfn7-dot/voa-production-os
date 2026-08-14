import {
  getPositionName,
  qualificationStatusLabels,
  requirementProgressLabels,
} from "@/lib/volunteer/labels";
import {
  arePositionPrerequisitesMet,
  getActiveAssignment,
  getActiveQualification,
  getAssistedProgress,
  getCompetencyProgress,
  getCourseProgress,
  getDepartmentPositions,
  getQualificationForPosition,
  getShadowProgress,
} from "@/lib/volunteer/session";
import type {
  DepartmentId,
  PositionQualificationStatus,
  VolunteerSession,
} from "@/lib/volunteer/types";

export interface PositionQualificationView {
  positionId: string;
  name: string;
  status: PositionQualificationStatus;
  statusLabel: string;
  isCurrent: boolean;
  locked: boolean;
  requiresLabel?: string;
  trainingLabel?: string;
  shadowingLabel?: string;
  competenciesLabel?: string;
  nextRequirement?: string;
}

export interface JourneyRequirementRow {
  label: string;
  value: string;
}

export function getPositionQualificationViews(
  session: VolunteerSession,
  departmentId: DepartmentId = session.activeDepartmentId
): PositionQualificationView[] {
  const assignment = session.departmentAssignments.find(
    (item) => item.departmentId === departmentId && item.active
  );
  const currentIds = new Set(assignment?.assignedPositionIds ?? []);

  return getDepartmentPositions(session, departmentId).map((position) => {
    const record = getQualificationForPosition(session, position.id);
    const locked = !arePositionPrerequisitesMet(session, position);
    const status: PositionQualificationStatus = record?.status ?? "not-started";
    const { done, total } = getCompetencyProgress(record);
    const unmet = (position.prerequisitePositionIds ?? []).map((id) =>
      getPositionName(session.positions, id)
    );

    return {
      positionId: position.id,
      name: position.name,
      status,
      statusLabel: locked ? "Locked" : qualificationStatusLabels[status],
      isCurrent: currentIds.has(position.id),
      locked,
      requiresLabel:
        locked && unmet.length > 0
          ? `Requires: ${unmet.join(", ")} qualification`
          : undefined,
      trainingLabel: record
        ? requirementProgressLabels[getCourseProgress(record)]
        : undefined,
      shadowingLabel: record
        ? requirementProgressLabels[getShadowProgress(record)]
        : undefined,
      competenciesLabel:
        record && total > 0 ? `${done} / ${total}` : undefined,
      nextRequirement:
        !locked && position.id === session.journey.positionId
          ? session.journey.nextStep.title
          : undefined,
    };
  });
}

export function getCurrentStageRequirementRows(
  session: VolunteerSession
): JourneyRequirementRow[] {
  const record = getActiveQualification(session);
  const { done, total } = getCompetencyProgress(record);

  return [
    {
      label: "Training",
      value: requirementProgressLabels[getCourseProgress(record)],
    },
    {
      label: "Shadowing",
      value: requirementProgressLabels[getShadowProgress(record)],
    },
    {
      label: "Assisted Services",
      value: requirementProgressLabels[getAssistedProgress(record)],
    },
    {
      label: "Hands-On Competencies",
      value: total > 0 ? `${done} of ${total}` : requirementProgressLabels["not-started"],
    },
  ];
}

export function getCurrentGrowthLevel(session: VolunteerSession) {
  const assignment = getActiveAssignment(session);
  if (assignment) return assignment.growthLevel;
  return session.journey.growthTrack.find((step) => step.state === "current")?.level;
}
