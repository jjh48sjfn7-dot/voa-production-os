import { EquipmentConnectionNotes } from "@/components/audio/v2/equipment/EquipmentConnectionNotes";

interface EquipmentBestPracticesProps {
  practices: string[];
}

export function EquipmentBestPractices({ practices }: EquipmentBestPracticesProps) {
  return <EquipmentConnectionNotes notes={practices} />;
}
