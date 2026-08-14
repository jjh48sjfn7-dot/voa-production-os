import type {
  DepartmentGrowthLevel,
  DepartmentId,
  JourneyStepState,
  PositionQualificationStatus,
  RequirementProgress,
} from "@/lib/volunteer/types";

export const departmentLabels: Record<DepartmentId, string> = {
  audio: "Audio",
  lighting: "Lighting",
  media: "Media",
};

export const growthLevelLabels: Record<DepartmentGrowthLevel, string> = {
  "new-volunteer": "New Volunteer",
  learning: "Learning",
  shadowing: "Shadowing",
  assisted: "Assisted",
  "ready-to-serve": "Ready to Serve",
  advanced: "Advanced",
};

export const qualificationStatusLabels: Record<
  PositionQualificationStatus,
  string
> = {
  "not-started": "Not Started",
  learning: "Learning",
  shadowing: "Shadowing",
  assisted: "Assisted",
  qualified: "Qualified",
  advanced: "Advanced",
};

export const journeyStepStateLabels: Record<JourneyStepState, string> = {
  completed: "Completed",
  current: "Current",
  next: "Next",
  locked: "Future",
};

export const requirementProgressLabels: Record<RequirementProgress, string> = {
  complete: "Complete",
  "in-progress": "In Progress",
  "not-started": "Not Started",
};

/** Product copy for the current Growth Track stage — not volunteer identity. */
export const growthLevelDescriptions: Record<DepartmentGrowthLevel, string> = {
  "new-volunteer":
    "You’re getting oriented to the team, the room, and how Sunday production works here.",
  learning:
    "You’re building the foundation for this department through required training.",
  shadowing:
    "You’re observing an experienced team member during real Sunday serving.",
  assisted:
    "You’re performing the role with an experienced team member nearby while completing hands-on competencies.",
  "ready-to-serve":
    "You’re qualified to serve this department’s assigned role with the team.",
  advanced:
    "You’re deepening specialty skills beyond the core serving path.",
};

export function getPositionName(
  positions: { id: string; name: string }[],
  positionId: string
): string {
  return positions.find((position) => position.id === positionId)?.name ?? positionId;
}

export function formatServiceDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatHistoryDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
