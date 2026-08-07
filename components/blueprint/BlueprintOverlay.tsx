"use client";

import type { BlueprintOverlayId } from "@/data/blueprint/types";
import {
  blueprintDepartmentLabels,
  type BlueprintDepartment,
} from "@/data/blueprint/types";
import { audioStyles } from "@/lib/audio-styles";

interface BlueprintOverlayProps {
  overlay: BlueprintOverlayId;
  availableOverlays: BlueprintDepartment[];
  onOverlayChange: (overlay: BlueprintOverlayId) => void;
}

const overlayOptions: { id: BlueprintOverlayId; label: string }[] = [
  { id: "all", label: "All Departments" },
];

export function BlueprintOverlay({
  overlay,
  availableOverlays,
  onOverlayChange,
}: BlueprintOverlayProps) {
  const options = [
    ...overlayOptions,
    ...availableOverlays.map((department) => ({
      id: department as BlueprintOverlayId,
      label: blueprintDepartmentLabels[department],
    })),
  ];

  return (
    <div className={`${audioStyles.card} ${audioStyles.cardPad} space-y-3`}>
      <div>
        <p className="text-sm font-medium text-slate-300">Department overlay</p>
        <p className="mt-1 text-xs text-slate-500">
          Preview filter — future department maps will use this pattern.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = overlay === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onOverlayChange(option.id)}
              className={`min-h-[40px] rounded-full border px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                active
                  ? "border-white/[0.2] bg-white/[0.08] text-slate-50"
                  : "border-white/[0.08] bg-transparent text-slate-400 hover:border-white/[0.12] hover:text-slate-300"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
