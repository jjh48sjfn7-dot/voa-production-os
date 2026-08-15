"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAccess } from "@/lib/admin/access";
import { logAdminEvent } from "@/lib/admin/log";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isProductionDepartmentId } from "@/lib/production-os";
import { departmentLabels } from "@/lib/volunteer/labels";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

export type AssignActionState = {
  error?: string;
  message?: string;
};

function revalidateAssignmentViews() {
  revalidatePath("/admin/team");
  revalidatePath("/volunteer", "layout");
  revalidatePath("/volunteer/journey");
  revalidatePath("/volunteer/profile");
}

function departmentDisplayName(departmentKey: string): string {
  return isProductionDepartmentId(departmentKey)
    ? departmentLabels[departmentKey]
    : "that department";
}

function readWorkspaceDepartmentId(formData: FormData): string | null {
  const raw = String(formData.get("workspaceDepartmentId") ?? "").trim();
  return isUuid(raw) ? raw : null;
}

function readMembershipId(formData: FormData): string | null {
  const raw = String(formData.get("membershipId") ?? "").trim();
  return isUuid(raw) ? raw : null;
}

function mapWriteFailure(code: string | undefined, message: string | undefined): AssignActionState {
  const text = (message ?? "").toLowerCase();
  if (text.includes("active team membership")) {
    return { error: "That person is not an active team member." };
  }
  if (text.includes("not in the membership workspace")) {
    return { error: "That department is not available in this workspace." };
  }
  if (
    code === "42501" ||
    code === "PGRST301" ||
    text.includes("row-level security")
  ) {
    return { error: "You don’t have permission to assign team members." };
  }
  return { error: "Could not complete the assignment. Please try again." };
}

async function resolveAssignableDepartment(
  workspaceId: string,
  workspaceDepartmentId: string
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAdminEvent("supabase_unconfigured");
    return { error: "Could not complete the assignment. Please try again." } as const;
  }

  const departmentResult = await supabase
    .from("workspace_departments")
    .select("id, workspace_id, department_key, source, is_active")
    .eq("id", workspaceDepartmentId)
    .maybeSingle();

  if (departmentResult.error) {
    logAdminEvent("department_lookup_failed", {
      code: departmentResult.error.code,
    });
    return { error: "Could not complete the assignment. Please try again." } as const;
  }

  const department = departmentResult.data;
  if (
    !department ||
    department.workspace_id !== workspaceId ||
    !department.is_active
  ) {
    return { error: "That department is not available in this workspace." } as const;
  }

  if (department.source === "production_os") {
    if (!isProductionDepartmentId(department.department_key)) {
      return { error: "That department is not available in this workspace." } as const;
    }
  } else {
    return { error: "That department is not available in this workspace." } as const;
  }

  return { supabase, department } as const;
}

async function resolveActiveTargetMembership(
  workspaceId: string,
  membershipId: string
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAdminEvent("supabase_unconfigured");
    return { error: "Could not complete the assignment. Please try again." } as const;
  }

  const membershipResult = await supabase
    .from("team_memberships")
    .select("id, workspace_id, status")
    .eq("id", membershipId)
    .maybeSingle();

  if (membershipResult.error) {
    logAdminEvent("target_membership_lookup_failed", {
      code: membershipResult.error.code,
    });
    return { error: "Could not complete the assignment. Please try again." } as const;
  }

  const membership = membershipResult.data;
  if (!membership || membership.workspace_id !== workspaceId) {
    return { error: "That person is not on this church team." } as const;
  }
  if (membership.status !== "active") {
    return { error: "That person is not an active team member." } as const;
  }

  return { membership } as const;
}

