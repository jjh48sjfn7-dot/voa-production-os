"use server";

import { revalidatePath } from "next/cache";
import { requireAdminAccess } from "@/lib/admin/access";
import { logAdminEvent } from "@/lib/admin/log";
import { isInviteEmailConfigured, sendChurchInvitationEmail } from "@/lib/invite/email";
import { logInviteEvent } from "@/lib/invite/log";
import {
  generateInviteToken,
  hashInviteToken,
  toPgByteaHexLiteral,
} from "@/lib/invite/token";
import { normalizeEmail, validateEmail } from "@/lib/auth/validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

export type InviteVolunteerState = {
  error?: string;
  message?: string;
};

export type RevokeInvitationState = {
  error?: string;
  message?: string;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type InvitationInsert = Pick<
  Database["public"]["Tables"]["team_invitations"]["Insert"],
  "workspace_id" | "email" | "invited_by_membership_id" | "token_hash"
>;

function revalidateTeam() {
  revalidatePath("/admin/team");
}

export async function inviteVolunteerAction(
  _prev: InviteVolunteerState,
  formData: FormData
): Promise<InviteVolunteerState> {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return { error: "You don’t have permission to send invitations." };
  }

  if (!isInviteEmailConfigured()) {
    return { error: "Invitation email is not configured yet." };
  }

  const emailError = validateEmail(String(formData.get("email") ?? ""));
  if (emailError) return { error: emailError };
  const email = normalizeEmail(String(formData.get("email") ?? ""));

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAdminEvent("supabase_unconfigured");
    return { error: "Could not send the invitation. Please try again." };
  }

  const rawToken = generateInviteToken();
  const hashHex = hashInviteToken(rawToken);
  const insertRow: InvitationInsert = {
    workspace_id: access.workspaceId,
    email,
    invited_by_membership_id: access.membershipId,
    token_hash: toPgByteaHexLiteral(hashHex),
  };

  const insertResult = await supabase
    .from("team_invitations")
    .insert(insertRow as Database["public"]["Tables"]["team_invitations"]["Insert"])
    .select("id, email, expires_at, workspace_id, status")
    .maybeSingle();

  if (insertResult.error) {
    logInviteEvent("invitation_insert_failed", {
      code: insertResult.error.code,
    });
    if (insertResult.error.code === "23505") {
      return { error: "An invitation is already pending for this email." };
    }
    if (
      insertResult.error.code === "42501" ||
      (insertResult.error.message ?? "").toLowerCase().includes("row-level security")
    ) {
      return { error: "You don’t have permission to send invitations." };
    }
    return { error: "Could not send the invitation. Please try again." };
  }

  const invitation = insertResult.data;
  if (!invitation) {
    logInviteEvent("invitation_insert_empty");
    return { error: "Could not send the invitation. Please try again." };
  }

  const sent = await sendChurchInvitationEmail({
    invitationId: invitation.id,
    to: invitation.email,
    workspaceName: access.workspaceName,
    rawToken,
  });

  if (!sent.ok) {
    const revokeResult = await supabase.rpc("revoke_team_invitation", {
      p_invitation_id: invitation.id,
    });
    if (revokeResult.error) {
      logInviteEvent("invitation_revoke_after_email_failed", {
        code: revokeResult.error.code,
        invitationId: invitation.id,
      });
      revalidateTeam();
      return {
        error:
          "Invitation was created but email delivery could not be confirmed. Review Pending Invitations and revoke it before retrying.",
      };
    }

    const outcome = Array.isArray(revokeResult.data)
      ? revokeResult.data[0]?.outcome
      : revokeResult.data?.outcome;
    if (outcome !== "revoked") {
      logInviteEvent("invitation_revoke_after_email_not_revoked", {
        code: outcome,
        invitationId: invitation.id,
      });
      revalidateTeam();
      return {
        error:
          "Invitation was created but email delivery could not be confirmed. Review Pending Invitations and revoke it before retrying.",
      };
    }

    return {
      error: "Invitation email could not be sent. No active invitation remains.",
    };
  }

  revalidateTeam();
  return { message: `Invitation sent to ${invitation.email}.` };
}

export async function revokeInvitationAction(
  _prev: RevokeInvitationState,
  formData: FormData
): Promise<RevokeInvitationState> {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return { error: "You don’t have permission to revoke invitations." };
  }

  const invitationId = String(formData.get("invitationId") ?? "").trim();
  if (!UUID_RE.test(invitationId)) {
    return { error: "That invitation could not be revoked." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAdminEvent("supabase_unconfigured");
    return { error: "Could not revoke the invitation. Please try again." };
  }

  const { data, error } = await supabase.rpc("revoke_team_invitation", {
    p_invitation_id: invitationId,
  });

  if (error) {
    logInviteEvent("invitation_revoke_failed", { code: error.code });
    return { error: "Could not revoke the invitation. Please try again." };
  }

  const outcome = Array.isArray(data) ? data[0]?.outcome : data?.outcome;
  revalidateTeam();

  if (outcome === "revoked") {
    return { message: "Invitation revoked." };
  }
  if (outcome === "not_pending") {
    return { error: "That invitation is no longer pending." };
  }
  if (outcome === "not_found" || outcome === "unauthorized") {
    return { error: "That invitation could not be revoked." };
  }
  return { error: "Could not revoke the invitation. Please try again." };
}
