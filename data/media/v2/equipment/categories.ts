import type { EquipmentCategory } from "@/data/media/v2/equipment/types";

export const mediaEquipmentCategories: EquipmentCategory[] = [
  {
    id: "displays",
    title: "Displays",
    emoji: "🖥️",
    href: "/media/equipment/displays",
    itemSlugs: [
      "skerell-projection-screen",
      "roku-confidence-monitor",
      "confidence-monitor-stand",
    ],
  },
  {
    id: "projection",
    title: "Projection",
    emoji: "📽️",
    href: "/media/equipment/projection",
    itemSlugs: [
      "epson-home-cinema-2250",
      "gofanco-hdmi-extender",
      "cat6-projector-cable",
      "usb-c-hdmi-adapters",
    ],
  },
  {
    id: "control",
    title: "Control",
    emoji: "💻",
    href: "/media/equipment/control",
    itemSlugs: ["foh-mac"],
  },
];
