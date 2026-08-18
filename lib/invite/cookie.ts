import { cookies } from "next/headers";
import { isRawInviteToken } from "@/lib/invite/token";

export const INVITE_COOKIE_NAME = "production_os_invite_token";
export const INVITE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function inviteCookieOptions() {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: INVITE_COOKIE_MAX_AGE_SECONDS,
  };
}

export async function readInviteTokenCookie(): Promise<string | null> {
  const store = await cookies();
  const value = store.get(INVITE_COOKIE_NAME)?.value;
  if (!value || !isRawInviteToken(value)) return null;
  return value;
}

export async function clearInviteTokenCookie(): Promise<void> {
  const store = await cookies();
  store.set(INVITE_COOKIE_NAME, "", {
    ...inviteCookieOptions(),
    maxAge: 0,
  });
}
