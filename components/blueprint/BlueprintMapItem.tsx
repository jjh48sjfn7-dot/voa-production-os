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
  keyboard: "h-9 w-[4.75rem] sm:h-11 sm:w-[6rem]",
  screen: "h-4 w-20 sm:h-5 sm:w-28",
  curtain: "h-3 w-20 sm:h-4 sm:w-28",
  console: "h-11 w-[6rem] sm:h-[3.25rem] sm:w-[7.25rem]",
  projector: "h-6 w-14 sm:h-7 sm:w-[4.5rem]",
  speaker: "h-12 w-8 sm:h-16 sm:w-10",
  "drum-kit": "h-14 w-16 sm:h-[4.5rem] sm:w-20",
  subwoofer: "h-6 w-9 sm:h-7 sm:w-11",
  beltpack: "h-6 w-5 sm:h-7 sm:w-6",
  "display-monitor": "h-12 w-11 sm:h-14 sm:w-12",
  "monitor-wedge": "h-10 w-14 sm:h-12 sm:w-16",
  "snake-box": "h-10 w-10 sm:h-12 sm:w-12",
  "wireless-rack": "h-9 w-14 sm:h-10 sm:w-16",
  computer: "h-11 w-12 sm:h-12 sm:w-14",
  "mic-stand": "h-10 w-8 sm:h-11 sm:w-9",
};

const departmentTagColors: Record<string, string> = {
  audio: "text-rose-400/70",
  media: "text-sky-400/70",
  lighting: "text-amber-400/70",
  video: "text-violet-400/70",
};

const transitionZoneItemIds = new Set([
  "left-monitor",
  "right-monitor",
  "projector",
  "subwoofer",
]);

const fohItemIds = new Set([
  "yamaha-tf5",
  "wireless-receivers",
  "mac-desktop",
  "confidence-monitor",
]);

const fohGraphicSizeClasses: Partial<Record<BlueprintGraphicId, string>> = {
  console: "h-9 w-[5rem] sm:h-10 sm:w-[5.75rem]",
  "wireless-rack": "h-8 w-12 sm:h-9 sm:w-14",
  computer: "h-9 w-10 sm:h-10 sm:w-12",
  "display-monitor": "h-10 w-10 sm:h-11 sm:w-11",
};

function getGraphicClass(graphic: BlueprintGraphicId, itemId: string): string {
  if (itemId === "projector") {
    return graphicSizeClasses.projector ?? "h-6 w-14";
  }
  if (fohItemIds.has(itemId)) {
    return fohGraphicSizeClasses[graphic] ?? graphicSizeClasses[graphic] ?? "h-11 w-11 sm:h-12 sm:w-12";
  }
  return graphicSizeClasses[graphic] ?? "h-11 w-11 sm:h-12 sm:w-12";
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
  const graphicClass = getGraphicClass(item.graphic, item.id);
  const isSubtlePlaceholder =
    item.status === "placeholder" && item.id === "subwoofer";
  const isReference = item.itemType === "reference";
  const hideDeptTag = transitionZoneItemIds.has(item.id);
  const compactFohLabel = fohItemIds.has(item.id);
  const hidePlaceholderTag =
    item.id === "projector" || (item.id === "subwoofer" && !emphasized);

  const itemOpacity = isSubtlePlaceholder
    ? opacity * 0.4
    : isReference
      ? opacity * 0.3
      : opacity;

  const zIndex = isSubtlePlaceholder
    ? 4
    : isReference
      ? 3
      : item.id === "projector"
        ? 11
        : item.id === "wireless-receivers"
          ? 9
          : 12;

  const deptTag = departmentTagColors[department] ?? "text-slate-500/60";

  return (
    <button
      type="button"
      aria-label={`${label}, ${departmentLabel}, ${getGraphicAccessibleName(item.graphic)}`}
      aria-pressed={selected}
      onClick={() => onSelect(item.id)}
      className="group absolute flex min-h-[44px] min-w-[44px] flex-col items-center justify-start border-0 bg-transparent p-0 transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:min-h-[48px] sm:min-w-[48px]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: itemOpacity,
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
        zIndex: selected ? 20 : zIndex,
      }}
    >
      <div
        style={{ transform: `rotate(${-rotate}deg)` }}
        className={`relative transition-[filter,transform] duration-200 ${
          selected
            ? "scale-[1.07] drop-shadow-[0_0_14px_rgba(255,255,255,0.28)]"
            : "drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)] group-hover:scale-[1.04]"
        }`}
      >
        <BlueprintEquipmentGraphic
          graphic={item.graphic}
          placeholder={item.status === "placeholder"}
          className={`${graphicClass} text-slate-200`}
        />
      </div>

      {!isReference && (
        <div
          style={{ transform: `rotate(${-rotate}deg)` }}
          className="mt-0.5 flex flex-col items-center gap-0"
        >
          <span
            className={`text-center text-[7px] font-semibold leading-tight text-slate-200 sm:text-[8px] ${
              compactFohLabel ? "max-w-[3.25rem] sm:max-w-[3.75rem]" : "max-w-[4.75rem] sm:max-w-[5.25rem]"
            } ${emphasized ? "opacity-100" : "opacity-75"} ${
              item.id === "subwoofer" ? "text-slate-400/80" : ""
            }`}
          >
            {label}
          </span>
          {!hideDeptTag && (
            <span
              className={`text-center text-[5px] font-medium uppercase tracking-wider sm:text-[6px] ${deptTag} ${
                compactFohLabel ? "max-w-[3.25rem] sm:max-w-[3.75rem]" : ""
              }`}
            >
              {departmentLabel}
            </span>
          )}
          {item.id === "projector" && (
            <span className="text-[4px] font-medium leading-tight text-sky-400/50 sm:text-[5px]">
              TR-5 / TR-6
            </span>
          )}
        </div>
      )}

      {item.status === "placeholder" && emphasized && !hidePlaceholderTag && (
        <span
          style={{ transform: `rotate(${-rotate}deg)` }}
          className={`text-[5px] font-medium uppercase tracking-wider sm:text-[6px] ${
            isSubtlePlaceholder ? "text-slate-500/50" : "text-amber-500/60"
          }`}
        >
          TBD
        </span>
      )}
    </button>
  );
}
