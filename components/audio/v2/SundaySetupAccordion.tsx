"use client";

import { ChevronDown } from "lucide-react";
import { SundaySetupSectionIcon } from "@/components/audio/v2/SundaySetupSectionIcon";
import { audioStyles } from "@/lib/audio-styles";
import type { ProductionIconId } from "@/lib/production-icons";
import type { DepartmentAccent } from "@/lib/theme";

interface SundaySetupAccordionProps {
  title: string;
  icon?: ProductionIconId;
  accent?: DepartmentAccent;
  taskCount: number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function SundaySetupAccordion({
  title,
  icon,
  accent = "audio",
  taskCount,
  open,
  onToggle,
  children,
}: SundaySetupAccordionProps) {
  const taskLabel = taskCount === 1 ? "1 Task" : `${taskCount} Tasks`;

  return (
    <div className={`overflow-hidden ${audioStyles.card}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5"
        aria-expanded={open}
      >
        {icon && <SundaySetupSectionIcon icon={icon} accent={accent} />}
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-slate-50">{title}</p>
          <p className="mt-0.5 text-[13px] text-slate-500">{taskLabel}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ease-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/[0.06] px-4 pb-3 pt-1 sm:px-5 sm:pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
