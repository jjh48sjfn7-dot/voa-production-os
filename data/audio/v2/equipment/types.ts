export interface EquipmentConnectionGroup {
  label: string;
  items: string[];
}

export interface EquipmentTroubleshootingItem {
  id: string;
  title: string;
  problem: string;
  possibleCauses: string[];
  basicChecks: string[];
}

export interface EquipmentDownload {
  label: string;
  href: string;
}

export interface EquipmentRelatedRef {
  slug: string;
  name: string;
}

export interface EquipmentSundaySetupLink {
  href: string;
  label: string;
  description?: string;
}

export interface EquipmentDefinition {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  icon?: string;
  image?: string;
  purpose?: string;
  quickStart?: string[];
  inputs?: string[];
  outputs?: string[];
  connections?: EquipmentConnectionGroup[];
  connectionNotes?: string[];
  sundaySetup?: EquipmentSundaySetupLink;
  commonProblems?: EquipmentTroubleshootingItem[];
  downloads?: EquipmentDownload[];
  relatedEquipment?: EquipmentRelatedRef[];
}

export interface EquipmentCategory {
  id: string;
  title: string;
  emoji: string;
  href: string;
  itemSlugs: string[];
}

export interface EquipmentCategoryItem {
  id: string;
  title: string;
  slug: string;
}
