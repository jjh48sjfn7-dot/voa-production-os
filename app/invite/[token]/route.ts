import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/auth/site-url";
import {
  INVITE_COOKIE_NAME,
  inviteCookieOptions,
} from "@/lib/invite/cookie";
import { isRawInviteToken } from "@/lib/invite/token";

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;
  const destination = new URL("/invite", getSiteUrl());
  const response = NextResponse.redirect(destination, 303);

  if (isRawInviteToken(token)) {
    response.cookies.set(INVITE_COOKIE_NAME, token, inviteCookieOptions());
  }

  return response;
}
