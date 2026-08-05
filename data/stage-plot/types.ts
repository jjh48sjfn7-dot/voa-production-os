export interface StagePlotItem {
  id: string;
  name: string;
  emoji: string;
  equipmentReference?: string;
  position: string;
  category: string;
}

export interface StagePlotZone {
  id: string;
  title: string;
  columnGroup?: string;
  items: StagePlotItem[];
}

export interface StagePlotLink {
  title: string;
  href: string;
}

export interface StagePlotDocument {
  id: string;
  title: string;
  subtitle: string;
  zones: StagePlotZone[];
  relatedLinks: StagePlotLink[];
}
