import { Check } from "lucide-react";
import {
  growthLevelLabels,
  journeyStepStateLabels,
} from "@/lib/volunteer/labels";
import type { DepartmentGrowthLevel, JourneyStepState } from "@/lib/volunteer/types";
import { volunteerUi } from "@/lib/volunteer/ui";

interface GrowthTrackStepProps {
  level: DepartmentGrowthLevel;
  state: JourneyStepState;
  isLast: boolean;
}

export function GrowthTrackStep({ level, state, isLast }: GrowthTrackStepProps) {
  const isCurrent = state === "current";
  const isCompleted = state === "completed";
  const isLocked = state === "locked";

  return (
    <li className="flex gap-3">
      <div className="flex w-7 flex-col items-center">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
            isCompleted
              ? "bg-[#FF5A00]"
              : isCurrent
                ? "border-2 border-[#FF5A00] bg-[#FF5A00]/15"
                : isLocked
                  ? "bg-white/[0.06]"
                  : "border border-white/20 bg-transparent"
          }`}
          aria-hidden
        >
          {isCompleted ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} /> : null}
          {isCurrent ? (
            <span className="h-2 w-2 rounded-full bg-[#FF5A00]" />
          ) : null}
        </span>
        {!isLast && (
          <span
            className={`mt-1 w-px flex-1 ${
              isCompleted ? "bg-[#FF5A00]/35" : "bg-white/[0.08]"
            }`}
          />
        )}
      </div>
      <div className={`${isLast ? "pb-0" : "min-h-[52px] pb-5"} ${isLocked ? "opacity-55" : ""}`}>
        <p
          className={`text-[15px] font-semibold tracking-tight ${
            isCurrent ? "text-white" : "text-white/85"
          }`}
        >
          {growthLevelLabels[level]}
        </p>
        <p className={`mt-0.5 text-[12px] ${isCurrent ? volunteerUi.orange : "text-white/40"}`}>
          {journeyStepStateLabels[state]}
        </p>
      </div>
    </li>
  );
}

interface GrowthTrackProps {
  steps: { level: DepartmentGrowthLevel; state: JourneyStepState }[];
}

export function GrowthTrack({ steps }: GrowthTrackProps) {
  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
      <p className={volunteerUi.eyebrow}>Department growth</p>
      <h2 className={`mt-1.5 ${volunteerUi.title}`}>Growth Track</h2>
      <ol className="mt-4">
        {steps.map((step, index) => (
          <GrowthTrackStep
            key={step.level}
            level={step.level}
            state={step.state}
            isLast={index === steps.length - 1}
          />
        ))}
      </ol>
    </section>
  );
}
