"use client";

import { ChevronDown } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";

interface TroubleshootingCardProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function TroubleshootingCard({
  title,
  open,
  onToggle,
  children,
}: TroubleshootingCardProps) {
  return (
    <div className={`overflow-hidden ${audioStyles.card}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[52px] w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5"
        aria-expanded={open}
      >
        <p className="flex-1 text-base font-semibold text-slate-50">{title}</p>
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
          <div className="border-t border-white/[0.06] px-4 pb-4 pt-3 sm:px-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
