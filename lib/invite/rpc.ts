import { getAuthIdentity } from "@/lib/auth/identity";
import { logInviteEvent } from "@/lib/invite/log";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type InvitationPreviewState =
  | "valid"
  | "expired"
  | "revoked"
  | "accepted"
  | "invalid";

export type InvitationPreview = {
  state: InvitationPreviewState;
  workspaceName: string | null;
};

function asPreviewState(value: string | null | undefined): InvitationPreviewState {
  if (
    value === "valid" ||
    value === "expired" ||
    value === "revoked" ||
    value === "accepted" ||
    value === "invalid"
  ) {
    return value;
  }
  return "invalid";
}

export async function previewInvitation(
  hashHex: string
): Promise<InvitationPreview | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logInviteEvent("preview_unconfigured");
    return null;
  }

  const { data, error } = await supabase.rpc("preview_team_invitation", {
    p_token_hash_hex: hashHex,
  });

  if (error) {
    logInviteEvent("preview_rpc_failed", { code: error.code });
    return null;
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    return { state: "invalid", workspaceName: null };
  }

  const state = asPreviewState(row.state);
  return {
    state,
    workspaceName:
      state === "invalid" ? null : row.workspace_name?.trim() || null,
  };
}

export async function acceptInvitation(hashHex: string) {
  const identity = await getAuthIdentity();
  if (!identity) {
    return { outcome: "unauthenticated" as const, workspaceName: null };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logInviteEvent("accept_unconfigured");
    return null;
  }

  const { data, error } = await supabase.rpc("accept_team_invitation", {
    p_token_hash_hex: hashHex,
  });

  if (error) {
    logInviteEvent("accept_rpc_failed", { code: error.code });
    return null;
  }

  const row = Array.isArray(data) ? data[0] : data;
  return {
    outcome: (row?.outcome ?? "invalid").trim() || "invalid",
    workspaceName: row?.workspace_name?.trim() || null,
  };
}
