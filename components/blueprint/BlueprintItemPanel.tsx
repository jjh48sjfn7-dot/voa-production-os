"use client";

import Link from "next/link";
import { X } from "lucide-react";
import {
  getBlueprintItemHref,
  getBlueprintZone,
  getEquipmentTroubleshootingHref,
  getPrimaryDepartment,
} from "@/data/blueprint";
import type { BlueprintItem, TheaterBlueprint } from "@/data/blueprint/types";
import {
  blueprintDepartmentColors,
  blueprintDepartmentLabels,
} from "@/data/blueprint/types";
import {
  BlueprintEquipmentGraphic,
} from "@/components/blueprint/graphics/BlueprintEquipmentGraphic";
import { audioStyles } from "@/lib/audio-styles";

interface BlueprintItemPanelProps {
  blueprint: TheaterBlueprint;
  item: BlueprintItem;
  onClose: () => void;
  volunteerMode?: boolean;
}

export function BlueprintItemPanel({
  blueprint,
  item,
  onClose,
  volunteerMode = false,
}: BlueprintItemPanelProps) {
  const zone = getBlueprintZone(blueprint, item.zoneId);
  const href = getBlueprintItemHref(item);
  const troubleshootingHref = item.equipmentSlug
    ? getEquipmentTroubleshootingHref(item.equipmentSlug)
    : undefined;
  const department = getPrimaryDepartment(item);
  const colors = blueprintDepartmentColors[department];
  const locationLabel = zone?.beginnerLabel ?? zone?.name;

  return (
    <div
      className={`${audioStyles.card} border-white/[0.12] p-4 sm:p-5`}
      role="dialog"
      aria-labelledby="blueprint-item-panel-title"
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border ${colors.border} ${colors.bg}`}
        >
          <BlueprintEquipmentGraphic graphic={item.graphic} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2
              id="blueprint-item-panel-title"
              className="text-base font-semibold text-slate-50 sm:text-lg"
            >
              {item.name}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close equipment details"
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-slate-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {locationLabel && (
            <p className="mt-1 text-sm text-slate-400">{locationLabel}</p>
          )}
        </div>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        {!volunteerMode && (
          <div>
            <dt className="text-slate-500">Department</dt>
            <dd className="mt-0.5 font-medium text-slate-200">
              {item.departments
                .map((dept) => blueprintDepartmentLabels[dept])
                .join(" · ")}
            </dd>
          </div>
        )}
        {item.notes && item.notes.length > 0 && (
          <div>
            <dt className="text-slate-500">
              {volunteerMode ? "Location notes" : "Connection / location"}
            </dt>
            <dd className="mt-1 space-y-1 text-slate-300">
              {item.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </dd>
          </div>
        )}
        {item.status === "placeholder" && (
          <p className="text-xs font-medium uppercase tracking-wide text-amber-500/90">
            Placeholder — not finalized
          </p>
        )}
      </dl>

      <div className="mt-4 space-y-2">
        {href ? (
          <Link
            href={href}
            className={`flex min-h-[48px] items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-sm font-semibold text-slate-50 ${audioStyles.transition} hover:bg-white/[0.1]`}
          >
            Open Equipment
          </Link>
        ) : (
          !volunteerMode && (
            <p className="text-xs text-slate-500">
              No equipment manual available for this reference item.
            </p>
          )
        )}
        {troubleshootingHref && (
          <Link
            href={troubleshootingHref}
            className={`flex min-h-[48px] items-center justify-center rounded-xl border border-white/[0.08] bg-transparent px-4 text-sm font-semibold text-slate-300 ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-slate-50`}
          >
            Troubleshooting
          </Link>
        )}
      </div>
    </div>
  );
}
