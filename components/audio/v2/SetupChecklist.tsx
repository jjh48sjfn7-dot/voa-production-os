"use client";

import { Check } from "lucide-react";
import type { ChecklistItem } from "@/types";
import { departmentAccents } from "@/lib/theme";

interface SetupChecklistProps {
  items: ChecklistItem[];
  checked: Record<string, boolean>;
  onToggle: (itemId: string) => void;
}

export function SetupChecklist({ items, checked, onToggle }: SetupChecklistProps) {
  const colors = departmentAccents.audio;

  return (
    <ul className="divide-y divide-white/[0.05]">
      {items.map((item) => {
        const isChecked = !!checked[item.id];

        return (
          <li key={item.id}>
            <label
              className={`flex min-h-[52px] cursor-pointer items-center gap-4 py-3 transition-colors duration-150 ${
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
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggle(item.id)}
                  className="sr-only"
                />
                {isChecked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
              <span
                className={`flex-1 text-[15px] leading-snug ${
                  isChecked ? "line-through decoration-slate-600" : ""
                }`}
              >
                {item.label}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
