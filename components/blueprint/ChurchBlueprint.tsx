"use client";

import type { BlueprintOverlayId, TheaterBlueprint } from "@/data/blueprint/types";
import { BlueprintMap } from "@/components/blueprint/BlueprintMap";
import { audioStyles } from "@/lib/audio-styles";

interface ChurchBlueprintProps {
  blueprint: TheaterBlueprint;
  overlay?: BlueprintOverlayId;
  selectedItemId?: string | null;
  onSelectItem?: (itemId: string) => void;
}

export function ChurchBlueprint({
  blueprint,
  overlay = "all",
  selectedItemId = null,
  onSelectItem = () => {},
}: ChurchBlueprintProps) {
  return (
      <div className="space-y-2 sm:space-y-3">
        <p className={`text-center ${audioStyles.caption} text-slate-500`}>
          {blueprint.mapLayout.orientationLabel}
        </p>

      <BlueprintMap
        blueprint={blueprint}
        overlay={overlay}
        selectedItemId={selectedItemId}
        onSelectItem={onSelectItem}
      />

      <p className="text-center text-xs text-slate-500">
        Tap equipment on the map to view details before opening a manual.
      </p>
    </div>
  );
}
