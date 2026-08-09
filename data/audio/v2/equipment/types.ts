import type { ProductionIconId } from "@/lib/production-icons";

export interface EquipmentConnectionGroup {
  label: string;
  items: string[];
}

export interface EquipmentTroubleshootingItem {
  id: string;
  title: string;
  problem?: string;
  possibleCauses?: string[];
  basicChecks?: string[];
}

export interface EquipmentSpecification {
  label: string;
  value: string;
}

export interface EquipmentDownload {
  label: string;
  href: string;
}

export interface EquipmentRelatedRef {
  slug?: string;
  name: string;
  href?: string;
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
  icon?: ProductionIconId;
  image?: string;
  imageAlt?: string;
  purpose?: string;
  quickStart?: string[];
  channelAssignments?: EquipmentSpecification[];
  specifications?: EquipmentSpecification[];
  primaryConnections?: string[];
  inputs?: string[];
  outputs?: string[];
  connections?: EquipmentConnectionGroup[];
  connectionNotes?: string[];
  sundaySetup?: EquipmentSundaySetupLink;
  setupLinks?: EquipmentSundaySetupLink[];
  bestPractices?: string[];
  commonProblems?: EquipmentTroubleshootingItem[];
  downloads?: EquipmentDownload[];
  relatedEquipment?: EquipmentRelatedRef[];
}

export interface EquipmentCategory {
  id: string;
  title: string;
  icon: ProductionIconId;
  href: string;
  itemSlugs: string[];
}

export interface EquipmentCategoryItem {
  id: string;
  title: string;
  slug: string;
}
