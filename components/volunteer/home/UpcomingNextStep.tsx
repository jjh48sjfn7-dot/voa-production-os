"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { volunteerUi } from "@/lib/volunteer/ui";

export function UpcomingNextStep() {
  const session = useVolunteerSession();
  const step = session.journey.nextStep;

  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
      <p className={volunteerUi.eyebrow}>Upcoming</p>
      <h2 className={`mt-1.5 ${volunteerUi.title}`}>Next step</h2>
      <p className={`mt-1 ${volunteerUi.body}`}>{step.detail ?? step.title}</p>
      <Link href={step.href} className={`${volunteerUi.ghost} mt-2 -ml-3`}>
        View Journey
        <ArrowRight className="ml-1.5 h-4 w-4" />
      </Link>
    </section>
  );
}
