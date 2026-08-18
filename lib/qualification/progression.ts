import type { Database } from "@/lib/supabase/database.types";

export type StoredQualificationStatus =
  Database["public"]["Enums"]["position_qualification_status"];

const NEXT_STATUS: Record<
  StoredQualificationStatus,
  StoredQualificationStatus | null
> = {
  learning: "shadowing",
  shadowing: "assisted",
  assisted: "qualified",
  qualified: "advanced",
  advanced: null,
};

const PROGRESSION_ACTION_LABELS: Record<
  StoredQualificationStatus,
  string | null
> = {
  learning: "Begin Shadowing",
  shadowing: "Begin Assisted",
  assisted: "Mark Qualified",
  qualified: "Mark Advanced",
  advanced: null,
};

export function isStoredQualificationStatus(
  value: string
): value is StoredQualificationStatus {
  return (
    value === "learning" ||
    value === "shadowing" ||
    value === "assisted" ||
    value === "qualified" ||
    value === "advanced"
  );
}

/** Server determines the only legal next status. Browser never chooses it. */
export function nextQualificationStatus(
  current: StoredQualificationStatus
): StoredQualificationStatus | null {
  return NEXT_STATUS[current];
}

export function qualificationProgressionActionLabel(
  current: StoredQualificationStatus
): string | null {
  return PROGRESSION_ACTION_LABELS[current];
}

export function qualificationProgressionSuccessMessage(
  next: StoredQualificationStatus
): string {
  if (next === "shadowing") return "Qualification moved to Shadowing.";
  if (next === "assisted") return "Qualification moved to Assisted.";
  if (next === "qualified") return "Volunteer marked Qualified.";
  if (next === "advanced") return "Qualification moved to Advanced.";
  return "Qualification updated.";
}
