"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAccess } from "@/lib/admin/access";
import { logAdminEvent } from "@/lib/admin/log";
import {
  isStoredQualificationStatus,
  nextQualificationStatus,
  qualificationProgressionSuccessMessage,
} from "@/lib/qualification/progression";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

export type StartQualificationState = {
  error?: string;
  message?: string;
};

export type AdvanceQualificationState = {
  error?: string;
  message?: string;
};

type QualificationStatusUpdate = Pick<
  Database["public"]["Tables"]["position_qualifications"]["Update"],
  "status"
>;

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

function mapQualificationAdvanceFailure(
  code: string | undefined,
  message: string | undefined
): AdvanceQualificationState {
  const text = (message ?? "").toLowerCase();
  if (text.includes("cannot mutate own")) {
    return { error: "You cannot update your own qualification." };
  }
  if (
    text.includes("active team membership") ||
    text.includes("active position") ||
    text.includes("active department assignment")
  ) {
    return { error: "Qualification cannot be updated right now." };
  }
  if (
    code === "42501" ||
    code === "PGRST301" ||
    text.includes("row-level security") ||
    text.includes("not authorized")
  ) {
    return { error: "You do not have permission to update this qualification." };
  }
  return { error: "Could not update qualification. Please try again." };
}

export async function advanceMemberPositionQualification(
  _prev: AdvanceQualificationState,
  formData: FormData
): Promise<AdvanceQualificationState> {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return { error: "You do not have permission to update this qualification." };
  }

  const qualificationId = readUuidField(formData, "qualificationId");
  const expectedCurrentStatus = String(
    formData.get("expectedCurrentStatus") ?? ""
  ).trim();
  if (
    !qualificationId ||
    !isStoredQualificationStatus(expectedCurrentStatus)
  ) {
    return { error: "Qualification changed. Refresh and try again." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAdminEvent("supabase_unconfigured");
    return { error: "Could not update qualification. Please try again." };
  }

  const qualificationResult = await supabase
    .from("position_qualifications")
    .select("id, membership_id, position_id, status")
    .eq("id", qualificationId)
    .maybeSingle();

  if (qualificationResult.error) {
    logAdminEvent("qualification_advance_lookup_failed", {
      code: qualificationResult.error.code,
    });
    return { error: "Could not update qualification. Please try again." };
  }

  const qualification = qualificationResult.data;
  if (!qualification) {
    return { error: "Qualification cannot be updated right now." };
  }

  const membershipResult = await supabase
    .from("team_memberships")
    .select("id, workspace_id, status")
    .eq("id", qualification.membership_id)
    .maybeSingle();

  if (membershipResult.error) {
    logAdminEvent("qualification_advance_membership_lookup_failed", {
      code: membershipResult.error.code,
    });
    return { error: "Could not update qualification. Please try again." };
  }

  const membership = membershipResult.data;
  if (!membership || membership.workspace_id !== access.workspaceId) {
    return { error: "Qualification cannot be updated right now." };
  }
  if (membership.status !== "active") {
    return { error: "Qualification cannot be updated right now." };
  }
  if (membership.id === access.membershipId) {
    return { error: "You cannot update your own qualification." };
  }

  const positionResult = await supabase
    .from("positions")
    .select("id, is_active, workspace_department_id")
    .eq("id", qualification.position_id)
    .maybeSingle();

  if (positionResult.error) {
    logAdminEvent("qualification_advance_position_lookup_failed", {
      code: positionResult.error.code,
    });
    return { error: "Could not update qualification. Please try again." };
  }

  const position = positionResult.data;
  if (!position) {
    return { error: "Qualification cannot be updated right now." };
  }

  const departmentResult = await supabase
    .from("workspace_departments")
    .select("id, workspace_id")
    .eq("id", position.workspace_department_id)
    .maybeSingle();

  if (departmentResult.error) {
    logAdminEvent("qualification_advance_department_lookup_failed", {
      code: departmentResult.error.code,
    });
    return { error: "Could not update qualification. Please try again." };
  }

  const department = departmentResult.data;
  if (!department || department.workspace_id !== access.workspaceId) {
    return { error: "Qualification cannot be updated right now." };
  }
  if (!position.is_active) {
    return { error: "Qualification cannot be updated right now." };
  }

  const assignmentResult = await supabase
    .from("department_assignments")
    .select("id")
    .eq("membership_id", membership.id)
    .eq("workspace_department_id", position.workspace_department_id)
    .eq("is_active", true)
    .maybeSingle();

  if (assignmentResult.error) {
    logAdminEvent("qualification_advance_assignment_lookup_failed", {
      code: assignmentResult.error.code,
    });
    return { error: "Could not update qualification. Please try again." };
  }

  if (!assignmentResult.data) {
    return { error: "Qualification cannot be updated right now." };
  }

  if (qualification.status !== expectedCurrentStatus) {
    return { error: "Qualification changed. Refresh and try again." };
  }

  const nextStatus = nextQualificationStatus(qualification.status);
  if (!nextStatus) {
    return { error: "Qualification is already Advanced." };
  }

  const updateRow: QualificationStatusUpdate = { status: nextStatus };
  const updateResult = await supabase
    .from("position_qualifications")
    .update(updateRow)
    .eq("id", qualification.id)
    .eq("status", expectedCurrentStatus)
    .select("id")
    .maybeSingle();

  if (updateResult.error) {
    logAdminEvent("qualification_advance_update_failed", {
      code: updateResult.error.code,
    });
    return mapQualificationAdvanceFailure(
      updateResult.error.code,
      updateResult.error.message
    );
  }

  if (!updateResult.data) {
    logAdminEvent("qualification_advance_stale");
    return { error: "Qualification changed. Refresh and try again." };
  }

  revalidatePath("/admin/team");
  return { message: qualificationProgressionSuccessMessage(nextStatus) };
}
