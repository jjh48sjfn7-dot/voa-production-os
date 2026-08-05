export type StagePlotItemType = "equipment" | "position" | "stage";

export interface StagePlotItemData {
  id: string;
  name: string;
  icon: string;
  equipmentSlug?: string;
  href?: string;
  itemType: StagePlotItemType;
  position: string;
}

export interface StagePlotArea {
  id: string;
  title: string;
  order: number;
  columnGroup?: string;
  items: StagePlotItemData[];
}

export interface StagePlotLink {
  title: string;
  href: string;
}

export interface StagePlotDocument {
  id: string;
  title: string;
  subtitle: string;
  areas: StagePlotArea[];
  relatedLinks: StagePlotLink[];
}
