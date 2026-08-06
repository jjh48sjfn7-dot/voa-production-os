import { ReferenceTable } from "@/components/shared/ReferenceTable";
import type { EquipmentSpecification } from "@/data/audio/v2/equipment/types";

interface EquipmentSpecificationsProps {
  items: EquipmentSpecification[];
}

export function EquipmentSpecifications({ items }: EquipmentSpecificationsProps) {
  return (
    <ReferenceTable
      variant="key-value"
      rows={items.map((item) => ({ label: item.label, value: item.value }))}
    />
  );
}
