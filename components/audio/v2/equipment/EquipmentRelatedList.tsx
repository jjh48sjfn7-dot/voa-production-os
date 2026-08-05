import { audioStyles } from "@/lib/audio-styles";
import { EquipmentItemRow } from "@/components/audio/v2/EquipmentItemRow";
import { getEquipmentItemHref } from "@/data/audio/v2/equipment";
import type { EquipmentRelatedRef } from "@/data/audio/v2/equipment/types";

interface EquipmentRelatedListProps {
  items: EquipmentRelatedRef[];
}

export function EquipmentRelatedList({ items }: EquipmentRelatedListProps) {
  return (
    <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
      {items.map((item) => (
        <EquipmentItemRow
          key={item.href ?? item.slug ?? item.name}
          title={item.name}
          href={item.href ?? getEquipmentItemHref(item.slug!)}
        />
      ))}
    </div>
  );
}
