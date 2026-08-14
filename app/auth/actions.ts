"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  FORGOT_PASSWORD_GENERIC_MESSAGE,
  isAlreadyRegisteredError,
  logAuthEvent,
  mapAuthError,
} from "@/lib/auth/errors";
import { getAuthIdentity } from "@/lib/auth/identity";
import { getAuthRedirectUrl } from "@/lib/auth/site-url";
import {
  normalizeEmail,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
} from "@/lib/auth/validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  message?: string;
  status?: "check_email" | "reset_sent";
};

async function requireAuthClient() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAuthEvent("supabase_unconfigured");
    return {
      client: null,
      error: "Authentication is unavailable right now.",
    } as const;
  }
  return { client: supabase, error: null } as const;
}

export async function loginAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const emailError = validateEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (emailError) return { error: emailError };
  if (!password) return { error: "Enter your password." };

  const { client, error: configError } = await requireAuthClient();
  if (!client) return { error: configError };

  const { error } = await client.auth.signInWithPassword({
    email: normalizeEmail(String(formData.get("email") ?? "")),
    password,
  });

  if (error) {
    logAuthEvent("sign_in_failed", { code: error.code });
    return { error: mapAuthError(error) };
  }

  revalidatePath("/", "layout");
  redirect("/volunteer");
}

export async function signupAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const emailError = validateEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");
  const passwordError = validatePassword(password);
  const confirmError = validatePasswordConfirmation(
    password,
    String(formData.get("confirmPassword") ?? "")
  );

  if (emailError) return { error: emailError };
  if (passwordError) return { error: passwordError };
  if (confirmError) return { error: confirmError };

  const { client, error: configError } = await requireAuthClient();
  if (!client) return { error: configError };

  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: getAuthRedirectUrl("/auth/callback"),
    },
  });

  if (error) {
    logAuthEvent("sign_up_failed", { code: error.code });
    if (isAlreadyRegisteredError(error)) {
      return { status: "check_email" };
    }
    return { error: mapAuthError(error) };
  }

  if (!data.session) {
    return { status: "check_email" };
  }

  revalidatePath("/", "layout");
  redirect("/volunteer");
}

export async function forgotPasswordAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const emailError = validateEmail(String(formData.get("email") ?? ""));
  if (emailError) return { error: emailError };

  const { client, error: configError } = await requireAuthClient();
  if (!client) return { error: configError };

  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const { error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: getAuthRedirectUrl("/auth/callback?next=/update-password"),
  });

  if (error) {
    logAuthEvent("reset_password_failed", { code: error.code });
  }

  return {
    status: "reset_sent",
    message: FORGOT_PASSWORD_GENERIC_MESSAGE,
  };
}

export async function updatePasswordAction(
  _prev: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const identity = await getAuthIdentity();
  if (!identity) {
    return { error: "This reset link is invalid or has expired. Request a new one." };
  }

  const password = String(formData.get("password") ?? "");
  const passwordError = validatePassword(password);
  const confirmError = validatePasswordConfirmation(
    password,
    String(formData.get("confirmPassword") ?? "")
  );

  if (passwordError) return { error: passwordError };
  if (confirmError) return { error: confirmError };

  const { client, error: configError } = await requireAuthClient();
  if (!client) return { error: configError };

  const { error } = await client.auth.updateUser({ password });
  if (error) {
    logAuthEvent("update_password_failed", { code: error.code });
    return { error: mapAuthError(error) };
  }

  revalidatePath("/", "layout");
  redirect("/volunteer");
}

export async function logoutAction(): Promise<void> {
  const { client } = await requireAuthClient();
  if (client) {
    const { data } = await client.auth.getClaims();
    if (data?.claims) {
      const { error } = await client.auth.signOut();
      if (error) {
        logAuthEvent("sign_out_failed", { code: error.code });
      }
    }
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
