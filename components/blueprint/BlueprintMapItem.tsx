"use client";

import {
  getItemOverlayOpacity,
  itemMatchesOverlay,
  getPrimaryDepartment,
} from "@/data/blueprint";
import type {
  BlueprintGraphicId,
  BlueprintItem,
  BlueprintOverlayId,
} from "@/data/blueprint/types";
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

const graphicSizeClasses: Partial<Record<BlueprintGraphicId, string>> = {
  keyboard: "h-7 w-[4.5rem] sm:h-9 sm:w-28",
  screen: "h-5 w-24 sm:h-6 sm:w-32",
  curtain: "h-4 w-24 sm:h-5 sm:w-32",
  console: "h-9 w-24 sm:h-11 sm:w-32",
  projector: "h-8 w-20 sm:h-10 sm:w-24",
  speaker: "h-12 w-8 sm:h-14 sm:w-10",
  "drum-kit": "h-14 w-16 sm:h-16 sm:w-20",
  subwoofer: "h-7 w-10 sm:h-8 sm:w-12",
  beltpack: "h-7 w-6 sm:h-8 sm:w-7",
  "display-monitor": "h-12 w-11 sm:h-14 sm:w-12",
};

function getGraphicClass(graphic: BlueprintGraphicId): string {
  return (
    graphicSizeClasses[graphic] ??
    "h-11 w-11 sm:h-14 sm:w-14"
  );
}

export function BlueprintMapItem({
  item,
  overlay,
  selected,
  onSelect,
}: BlueprintMapItemProps) {
  const opacity = getItemOverlayOpacity(item, overlay);
  const emphasized = itemMatchesOverlay(item, overlay);
  const departmentLabel = blueprintDepartmentLabels[getPrimaryDepartment(item)];
  const label = item.mapLabel ?? item.name;
  const { x, y, rotate = 0 } = item.mapPosition;
  const graphicClass = getGraphicClass(item.graphic);
  const isSubtlePlaceholder =
    item.status === "placeholder" && item.id === "subwoofer";

  return (
    <button
      type="button"
      aria-label={`${label}, ${departmentLabel}, ${getGraphicAccessibleName(item.graphic)}`}
      aria-pressed={selected}
      onClick={() => onSelect(item.id)}
      className="group absolute z-10 flex min-h-[52px] min-w-[52px] flex-col items-center justify-start border-0 bg-transparent p-0 transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent sm:min-h-[60px] sm:min-w-[60px]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: isSubtlePlaceholder ? opacity * 0.55 : opacity,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
        zIndex: isSubtlePlaceholder ? 5 : 10,
      }}
    >
      <div
        style={{ transform: `rotate(${-rotate}deg)` }}
        className={`relative transition-[filter,transform] duration-200 ${
          selected
            ? "scale-105 drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]"
            : "drop-shadow-[0_3px_6px_rgba(0,0,0,0.55)] group-hover:scale-[1.03]"
        }`}
      >
        <BlueprintEquipmentGraphic
          graphic={item.graphic}
          placeholder={item.status === "placeholder"}
          className={`${graphicClass} text-slate-100`}
        />
      </div>

      <span
        style={{ transform: `rotate(${-rotate}deg)` }}
        className={`mt-1 max-w-[4.75rem] text-center text-[9px] font-medium leading-tight tracking-wide sm:max-w-[5.5rem] sm:text-[10px] ${
          emphasized ? "text-slate-300" : "text-slate-500"
        }`}
      >
        {label}
      </span>

      {item.status === "placeholder" && emphasized && (
        <span
          style={{ transform: `rotate(${-rotate}deg)` }}
          className="text-[8px] font-medium uppercase tracking-wider text-amber-500/80"
        >
          TBD
        </span>
      )}

      <span
        style={{ transform: `rotate(${-rotate}deg)` }}
        className="hidden text-[8px] uppercase tracking-wide text-slate-600 sm:block"
        aria-hidden
      >
        {departmentLabel}
      </span>
    </button>
  );
}
