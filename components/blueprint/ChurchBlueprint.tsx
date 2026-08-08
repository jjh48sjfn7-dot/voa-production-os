"use client";

import type { BlueprintOverlayId, TheaterBlueprint } from "@/data/blueprint/types";
import { BlueprintMap } from "@/components/blueprint/BlueprintMap";
import { audioStyles } from "@/lib/audio-styles";

interface ChurchBlueprintProps {
  blueprint: TheaterBlueprint;
  overlay?: BlueprintOverlayId;
  variant?: "default" | "volunteer";
  selectedItemId?: string | null;
  onSelectItem?: (itemId: string) => void;
}

export function ChurchBlueprint({
  blueprint,
  overlay = "all",
  variant = "default",
  selectedItemId = null,
  onSelectItem = () => {},
}: ChurchBlueprintProps) {
  const isVolunteer = variant === "volunteer";

  return (
      <div className="space-y-1.5 sm:space-y-3">
        {!isVolunteer && (
          <p className={`hidden text-center sm:block ${audioStyles.caption} text-slate-500`}>
            {blueprint.mapLayout.orientationLabel}
          </p>
        )}

      <BlueprintMap
        blueprint={blueprint}
        overlay={overlay}
        selectedItemId={selectedItemId}
        onSelectItem={onSelectItem}
      />

      <p className="text-center text-xs text-slate-500">
        {isVolunteer
          ? "Tap equipment on the map for location details."
          : "Tap equipment on the map to view details before opening a manual."}
      </p>
    </div>
  );
}
