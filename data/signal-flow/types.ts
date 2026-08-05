export interface SignalFlowNode {
  id: string;
  name: string;
  emoji: string;
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
