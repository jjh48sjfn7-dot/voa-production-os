import type { ProductionIconId } from "@/lib/production-icons";

export interface SignalFlowNode {
  id: string;
  name: string;
  icon: ProductionIconId;
  equipmentSlug?: string;
}

export interface SignalFlowPath {
  id: string;
  nodes: SignalFlowNode[];
}

export interface SignalFlowLink {
  title: string;
  href: string;
}

export interface SignalFlowDocument {
  id: string;
  title: string;
  subtitle: string;
  paths: SignalFlowPath[];
  relatedLinks: SignalFlowLink[];
}
