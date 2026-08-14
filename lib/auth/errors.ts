import type { AuthError } from "@supabase/supabase-js";

export const AUTH_GENERIC_ERROR =
  "Something went wrong. Please try again.";

export const FORGOT_PASSWORD_GENERIC_MESSAGE =
  "If an account exists for that email, a password reset link has been sent.";

export const SIGNUP_CHECK_EMAIL_TITLE = "Check your email";

export const SIGNUP_CHECK_EMAIL_BODY =
  "We sent you a confirmation link to finish creating your Production OS account.";

export function mapAuthError(error: Pick<AuthError, "message" | "code"> | null): string {
  if (!error) return AUTH_GENERIC_ERROR;

  const code = (error.code ?? "").toLowerCase();
  const message = (error.message ?? "").toLowerCase();

  if (
    code === "invalid_credentials" ||
    message.includes("invalid login credentials") ||
    message.includes("invalid credentials")
  ) {
    return "Email or password is incorrect.";
  }

  if (
    code === "email_not_confirmed" ||
    message.includes("email not confirmed")
  ) {
    return "Confirm your email before signing in.";
  }

  if (code === "over_request_rate_limit" || message.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  if (
    code === "weak_password" ||
    (message.includes("password") && message.includes("weak"))
  ) {
    return "Choose a stronger password.";
  }

  if (code === "same_password" || message.includes("same password")) {
    return "Choose a password you have not used recently.";
  }

  if (code === "otp_expired" || message.includes("expired")) {
    return "This link has expired. Request a new one.";
  }

  if (
    code === "otp_disabled" ||
    message.includes("invalid token") ||
    message.includes("token not found")
  ) {
    return "This link is invalid. Request a new one.";
  }

  return AUTH_GENERIC_ERROR;
}

export function isAlreadyRegisteredError(
  error: Pick<AuthError, "message" | "code"> | null
): boolean {
  if (!error) return false;
  const code = (error.code ?? "").toLowerCase();
  const message = (error.message ?? "").toLowerCase();
  return (
    code === "user_already_exists" ||
    message.includes("already registered") ||
    message.includes("user already registered")
  );
}

export function logAuthEvent(
  event: string,
  details?: { code?: string | null }
): void {
  if (details?.code) {
    console.error(`[auth] ${event}`, { code: details.code });
    return;
  }
  console.error(`[auth] ${event}`);
}
