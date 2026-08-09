import type { ProductionIconId } from "@/lib/production-icons";

export interface SignalFlowLink {
  title: string;
  href: string;
}

export interface SignalFlowStep {
  id: string;
  helper?: string;
  lines: string[];
  icon?: ProductionIconId;
  equipmentSlug?: string;
  href?: string;
}

export interface SignalFlowDrumSource {
  id: string;
  name: string;
  snakeInput: string;
  channel: string;
}

export interface SignalFlowWirelessColor {
  id: string;
  color: string;
  localInput: string;
  channel: string;
}

export interface SignalFlowWirelessLayout {
  headSteps: SignalFlowStep[];
  colors: SignalFlowWirelessColor[];
  tailSteps: SignalFlowStep[];
}

export interface SignalFlowMonitorPath {
  id: string;
  title: string;
  steps: SignalFlowStep[];
}

export interface SignalFlowGroup {
  id: string;
  title: string;
  steps?: SignalFlowStep[];
  drumSources?: SignalFlowDrumSource[];
  wireless?: SignalFlowWirelessLayout;
  monitorPaths?: SignalFlowMonitorPath[];
  relatedLinks: SignalFlowLink[];
}

export interface SignalFlowVolunteerDocument {
  id: string;
  title: string;
  subtitle: string;
  intro: {
    title: string;
    body: string[];
  };
  groups: SignalFlowGroup[];
  relatedDocumentation: SignalFlowLink[];
}
