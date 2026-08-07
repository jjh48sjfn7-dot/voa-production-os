import type { BlueprintDepartment } from "@/data/blueprint/types";
import {
  blueprintDepartmentColors,
  blueprintDepartmentLabels,
} from "@/data/blueprint/types";

interface BlueprintLegendProps {
  departments: BlueprintDepartment[];
}

export function BlueprintLegend({ departments }: BlueprintLegendProps) {
  return (
    <div className="flex flex-wrap gap-3 sm:gap-4">
      {departments.map((department) => (
        <div key={department} className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${blueprintDepartmentColors[department].dot}`}
            aria-hidden
          />
          <span className="text-xs text-slate-400">
            {blueprintDepartmentLabels[department]}
          </span>
        </div>
      ))}
    </div>
  );
}