async function assignMemberToDepartment(
  _prev: AssignActionState,
  formData: FormData
): Promise<AssignActionState> {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return { error: "You don’t have permission to assign team members." };
  }

  const membershipId = readMembershipId(formData);
  const workspaceDepartmentId = readWorkspaceDepartmentId(formData);
  if (!membershipId || !workspaceDepartmentId) {
    return { error: "Choose a team member and a department." };
  }

  const target = await resolveActiveTargetMembership(
    access.workspaceId,
    membershipId
  );
  if ("error" in target) return { error: target.error };

  const department = await resolveAssignableDepartment(
    access.workspaceId,
    workspaceDepartmentId
  );
  if ("error" in department) return { error: department.error };

  const existingResult = await department.supabase
    .from("department_assignments")
    .select("id, is_active")
    .eq("membership_id", membershipId)
    .eq("workspace_department_id", department.department.id)
    .maybeSingle();

  if (existingResult.error) {
    logAdminEvent("assignment_lookup_failed", {
      code: existingResult.error.code,
    });
    return { error: "Could not complete the assignment. Please try again." };
  }

  const departmentName = departmentDisplayName(department.department.department_key);

  if (existingResult.data?.is_active) {
    return { message: `Already assigned to ${departmentName}.` };
  }

  if (existingResult.data && !existingResult.data.is_active) {
    const updateResult = await department.supabase
      .from("department_assignments")
      .update({ is_active: true })
      .eq("id", existingResult.data.id)
      .eq("is_active", false)
      .select("id")
      .maybeSingle();

    if (updateResult.error || !updateResult.data) {
      logAdminEvent("assignment_reactivate_failed", {
        code: updateResult.error?.code,
      });
      return mapWriteFailure(updateResult.error?.code, updateResult.error?.message);
    }

    revalidateAssignmentViews();
    return {
      message: `Restored ${departmentName} assignment. Growth was not reset.`,
    };
  }

  const insertResult = await department.supabase
    .from("department_assignments")
    .insert({
      membership_id: membershipId,
      workspace_department_id: department.department.id,
    })
    .select("id")
    .maybeSingle();

  if (insertResult.error) {
    logAdminEvent("assignment_insert_failed", {
      code: insertResult.error.code,
    });
    if (insertResult.error.code === "23505") {
      return { message: `Already assigned to ${departmentName}.` };
    }
    return mapWriteFailure(insertResult.error.code, insertResult.error.message);
  }

  if (!insertResult.data) {
    logAdminEvent("assignment_insert_empty");
    return { error: "Could not complete the assignment. Please try again." };
  }

  revalidateAssignmentViews();
  return { message: `Assigned to ${departmentName}.` };
}

async function removeMemberFromDepartment(
  _prev: AssignActionState,
  formData: FormData
): Promise<AssignActionState> {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return { error: "You don’t have permission to update department assignments." };
  }

  const membershipId = readMembershipId(formData);
  const workspaceDepartmentId = readWorkspaceDepartmentId(formData);
  if (!membershipId || !workspaceDepartmentId) {
    return { error: "Choose a team member and a department." };
  }

  const target = await resolveActiveTargetMembership(
    access.workspaceId,
    membershipId
  );
  if ("error" in target) return { error: target.error };

  const department = await resolveAssignableDepartment(
    access.workspaceId,
    workspaceDepartmentId
  );
  if ("error" in department) return { error: department.error };

  const updateResult = await department.supabase
    .from("department_assignments")
    .update({ is_active: false })
    .eq("membership_id", membershipId)
    .eq("workspace_department_id", department.department.id)
    .eq("is_active", true)
    .select("id")
    .maybeSingle();

  if (updateResult.error) {
    logAdminEvent("assignment_deactivate_failed", {
      code: updateResult.error.code,
    });
    return mapWriteFailure(updateResult.error.code, updateResult.error.message);
  }

  revalidateAssignmentViews();
  const departmentName = departmentDisplayName(department.department.department_key);
  if (!updateResult.data) {
    return { message: `Not currently assigned to ${departmentName}.` };
  }
  return { message: `Removed from ${departmentName}. Growth was not reset.` };
}

export async function teamAssignmentAction(
  prev: AssignActionState,
  formData: FormData
): Promise<AssignActionState> {
  const intent = String(formData.get("intent") ?? "assign");
  if (intent === "remove") {
    return removeMemberFromDepartment(prev, formData);
  }
  return assignMemberToDepartment(prev, formData);
}
