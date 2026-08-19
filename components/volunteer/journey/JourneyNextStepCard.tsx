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
} from "@/lib/volunteer/session";
import { volunteerUi } from "@/lib/volunteer/ui";

export function JourneyNextStepCard() {
  const session = useVolunteerSession();
  const assignment = getActiveAssignment(session);
  const step = session.journey?.nextStep;

  if (!step || !session.journey) {
    if (assignment) {
      return (
        <section className={`${volunteerUi.card} ${volunteerUi.cardPad} border-[#FF5A00]/20`}>
          <p className={volunteerUi.eyebrow}>Next step</p>
          <h2 className="mt-1.5 text-[20px] font-semibold tracking-tight text-white">
            {growthLevelLabels[assignment.growthLevel]}
          </h2>
          <p className={`mt-1 ${volunteerUi.body}`}>
            {departmentLabels[assignment.departmentId]} ·{" "}
            {volunteerEmptyCopy.trainingEngineUnconnected}
          </p>
          <p className={`mt-1 ${volunteerUi.muted}`}>
            {volunteerEmptyCopy.trainingEngineUnconnectedDetail}
          </p>
        </section>
      );
    }

    return (
      <section className={`${volunteerUi.card} ${volunteerUi.cardPad} border-[#FF5A00]/20`}>
        <p className={volunteerUi.eyebrow}>Next step</p>
        <h2 className="mt-1.5 text-[20px] font-semibold tracking-tight text-white">
          {volunteerEmptyCopy.trainingUnconnected}
        </h2>
        <p className={`mt-1 ${volunteerUi.body}`}>
          {volunteerEmptyCopy.trainingUnconnectedDetail}
        </p>
      </section>
    );
  }

  const positionName = getPositionName(session.positions, session.journey.positionId);

  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad} border-[#FF5A00]/20`}>
      <p className={volunteerUi.eyebrow}>Next step</p>
      <h2 className="mt-1.5 text-[20px] font-semibold tracking-tight text-white">
        {step.title}
      </h2>
      {step.detail && <p className={`mt-1 ${volunteerUi.body}`}>{step.detail}</p>}
      <p className="mt-3 text-[13px] text-white/45">
        {positionName}
        {assignment ? ` · ${growthLevelLabels[assignment.growthLevel]}` : ""}
      </p>
      <Link href={step.href} className={`${volunteerUi.cta} mt-5 w-full`}>
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </section>
  );
}
