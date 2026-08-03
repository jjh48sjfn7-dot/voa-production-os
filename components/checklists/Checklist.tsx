"use client";

import { useCallback, useEffect, useState } from "react";
import { Check } from "lucide-react";
import type { ChecklistItem } from "@/types";
import { loadCheckedItems, saveCheckedItems } from "@/lib/storage";
import { departmentAccents } from "@/lib/theme";
import { audioStyles } from "@/lib/audio-styles";

interface ChecklistProps {
  id: string;
  items: ChecklistItem[];
  checked?: Record<string, boolean>;
  onToggle?: (itemId: string) => void;
  onProgressChange?: (completed: number, total: number) => void;
  accent?: keyof typeof departmentAccents;
}

export function Checklist({
  id,
  items,
  checked: controlledChecked,
  onToggle,
  onProgressChange,
  accent = "audio",
}: ChecklistProps) {
  const isControlled = controlledChecked !== undefined && onToggle !== undefined;
  const [internalChecked, setInternalChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const colors = departmentAccents[accent];

  const checked = isControlled ? controlledChecked : internalChecked;

  useEffect(() => {
    if (!isControlled) {
      setInternalChecked(loadCheckedItems(id));
    }
    setMounted(true);
  }, [id, isControlled]);

  useEffect(() => {
    if (!mounted) return;
    const completed = items.filter((item) => checked[item.id]).length;
    onProgressChange?.(completed, items.length);
  }, [checked, items, mounted, onProgressChange]);

  const toggleItem = useCallback(
    (itemId: string) => {
      if (isControlled) {
        onToggle(itemId);
        return;
      }

      setInternalChecked((prev) => {
        const next = { ...prev, [itemId]: !prev[itemId] };
        saveCheckedItems(id, next);
        return next;
      });
    },
    [id, isControlled, onToggle]
  );

  if (!mounted) {
    return (
      <ul className={audioStyles.stackSm}>
        {items.map((item, i) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-xl px-3 py-3"
          >
            <span
              className="h-5 w-5 animate-shimmer rounded-md ring-1 ring-white/[0.06]"
              style={{ animationDelay: `${i * 50}ms` }}
            />
            <span
              className="h-3.5 flex-1 animate-shimmer rounded-md"
              style={{ animationDelay: `${i * 50 + 30}ms` }}
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={audioStyles.stackSm}>
      {items.map((item) => {
        const isChecked = !!checked[item.id];

        return (
          <li key={item.id}>
            <label
              className={`group flex min-h-[44px] cursor-pointer items-center gap-3.5 rounded-xl px-3 py-3 transition-[background-color,color] duration-200 ease-out ${
                isChecked
                  ? "bg-white/[0.02] text-slate-500"
                  : "text-slate-300 hover:bg-white/[0.04] hover:text-slate-100"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-[background-color,border-color,transform,box-shadow] duration-[250ms] ease-out ${
                  isChecked
                    ? `${colors.bar} border-transparent text-white shadow-[0_0_8px_rgba(239,68,68,0.35)]`
                    : "border-white/[0.12] bg-white/[0.03] group-hover:border-white/20"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(item.id)}
                  className="sr-only"
                />
                {isChecked && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              <span
                className={`text-sm leading-snug transition-[color,text-decoration] duration-[250ms] ${
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
