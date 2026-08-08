"use client";

import type { BlueprintOverlayId, TheaterBlueprint } from "@/data/blueprint/types";
import { BlueprintMapItem } from "@/components/blueprint/BlueprintMapItem";
import { BlueprintMapEnvironment } from "@/components/blueprint/BlueprintMapEnvironment";
import { BlueprintMapLabels } from "@/components/blueprint/BlueprintMapLabels";

interface BlueprintMapProps {
  blueprint: TheaterBlueprint;
  overlay: BlueprintOverlayId;
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
}

function itemRenderOrder(item: TheaterBlueprint["items"][number]): number {
  if (item.id === "subwoofer") return 0;
  if (item.itemType === "reference") return 1;
  if (item.id === "wireless-receivers") return 15;
  return 10;
}

export function BlueprintMap({
  blueprint,
  overlay,
  selectedItemId,
  onSelectItem,
}: BlueprintMapProps) {
  const sortedItems = [...blueprint.items].sort(
    (a, b) => itemRenderOrder(a) - itemRenderOrder(b)
  );

  return (
    <div
      className="relative mx-auto w-full max-w-[72rem] overflow-hidden rounded-lg border border-white/[0.05] bg-[#020408] aspect-[16/14] max-h-[min(96vh,980px)] sm:aspect-[16/11] sm:max-h-[min(88vh,820px)] sm:rounded-xl"
    >
      <p className="sr-only">
        Hybrid architectural theater map for {blueprint.venue.name}. Curved stage
        at the top, fan-shaped audience below, FOH on the house-right side
        platform. Tap equipment to view details.
      </p>

      <BlueprintMapEnvironment />
      <BlueprintMapLabels />

      {sortedItems.map((item) => (
        <BlueprintMapItem
          key={item.id}
          item={item}
          overlay={overlay}
          selected={selectedItemId === item.id}
          onSelect={onSelectItem}
        />
      ))}
    </div>
  );
}
