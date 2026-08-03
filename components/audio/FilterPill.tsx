"use client";

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

export function FilterPill({ label, active, onClick, count }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium capitalize transition-[background-color,color,box-shadow,transform] duration-200 ease-out ${
        active
          ? "bg-red-500/15 text-red-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-red-500/25"
          : "bg-white/[0.035] text-slate-400 hover:bg-white/[0.07] hover:text-slate-300 active:scale-[0.97]"
      }`}
    >
      {label}
      {count !== undefined && (
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums transition-colors duration-[250ms] ${
            active ? "bg-red-500/20 text-red-300" : "bg-white/[0.06] text-slate-500"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
