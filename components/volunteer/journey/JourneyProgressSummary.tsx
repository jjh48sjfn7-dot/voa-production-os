"use client";

import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { getCurrentStageRequirementRows, getCurrentGrowthLevel } from "@/lib/volunteer/journey";
import {
  growthLevelDescriptions,
  growthLevelLabels,
  volunteerEmptyCopy,
} from "@/lib/volunteer/labels";
import { volunteerUi } from "@/lib/volunteer/ui";

export function JourneyProgressSummary() {
  const session = useVolunteerSession();
  const level = getCurrentGrowthLevel(session);

  if (!level) {
    return (
      <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
        <p className={volunteerUi.eyebrow}>Current stage</p>
        <h2 className={`mt-1.5 ${volunteerUi.title}`}>
          {volunteerEmptyCopy.trainingUnconnected}
        </h2>
        <p className={`mt-2 ${volunteerUi.body}`}>
          {volunteerEmptyCopy.trainingUnconnectedDetail}
        </p>
      </section>
    );
  }

  const rows = getCurrentStageRequirementRows(session);

  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
      <p className={volunteerUi.eyebrow}>Current stage</p>
      <h2 className={`mt-1.5 ${volunteerUi.title}`}>{growthLevelLabels[level]}</h2>
      <p className={`mt-2 ${volunteerUi.body}`}>{growthLevelDescriptions[level]}</p>
      {session.journey && rows.length > 0 ? (
        <dl className="mt-4 space-y-2.5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-3">
              <dt className="text-[13px] text-white/45">{row.label}</dt>
              <dd className="text-[13px] font-medium text-white">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className={`mt-3 ${volunteerUi.muted}`}>
          {volunteerEmptyCopy.trainingEngineUnconnected}{" "}
          {volunteerEmptyCopy.trainingEngineUnconnectedDetail}
        </p>
      )}
    </section>
  );
}
