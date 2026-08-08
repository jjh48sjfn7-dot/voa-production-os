"use client";

import type { LucideIcon } from "lucide-react";
import type { BreadcrumbItem } from "@/types/audio";
import type { ProgressStats } from "@/types";
import { AppPageHeader } from "@/components/shared/AppPageHeader";
import { PageSkeleton } from "@/components/audio/PageSkeleton";
import { AudioProgressCard } from "@/components/audio/AudioProgressCard";
import { audioStyles } from "@/lib/audio-styles";
import { useMounted } from "@/hooks/useMounted";

interface AudioPageShellProps {
  title: string;
  description: string;
  icon: LucideIcon;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
  toolbar?: React.ReactNode;
  stickyProgress?: React.ReactNode;
  progress?: {
    stats: ProgressStats;
    loadFromStorage?: () => ProgressStats;
    title?: string;
    description?: string;
  };
  compactMobile?: boolean;
  backHref?: string;
  backLabel?: string;
}

export function AudioPageShell({
  title,
  description,
  icon: Icon,
  breadcrumbs,
  children,
  toolbar,
  stickyProgress,
  progress,
  compactMobile = false,
  backHref,
  backLabel,
}: AudioPageShellProps) {
  const mounted = useMounted();

  if (!mounted) {
    return <PageSkeleton />;
  }

  return (
    <div className={compactMobile ? "space-y-4 md:space-y-10" : audioStyles.page}>
      <AppPageHeader
        title={title}
        description={description}
        icon={Icon}
        breadcrumbs={breadcrumbs}
        toolbar={toolbar}
        compactMobile={compactMobile}
        backHref={backHref}
        backLabel={backLabel}
      />

      {stickyProgress}

      {progress && (
        <AudioProgressCard
          title={progress.title ?? "Progress"}
          description={progress.description}
          stats={progress.stats}
          loadFromStorage={progress.loadFromStorage}
        />
      )}

      <div
        className={`${
          compactMobile ? "space-y-3 md:space-y-6" : audioStyles.section
        } animate-fade-in`}
      >
        {children}
      </div>
    </div>
  );
}
