import {
  ReferenceTable,
  type ReferenceTableColumn,
  type ReferenceTableRow,
} from "@/components/shared/ReferenceTable";

interface DocumentationTableProps {
  columns: ReferenceTableColumn[];
  rows: ReferenceTableRow[];
}

export function DocumentationTable({ columns, rows }: DocumentationTableProps) {
  return <ReferenceTable variant="table" columns={columns} rows={rows} />;
}
