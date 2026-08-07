"use client";

import { useState } from "react";
import { BlueprintLegend } from "@/components/blueprint/BlueprintLegend";
import { BlueprintItemPanel } from "@/components/blueprint/BlueprintItemPanel";
import { BlueprintOverlay } from "@/components/blueprint/BlueprintOverlay";
import { ChurchBlueprint } from "@/components/blueprint/ChurchBlueprint";
import { getBlueprintItem, theaterBlueprint } from "@/data/blueprint";
import type { BlueprintDepartment, BlueprintOverlayId } from "@/data/blueprint/types";
import { audioStyles } from "@/lib/audio-styles";

function getLegendDepartments(
  overlay: BlueprintOverlayId
): BlueprintDepartment[] {
  if (overlay === "all" || overlay === "stage") {
    return ["audio", "media", "lighting", "video"];
  }
  if (overlay === "audio" || overlay === "lighting" || overlay === "media" || overlay === "video") {
    return [overlay];
  }
  return ["audio"];
}

export function BlueprintPreviewContent() {
  const [overlay, setOverlay] = useState<BlueprintOverlayId>("all");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const selectedItem = selectedItemId
    ? getBlueprintItem(theaterBlueprint, selectedItemId)
    : undefined;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-amber-500/90">
          Internal development preview
        </p>
        <h1 className={`${audioStyles.display} text-slate-50`}>
          Master Church Blueprint
        </h1>
        <p className={`${audioStyles.body} text-slate-400`}>
          {theaterBlueprint.venue.name} — top-down theater and stage plot.
        </p>
      </div>

      <BlueprintOverlay overlay={overlay} onOverlayChange={setOverlay} />

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-400">Department legend</p>
        <BlueprintLegend departments={getLegendDepartments(overlay)} />
      </div>

      <ChurchBlueprint
        blueprint={theaterBlueprint}
        overlay={overlay}
        selectedItemId={selectedItemId}
        onSelectItem={(id) =>
          setSelectedItemId((current) => (current === id ? null : id))
        }
      />

      {selectedItem && (
        <BlueprintItemPanel
          blueprint={theaterBlueprint}
          item={selectedItem}
          onClose={() => setSelectedItemId(null)}
        />
      )}
    </div>
  );
}
