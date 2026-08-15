import { getProductionDepartments } from "@/lib/production-os";
import type {
  DepartmentGrowthLevel,
  DepartmentId,
  JourneyStepState,
  MembershipResolution,
  PositionQualificationStatus,
  RequirementProgress,
} from "@/lib/volunteer/types";

export const departmentLabels: Record<DepartmentId, string> = Object.fromEntries(
  getProductionDepartments().map((department) => [department.id, department.name])
) as Record<DepartmentId, string>;

export const growthLevelLabels: Record<DepartmentGrowthLevel, string> = {
  "new-volunteer": "New Volunteer",
  learning: "Learning",
  shadowing: "Shadowing",
  assisted: "Assisted",
  "ready-to-serve": "Ready to Serve",
  advanced: "Advanced",
};

export const departmentGrowthTrackLevels: DepartmentGrowthLevel[] = [
  "new-volunteer",
  "learning",
  "shadowing",
  "assisted",
  "ready-to-serve",
  "advanced",
];

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

export const volunteerEmptyCopy = {
  welcome: "Welcome to Volunteer Mode",
  noChurchTeam: "No church team connected yet",
  multipleChurchTeams:
    "Multiple church teams are connected. A workspace switcher is not available yet.",
  sessionUnavailable: "Volunteer Mode is unavailable",
  sessionUnavailableDetail:
    "We couldn’t load your team session. Please try again.",
  noUpcomingService: "No upcoming service",
  noUpcomingServiceDetail: "You don’t have a personal Sunday assignment yet.",
  notAssigned: "Not assigned yet",
  trainingUnconnected: "Training progress not connected yet",
  trainingUnconnectedDetail:
    "Your personal growth path will appear here once training is connected.",
  noQualification: "No position qualification yet",
  noQualificationDetail:
    "Serving positions are defined by the church. None are connected to this account yet.",
  noTrainingHistory: "No training history yet",
  growthFrameworkNote: "Framework — personal progress not connected yet",
} as const;

export function volunteerWorkspaceLabel(session: {
  membershipResolution: MembershipResolution;
  workspace: { name: string } | null;
}): string {
  if (session.membershipResolution === "multiple") {
    return volunteerEmptyCopy.multipleChurchTeams;
  }
  return session.workspace?.name ?? volunteerEmptyCopy.noChurchTeam;
}

export function volunteerWelcomeTitle(session: {
  user: { firstName: string | null } | null;
}): string {
  const firstName = session.user?.firstName?.trim();
  if (firstName) return `Welcome back, ${firstName}`;
  return volunteerEmptyCopy.welcome;
}

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
