import type { EquipmentManual } from "@/data/audio/v2/equipment-manuals/types";
import { yamahaTf5Manual } from "@/data/audio/v2/equipment-manuals/yamaha-tf5";

const equipmentManuals: Record<string, EquipmentManual> = {
  [yamahaTf5Manual.slug]: yamahaTf5Manual,
};

export function getEquipmentManual(slug: string): EquipmentManual | undefined {
  return equipmentManuals[slug];
}

export type {
  EquipmentManual,
  EquipmentConnectionGroup,
  EquipmentTroubleshootingItem,
  EquipmentDownload,
  EquipmentRelatedItem,
} from "@/data/audio/v2/equipment-manuals/types";
