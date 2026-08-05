import { audioStyles } from "@/lib/audio-styles";

interface EquipmentPrimaryConnectionsProps {
  connections: string[];
}

export function EquipmentPrimaryConnections({
  connections,
}: EquipmentPrimaryConnectionsProps) {
  return (
    <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
      {connections.map((connection) => (
        <div
          key={connection}
          className="flex min-h-[48px] items-center px-4 py-3 sm:px-5"
        >
          <p className={`${audioStyles.body} text-slate-200`}>{connection}</p>
        </div>
      ))}
    </div>
  );
}
