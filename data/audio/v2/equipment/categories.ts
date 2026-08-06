import type { EquipmentCategory } from "@/data/audio/v2/equipment/types";

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: "console",
    title: "Console",
    emoji: "🎚️",
    href: "/audio/equipment/console",
    itemSlugs: ["yamaha-tf5"],
  },
  {
    id: "wireless",
    title: "Wireless",
    emoji: "🎤",
    href: "/audio/equipment/wireless",
    itemSlugs: ["shure-blx-dual-receiver-1", "shure-blx-dual-receiver-2"],
  },
  {
    id: "foh-speakers",
    title: "FOH Speakers",
    emoji: "🔊",
    href: "/audio/equipment/foh-speakers",
    itemSlugs: ["qsc-kw153-left", "qsc-kw153-right"],
  },
  {
    id: "monitors",
    title: "Monitors",
    emoji: "📣",
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
    emoji: "🔌",
    href: "/audio/equipment/stage-boxes",
    itemSlugs: ["stage-snake-a", "stage-snake-b"],
  },
  {
    id: "playback",
    title: "Playback",
    emoji: "💻",
    href: "/audio/equipment/playback",
    itemSlugs: ["media-computer", "audio-playback-connection"],
  },
  {
    id: "accessories",
    title: "Accessories",
    emoji: "🧰",
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
