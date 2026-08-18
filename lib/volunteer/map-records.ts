import type { Database } from "@/lib/supabase/database.types";
import type {
  DepartmentGrowthLevel,
  DepartmentId,
  LeadershipAppointment,
  PositionQualificationStatus,
  SoftwarePermissionGrant,
  SoftwarePermissionId,
  UserAccount,
} from "@/lib/volunteer/types";

const GROWTH_LEVEL_FROM_DB: Record<
  Database["public"]["Enums"]["department_growth_level"],
  DepartmentGrowthLevel
> = {
  new_volunteer: "new-volunteer",
  learning: "learning",
  shadowing: "shadowing",
  assisted: "assisted",
  ready_to_serve: "ready-to-serve",
  advanced: "advanced",
};

export function mapGrowthLevel(
  value: Database["public"]["Enums"]["department_growth_level"]
): DepartmentGrowthLevel {
  return GROWTH_LEVEL_FROM_DB[value];
}

/** Absence of a position_qualifications row is Not Started. DB never stores that status. */
export function mapQualificationStatus(
  value:
    | Database["public"]["Enums"]["position_qualification_status"]
    | null
    | undefined
): PositionQualificationStatus {
  return value ?? "not-started";
}

export function mapProfileToUserAccount(profile: {
  id: string;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
}): UserAccount {
  const firstName = usableText(profile.first_name);
  const lastName = usableText(profile.last_name);
  const displayName = usableText(profile.display_name);

  return {
    id: profile.id,
    firstName,
    lastName,
    displayName,
    avatarInitials: initialsFromNames(firstName, lastName, displayName),
  };
}

export function mapPermissionGrant(row: {
  id: string;
  membership_id: string;
  permission_key: Database["public"]["Enums"]["permission_key"];
  workspace_department_id: string | null;
}): SoftwarePermissionGrant {
  return {
    id: row.id,
    membershipId: row.membership_id,
    permissionId: row.permission_key as SoftwarePermissionId,
    workspaceDepartmentId: row.workspace_department_id,
  };
}

export function mapLeadershipAppointment(
  row: {
    id: string;
    membership_id: string;
    role_key: Database["public"]["Enums"]["leadership_role_key"];
    workspace_department_id: string | null;
  },
  departmentIdByWorkspaceDepartmentId: Map<string, DepartmentId>
): LeadershipAppointment {
  const departmentId = row.workspace_department_id
    ? departmentIdByWorkspaceDepartmentId.get(row.workspace_department_id)
    : undefined;

  return {
    id: row.id,
    membershipId: row.membership_id,
    roleKey: row.role_key,
    departmentId,
  };
}

function usableText(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function initialsFromNames(
  firstName: string | null,
  lastName: string | null,
  displayName: string | null
): string | null {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (!displayName) return null;
  const parts = displayName.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return null;
}
