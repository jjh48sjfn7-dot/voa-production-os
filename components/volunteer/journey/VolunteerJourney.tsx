"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DepartmentJourneySwitcher } from "@/components/volunteer/journey/DepartmentJourneySwitcher";
import { GrowthTrack } from "@/components/volunteer/journey/GrowthTrack";
import { JourneyNextStepCard } from "@/components/volunteer/journey/JourneyNextStepCard";
import { JourneyProgressSummary } from "@/components/volunteer/journey/JourneyProgressSummary";
import { PositionQualificationsSection } from "@/components/volunteer/journey/PositionQualificationsSection";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { getDepartmentGrowthTrackSteps } from "@/lib/volunteer/journey";
import { volunteerWorkspaceLabel } from "@/lib/volunteer/labels";
import { volunteerUi } from "@/lib/volunteer/ui";
import type { DepartmentId } from "@/lib/volunteer/types";
import { useState } from "react";

export function VolunteerJourney() {
  const session = useVolunteerSession();
  const [departmentId, setDepartmentId] = useState<DepartmentId | null>(
    session.activeDepartmentId
  );
  const growthTrack = getDepartmentGrowthTrackSteps(session, departmentId);

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-[26px] font-semibold tracking-tight text-white">
          My Journey
        </h1>
        <p className="mt-0.5 text-[13px] text-white/45">
          {volunteerWorkspaceLabel(session)}
        </p>
        <DepartmentJourneySwitcher
          selectedDepartmentId={departmentId}
          onSelect={setDepartmentId}
        />
      </header>

      <JourneyNextStepCard />
      <GrowthTrack
        steps={growthTrack.steps}
        unconnected={growthTrack.unconnected}
      />
      <JourneyProgressSummary />
      <PositionQualificationsSection departmentId={departmentId} />
      <Link
        href="/volunteer/journey/history"
        className={`${volunteerUi.ghost} -ml-3 text-white/55`}
      >
        View Training History
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Link>
    </div>
  );
}
