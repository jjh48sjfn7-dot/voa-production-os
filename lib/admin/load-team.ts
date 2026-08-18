import { adminMemberLabel } from "@/lib/admin/member-label";
import { logAdminEvent } from "@/lib/admin/log";
import { intersectAvailableDepartmentIds } from "@/lib/volunteer/departments";
import {
  departmentLabels,
  growthLevelLabels,
} from "@/lib/volunteer/labels";
import {
  mapGrowthLevel,
  mapQualificationStatus,
} from "@/lib/volunteer/map-records";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminAccess } from "@/lib/admin/access";
import type { Database } from "@/lib/supabase/database.types";
import type {
  DepartmentId,
  PositionQualificationStatus,
} from "@/lib/volunteer/types";

export type AdminTeamDepartmentOption = {
  workspaceDepartmentId: string;
  key: DepartmentId;
  name: string;
};

export type AdminTeamAssignment = {
  workspaceDepartmentId: string;
  departmentKey: DepartmentId;
  departmentName: string;
  growthLabel: string;
  active: boolean;
};

export type AdminMemberPositionView = {
  positionId: string;
  positionName: string;
  departmentName: string;
  status: PositionQualificationStatus;
};

export type AdminTeamMember = {
  membershipId: string;
  label: string;
  isCurrentUser: boolean;
  assignments: AdminTeamAssignment[];
  positions: AdminMemberPositionView[];
};

export type AdminTeamPageData = {
  workspaceName: string;
  members: AdminTeamMember[];
  departments: AdminTeamDepartmentOption[];
};

