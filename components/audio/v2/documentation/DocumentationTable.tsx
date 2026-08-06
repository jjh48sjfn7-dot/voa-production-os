import { audioStyles } from "@/lib/audio-styles";
import type {
  DocumentationTableColumn,
  DocumentationTableRow,
} from "@/data/audio/v2/documentation/types";

interface DocumentationTableProps {
  columns: DocumentationTableColumn[];
  rows: DocumentationTableRow[];
}

export function DocumentationTable({ columns, rows }: DocumentationTableProps) {
  return (
    <div className={`overflow-hidden ${audioStyles.card}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-4 py-3 text-left ${audioStyles.patchLabel} sm:px-5`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {rows.map((row, index) => (
              <tr key={`${index}-${row[columns[0]?.key ?? "row"]}`}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="min-h-[48px] px-4 py-3 align-top sm:px-5"
                  >
                    <p className={`${audioStyles.body} text-slate-200`}>
                      {row[column.key]}
                    </p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
