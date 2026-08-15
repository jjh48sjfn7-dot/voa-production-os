"use client";

import { ContinueJourneyCard } from "@/components/volunteer/home/ContinueJourneyCard";
import { GrowthSnapshot } from "@/components/volunteer/home/GrowthSnapshot";
import { HomeNotices } from "@/components/volunteer/home/HomeNotices";
import { QuickAccess } from "@/components/volunteer/home/QuickAccess";
import { SundayAssignmentCard } from "@/components/volunteer/home/SundayAssignmentCard";
import { UpcomingNextStep } from "@/components/volunteer/home/UpcomingNextStep";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import {
  volunteerWelcomeTitle,
  volunteerWorkspaceLabel,
} from "@/lib/volunteer/labels";
import { isScheduledForService } from "@/lib/volunteer/session";

export function VolunteerHome() {
  const session = useVolunteerSession();
  const scheduled = isScheduledForService(session);

  return (
    <div className="space-y-4">
      <header>
        <p className="text-[13px] text-white/45">
          {volunteerWorkspaceLabel(session)}
        </p>
        <h1 className="mt-0.5 text-[26px] font-semibold tracking-tight text-white">
          {volunteerWelcomeTitle(session)}
        </h1>
      </header>

      {scheduled ? (
        <>
          <SundayAssignmentCard />
          <ContinueJourneyCard />
          <GrowthSnapshot />
          <UpcomingNextStep />
          <QuickAccess />
          <HomeNotices />
        </>
      ) : (
        <>
          <ContinueJourneyCard />
          <SundayAssignmentCard />
          <GrowthSnapshot />
          <UpcomingNextStep />
          <QuickAccess />
          <HomeNotices />
        </>
      )}
    </div>
  );
}
