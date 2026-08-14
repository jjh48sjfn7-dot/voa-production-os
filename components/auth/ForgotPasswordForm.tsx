"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  type AuthActionState,
  forgotPasswordAction,
} from "@/app/auth/actions";
import { FORGOT_PASSWORD_GENERIC_MESSAGE } from "@/lib/auth/errors";
import {
  AuthError,
  AuthField,
  AuthScreen,
  AuthSubmit,
} from "@/components/auth/AuthScreen";

const initialState: AuthActionState = {};

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(forgotPasswordAction, initialState);

  return (
    <AuthScreen
      title="Forgot password"
      description="Enter the email on your Production OS account."
    >
      <form action={formAction} className="space-y-4">
        <AuthError message={state.error} />
        {state.status === "reset_sent" ? (
          <p
            role="status"
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[13px] leading-relaxed text-white/70"
          >
            {state.message ?? FORGOT_PASSWORD_GENERIC_MESSAGE}
          </p>
        ) : null}
        <AuthField
          id="email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
        />
        <AuthSubmit>Send reset link</AuthSubmit>
      </form>
      <p className="mt-5 text-center text-[13px] text-white/55">
        <Link href="/login" className="text-[#FF8A4C] hover:text-[#FF5A00]">
          Back to sign in
        </Link>
      </p>
    </AuthScreen>
  );
}
