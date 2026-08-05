import { audioStyles } from "@/lib/audio-styles";
import type { EquipmentSpecification } from "@/data/audio/v2/equipment/types";

interface EquipmentSpecificationsProps {
  items: EquipmentSpecification[];
}

export function EquipmentSpecifications({ items }: EquipmentSpecificationsProps) {
  return (
    <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-h-[48px] items-center justify-between gap-4 px-4 py-3 sm:px-5"
        >
          <p className={`${audioStyles.body} text-slate-500`}>{item.label}</p>
          <p className={`${audioStyles.body} text-right text-slate-200`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
