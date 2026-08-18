"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAccess } from "@/lib/admin/access";
import { logAdminEvent } from "@/lib/admin/log";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

export type StartQualificationState = {
  error?: string;
  message?: string;
};

function readUuidField(formData: FormData, name: string): string | null {
  const raw = String(formData.get(name) ?? "").trim();
  return isUuid(raw) ? raw : null;
}

function mapQualificationStartFailure(
  code: string | undefined,
  message: string | undefined
): StartQualificationState {
  const text = (message ?? "").toLowerCase();
  if (code === "23505") {
    return { error: "Qualification already started." };
  }
  if (text.includes("cannot mutate own")) {
    return { error: "You cannot start your own qualification." };
  }
  if (text.includes("active team membership")) {
    return { error: "That person is not an active team member." };
  }
  if (text.includes("active position")) {
    return { error: "That position is not available." };
  }
  if (text.includes("active department assignment")) {
    return { error: "This member is not assigned to that department." };
  }
  if (text.includes("not in the membership workspace")) {
    return { error: "That position is not available in this church." };
  }
  if (
    code === "42501" ||
    code === "PGRST301" ||
    text.includes("row-level security") ||
    text.includes("not authorized")
  ) {
    return { error: "You don’t have permission to start qualification." };
  }
  return { error: "Could not start qualification. Please try again." };
}

export async function startMemberPositionQualification(
  _prev: StartQualificationState,
  formData: FormData
): Promise<StartQualificationState> {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return { error: "You don’t have permission to start qualification." };
  }

  const membershipId = readUuidField(formData, "membershipId");
  const positionId = readUuidField(formData, "positionId");
  if (!membershipId || !positionId) {
    return { error: "Choose a team member and a position." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAdminEvent("supabase_unconfigured");
    return { error: "Could not start qualification. Please try again." };
  }

  const membershipResult = await supabase
    .from("team_memberships")
    .select("id, workspace_id, status")
    .eq("id", membershipId)
    .maybeSingle();

  if (membershipResult.error) {
    logAdminEvent("qualification_membership_lookup_failed", {
      code: membershipResult.error.code,
    });
    return { error: "Could not start qualification. Please try again." };
  }

  const membership = membershipResult.data;
  if (!membership || membership.workspace_id !== access.workspaceId) {
    return { error: "That person is not on this church team." };
  }
  if (membership.status !== "active") {
    return { error: "That person is not an active team member." };
  }
  if (membership.id === access.membershipId) {
    return { error: "You cannot start your own qualification." };
  }

  const positionResult = await supabase
    .from("positions")
    .select("id, is_active, workspace_department_id")
    .eq("id", positionId)
    .maybeSingle();

  if (positionResult.error) {
    logAdminEvent("qualification_position_lookup_failed", {
      code: positionResult.error.code,
    });
    return { error: "Could not start qualification. Please try again." };
  }

  const position = positionResult.data;
  if (!position) {
    return { error: "That position is not available in this church." };
  }

  const departmentResult = await supabase
    .from("workspace_departments")
    .select("id, workspace_id")
    .eq("id", position.workspace_department_id)
    .maybeSingle();

  if (departmentResult.error) {
    logAdminEvent("qualification_department_lookup_failed", {
      code: departmentResult.error.code,
    });
    return { error: "Could not start qualification. Please try again." };
  }

  const department = departmentResult.data;
  if (!department || department.workspace_id !== access.workspaceId) {
    return { error: "That position is not available in this church." };
  }
  if (!position.is_active) {
    return { error: "That position is not available." };
  }

  const assignmentResult = await supabase
    .from("department_assignments")
    .select("id")
    .eq("membership_id", membership.id)
    .eq("workspace_department_id", position.workspace_department_id)
    .eq("is_active", true)
    .maybeSingle();

  if (assignmentResult.error) {
    logAdminEvent("qualification_assignment_lookup_failed", {
      code: assignmentResult.error.code,
    });
    return { error: "Could not start qualification. Please try again." };
  }

  if (!assignmentResult.data) {
    return { error: "This member is not assigned to that department." };
  }

  const rpcResult = await supabase.rpc("start_position_qualification", {
    p_membership_id: membership.id,
    p_position_id: position.id,
  });

  if (rpcResult.error) {
    logAdminEvent("qualification_start_rpc_failed", {
      code: rpcResult.error.code,
    });
    return mapQualificationStartFailure(
      rpcResult.error.code,
      rpcResult.error.message
    );
  }

  revalidatePath("/admin/team");
  return { message: "Qualification started." };
}
