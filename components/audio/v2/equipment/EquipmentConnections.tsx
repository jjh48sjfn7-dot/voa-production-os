import { audioStyles } from "@/lib/audio-styles";
import type { EquipmentConnectionGroup } from "@/data/audio/v2/equipment/types";

function ConnectionCard({ group }: { group: EquipmentConnectionGroup }) {
  return (
    <div className={`${audioStyles.card} ${audioStyles.cardPad}`}>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {group.label}
      </p>
      <ul className="mt-2 space-y-1.5">
        {group.items.map((item) => (
          <li key={item} className={`${audioStyles.body} text-slate-200`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface EquipmentConnectionsProps {
  groups: EquipmentConnectionGroup[];
}

export function EquipmentConnections({ groups }: EquipmentConnectionsProps) {
  return (
    <div className="space-y-2">
      {groups.map((group) => (
        <ConnectionCard key={group.label} group={group} />
      ))}
    </div>
  );
}
