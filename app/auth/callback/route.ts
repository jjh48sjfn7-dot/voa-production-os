import { redirect } from "next/navigation";
import { logAuthEvent } from "@/lib/auth/errors";
import { getSafeNextPath } from "@/lib/auth/paths";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const nextPath = getSafeNextPath(searchParams.get("next"), "/volunteer");

  if (!code) {
    logAuthEvent("callback_missing_code");
    redirect("/auth/error");
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAuthEvent("callback_unconfigured");
    redirect("/auth/error");
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    logAuthEvent("callback_exchange_failed", { code: error.code });
    redirect("/auth/error");
  }

  redirect(nextPath);
}
