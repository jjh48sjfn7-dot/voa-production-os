import type { EquipmentRelatedRef } from "@/data/audio/v2/equipment/types";

export const standardRelatedEquipment: EquipmentRelatedRef[] = [
  { slug: "yamaha-tf5", name: "TF5" },
  { slug: "stage-snake-a", name: "Stage Snake A" },
  { slug: "stage-snake-b", name: "Stage Snake B" },
  { slug: "shure-blx-receiver", name: "BLX288" },
];

export const standardRelatedDocumentation: EquipmentRelatedRef[] = [
  { name: "Input Patch List", href: "/audio/documentation/input-patch-list" },
  { name: "TF5 Channel List", href: "/audio/documentation/tf5-channel-list" },
  { name: "Output Routing", href: "/audio/documentation/output-routing" },
  { name: "Signal Flow", href: "/audio/documentation/signal-flow" },
  { name: "Sunday Setup", href: "/audio/setup" },
];
