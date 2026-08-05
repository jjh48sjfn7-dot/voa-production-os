import { audioStyles } from "@/lib/audio-styles";

interface EquipmentChannelListProps {
  channels: string[];
}

export function EquipmentChannelList({ channels }: EquipmentChannelListProps) {
  return (
    <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
      {channels.map((channel) => (
        <div
          key={channel}
          className="flex min-h-[48px] items-center px-4 py-3 sm:px-5"
        >
          <p className={`${audioStyles.body} text-slate-200`}>{channel}</p>
        </div>
      ))}
    </div>
  );
}
