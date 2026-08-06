import { ReferenceTable } from "@/components/shared/ReferenceTable";

interface EquipmentPrimaryConnectionsProps {
  connections: string[];
}

export function EquipmentPrimaryConnections({
  connections,
}: EquipmentPrimaryConnectionsProps) {
  return <ReferenceTable variant="list" items={connections} />;
}
