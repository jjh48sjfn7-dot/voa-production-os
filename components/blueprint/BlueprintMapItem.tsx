"use client";

import {
  getItemOverlayOpacity,
  itemMatchesOverlay,
} from "@/data/blueprint";
import type { BlueprintItem, BlueprintOverlayId } from "@/data/blueprint/types";
import { blueprintDepartmentColors } from "@/data/blueprint/types";
import {
  BlueprintEquipmentGraphic,
  getGraphicAccessibleName,
} from "@/components/blueprint/graphics/BlueprintEquipmentGraphic";
import { getPrimaryDepartment } from "@/data/blueprint";

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
  const colors = blueprintDepartmentColors[department];
  const label = item.mapLabel ?? item.name;
  const { x, y, rotate = 0 } = item.mapPosition;

  return (
    <button
      type="button"
      aria-label={`${label}, ${getGraphicAccessibleName(item.graphic)}`}
      aria-pressed={selected}
      onClick={() => onSelect(item.id)}
      className={`absolute z-10 flex min-h-[44px] min-w-[44px] flex-col items-center justify-center rounded-lg border bg-[#0a1220]/90 px-1 py-1 transition-[opacity,box-shadow,border-color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:min-h-[52px] sm:min-w-[52px] sm:px-1.5 ${
        selected
          ? `border-white/30 ring-2 ${colors.ring} shadow-lg`
          : emphasized
            ? `${colors.border} shadow-md`
            : "border-white/[0.06]"
      }`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${selected ? 1.05 : 1})`,
      }}
    >
      <div style={{ transform: `rotate(${-rotate}deg)` }} className="flex flex-col items-center">
        <BlueprintEquipmentGraphic
          graphic={item.graphic}
          className="h-8 w-8 text-slate-300 sm:h-10 sm:w-10"
        />
        <span className="mt-0.5 max-w-[4.5rem] truncate text-center text-[9px] font-semibold leading-tight text-slate-200 sm:max-w-none sm:text-[10px]">
          {label}
        </span>
        {item.status === "placeholder" && emphasized && (
          <span className="text-[8px] uppercase tracking-wide text-amber-500/90">
            TBD
          </span>
        )}
      </div>
    </button>
  );
}
