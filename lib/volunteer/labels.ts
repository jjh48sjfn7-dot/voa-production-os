import type {
  DepartmentGrowthLevel,
  DepartmentId,
  PositionQualificationStatus,
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
