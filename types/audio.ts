import type { LucideIcon } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface AudioPageMeta {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export type ChannelStatus = "active" | "spare" | "offline";

export interface ChannelAssignment {
  id: string;
  channel: number;
  name: string;
  microphone: string;
  source: string;
  type: "vocal" | "instrument" | "playback" | "talkback";
  gain: string;
  phantom: boolean;
  hpf: string;
  cableType: string;
  stageBox: 0 | 1 | 2;
  monitorMix?: string;
  monitorSends?: string[];
  colorTag: string;
  status: ChannelStatus;
  notes?: string;
}

export interface InventoryEntry {
  id: string;
  assetNumber: string;
  name: string;
  category: string;
  quantity: number;
  location: string;
  status: "available" | "in-use" | "maintenance";
  condition: "excellent" | "good" | "fair" | "needs-service";
  lastService?: string;
  nextService?: string;
}

export interface TopologyNode {
  id: string;
  label: string;
  description: string;
  icon?: LucideIcon;
  outputs?: string[];
}

export interface TopologyConnection {
  from: string;
  to: string;
  label: string;
}

export interface DiagnosticStep {
  id: string;
  label: string;
  expectedResult: string;
  ifFailed: string;
}

export interface TroubleshootingIssue {
  id: string;
  title: string;
  severity: "low" | "medium" | "high";
  estimatedTime: string;
  emergency?: boolean;
  symptoms: string[];
  checklistId: string;
  steps: DiagnosticStep[];
  recommendedActions: string[];
  resolution: string;
}

export interface ContentBlock {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  type: "checklist" | "list" | "info";
  items?: { id: string; label: string }[];
  listItems?: string[];
  info?: string;
}

export interface Tf5Stat {
  id: string;
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}

export interface EmergencyProcedure {
  id: string;
  title: string;
  steps: string[];
}

export interface QuickReferenceCard {
  id: string;
  title: string;
  value: string;
  hint?: string;
}

// Legacy aliases
export type SignalNode = TopologyNode;
export type SignalConnection = TopologyConnection;
