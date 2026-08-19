"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import {
  departmentLabels,
  getPositionName,
  growthLevelLabels,
  volunteerEmptyCopy,
} from "@/lib/volunteer/labels";
import {
  getActiveAssignment,
  isPersonalTrainingConnected,
} from "@/lib/volunteer/session";
import { volunteerUi } from "@/lib/volunteer/ui";

export function ContinueJourneyCard() {
  const session = useVolunteerSession();
  const trainingConnected = isPersonalTrainingConnected(session);
  const assignment = getActiveAssignment(session);
  const positionName = session.journey
    ? getPositionName(session.positions, session.journey.positionId)
    : null;

  if (trainingConnected && session.journey) {
    return (
      <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
        <p className={volunteerUi.eyebrow}>Continue My Journey</p>
        <h2 className={`mt-1.5 ${volunteerUi.title}`}>{positionName}</h2>
        <p className={`mt-1 ${volunteerUi.body}`}>{session.journey.nextStep.title}</p>
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

  if (assignment) {
    return (
      <section className={`${volunteerUi.card} ${volunteerUi.cardPad} border-[#FF5A00]/20`}>
        <p className={volunteerUi.eyebrow}>My Journey</p>
        <h2 className="mt-1.5 text-[20px] font-semibold tracking-tight text-white">
          {growthLevelLabels[assignment.growthLevel]}
        </h2>
        <p className={`mt-1 ${volunteerUi.body}`}>
          {departmentLabels[assignment.departmentId]} ·{" "}
          {volunteerEmptyCopy.trainingEngineUnconnectedDetail}
        </p>
        <Link href="/volunteer/journey" className={`${volunteerUi.cta} mt-5 w-full`}>
          View Journey
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    );
  }

  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad} border-[#FF5A00]/20`}>
      <p className={volunteerUi.eyebrow}>My Journey</p>
      <h2 className="mt-1.5 text-[20px] font-semibold tracking-tight text-white">
        {volunteerEmptyCopy.trainingUnconnected}
      </h2>
      <p className={`mt-1 ${volunteerUi.body}`}>
        {volunteerEmptyCopy.trainingUnconnectedDetail}
      </p>
      <Link href="/volunteer/journey" className={`${volunteerUi.cta} mt-5 w-full`}>
        View Journey
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </section>
  );
}
