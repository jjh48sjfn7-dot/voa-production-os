import { redirect } from "next/navigation";
import type { EmailOtpType } from "@supabase/supabase-js";
import { logAuthEvent } from "@/lib/auth/errors";
import { getSafeNextPath } from "@/lib/auth/paths";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const OTP_TYPES = new Set<EmailOtpType>([
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
]);

function isEmailOtpType(value: string | null): value is EmailOtpType {
  return value !== null && OTP_TYPES.has(value as EmailOtpType);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const typeParam = searchParams.get("type");
  const fallback =
    typeParam === "recovery" ? "/update-password" : "/volunteer";
  const nextPath = getSafeNextPath(searchParams.get("next"), fallback);

  if (!tokenHash || !isEmailOtpType(typeParam)) {
    logAuthEvent("confirm_missing_params");
    redirect("/auth/error");
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAuthEvent("confirm_unconfigured");
    redirect("/auth/error");
  }

  const { error } = await supabase.auth.verifyOtp({
    type: typeParam,
    token_hash: tokenHash,
  });

  if (error) {
    logAuthEvent("confirm_failed", { code: error.code });
    redirect("/auth/error");
  }

  redirect(nextPath);
}
