"use client";

import type { LucideIcon } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { Checklist } from "@/components/checklists/Checklist";
import type { ContentBlock } from "@/types/audio";
import { audioStyles } from "@/lib/audio-styles";
import { departmentAccents } from "@/lib/theme";

interface ContentBlockRendererProps {
  blocks: ContentBlock[];
  storageId: string;
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  defaultOpenFirst?: boolean;
}

export function ContentBlockRenderer({
  blocks,
  storageId,
  checked,
  onToggle,
  defaultOpenFirst = true,
}: ContentBlockRendererProps) {
  const dotColor = departmentAccents.audio.bar;

  return (
    <div className={audioStyles.stackSm}>
      {blocks.map((block, index) => {
        const checklistItems = block.type === "checklist" ? block.items ?? [] : [];
        const completed = checklistItems.filter((i) => checked[i.id]).length;
        const badge =
          checklistItems.length > 0 ? (
            <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs tabular-nums text-slate-400 ring-1 ring-white/[0.06]">
              {completed}/{checklistItems.length}
            </span>
          ) : undefined;

        return (
          <Accordion
            key={block.id}
            id={block.id}
            title={block.title}
            icon={block.icon}
            badge={badge}
            defaultOpen={defaultOpenFirst && index === 0}
          >
            {block.description && (
              <p className={`mb-4 ${audioStyles.body}`}>{block.description}</p>
            )}

            {block.type === "checklist" && block.items && (
              <Checklist
                id={storageId}
                items={block.items}
                checked={checked}
                onToggle={onToggle}
                accent="audio"
              />
            )}

            {block.type === "list" && block.listItems && (
              <ul className="space-y-2">
                {block.listItems.map((text) => (
                  <li
                    key={text}
                    className={`flex items-start gap-2.5 rounded-xl px-3 py-2.5 ${audioStyles.body}`}
                  >
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} />
                    {text}
                  </li>
                ))}
              </ul>
            )}

            {block.type === "info" && block.info && (
              <p className={`rounded-xl bg-white/[0.03] p-4 ${audioStyles.body} ring-1 ring-white/[0.06]`}>
                {block.info}
              </p>
            )}
          </Accordion>
        );
      })}
    </div>
  );
}
