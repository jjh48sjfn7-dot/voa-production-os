"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TrainingHistoryList } from "@/components/volunteer/journey/TrainingHistoryList";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { volunteerUi } from "@/lib/volunteer/ui";

export function VolunteerJourneyHistory() {
  const session = useVolunteerSession();

  return (
    <div>
      <Link
        href="/volunteer/journey"
        className={`${volunteerUi.ghost} -ml-3 mb-3 text-white/55`}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        My Journey
      </Link>
      <header className="mb-4">
        <h1 className="text-[26px] font-semibold tracking-tight text-white">
          Training History
        </h1>
        <p className={`mt-1 ${volunteerUi.muted}`}>
          Completed training, stored separately from your current Journey.
        </p>
      </header>
      <TrainingHistoryList entries={session.trainingHistory} />
    </div>
  );
}
