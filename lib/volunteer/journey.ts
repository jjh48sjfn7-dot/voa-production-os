import {
  departmentGrowthTrackLevels,
  qualificationStatusLabels,
} from "@/lib/volunteer/labels";
import { getActiveAssignment } from "@/lib/volunteer/session";
import { getServingPositionViews } from "@/lib/volunteer/serving";
import type {
  DepartmentGrowthLevel,
  DepartmentId,
  JourneyStepState,
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
  departmentId: DepartmentId | null = session.activeDepartmentId
): PositionQualificationView[] {
  return getServingPositionViews(session, departmentId).map((view) => ({
    positionId: view.positionId,
    name: view.positionName,
    status: view.status,
    statusLabel: qualificationStatusLabels[view.status],
    isCurrent: false,
    locked: false,
  }));
}

export function getCurrentStageRequirementRows(
  session: VolunteerSession
): JourneyRequirementRow[] {
  if (!session.journey) return [];
  return [];
}

export function getCurrentGrowthLevel(session: VolunteerSession) {
  const assignment = getActiveAssignment(session);
  if (assignment) return assignment.growthLevel;
  return session.journey?.growthTrack.find((step) => step.state === "current")?.level;
}

/** Reflects real department_assignments Growth without inventing a training journey. */
export function getDepartmentGrowthTrackSteps(
  session: VolunteerSession,
  departmentId: DepartmentId | null
): {
  steps: { level: DepartmentGrowthLevel; state?: JourneyStepState }[];
  unconnected: boolean;
} {
  const journey =
    session.journey && session.journey.departmentId === departmentId
      ? session.journey
      : null;
  if (journey) {
    return { steps: journey.growthTrack, unconnected: false };
  }

  const assignment = departmentId
    ? session.departmentAssignments.find(
        (item) => item.departmentId === departmentId && item.active
      )
    : undefined;

  if (!assignment) {
    return {
      steps: departmentGrowthTrackLevels.map((level) => ({ level })),
      unconnected: true,
    };
  }

  const currentIndex = departmentGrowthTrackLevels.indexOf(assignment.growthLevel);
  return {
    unconnected: false,
    steps: departmentGrowthTrackLevels.map((level, index) => {
      let state: JourneyStepState = "locked";
      if (index < currentIndex) state = "completed";
      else if (index === currentIndex) state = "current";
      else if (index === currentIndex + 1) state = "next";
      return { level, state };
    }),
  };
}
