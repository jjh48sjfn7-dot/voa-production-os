"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthIdentity } from "@/lib/auth/identity";
import {
  clearInviteTokenCookie,
  readInviteTokenCookie,
} from "@/lib/invite/cookie";
import { logInviteEvent } from "@/lib/invite/log";
import { acceptInvitation } from "@/lib/invite/rpc";
import { hashInviteToken } from "@/lib/invite/token";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type InviteActionState = {
  error?: string;
  status?:
    | "wrong_account"
    | "unverified"
    | "expired"
    | "revoked"
    | "accepted"
    | "archived"
    | "blocked"
    | "invalid"
    | "unauthenticated";
};

function revalidateAfterJoin() {
  revalidatePath("/volunteer", "layout");
  revalidatePath("/admin/team");
  revalidatePath("/invite");
}

export async function acceptInviteAction(
  _prev: InviteActionState,
  _formData: FormData
): Promise<InviteActionState> {
  const identity = await getAuthIdentity();
  if (!identity) {
    return { status: "unauthenticated" };
  }

  const rawToken = await readInviteTokenCookie();
  if (!rawToken) {
    return { status: "invalid" };
  }

  const result = await acceptInvitation(hashInviteToken(rawToken));
  if (!result) {
    return { error: "Could not join this church. Please try again." };
  }

  switch (result.outcome) {
    case "joined":
    case "reactivated":
    case "already_member":
      await clearInviteTokenCookie();
      revalidateAfterJoin();
      redirect("/volunteer");
    case "wrong_account":
      return { status: "wrong_account" };
    case "unverified":
      return { status: "unverified" };
    case "expired":
      return { status: "expired" };
    case "revoked":
      return { status: "revoked" };
    case "archived":
      return { status: "archived" };
    case "blocked":
      return { status: "blocked" };
    case "unauthenticated":
      return { status: "unauthenticated" };
    default:
      return { status: "invalid" };
  }
}

export async function logoutForInviteAction(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase.auth.getClaims();
    if (data?.claims) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        logInviteEvent("invite_sign_out_failed", { code: error.code });
      }
    }
  }

  revalidatePath("/", "layout");
  redirect("/invite");
}
