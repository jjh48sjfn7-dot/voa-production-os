"use client";

import type { LucideIcon } from "lucide-react";
import type { BreadcrumbItem } from "@/types/audio";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { audioStyles } from "@/lib/audio-styles";
import { voaLabels } from "@/data/audio/venue";

interface AudioPlaceholderContentProps {
  title: string;
  icon: LucideIcon;
  breadcrumbs: BreadcrumbItem[];
}

export function AudioPlaceholderContent({
  title,
  icon,
  breadcrumbs,
}: AudioPlaceholderContentProps) {
  return (
    <AudioPageShell
      title={title}
      description={`${voaLabels.audioDepartment} reference`}
      icon={icon}
      breadcrumbs={breadcrumbs}
      compactMobile
    >
      <div className={`${audioStyles.card} ${audioStyles.cardPad} ${audioStyles.body}`}>
        Content for this page will be added in a future sprint.
      </div>
    </AudioPageShell>
  );
}
