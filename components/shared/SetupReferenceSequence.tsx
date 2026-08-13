"use client";

import { SetupReference } from "@/components/shared/SetupReference";
import type { ReferencePhotoSequence } from "@/lib/reference-photos";

interface SetupReferenceSequenceProps {
  sequence: ReferencePhotoSequence;
}

export function SetupReferenceSequence({ sequence }: SetupReferenceSequenceProps) {
  return (
    <div className="space-y-4">
      {sequence.note && (
        <p className="text-[13px] leading-snug text-slate-500">{sequence.note}</p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sequence.steps.map((step) => (
          <div key={step.step} className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Step {step.step}
            </p>
            <SetupReference
              photo={step}
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
