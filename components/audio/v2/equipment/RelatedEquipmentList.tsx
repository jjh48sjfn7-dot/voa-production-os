import { audioStyles } from "@/lib/audio-styles";
import { EquipmentItemRow } from "@/components/audio/v2/EquipmentItemRow";
import type { EquipmentRelatedItem } from "@/data/audio/v2/equipment-manuals/types";

interface RelatedEquipmentListProps {
  items: EquipmentRelatedItem[];
}

export function RelatedEquipmentList({ items }: RelatedEquipmentListProps) {
  return (
    <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
      {items.map((item) => (
        <EquipmentItemRow key={item.href} title={item.title} href={item.href} />
      ))}
    </div>
  );
}
