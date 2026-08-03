"use client";

import type { LucideIcon } from "lucide-react";
import type { BreadcrumbItem } from "@/types/audio";
import type { ProgressStats } from "@/types";
import { BackButton } from "@/components/audio/BackButton";
import { Breadcrumbs } from "@/components/audio/Breadcrumbs";
import { PageSkeleton } from "@/components/audio/PageSkeleton";
import { AudioProgressCard } from "@/components/audio/AudioProgressCard";
import { audioStyles } from "@/lib/audio-styles";
import { uiPageIcon } from "@/lib/ui-tokens";
import { useMounted } from "@/hooks/useMounted";
import { useScrolled } from "@/hooks/useScrolled";

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
}: AudioPageShellProps) {
  const mounted = useMounted();
  const headerScrolled = useScrolled(12);

  if (!mounted) {
    return <PageSkeleton />;
  }

  return (
    <div className={audioStyles.page}>
      <div
        className={audioStyles.stickyHeader}
        data-scrolled={headerScrolled || undefined}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumbs items={breadcrumbs} />
          <BackButton />
        </div>

        <header className="mt-3.5 space-y-2.5">
          <div className="flex items-start gap-3.5 md:gap-4">
            <div className={uiPageIcon}>
              <Icon />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <h1 className={audioStyles.display}>{title}</h1>
              <p className={`mt-1.5 max-w-3xl ${audioStyles.body}`}>{description}</p>
            </div>
          </div>
        </header>

        {toolbar && <div className="mt-3.5">{toolbar}</div>}
      </div>

      {stickyProgress}

      {progress && (
        <AudioProgressCard
          title={progress.title ?? "Progress"}
          description={progress.description}
          stats={progress.stats}
          loadFromStorage={progress.loadFromStorage}
        />
      )}

      <div className={`${audioStyles.section} animate-fade-in`}>{children}</div>
    </div>
  );
}
