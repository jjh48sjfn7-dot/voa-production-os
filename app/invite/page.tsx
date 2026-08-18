import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAuthIdentity } from "@/lib/auth/identity";
import { readInviteTokenCookie } from "@/lib/invite/cookie";
import { previewInvitation } from "@/lib/invite/rpc";
import { hashInviteToken } from "@/lib/invite/token";
import {
  InviteJoinForm,
} from "@/components/invite/InviteJoinForm";
import { brandAssetDimensions, brandAssets } from "@/lib/brand-assets";
import { volunteerUi } from "@/lib/volunteer/ui";

export const metadata: Metadata = {
  title: "Invitation | Production OS",
};

function InviteShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const mark = brandAssetDimensions.circle;
  return (
    <div className="flex min-h-dvh flex-col bg-[#0D0D0D] px-4 py-10 text-white">
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src={brandAssets.circle}
            alt="Victory Outreach Antioch"
            width={mark.width}
            height={mark.height}
            priority
            className="h-16 w-16 object-contain"
          />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
            Production OS
          </p>
          <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-white">
            {title}
          </h1>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A]/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default async function InvitePage() {
  const rawToken = await readInviteTokenCookie();
  if (!rawToken) {
    return (
      <InviteShell title="Invitation link needed">
        <p className={volunteerUi.body}>
          Open the invitation email from Production OS to continue.
        </p>
      </InviteShell>
    );
  }

  const preview = await previewInvitation(hashInviteToken(rawToken));
  if (!preview) {
    return (
      <InviteShell title="Invitation unavailable">
        <p className={volunteerUi.body}>
          This invitation cannot be checked right now. Please try again.
        </p>
      </InviteShell>
    );
  }

  if (preview.state === "expired") {
    return (
      <InviteShell title="Invitation expired">
        <p className={volunteerUi.body}>
          Ask an Admin to send a new invitation if you still need to join.
        </p>
      </InviteShell>
    );
  }

  if (preview.state === "revoked") {
    return (
      <InviteShell title="Invitation no longer valid">
        <p className={volunteerUi.body}>
          This invitation can no longer be used.
        </p>
      </InviteShell>
    );
  }

  if (preview.state === "accepted") {
    return (
      <InviteShell title="Invitation already used">
        <p className={volunteerUi.body}>
          This invitation has already been used.
        </p>
      </InviteShell>
    );
  }

  if (preview.state !== "valid" || !preview.workspaceName) {
    return (
      <InviteShell title="Invitation link is invalid">
        <p className={volunteerUi.body}>
          Open the invitation email from Production OS to continue.
        </p>
      </InviteShell>
    );
  }

  const identity = await getAuthIdentity();

  return (
    <InviteShell title="You’re invited to join">
      <p className="text-center text-[20px] font-semibold tracking-tight text-white">
        {preview.workspaceName}
      </p>
      <p className={`mt-2 text-center ${volunteerUi.muted}`}>
        Joining creates a church team membership only. Department assignment
        happens later.
      </p>
      <div className="mt-5 space-y-3">
        {identity ? (
          <InviteJoinForm />
        ) : (
          <>
            <Link href="/login?next=/invite" className={`${volunteerUi.cta} w-full`}>
              Sign in
            </Link>
            <Link
              href="/signup?next=/invite"
              className={`${volunteerUi.ghost} w-full`}
            >
              Create account
            </Link>
          </>
        )}
      </div>
    </InviteShell>
  );
}
