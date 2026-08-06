import { ReferenceTable } from "@/components/shared/ReferenceTable";

interface EquipmentChannelListProps {
  channels: string[];
}

export function EquipmentChannelList({ channels }: EquipmentChannelListProps) {
  return <ReferenceTable variant="list" items={channels} />;
}
