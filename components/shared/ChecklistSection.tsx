"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";
import { departmentAccents } from "@/lib/theme";

interface ChecklistSectionProps {
  items: string[];
}

export function ChecklistSection({ items }: ChecklistSectionProps) {
  const colors = departmentAccents.audio;
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  function toggleItem(index: number) {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  return (
    <ul className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
      {items.map((label, index) => {
        const isChecked = !!checked[index];

        return (
          <li key={label}>
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className={`flex min-h-[52px] w-full items-center gap-4 px-4 py-3 text-left transition-colors duration-150 sm:px-5 ${
                isChecked ? "text-slate-500" : "text-slate-200"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 ${
                  isChecked
                    ? `${colors.bar} border-transparent text-white`
                    : "border-white/[0.15] bg-white/[0.03]"
                }`}
              >
                {isChecked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              <span
                className={`flex-1 text-[15px] leading-snug ${
                  isChecked ? "line-through decoration-slate-600" : ""
                }`}
              >
                {label}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
