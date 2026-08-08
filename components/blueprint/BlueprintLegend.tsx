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
    <div className="flex flex-wrap gap-x-3 gap-y-1 sm:gap-4">
      {departments.map((department) => (
        <div key={department} className="flex items-center gap-1.5 sm:gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5 ${blueprintDepartmentColors[department].dot}`}
            aria-hidden
          />
          <span className="text-[11px] text-slate-400 sm:text-xs">
            {blueprintDepartmentLabels[department]}
          </span>
        </div>
      ))}
    </div>
  );
}
