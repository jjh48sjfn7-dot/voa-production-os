"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { getPositionName } from "@/lib/volunteer/labels";
import { getActiveQualification } from "@/lib/volunteer/session";
import { volunteerUi } from "@/lib/volunteer/ui";

export function ContinueJourneyCard() {
  const session = useVolunteerSession();
  const qualification = getActiveQualification(session);
  const positionName = getPositionName(session.positions, session.journey.positionId);
  const done = qualification?.completedCompetencyIds.length ?? 0;
  const total = qualification?.requiredCompetencyIds.length ?? 0;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
      <p className={volunteerUi.eyebrow}>Continue My Journey</p>
      <h2 className={`mt-1.5 ${volunteerUi.title}`}>{positionName}</h2>
      <p className={`mt-1 ${volunteerUi.body}`}>{session.journey.nextStep.title}</p>
      <div className="mt-3">
        <div className="flex justify-between text-[12px] text-white/45">
          <span>Hands-on competencies</span>
          <span>
            {done} of {total}
          </span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-[#FF5A00]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <Link
        href={session.journey.nextStep.href}
        className={`${volunteerUi.ghost} mt-3 -ml-3 text-[#FF8A4C]`}
      >
        {session.journey.nextStep.title}
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Link>
    </section>
  );
}
