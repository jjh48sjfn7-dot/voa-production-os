"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  type AuthActionState,
  signupAction,
} from "@/app/auth/actions";
import {
  SIGNUP_CHECK_EMAIL_BODY,
  SIGNUP_CHECK_EMAIL_TITLE,
} from "@/lib/auth/errors";
import {
  AuthError,
  AuthField,
  AuthScreen,
  AuthSubmit,
} from "@/components/auth/AuthScreen";

const initialState: AuthActionState = {};

export function SignupForm({ nextPath }: { nextPath: string }) {
  const [state, formAction] = useActionState(signupAction, initialState);
  const loginHref = nextPath === "/invite" ? "/login?next=/invite" : "/login";

  if (state.status === "check_email") {
    return (
      <AuthScreen title={SIGNUP_CHECK_EMAIL_TITLE} description={SIGNUP_CHECK_EMAIL_BODY}>
        <p className="text-[14px] leading-relaxed text-white/60">
          Creating an account does not by itself grant access to a church team.
        </p>
        {nextPath === "/invite" ? (
          <p className="mt-3 text-[14px] leading-relaxed text-white/60">
            After you confirm, return to the invitation in this browser. If you
            confirm on another device, reopen the original invitation email.
          </p>
        ) : null}
        <p className="mt-5 text-center text-[13px] text-white/55">
          <Link href={loginHref} className="text-[#FF8A4C] hover:text-[#FF5A00]">
            Back to sign in
          </Link>
        </p>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen
      title="Create account"
      description="Creating an account does not by itself grant access to a church team."
    >
      <form action={formAction} className="space-y-4">
        {nextPath !== "/volunteer" ? (
          <input type="hidden" name="next" value={nextPath} />
        ) : null}
        <AuthError message={state.error} />
        <AuthField
          id="email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
        />
        <AuthField
          id="password"
          name="password"
          label="Password"
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
        <AuthSubmit>Create account</AuthSubmit>
      </form>
      <p className="mt-5 text-center text-[13px] text-white/55">
        Already have an account?{" "}
        <Link href={loginHref} className="text-[#FF8A4C] hover:text-[#FF5A00]">
          Sign in
        </Link>
      </p>
    </AuthScreen>
  );
}
