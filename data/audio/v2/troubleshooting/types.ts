import type { LucideIcon } from "lucide-react";
import type { EquipmentRelatedRef } from "@/data/audio/v2/equipment/types";
import type { SignalFlowPath } from "@/data/signal-flow/types";

export interface TroubleshootingTopicMeta {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface TroubleshootingGuide {
  id: string;
  problem: string;
  signalPath: SignalFlowPath;
  checks: string[];
  relatedEquipment: EquipmentRelatedRef[];
  relatedDocumentation: EquipmentRelatedRef[];
}
