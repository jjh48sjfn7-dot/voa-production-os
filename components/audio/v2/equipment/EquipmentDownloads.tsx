import { RelatedResources, type RelatedResourceItem } from "@/components/shared/RelatedResources";
import type { EquipmentDownload } from "@/data/audio/v2/equipment/types";

interface EquipmentDownloadsProps {
  downloads: EquipmentDownload[];
}

export function EquipmentDownloads({ downloads }: EquipmentDownloadsProps) {
  const items: RelatedResourceItem[] = downloads.map((download) => ({
    title: download.label,
    href: download.href,
  }));

  return <RelatedResources items={items} />;
}
