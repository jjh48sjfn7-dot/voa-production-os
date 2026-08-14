import { formatHistoryDate } from "@/lib/volunteer/labels";
import type { TrainingHistoryEntry } from "@/lib/volunteer/types";
import { volunteerUi } from "@/lib/volunteer/ui";

interface TrainingHistoryListProps {
  entries: TrainingHistoryEntry[];
}

export function TrainingHistoryList({ entries }: TrainingHistoryListProps) {
  if (entries.length === 0) {
    return <p className={volunteerUi.body}>No training history yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {entries.map((entry) => (
        <li key={entry.id} className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[15px] font-medium text-white">{entry.title}</p>
              {entry.detail && (
                <p className={`mt-1 ${volunteerUi.muted}`}>{entry.detail}</p>
              )}
              <p className="mt-1 text-[12px] text-white/35">
                {formatHistoryDate(entry.completedAt)}
              </p>
            </div>
            <span className="shrink-0 text-[12px] font-medium text-white/50">
              {entry.kind === "checkoff" ? "Completed items" : "Complete"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
