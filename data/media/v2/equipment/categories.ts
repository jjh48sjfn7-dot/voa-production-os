import type { EquipmentCategory } from "@/data/media/v2/equipment/types";

export const mediaEquipmentCategories: EquipmentCategory[] = [
  {
    id: "displays",
    title: "Displays",
    icon: "screen",
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
    icon: "projector",
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
    icon: "computer",
    href: "/media/equipment/control",
    itemSlugs: ["foh-mac"],
  },
];
