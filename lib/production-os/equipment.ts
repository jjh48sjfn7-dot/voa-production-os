import { equipmentItems } from "@/data/audio/v2/equipment/items";
import {
  getEquipmentBySlug as getAudioEquipmentBySlug,
  getEquipmentItemHref as getAudioEquipmentItemHref,
} from "@/data/audio/v2/equipment";
import { lightingEquipmentItems } from "@/data/lighting/v2/equipment/items";
import {
  getLightingEquipmentBySlug,
  getLightingEquipmentItemHref,
} from "@/data/lighting/v2/equipment";
import { mediaEquipmentItems } from "@/data/media/v2/equipment/items";
import {
  getMediaEquipmentBySlug,
  getMediaEquipmentItemHref,
} from "@/data/media/v2/equipment";
import type { EquipmentDefinition } from "@/data/audio/v2/equipment/types";
import type { ProductionDepartmentId } from "@/lib/production-os/departments";

export type { EquipmentDefinition };

export function getDepartmentEquipment(
  departmentId: ProductionDepartmentId
): EquipmentDefinition[] {
  switch (departmentId) {
    case "audio":
      return equipmentItems;
    case "lighting":
      return lightingEquipmentItems;
    case "media":
      return mediaEquipmentItems;
  }
}

export function getEquipmentBySlug(
  departmentId: ProductionDepartmentId,
  slug: string
): EquipmentDefinition | undefined {
  switch (departmentId) {
    case "audio":
      return getAudioEquipmentBySlug(slug);
    case "lighting":
      return getLightingEquipmentBySlug(slug);
    case "media":
      return getMediaEquipmentBySlug(slug);
  }
}

export function getEquipmentById(
  departmentId: ProductionDepartmentId,
  id: string
): EquipmentDefinition | undefined {
  return getDepartmentEquipment(departmentId).find((item) => item.id === id);
}

export function getEquipmentItemHref(
  departmentId: ProductionDepartmentId,
  slug: string
): string {
  switch (departmentId) {
    case "audio":
      return getAudioEquipmentItemHref(slug);
    case "lighting":
      return getLightingEquipmentItemHref(slug);
    case "media":
      return getMediaEquipmentItemHref(slug);
  }
}
