import type { EquipmentCategory } from "@/data/lighting/v2/equipment/types";

export const lightingEquipmentCategories: EquipmentCategory[] = [
  {
    id: "fixtures",
    title: "Fixtures",
    icon: "fixture",
    href: "/lighting/equipment/fixtures",
    itemSlugs: ["chauvet-slimpar-pro-h-usb"],
  },
  {
    id: "control",
    title: "Control",
    icon: "dmx-control",
    href: "/lighting/equipment/control",
    itemSlugs: ["lightkey-foh-control", "dmxking-micro"],
  },
];
