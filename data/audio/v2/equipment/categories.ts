import type { ProductionIconId } from "@/lib/production-icons";
import type { EquipmentCategory } from "@/data/audio/v2/equipment/types";

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: "console",
    title: "Console",
    icon: "console",
    href: "/audio/equipment/console",
    itemSlugs: ["yamaha-tf5"],
  },
  {
    id: "wireless",
    title: "Wireless",
    icon: "microphone",
    href: "/audio/equipment/wireless",
    itemSlugs: ["shure-blx-dual-receiver-1", "shure-blx-dual-receiver-2"],
  },
  {
    id: "foh-speakers",
    title: "FOH Speakers",
    icon: "speaker",
    href: "/audio/equipment/foh-speakers",
    itemSlugs: ["qsc-kw153-left", "qsc-kw153-right"],
  },
  {
    id: "subwoofer",
    title: "Subwoofer",
    icon: "subwoofer",
    href: "/audio/equipment/subwoofer",
    itemSlugs: ["subwoofer"],
  },
  {
    id: "monitors",
    title: "Monitors",
    icon: "monitor",
    href: "/audio/equipment/monitors",
    itemSlugs: [
      "stage-monitor-left",
      "stage-monitor-right",
      "drummer-in-ear-system",
    ],
  },
  {
    id: "stage-boxes",
    title: "Stage Boxes",
    icon: "cable",
    href: "/audio/equipment/stage-boxes",
    itemSlugs: ["stage-snake-a", "stage-snake-b"],
  },
  {
    id: "keyboard",
    title: "Keyboard",
    icon: "keyboard",
    href: "/audio/equipment/keyboard",
    itemSlugs: ["keyboard"],
  },
  {
    id: "playback",
    title: "Playback",
    icon: "computer",
    href: "/audio/equipment/playback",
    itemSlugs: ["media-computer"],
  },
  {
    id: "accessories",
    title: "Accessories",
    icon: "tools",
    href: "/audio/equipment/accessories",
    itemSlugs: [
      "xlr-cables",
      "power-cables",
      "color-coded-wireless-xlr-cables",
      "microphone-stands",
      "speaker-stands",
      "cable-covers",
      "adapters",
      "di-boxes",
    ],
  },
];
