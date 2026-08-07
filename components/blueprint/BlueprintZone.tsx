import { getBlueprintItemsByZone, itemMatchesOverlay } from "@/data/blueprint";
import type {
  BlueprintItem,
  BlueprintOverlayId,
  BlueprintZone,
  TheaterBlueprint,
} from "@/data/blueprint/types";
import { BlueprintItemTile } from "@/components/blueprint/BlueprintItem";
import { audioStyles } from "@/lib/audio-styles";

interface BlueprintZoneProps {
  blueprint: TheaterBlueprint;
  zone: BlueprintZone;
  overlay: BlueprintOverlayId;
  itemLayout?: "stack" | "grid-2" | "grid-3";
  compact?: boolean;
}

function isItemVisible(item: BlueprintItem, overlay: BlueprintOverlayId): boolean {
  return itemMatchesOverlay(item, overlay);
}

export function BlueprintZone({
  blueprint,
  zone,
  overlay,
  itemLayout = "stack",
  compact,
}: BlueprintZoneProps) {
  const items = getBlueprintItemsByZone(blueprint, zone.id);
  const visibleCount = items.filter((item) => isItemVisible(item, overlay)).length;

  const gridClass =
    itemLayout === "grid-3"
      ? "grid grid-cols-3 gap-2 sm:gap-3"
      : itemLayout === "grid-2"
        ? "grid grid-cols-2 gap-2 sm:gap-3"
        : "flex min-w-0 flex-col gap-2";

  return (
    <div
      className={`min-w-0 ${compact ? "" : `${audioStyles.card} ${audioStyles.cardPad}`} space-y-3`}
    >
      <div className="space-y-1">
        <h3
          className={`font-semibold text-slate-50 ${
            compact ? "text-[11px] uppercase tracking-wide sm:text-xs" : "text-base"
          }`}
        >
          {zone.name}
        </h3>
        {zone.beginnerLabel && (
          <p className="text-[10px] leading-snug text-slate-500 sm:text-xs">
            {zone.beginnerLabel}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-slate-600">No equipment assigned.</p>
      ) : (
        <div className={gridClass}>
          {items.map((item) => (
            <BlueprintItemTile
              key={item.id}
              item={item}
              dimmed={overlay !== "all" && !isItemVisible(item, overlay)}
            />
          ))}
        </div>
      )}

      {overlay !== "all" && visibleCount === 0 && items.length > 0 && (
        <p className="text-[10px] text-slate-600 sm:text-xs">
          No {overlay} items in this zone.
        </p>
      )}
    </div>
  );
}
