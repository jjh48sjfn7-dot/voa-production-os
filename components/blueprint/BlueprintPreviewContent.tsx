"use client";

import { useState } from "react";
import { BlueprintLegend } from "@/components/blueprint/BlueprintLegend";
import { BlueprintOverlay } from "@/components/blueprint/BlueprintOverlay";
import { ChurchBlueprint } from "@/components/blueprint/ChurchBlueprint";
import { theaterBlueprint } from "@/data/blueprint";
import type { BlueprintOverlayId } from "@/data/blueprint/types";
import { audioStyles } from "@/lib/audio-styles";

export function BlueprintPreviewContent() {
  const [overlay, setOverlay] = useState<BlueprintOverlayId>("all");

  const activeDepartments =
    overlay === "all"
      ? (["audio", "media", "lighting"] as const)
      : [overlay];

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-amber-500/90">
          Internal development preview
        </p>
        <h1 className={`${audioStyles.display} text-slate-50`}>
          Master Church Blueprint
        </h1>
        <p className={`${audioStyles.body} text-slate-400`}>
          {theaterBlueprint.venue.name} — shared physical map for all
          production departments.
        </p>
      </div>

      <div className={`${audioStyles.card} ${audioStyles.cardPad} space-y-3`}>
        <p className="text-sm font-medium text-slate-300">Venue notes</p>
        <ul className="space-y-2">
          {theaterBlueprint.venue.notes.map((note) => (
            <li key={note} className={`${audioStyles.body} text-slate-400`}>
              {note}
            </li>
          ))}
        </ul>
      </div>

      <BlueprintOverlay
        overlay={overlay}
        availableOverlays={theaterBlueprint.overlays}
        onOverlayChange={setOverlay}
      />

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-400">Department legend</p>
        <BlueprintLegend departments={[...activeDepartments]} />
      </div>

      <ChurchBlueprint blueprint={theaterBlueprint} overlay={overlay} />
    </div>
  );
}
