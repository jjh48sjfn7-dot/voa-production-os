"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  type AuthActionState,
  loginAction,
} from "@/app/auth/actions";
import {
  AuthError,
  AuthField,
  AuthScreen,
  AuthSubmit,
} from "@/components/auth/AuthScreen";

const initialState: AuthActionState = {};

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [state, formAction] = useActionState(loginAction, initialState);
  const signupHref =
    nextPath === "/invite" ? "/signup?next=/invite" : "/signup";

  return (
    <AuthScreen title="Sign in" description="Use your Production OS email and password.">
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
          autoComplete="current-password"
        />
        <AuthSubmit>Sign in</AuthSubmit>
      </form>
      <div className="mt-5 space-y-2 text-center text-[13px] text-white/55">
        <p>
          <Link href="/forgot-password" className="text-[#FF8A4C] hover:text-[#FF5A00]">
            Forgot password?
          </Link>
        </p>
        <p>
          Need an account?{" "}
          <Link href={signupHref} className="text-[#FF8A4C] hover:text-[#FF5A00]">
            Create one
          </Link>
        </p>
      </div>
    </AuthScreen>
  );
}
