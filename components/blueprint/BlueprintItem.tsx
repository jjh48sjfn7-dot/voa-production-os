import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getBlueprintItemHref } from "@/data/blueprint";
import type { BlueprintItem } from "@/data/blueprint/types";
import { blueprintDepartmentColors } from "@/data/blueprint/types";
import { audioStyles } from "@/lib/audio-styles";

interface BlueprintItemProps {
  item: BlueprintItem;
  dimmed?: boolean;
}

export function BlueprintItemTile({ item, dimmed }: BlueprintItemProps) {
  const href = getBlueprintItemHref(item);
  const label = item.mapLabel ?? item.name;
  const hint = item.notes?.[0];
  const departmentStyle = blueprintDepartmentColors[item.departments[0]];

  const inner = (
    <>
      <span className="text-xl leading-none" aria-hidden>
        {item.icon}
      </span>
      <span className="mt-1.5 block text-center text-xs font-semibold leading-tight text-slate-50 sm:text-sm">
        {label}
      </span>
      {hint && (
        <span className="mt-1 block text-center text-[10px] leading-snug text-slate-500 sm:text-xs">
          {hint}
        </span>
      )}
      {item.status === "placeholder" && (
        <span className="mt-1 block text-center text-[10px] font-medium uppercase tracking-wide text-amber-500/80">
          Placeholder
        </span>
      )}
      {href && (
        <ChevronRight
          className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-slate-600"
          aria-hidden
        />
      )}
    </>
  );

  const className = `relative flex min-h-[72px] min-w-0 flex-col items-center justify-center rounded-xl border px-2 py-2.5 sm:min-h-[80px] sm:px-3 ${departmentStyle.border} ${departmentStyle.bg} ${
    dimmed ? "opacity-30" : "opacity-100"
  } ${
    href && !dimmed
      ? `${audioStyles.transition} hover:border-white/[0.18] hover:bg-white/[0.06] active:scale-[0.98]`
      : ""
  }`;

  if (href && !dimmed) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
