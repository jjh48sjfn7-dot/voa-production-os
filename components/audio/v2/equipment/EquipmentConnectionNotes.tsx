import { InfoCard } from "@/components/shared/InfoCard";

interface EquipmentConnectionNotesProps {
  notes: string[];
}

export function EquipmentConnectionNotes({ notes }: EquipmentConnectionNotesProps) {
  return <InfoCard items={notes} />;
}
