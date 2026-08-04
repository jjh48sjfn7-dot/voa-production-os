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

export interface EquipmentRelatedItem {
  title: string;
  href: string;
}

export interface EquipmentManual {
  slug: string;
  name: string;
  categoryHref: string;
  categoryTitle: string;
  purpose: string;
  quickStart: string[];
  connections: EquipmentConnectionGroup[];
  sundaySetup: {
    href: string;
    label: string;
    description: string;
  };
  troubleshooting: EquipmentTroubleshootingItem[];
  downloads: EquipmentDownload[];
  related: EquipmentRelatedItem[];
}
