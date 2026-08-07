"use client";

import type { BlueprintOverlayId } from "@/data/blueprint/types";
import {
  blueprintOverlayLabels,
  type BlueprintDepartment,
} from "@/data/blueprint/types";
import { blueprintPreviewOverlays } from "@/data/blueprint";
import { audioStyles } from "@/lib/audio-styles";

interface BlueprintOverlayProps {
  overlay: BlueprintOverlayId;
  availableOverlays?: BlueprintDepartment[];
  onOverlayChange: (overlay: BlueprintOverlayId) => void;
}

/** Department filter for blueprint map overlays */
export function BlueprintOverlay({
  overlay,
  onOverlayChange,
}: BlueprintOverlayProps) {
  return (
    <div className={`${audioStyles.card} ${audioStyles.cardPad} space-y-3`}>
      <div>
        <p className="text-sm font-medium text-slate-300">Department overlay</p>
        <p className="mt-1 text-xs text-slate-500">
          Highlight a department while keeping the full room visible.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {blueprintPreviewOverlays.map((option) => {
          const active = overlay === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onOverlayChange(option)}
              className={`min-h-[40px] rounded-full border px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                active
                  ? "border-white/[0.2] bg-white/[0.08] text-slate-50"
                  : "border-white/[0.08] bg-transparent text-slate-400 hover:border-white/[0.12] hover:text-slate-300"
              }`}
            >
              {blueprintOverlayLabels[option]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Alias matching architecture naming */
export { BlueprintOverlay as BlueprintFilter };
