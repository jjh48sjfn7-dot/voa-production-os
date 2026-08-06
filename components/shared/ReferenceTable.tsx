import { audioStyles } from "@/lib/audio-styles";
import { DividedCard } from "@/components/shared/DividedCard";

export interface ReferenceTableColumn {
  key: string;
  label: string;
}

export interface ReferenceTableRow {
  [key: string]: string;
}

interface ReferenceDataTableProps {
  variant: "table";
  columns: ReferenceTableColumn[];
  rows: ReferenceTableRow[];
}

interface ReferenceKeyValueRow {
  label: string;
  value: string;
}

interface ReferenceKeyValueProps {
  variant: "key-value";
  rows: ReferenceKeyValueRow[];
  header?: string;
}

interface ReferenceListProps {
  variant: "list";
  items: string[];
}

interface ReferenceAssignmentField {
  label: string;
  value: string;
}

interface ReferenceAssignmentProps {
  variant: "assignment";
  channel: number;
  fields: ReferenceAssignmentField[];
}

export type ReferenceTableProps =
  | ReferenceDataTableProps
  | ReferenceKeyValueProps
  | ReferenceListProps
  | ReferenceAssignmentProps;

export function ReferenceTable(props: ReferenceTableProps) {
  if (props.variant === "table") {
    return (
      <div className={`overflow-hidden ${audioStyles.card}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                {props.columns.map((column) => (
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
              {props.rows.map((row, index) => (
                <tr key={`${index}-${row[props.columns[0]?.key ?? "row"]}`}>
                  {props.columns.map((column) => (
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

  if (props.variant === "list") {
    return (
      <DividedCard>
        {props.items.map((item) => (
          <div
            key={item}
            className="flex min-h-[48px] items-center px-4 py-3 sm:px-5"
          >
            <p className={`${audioStyles.body} text-slate-200`}>{item}</p>
          </div>
        ))}
      </DividedCard>
    );
  }

  if (props.variant === "assignment") {
    return (
      <DividedCard>
        <div className="flex min-h-[48px] items-center px-4 py-3 sm:px-5">
          <p className={`${audioStyles.heading} text-slate-50`}>
            Channel {props.channel}
          </p>
        </div>
        {props.fields.map((field) => (
          <div
            key={field.label}
            className="flex min-h-[48px] items-center justify-between gap-4 px-4 py-3 sm:px-5"
          >
            <p className={`${audioStyles.body} text-slate-500`}>{field.label}</p>
            <p className={`${audioStyles.body} text-right text-slate-200`}>
              {field.value}
            </p>
          </div>
        ))}
      </DividedCard>
    );
  }

  return (
    <DividedCard>
      {props.header && (
        <div className="flex min-h-[48px] items-center px-4 py-3 sm:px-5">
          <p className={`${audioStyles.heading} text-slate-50`}>{props.header}</p>
        </div>
      )}
      {props.rows.map((row) => (
        <div
          key={row.label}
          className="flex min-h-[48px] items-center justify-between gap-4 px-4 py-3 sm:px-5"
        >
          <p className={`${audioStyles.body} text-slate-500`}>{row.label}</p>
          <p className={`${audioStyles.body} text-right text-slate-200`}>{row.value}</p>
        </div>
      ))}
    </DividedCard>
  );
}
