import type { LucideIcon } from "lucide-react";
import {
  Box,
  Cable,
  Disc3,
  Mic2,
  SlidersHorizontal,
  Speaker,
} from "lucide-react";

export interface EquipmentCategory {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: "console",
    title: "Console",
    href: "/audio/equipment/console",
    icon: SlidersHorizontal,
  },
  {
    id: "wireless",
    title: "Wireless",
    href: "/audio/equipment/wireless",
    icon: Mic2,
  },
  {
    id: "speakers",
    title: "Speakers",
    href: "/audio/equipment/speakers",
    icon: Speaker,
  },
  {
    id: "stage-boxes",
    title: "Stage Boxes",
    href: "/audio/equipment/stage-boxes",
    icon: Box,
  },
  {
    id: "playback",
    title: "Playback",
    href: "/audio/equipment/playback",
    icon: Disc3,
  },
  {
    id: "accessories",
    title: "Accessories",
    href: "/audio/equipment/accessories",
    icon: Cable,
  },
];

export function getEquipmentCategory(id: string): EquipmentCategory | undefined {
  return equipmentCategories.find((category) => category.id === id);
}
