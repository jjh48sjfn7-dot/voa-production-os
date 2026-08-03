"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";

interface AccordionProps {
  id: string;
  title: string;
  icon?: LucideIcon;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: () => void;
  badge?: React.ReactNode;
  children: React.ReactNode;
  compactMobile?: boolean;
}

export function Accordion({
  title,
  icon: Icon,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  badge,
  children,
  compactMobile = false,
}: AccordionProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  function handleToggle() {
    if (onToggle) {
      onToggle();
    } else {
      setInternalOpen((prev) => !prev);
    }
  }

  return (
    <div
      className={`overflow-hidden ${audioStyles.card} ${audioStyles.cardHover} ${audioStyles.cardGlow}`}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={`flex w-full items-center gap-3 text-left ${audioStyles.transition} hover:bg-white/[0.035] ${
          compactMobile
            ? "px-4 py-2.5 md:px-6 md:py-4"
            : "px-5 py-3.5 md:px-6 md:py-4"
        }`}
        aria-expanded={isOpen}
      >
        {Icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-300 ring-1 ring-white/[0.06]">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <span className="flex-1 text-base font-semibold text-slate-50 md:text-lg">
          {title}
        </span>
        {badge}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`border-t border-white/[0.06] ${
              compactMobile ? "px-4 py-3 md:px-6 md:py-5" : "px-5 py-4 md:px-6 md:py-5"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
