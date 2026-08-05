import { audioStyles } from "@/lib/audio-styles";

interface EquipmentConnectionNotesProps {
  notes: string[];
}

export function EquipmentConnectionNotes({ notes }: EquipmentConnectionNotesProps) {
  return (
    <div className={`${audioStyles.card} ${audioStyles.cardPad}`}>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note} className={`${audioStyles.body} text-slate-300`}>
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
