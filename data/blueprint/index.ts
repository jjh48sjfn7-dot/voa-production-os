import {
  getEquipmentBySlug,
  getEquipmentItemHref,
} from "@/data/audio/v2/equipment";
import {
  getLightingEquipmentBySlug,
  getLightingEquipmentItemHref,
} from "@/data/lighting/v2/equipment";
import {
  getMediaEquipmentBySlug,
  getMediaEquipmentItemHref,
} from "@/data/media/v2/equipment";
import { theaterBlueprint } from "@/data/blueprint/theater";
import type {
  BlueprintDepartment,
  BlueprintItem,
  BlueprintOverlayId,
  BlueprintZone,
  TheaterBlueprint,
} from "@/data/blueprint/types";
import { blueprintStageZoneIds } from "@/data/blueprint/types";

export { theaterBlueprint };

export function getBlueprintZone(
  blueprint: TheaterBlueprint,
  zoneId: string
): BlueprintZone | undefined {
  return blueprint.zones.find((zone) => zone.id === zoneId);
}

export function getBlueprintItem(
  blueprint: TheaterBlueprint,
  itemId: string
): BlueprintItem | undefined {
  return blueprint.items.find((item) => item.id === itemId);
}

export function getBlueprintItemsByZone(
  blueprint: TheaterBlueprint,
  zoneId: string
): BlueprintItem[] {
  return blueprint.items
    .filter((item) => item.zoneId === zoneId)
    .sort((a, b) => {
      if (a.position.col && b.position.col) {
        return a.position.col - b.position.col;
      }
      return a.position.order - b.position.order;
    });
}

export function itemMatchesOverlay(
  item: BlueprintItem,
  overlay: BlueprintOverlayId
): boolean {
  if (overlay === "all") {
    return true;
  }

  if (overlay === "stage") {
    return blueprintStageZoneIds.includes(
      item.zoneId as (typeof blueprintStageZoneIds)[number]
    );
  }

  return item.departments.includes(overlay);
}

export function getItemOverlayOpacity(
  item: BlueprintItem,
  overlay: BlueprintOverlayId
): number {
  if (overlay === "all") {
    return 1;
  }
  return itemMatchesOverlay(item, overlay) ? 1 : 0.22;
}

export function getBlueprintItemsForOverlay(
  blueprint: TheaterBlueprint,
  overlay: BlueprintOverlayId
): BlueprintItem[] {
  if (overlay === "all") {
    return blueprint.items;
  }
  return blueprint.items.filter((item) => itemMatchesOverlay(item, overlay));
}

export function getBlueprintItemHref(item: BlueprintItem): string | undefined {
  if (item.href) {
    return item.href;
  }

  if (!item.equipmentSlug) {
    return undefined;
  }

  if (getLightingEquipmentBySlug(item.equipmentSlug)) {
    return getLightingEquipmentItemHref(item.equipmentSlug);
  }

  if (getMediaEquipmentBySlug(item.equipmentSlug)) {
    return getMediaEquipmentItemHref(item.equipmentSlug);
  }

  if (!getEquipmentBySlug(item.equipmentSlug)) {
    return undefined;
  }

  return getEquipmentItemHref(item.equipmentSlug);
}

export function getEquipmentTroubleshootingHref(
  equipmentSlug: string
): string | undefined {
  const lightingEquipment = getLightingEquipmentBySlug(equipmentSlug);
  if (lightingEquipment) {
    const topicMap: Record<string, string> = {
      "chauvet-slimpar-pro-h-usb": "/lighting/troubleshooting/fixture-not-turning-on",
      "dmxking-micro": "/lighting/troubleshooting/no-dmx-control",
      "lightkey-foh-control": "/lighting/troubleshooting/lightkey-not-connected",
    };
    return topicMap[equipmentSlug];
  }

  const mediaEquipment = getMediaEquipmentBySlug(equipmentSlug);
  if (mediaEquipment) {
    const topicMap: Record<string, string> = {
      "epson-home-cinema-2250": "/media/troubleshooting/projector-has-no-image",
      "roku-confidence-monitor": "/media/troubleshooting/confidence-monitor-is-blank",
      "gofanco-hdmi-extender": "/media/troubleshooting/cat6-extender-no-signal",
    };
    return topicMap[equipmentSlug];
  }

  const equipment = getEquipmentBySlug(equipmentSlug);
  return equipment?.setupLinks?.find((link) =>
    link.href.startsWith("/audio/troubleshooting/")
  )?.href;
}

export function getPrimaryDepartment(
  item: BlueprintItem
): BlueprintDepartment {
  return item.departments[0];
}

export function getSortedZones(blueprint: TheaterBlueprint): BlueprintZone[] {
  return [...blueprint.zones].sort((a, b) => a.order - b.order);
}

export function getDepartmentLabels(item: BlueprintItem): string {
  return item.departments
    .map((department) => department.charAt(0).toUpperCase() + department.slice(1))
    .join(", ");
}

export const blueprintPreviewOverlays: BlueprintOverlayId[] = [
  "all",
  "stage",
  "audio",
  "lighting",
  "media",
  "video",
];
