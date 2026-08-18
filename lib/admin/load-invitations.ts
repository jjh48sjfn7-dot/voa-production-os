import { logAdminEvent } from "@/lib/admin/log";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminPendingInvitation = {
  id: string;
  email: string;
  status: "pending" | "accepted" | "expired" | "revoked";
  expiresAt: string;
  expiredByTime: boolean;
};

export async function loadAdminPendingInvitations(
  workspaceId: string
): Promise<AdminPendingInvitation[] | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAdminEvent("supabase_unconfigured");
    return null;
  }

  const result = await supabase
    .from("team_invitations")
    .select("id, email, status, expires_at")
    .eq("workspace_id", workspaceId)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (result.error) {
    logAdminEvent("invitations_query_failed", { code: result.error.code });
    return null;
  }

  const now = Date.now();
  return (result.data ?? []).map((row) => ({
    id: row.id,
    email: row.email,
    status: row.status,
    expiresAt: row.expires_at,
    expiredByTime: new Date(row.expires_at).getTime() <= now,
  }));
}
