import {
  getBlueprintItem,
  getBlueprintItemsByZone,
  getBlueprintItemsForOverlay,
  getBlueprintZone,
  theaterBlueprint,
} from "@/data/blueprint";
import type {
  BlueprintItem,
  BlueprintOverlayId,
  BlueprintZone,
  TheaterBlueprint,
} from "@/data/blueprint/types";
import { getProductionChurch } from "@/lib/production-os/church";

export type { BlueprintItem, BlueprintOverlayId, BlueprintZone, TheaterBlueprint };

/** Existing blueprint instance — do not clone geometry. */
export function getTheaterBlueprint(): TheaterBlueprint {
  return theaterBlueprint;
}

export function getBlueprintZones(): BlueprintZone[] {
  return theaterBlueprint.zones;
}

export function getBlueprintItems(): BlueprintItem[] {
  return theaterBlueprint.items;
}

export {
  getBlueprintItem,
  getBlueprintItemsByZone,
  getBlueprintItemsForOverlay,
  getBlueprintZone,
};

export function getBlueprintVenueContext() {
  const church = getProductionChurch();
  return {
    churchName: church.name,
    campusLabel: church.campusLabel,
    fohLocation: church.fohLocation,
    venueName: theaterBlueprint.venue.name,
    zoneIds: theaterBlueprint.zones.map((zone) => zone.id),
    itemIds: theaterBlueprint.items.map((item) => item.id),
  };
}
