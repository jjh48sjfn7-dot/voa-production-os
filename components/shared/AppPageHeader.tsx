"use client";

import type { LucideIcon } from "lucide-react";
import type { BreadcrumbItem } from "@/types/audio";
import { BackButton } from "@/components/audio/BackButton";
import { Breadcrumbs } from "@/components/audio/Breadcrumbs";
import { audioStyles } from "@/lib/audio-styles";
import { uiPageIcon } from "@/lib/ui-tokens";
import { useScrolled } from "@/hooks/useScrolled";

interface AppPageHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  breadcrumbs: BreadcrumbItem[];
  toolbar?: React.ReactNode;
  compactMobile?: boolean;
  backHref?: string;
  backLabel?: string;
}

export function AppPageHeader({
  title,
  description,
  icon: Icon,
  breadcrumbs,
  toolbar,
  compactMobile = false,
  backHref,
  backLabel,
}: AppPageHeaderProps) {
  const headerScrolled = useScrolled(12);
  const stickyHeaderClass = compactMobile
    ? audioStyles.stickyHeader.replace(" py-4", " py-2.5 md:py-4")
    : audioStyles.stickyHeader;

  return (
    <div
      className={stickyHeaderClass}
      data-scrolled={headerScrolled || undefined}
    >
      <div
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between ${
          compactMobile ? "gap-2 md:gap-2.5" : "gap-2.5"
        }`}
      >
        <Breadcrumbs items={breadcrumbs} />
        <BackButton href={backHref} label={backLabel} />
      </div>

      <header
        className={
          compactMobile ? "mt-2 space-y-1.5 md:mt-3.5 md:space-y-2.5" : "mt-3.5 space-y-2.5"
        }
      >
        <div className="flex items-start gap-3.5 md:gap-4">
          <div className={uiPageIcon}>
            <Icon />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <h1 className={audioStyles.display}>{title}</h1>
            <p
              className={`max-w-3xl ${audioStyles.body} ${
                compactMobile ? "mt-1 md:mt-1.5" : "mt-1.5"
              }`}
            >
              {description}
            </p>
          </div>
        </div>
      </header>

      {toolbar && (
        <div className={compactMobile ? "mt-2 md:mt-3.5" : "mt-3.5"}>{toolbar}</div>
      )}
    </div>
  );
}
