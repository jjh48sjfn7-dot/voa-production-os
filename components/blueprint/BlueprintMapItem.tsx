"use client";

import {
  getItemOverlayOpacity,
  itemMatchesOverlay,
  getPrimaryDepartment,
} from "@/data/blueprint";
import type { BlueprintItem, BlueprintOverlayId } from "@/data/blueprint/types";
import { blueprintDepartmentLabels } from "@/data/blueprint/types";
import {
  BlueprintEquipmentGraphic,
  getGraphicAccessibleName,
} from "@/components/blueprint/graphics/BlueprintEquipmentGraphic";

interface BlueprintMapItemProps {
  item: BlueprintItem;
  overlay: BlueprintOverlayId;
  selected: boolean;
  onSelect: (itemId: string) => void;
}

export function BlueprintMapItem({
  item,
  overlay,
  selected,
  onSelect,
}: BlueprintMapItemProps) {
  const opacity = getItemOverlayOpacity(item, overlay);
  const emphasized = itemMatchesOverlay(item, overlay);
  const department = getPrimaryDepartment(item);
  const departmentLabel = blueprintDepartmentLabels[department];
  const label = item.mapLabel ?? item.name;
  const { x, y, rotate = 0 } = item.mapPosition;

  return (
    <button
      type="button"
      aria-label={`${label}, ${departmentLabel}, ${getGraphicAccessibleName(item.graphic)}`}
      aria-pressed={selected}
      onClick={() => onSelect(item.id)}
      className="group absolute z-10 flex min-h-[56px] min-w-[56px] flex-col items-center justify-start border-0 bg-transparent p-1 transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a12] sm:min-h-[64px] sm:min-w-[64px]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      }}
    >
      <div
        style={{ transform: `rotate(${-rotate}deg)` }}
        className={`relative flex flex-col items-center ${
          selected
            ? "rounded-lg ring-2 ring-white/50 ring-offset-2 ring-offset-[#070d18]"
            : emphasized
              ? "rounded-lg ring-1 ring-white/15"
              : ""
        }`}
      >
        <BlueprintEquipmentGraphic
          graphic={item.graphic}
          placeholder={item.status === "placeholder"}
          className="h-12 w-12 text-slate-200 transition-transform duration-200 group-hover:scale-105 sm:h-16 sm:w-16"
        />
        {item.status === "placeholder" && emphasized && (
          <span className="absolute -right-1 -top-1 rounded bg-amber-500/20 px-1 text-[7px] font-bold uppercase tracking-wide text-amber-400 ring-1 ring-amber-500/40">
            TBD
          </span>
        )}
      </div>

      <span
        style={{ transform: `rotate(${-rotate}deg)` }}
        className={`mt-1 max-w-[5rem] text-center text-[9px] font-medium leading-tight sm:max-w-[6rem] sm:text-[10px] ${
          emphasized ? "text-slate-300" : "text-slate-500"
        }`}
      >
        {label}
      </span>
      <span
        style={{ transform: `rotate(${-rotate}deg)` }}
        className="mt-0.5 text-[8px] uppercase tracking-wide text-slate-600"
        aria-hidden
      >
        {departmentLabel}
      </span>
    </button>
  );
}
