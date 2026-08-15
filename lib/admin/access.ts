import { cache } from "react";
import { getAuthIdentity } from "@/lib/auth/identity";
import { logAdminEvent } from "@/lib/admin/log";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminAccess =
  | {
      ok: true;
      userId: string;
      membershipId: string;
      workspaceId: string;
      workspaceName: string;
    }
  | {
      ok: false;
      reason: "unauthenticated" | "no_workspace" | "multiple" | "not_admin" | "unavailable";
    };

/**
 * Server-only Admin gate.
 * Requires Auth + one active membership + an explicit workspace-wide admin grant.
 * Builder, leadership, and Growth do not satisfy this.
 */
export const requireAdminAccess = cache(async (): Promise<AdminAccess> => {
  const identity = await getAuthIdentity();
  if (!identity) {
    return { ok: false, reason: "unauthenticated" };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAdminEvent("supabase_unconfigured");
    return { ok: false, reason: "unavailable" };
  }

  const membershipResult = await supabase
    .from("team_memberships")
    .select("id, workspace_id, status")
    .eq("user_id", identity.sub)
    .eq("status", "active");

  if (membershipResult.error) {
    logAdminEvent("memberships_query_failed", {
      code: membershipResult.error.code,
    });
    return { ok: false, reason: "unavailable" };
  }

  const memberships = membershipResult.data ?? [];
  if (memberships.length === 0) {
    return { ok: false, reason: "no_workspace" };
  }
  if (memberships.length > 1) {
    return { ok: false, reason: "multiple" };
  }

  const membership = memberships[0];

  const [workspaceResult, grantsResult] = await Promise.all([
    supabase
      .from("church_workspaces")
      .select("id, name, is_active")
      .eq("id", membership.workspace_id)
      .maybeSingle(),
    supabase
      .from("permission_grants")
      .select("permission_key, workspace_department_id, revoked_at")
      .eq("membership_id", membership.id)
      .eq("permission_key", "admin")
      .is("revoked_at", null)
      .is("workspace_department_id", null),
  ]);

  if (workspaceResult.error) {
    logAdminEvent("workspace_query_failed", {
      code: workspaceResult.error.code,
    });
    return { ok: false, reason: "unavailable" };
  }
  if (grantsResult.error) {
    logAdminEvent("permission_grants_query_failed", {
      code: grantsResult.error.code,
    });
    return { ok: false, reason: "unavailable" };
  }

  if (!workspaceResult.data?.is_active) {
    return { ok: false, reason: "no_workspace" };
  }

  const hasWorkspaceAdmin = (grantsResult.data ?? []).length > 0;
  if (!hasWorkspaceAdmin) {
    return { ok: false, reason: "not_admin" };
  }

  return {
    ok: true,
    userId: identity.sub,
    membershipId: membership.id,
    workspaceId: membership.workspace_id,
    workspaceName: workspaceResult.data.name,
  };
});
