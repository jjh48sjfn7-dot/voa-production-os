"use client";

import { Check } from "lucide-react";
import type { ChecklistItem } from "@/types";
import type { SundaySetupChecklistGroup } from "@/data/audio/v2/sunday-setup";
import { departmentAccents } from "@/lib/theme";

interface SetupChecklistProps {
  items?: ChecklistItem[];
  groups?: SundaySetupChecklistGroup[];
  checked: Record<string, boolean>;
  onToggle: (itemId: string) => void;
}

function ChecklistRow({
  item,
  checked,
  onToggle,
}: {
  item: ChecklistItem;
  checked: Record<string, boolean>;
  onToggle: (itemId: string) => void;
}) {
  const colors = departmentAccents.audio;
  const isChecked = !!checked[item.id];

  return (
    <li>
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
        <span className="flex-1">
          <span
            className={`block text-[15px] leading-snug ${
              isChecked ? "line-through decoration-slate-600" : ""
            }`}
          >
            {item.label}
          </span>
          {item.detail && (
            <span
              className={`mt-1 block text-[13px] leading-snug text-slate-500 ${
                isChecked ? "line-through decoration-slate-700" : ""
              }`}
            >
              {item.detail}
            </span>
          )}
        </span>
      </label>
    </li>
  );
}

function ChecklistGroupList({
  groups,
  checked,
  onToggle,
}: {
  groups: SundaySetupChecklistGroup[];
  checked: Record<string, boolean>;
  onToggle: (itemId: string) => void;
}) {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 first:pt-0">
            {group.label}
          </p>
          <ul className="divide-y divide-white/[0.05]">
            {group.items.map((item) => (
              <ChecklistRow
                key={item.id}
                item={item}
                checked={checked}
                onToggle={onToggle}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function SetupChecklist({
  items,
  groups,
  checked,
  onToggle,
}: SetupChecklistProps) {
  if (groups) {
    return (
      <ChecklistGroupList
        groups={groups}
        checked={checked}
        onToggle={onToggle}
      />
    );
  }

  return (
    <ul className="divide-y divide-white/[0.05]">
      {(items ?? []).map((item) => (
        <ChecklistRow
          key={item.id}
          item={item}
          checked={checked}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