export async function loadAdminTeamPage(
  access: Extract<AdminAccess, { ok: true }>
): Promise<AdminTeamPageData | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAdminEvent("supabase_unconfigured");
    return null;
  }

  const [membersResult, departmentsResult] = await Promise.all([
    // Church team only. Never list auth.users or profiles without an active
    // team_memberships row for this workspace.
    supabase
      .from("team_memberships")
      .select("id, user_id, status")
      .eq("workspace_id", access.workspaceId)
      .eq("status", "active"),
    supabase
      .from("workspace_departments")
      .select("id, department_key, name, source, is_active")
      .eq("workspace_id", access.workspaceId)
      .eq("is_active", true),
  ]);

  if (membersResult.error) {
    logAdminEvent("team_members_query_failed", {
      code: membersResult.error.code,
    });
    return null;
  }
  if (departmentsResult.error) {
    logAdminEvent("departments_query_failed", {
      code: departmentsResult.error.code,
    });
    return null;
  }

  const memberships = membersResult.data ?? [];
  const dbDepartments = departmentsResult.data ?? [];
  const { available, unmatchedProductionOsKeys } =
    intersectAvailableDepartmentIds(dbDepartments);

  for (const key of unmatchedProductionOsKeys) {
    logAdminEvent("unmatched_production_os_department", { code: key });
  }

  const departmentIdByWorkspaceDepartmentId = new Map<string, DepartmentId>();
  for (const department of dbDepartments) {
    if (available.includes(department.department_key as DepartmentId)) {
      departmentIdByWorkspaceDepartmentId.set(
        department.id,
        department.department_key as DepartmentId
      );
    }
  }

  const userIds = memberships.map((row) => row.user_id);
  const membershipIds = memberships.map((row) => row.id);
  const workspaceDepartmentIds = dbDepartments.map((department) => department.id);

  const [profilesResult, assignmentsResult, positionsResult, qualificationsResult] =
    await Promise.all([
      userIds.length > 0
        ? supabase
            .from("profiles")
            .select("id, first_name, last_name, display_name")
            .in("id", userIds)
        : Promise.resolve({ data: [], error: null }),
      membershipIds.length > 0
        ? supabase
            .from("department_assignments")
            .select(
              "membership_id, workspace_department_id, growth_level, is_active"
            )
            .in("membership_id", membershipIds)
        : Promise.resolve({ data: [], error: null }),
      workspaceDepartmentIds.length > 0
        ? supabase
            .from("positions")
            .select("id, name, is_active, workspace_department_id")
            .eq("is_active", true)
            .in("workspace_department_id", workspaceDepartmentIds)
        : Promise.resolve({ data: [], error: null }),
      membershipIds.length > 0
        ? supabase
            .from("position_qualifications")
            .select("membership_id, position_id, status")
            .in("membership_id", membershipIds)
        : Promise.resolve({ data: [], error: null }),
    ]);

  if (profilesResult.error) {
    logAdminEvent("profiles_query_failed", {
      code: profilesResult.error.code,
    });
    return null;
  }
  if (assignmentsResult.error) {
    logAdminEvent("assignments_query_failed", {
      code: assignmentsResult.error.code,
    });
    return null;
  }
  if (positionsResult.error) {
    logAdminEvent("positions_query_failed", {
      code: positionsResult.error.code,
    });
    return null;
  }
  if (qualificationsResult.error) {
    logAdminEvent("qualifications_query_failed", {
      code: qualificationsResult.error.code,
    });
    return null;
  }

  const profileByUserId = new Map(
    (profilesResult.data ?? []).map((profile) => [profile.id, profile])
  );

  const assignmentsByMembershipId = new Map<string, AdminTeamAssignment[]>();
  for (const row of assignmentsResult.data ?? []) {
    const departmentKey = departmentIdByWorkspaceDepartmentId.get(
      row.workspace_department_id
    );
    if (!departmentKey) continue;
    const list = assignmentsByMembershipId.get(row.membership_id) ?? [];
    list.push({
      workspaceDepartmentId: row.workspace_department_id,
      departmentKey,
      departmentName: departmentLabels[departmentKey],
      growthLabel: growthLevelLabels[mapGrowthLevel(row.growth_level)],
      active: row.is_active,
    });
    assignmentsByMembershipId.set(row.membership_id, list);
  }

  const positionsByDepartmentId = new Map<
    string,
    { id: string; name: string }[]
  >();
  for (const row of positionsResult.data ?? []) {
    const list = positionsByDepartmentId.get(row.workspace_department_id) ?? [];
    list.push({ id: row.id, name: row.name });
    positionsByDepartmentId.set(row.workspace_department_id, list);
  }

  const qualificationByMembershipPosition = new Map<
    string,
    Database["public"]["Enums"]["position_qualification_status"]
  >();
  for (const row of qualificationsResult.data ?? []) {
    qualificationByMembershipPosition.set(
      `${row.membership_id}:${row.position_id}`,
      row.status
    );
  }

  const members: AdminTeamMember[] = memberships.map((row) => {
    const isCurrentUser = row.user_id === access.userId;
    const assignments = (assignmentsByMembershipId.get(row.id) ?? []).sort(
      (a, b) => a.departmentName.localeCompare(b.departmentName)
    );
    const positions: AdminMemberPositionView[] = [];
    for (const assignment of assignments) {
      if (!assignment.active) continue;
      const departmentPositions =
        positionsByDepartmentId.get(assignment.workspaceDepartmentId) ?? [];
      for (const position of departmentPositions) {
        positions.push({
          positionId: position.id,
          positionName: position.name,
          departmentName: assignment.departmentName,
          status: mapQualificationStatus(
            qualificationByMembershipPosition.get(`${row.id}:${position.id}`)
          ),
        });
      }
    }
    positions.sort(
      (a, b) =>
        a.departmentName.localeCompare(b.departmentName) ||
        a.positionName.localeCompare(b.positionName)
    );
    return {
      membershipId: row.id,
      label: adminMemberLabel(profileByUserId.get(row.user_id) ?? null, isCurrentUser),
      isCurrentUser,
      assignments,
      positions,
    };
  });

  members.sort((a, b) => {
    if (a.isCurrentUser !== b.isCurrentUser) return a.isCurrentUser ? -1 : 1;
    return a.label.localeCompare(b.label);
  });

  return {
    workspaceName: access.workspaceName,
    members,
    departments: available.flatMap((key) => {
      const row = dbDepartments.find(
        (department) =>
          department.department_key === key && department.source === "production_os"
      );
      if (!row) return [];
      return [
        {
          workspaceDepartmentId: row.id,
          key,
          name: departmentLabels[key],
        },
      ];
    }),
  };
}
