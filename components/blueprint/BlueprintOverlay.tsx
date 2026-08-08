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
    <div className={`${audioStyles.card} space-y-2 p-3 sm:space-y-3 sm:p-6`}>
      <div>
        <p className="text-xs font-medium text-slate-300 sm:text-sm">Department overlay</p>
        <p className="mt-1 hidden text-xs text-slate-500 sm:block">
          Highlight a department while keeping the full room visible.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {blueprintPreviewOverlays.map((option) => {
          const active = overlay === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onOverlayChange(option)}
              className={`min-h-[32px] rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none transition-colors sm:min-h-[40px] sm:px-3 sm:py-2 sm:text-sm ${
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
