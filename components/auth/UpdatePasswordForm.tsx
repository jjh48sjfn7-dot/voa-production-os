"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  type AuthActionState,
  updatePasswordAction,
} from "@/app/auth/actions";
import {
  AuthError,
  AuthField,
  AuthScreen,
  AuthSubmit,
} from "@/components/auth/AuthScreen";

const initialState: AuthActionState = {};

export function UpdatePasswordForm() {
  const [state, formAction] = useActionState(updatePasswordAction, initialState);

  return (
    <AuthScreen
      title="Set a new password"
      description="Choose a password for your Production OS account."
    >
      <form action={formAction} className="space-y-4">
        <AuthError message={state.error} />
        <AuthField
          id="password"
          name="password"
          label="New password"
          type="password"
          autoComplete="new-password"
        />
        <AuthField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
        />
        <AuthSubmit>Update password</AuthSubmit>
      </form>
      <p className="mt-5 text-center text-[13px] text-white/55">
        <Link href="/login" className="text-[#FF8A4C] hover:text-[#FF5A00]">
          Back to sign in
        </Link>
      </p>
    </AuthScreen>
  );
}
