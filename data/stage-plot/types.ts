export type StagePlotItemType = "equipment" | "position" | "stage";

export interface StagePlotItemData {
  id: string;
  name: string;
  icon: string;
  equipmentSlug?: string;
  href?: string;
  itemType: StagePlotItemType;
  position: string;
  locationNotes?: string[];
}

export interface StagePlotMapZone {
  id: string;
  title: string;
  plainTitle?: string;
  itemIds: string[];
}

export interface StagePlotMapRow {
  id: string;
  zones: StagePlotMapZone[];
}

export interface StagePlotIntro {
  title: string;
  body: string[];
}

export interface StagePlotLink {
  title: string;
  href: string;
}

export interface StagePlotDocument {
  id: string;
  title: string;
  subtitle: string;
  intro: StagePlotIntro;
  items: StagePlotItemData[];
  mapRows: StagePlotMapRow[];
  relatedLinks: StagePlotLink[];
}

export interface StagePlotArea {
  id: string;
  title: string;
  order: number;
  columnGroup?: string;
  items: StagePlotItemData[];
}
