export interface EquipmentItem {
  id: string;
  title: string;
  slug: string;
}

export interface EquipmentCategory {
  id: string;
  title: string;
  emoji: string;
  href: string;
  items: EquipmentItem[];
}

export const equipmentCategories: EquipmentCategory[] = [
  {
    id: "console",
    title: "Console",
    emoji: "🎚️",
    href: "/audio/equipment/console",
    items: [{ id: "yamaha-tf5", title: "Yamaha TF5", slug: "yamaha-tf5" }],
  },
  {
    id: "wireless",
    title: "Wireless",
    emoji: "🎤",
    href: "/audio/equipment/wireless",
    items: [
      {
        id: "blx-receiver-1",
        title: "Shure BLX Dual Receiver 1",
        slug: "shure-blx-dual-receiver-1",
      },
      {
        id: "blx-receiver-2",
        title: "Shure BLX Dual Receiver 2",
        slug: "shure-blx-dual-receiver-2",
      },
      {
        id: "wireless-microphones",
        title: "Wireless Microphones",
        slug: "wireless-microphones",
      },
    ],
  },
  {
    id: "foh-speakers",
    title: "FOH Speakers",
    emoji: "🔊",
    href: "/audio/equipment/foh-speakers",
    items: [
      {
        id: "kw153-left",
        title: "QSC KW153 — Left",
        slug: "qsc-kw153-left",
      },
      {
        id: "kw153-right",
        title: "QSC KW153 — Right",
        slug: "qsc-kw153-right",
      },
    ],
  },
  {
    id: "monitors",
    title: "Monitors",
    emoji: "📣",
    href: "/audio/equipment/monitors",
    items: [
      {
        id: "monitor-left",
        title: "Stage Monitor — Left",
        slug: "stage-monitor-left",
      },
      {
        id: "monitor-right",
        title: "Stage Monitor — Right",
        slug: "stage-monitor-right",
      },
      {
        id: "drummer-ie",
        title: "Drummer In-Ear System",
        slug: "drummer-in-ear-system",
      },
    ],
  },
  {
    id: "stage-boxes",
    title: "Stage Boxes",
    emoji: "🔌",
    href: "/audio/equipment/stage-boxes",
    items: [
      { id: "snake-a", title: "Stage Snake A", slug: "stage-snake-a" },
      { id: "snake-b", title: "Stage Snake B", slug: "stage-snake-b" },
    ],
  },
  {
    id: "microphones",
    title: "Microphones",
    emoji: "🎙️",
    href: "/audio/equipment/microphones",
    items: [
      {
        id: "mic-pastor",
        title: "Pastor Wireless Microphone",
        slug: "pastor-wireless-microphone",
      },
      {
        id: "mic-worship-leader",
        title: "Worship Leader Wireless Microphone",
        slug: "worship-leader-wireless-microphone",
      },
      {
        id: "mic-wireless-3",
        title: "Wireless Microphone 3",
        slug: "wireless-microphone-3",
      },
      {
        id: "mic-wireless-4",
        title: "Wireless Microphone 4",
        slug: "wireless-microphone-4",
      },
      {
        id: "mic-kick",
        title: "Kick Microphone",
        slug: "kick-microphone",
      },
      {
        id: "mic-snare",
        title: "Snare Microphone",
        slug: "snare-microphone",
      },
      {
        id: "mic-overhead-1",
        title: "Overhead Microphone 1",
        slug: "overhead-microphone-1",
      },
      {
        id: "mic-overhead-2",
        title: "Overhead Microphone 2",
        slug: "overhead-microphone-2",
      },
    ],
  },
  {
    id: "playback",
    title: "Playback",
    emoji: "💻",
    href: "/audio/equipment/playback",
    items: [
      {
        id: "media-computer",
        title: "Media Computer",
        slug: "media-computer",
      },
      {
        id: "playback-connection",
        title: "Audio Playback Connection",
        slug: "audio-playback-connection",
      },
    ],
  },
  {
    id: "accessories",
    title: "Accessories",
    emoji: "🧰",
    href: "/audio/equipment/accessories",
    items: [
      { id: "xlr-cables", title: "XLR Cables", slug: "xlr-cables" },
      { id: "power-cables", title: "Power Cables", slug: "power-cables" },
      {
        id: "wireless-xlr-cables",
        title: "Color-Coded Wireless XLR Cables",
        slug: "color-coded-wireless-xlr-cables",
      },
      {
        id: "mic-stands",
        title: "Microphone Stands",
        slug: "microphone-stands",
      },
      {
        id: "speaker-stands",
        title: "Speaker Stands",
        slug: "speaker-stands",
      },
      { id: "cable-covers", title: "Cable Covers", slug: "cable-covers" },
      { id: "adapters", title: "Adapters", slug: "adapters" },
      { id: "di-boxes", title: "DI Boxes", slug: "di-boxes" },
    ],
  },
];

export function getEquipmentCategory(
  id: string
): EquipmentCategory | undefined {
  return equipmentCategories.find((category) => category.id === id);
}

export function getEquipmentItem(
  categoryId: string,
  slug: string
): { category: EquipmentCategory; item: EquipmentItem } | undefined {
  const category = getEquipmentCategory(categoryId);

  if (!category) {
    return undefined;
  }

  const item = category.items.find((entry) => entry.slug === slug);

  if (!item) {
    return undefined;
  }

  return { category, item };
}

export function getEquipmentDetailParams(): {
  category: string;
  slug: string;
}[] {
  return equipmentCategories.flatMap((category) =>
    category.items.map((item) => ({
      category: category.id,
      slug: item.slug,
    }))
  );
}
