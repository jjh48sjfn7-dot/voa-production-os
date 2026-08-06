import { RelatedResources, type RelatedResourceItem } from "@/components/shared/RelatedResources";
import { getEquipmentItemHref } from "@/data/audio/v2/equipment";
import type { EquipmentRelatedRef } from "@/data/audio/v2/equipment/types";

interface EquipmentRelatedListProps {
  items: EquipmentRelatedRef[];
}

export function EquipmentRelatedList({ items }: EquipmentRelatedListProps) {
  const relatedItems: RelatedResourceItem[] = items.map((item) => ({
    title: item.name,
    href: item.href ?? (item.slug ? getEquipmentItemHref(item.slug) : undefined),
  }));

  return <RelatedResources items={relatedItems} />;
}
