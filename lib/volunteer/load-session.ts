import { createSupabaseServerClient } from "@/lib/supabase/server";
import { intersectAvailableDepartmentIds } from "@/lib/volunteer/departments";
import { logVolunteerSessionEvent } from "@/lib/volunteer/log";
import {
  mapGrowthLevel,
  mapLeadershipAppointment,
  mapPermissionGrant,
  mapProfileToUserAccount,
  mapQualificationStatus,
} from "@/lib/volunteer/map-records";
import { getProductionChurchForKey } from "@/lib/volunteer/production-os-bridge";
import { isProductionDepartmentId } from "@/lib/production-os";
import type {
  ChurchWorkspace,
  DepartmentAssignment,
  DepartmentId,
  MembershipResolution,
  TeamMembership,
  UserAccount,
  VolunteerPositionQualification,
  VolunteerServingPosition,
  VolunteerSession,
} from "@/lib/volunteer/types";

export type VolunteerSessionResult =
  | { ok: true; session: VolunteerSession }
  | { ok: false };

export async function loadVolunteerSession(
  userId: string
): Promise<VolunteerSessionResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logVolunteerSessionEvent("supabase_unconfigured");
    return { ok: false };
  }

  const [profileResult, membershipResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, first_name, last_name, display_name")
      .eq("id", userId)
      .maybeSingle(),
    supabase
      .from("team_memberships")
      .select("id, user_id, workspace_id, status, joined_at")
      .eq("user_id", userId)
      .eq("status", "active"),
  ]);

  if (profileResult.error) {
    logVolunteerSessionEvent("profiles_query_failed", {
      code: profileResult.error.code,
    });
    return { ok: false };
  }
  if (membershipResult.error) {
    logVolunteerSessionEvent("memberships_query_failed", {
      code: membershipResult.error.code,
    });
    return { ok: false };
  }

  const user: UserAccount = profileResult.data
    ? mapProfileToUserAccount(profileResult.data)
    : {
        id: userId,
        firstName: null,
        lastName: null,
        displayName: null,
        avatarInitials: null,
      };

  if (!profileResult.data) {
    logVolunteerSessionEvent("profile_missing");
  }

  const activeMemberships = membershipResult.data ?? [];

  if (activeMemberships.length === 0) {
    return {
      ok: true,
      session: emptyPersonalSession(user, "none"),
    };
  }

  if (activeMemberships.length > 1) {
    return {
      ok: true,
      session: emptyPersonalSession(user, "multiple"),
    };
  }

  const membershipRow = activeMemberships[0];
  const membership: TeamMembership = {
    id: membershipRow.id,
    userId: membershipRow.user_id,
    workspaceId: membershipRow.workspace_id,
    status: membershipRow.status,
    joinedAt: membershipRow.joined_at,
  };

  const [
    workspaceResult,
    departmentsResult,
    grantsResult,
    leadershipResult,
    assignmentsResult,
    qualificationsResult,
  ] = await Promise.all([
    supabase
      .from("church_workspaces")
      .select("id, name, slug, timezone, production_os_key, is_active")
      .eq("id", membership.workspaceId)
      .maybeSingle(),
    supabase
      .from("workspace_departments")
      .select("id, department_key, name, source, is_active")
      .eq("workspace_id", membership.workspaceId)
      .eq("is_active", true),
    supabase
      .from("permission_grants")
      .select("id, membership_id, permission_key, workspace_department_id, revoked_at")
      .eq("membership_id", membership.id)
      .is("revoked_at", null),
    supabase
      .from("leadership_appointments")
      .select(
        "id, membership_id, role_key, workspace_department_id, removed_at"
      )
      .eq("membership_id", membership.id)
      .is("removed_at", null),
    supabase
      .from("department_assignments")
      .select(
        "id, membership_id, workspace_department_id, growth_level, is_active, assigned_at"
      )
      .eq("membership_id", membership.id),
    supabase
      .from("position_qualifications")
      .select("id, membership_id, position_id, status")
      .eq("membership_id", membership.id),
  ]);

  if (workspaceResult.error) {
    logVolunteerSessionEvent("workspace_query_failed", {
      code: workspaceResult.error.code,
    });
    return { ok: false };
  }
  if (departmentsResult.error) {
    logVolunteerSessionEvent("departments_query_failed", {
      code: departmentsResult.error.code,
    });
    return { ok: false };
  }
  if (grantsResult.error) {
    logVolunteerSessionEvent("permission_grants_query_failed", {
      code: grantsResult.error.code,
    });
    return { ok: false };
  }
  if (leadershipResult.error) {
    logVolunteerSessionEvent("leadership_query_failed", {
      code: leadershipResult.error.code,
    });
    return { ok: false };
  }
  if (assignmentsResult.error) {
    logVolunteerSessionEvent("assignments_query_failed", {
      code: assignmentsResult.error.code,
    });
    return { ok: false };
  }
  if (qualificationsResult.error) {
    logVolunteerSessionEvent("qualifications_query_failed", {
      code: qualificationsResult.error.code,
    });
    return { ok: false };
  }

  if (!workspaceResult.data) {
    logVolunteerSessionEvent("workspace_missing");
    return { ok: false };
  }

  const productionChurch = getProductionChurchForKey(
    workspaceResult.data.production_os_key
  );
  const workspace: ChurchWorkspace = {
    id: workspaceResult.data.id,
    name: workspaceResult.data.name,
    slug: workspaceResult.data.slug,
    timezone: workspaceResult.data.timezone,
    productionOsKey: workspaceResult.data.production_os_key,
    isActive: workspaceResult.data.is_active,
    campusLabel: productionChurch?.campusLabel,
  };

  const dbDepartments = departmentsResult.data ?? [];
  const { available, unmatchedProductionOsKeys } =
    intersectAvailableDepartmentIds(dbDepartments);

  for (const key of unmatchedProductionOsKeys) {
    logVolunteerSessionEvent("unmatched_production_os_department", {
      code: key,
    });
  }

  const departmentIdByWorkspaceDepartmentId = new Map<string, DepartmentId>();
  for (const department of dbDepartments) {
    if (isProductionDepartmentId(department.department_key)) {
      departmentIdByWorkspaceDepartmentId.set(
        department.id,
        department.department_key
      );
    }
  }

  const permissionGrants = (grantsResult.data ?? []).map(mapPermissionGrant);
  const leadershipAppointments = (leadershipResult.data ?? []).map((row) =>
    mapLeadershipAppointment(row, departmentIdByWorkspaceDepartmentId)
  );

  const departmentAssignments: DepartmentAssignment[] = [];
  const activeWorkspaceDepartmentIds: string[] = [];
  for (const row of assignmentsResult.data ?? []) {
    const departmentId = departmentIdByWorkspaceDepartmentId.get(
      row.workspace_department_id
    );
    if (!departmentId) {
      logVolunteerSessionEvent("assignment_department_unmapped");
      continue;
    }
    departmentAssignments.push({
      id: row.id,
      membershipId: row.membership_id,
      departmentId,
      growthLevel: mapGrowthLevel(row.growth_level),
      assignedPositionIds: [],
      active: row.is_active,
      assignedAt: row.assigned_at,
    });
    if (row.is_active) {
      activeWorkspaceDepartmentIds.push(row.workspace_department_id);
    }
  }

  const qualifications: VolunteerPositionQualification[] = [];
  for (const row of qualificationsResult.data ?? []) {
    const status = mapQualificationStatus(row.status);
    if (status === "not-started") continue;
    qualifications.push({
      id: row.id,
      membershipId: row.membership_id,
      positionId: row.position_id,
      status,
    });
  }

  const uniqueActiveDepartmentIds = [...new Set(activeWorkspaceDepartmentIds)];
  const positions: VolunteerServingPosition[] = [];
  if (uniqueActiveDepartmentIds.length > 0) {
    const positionsResult = await supabase
      .from("positions")
      .select("id, name, slug, description, is_active, workspace_department_id")
      .eq("is_active", true)
      .in("workspace_department_id", uniqueActiveDepartmentIds);

    if (positionsResult.error) {
      logVolunteerSessionEvent("positions_query_failed", {
        code: positionsResult.error.code,
      });
      return { ok: false };
    }

    for (const row of positionsResult.data ?? []) {
      const departmentId = departmentIdByWorkspaceDepartmentId.get(
        row.workspace_department_id
      );
      if (!departmentId) continue;
      positions.push({
        id: row.id,
        workspaceDepartmentId: row.workspace_department_id,
        departmentId,
        name: row.name,
        slug: row.slug,
        description: row.description,
        isActive: row.is_active,
      });
    }
  }

  const activeAssignments = departmentAssignments.filter(
    (assignment) => assignment.active
  );
  const activeDepartmentId =
    activeAssignments.length === 1 ? activeAssignments[0].departmentId : null;

  return {
    ok: true,
    session: {
      user,
      membershipResolution: "single",
      workspace,
      membership,
      permissionGrants,
      leadershipAppointments,
      availableDepartmentIds: available,
      positions,
      departmentAssignments,
      qualifications,
      activeDepartmentId,
      journey: null,
      sundayAssignment: null,
      notices: [],
      trainingHistory: [],
    },
  };
}

function emptyPersonalSession(
  user: UserAccount,
  membershipResolution: Exclude<MembershipResolution, "single">
): VolunteerSession {
  return {
    user,
    membershipResolution,
    workspace: null,
    membership: null,
    permissionGrants: [],
    leadershipAppointments: [],
    availableDepartmentIds: [],
    positions: [],
    departmentAssignments: [],
    qualifications: [],
    activeDepartmentId: null,
    journey: null,
    sundayAssignment: null,
    notices: [],
    trainingHistory: [],
  };
}
