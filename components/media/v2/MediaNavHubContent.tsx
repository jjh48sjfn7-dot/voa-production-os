"use client";

import type { LucideIcon } from "lucide-react";
import type { BreadcrumbItem } from "@/types/audio";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DashboardRow } from "@/components/dashboard/DashboardRow";
import { DashboardSection } from "@/components/dashboard/DashboardSection";

interface MediaNavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

interface MediaNavHubContentProps {
  title: string;
  description: string;
  icon: LucideIcon;
  breadcrumbs: BreadcrumbItem[];
  sectionTitle: string;
  items: MediaNavItem[];
  backHref?: string;
  backLabel?: string;
}

export function MediaNavHubContent({
  title,
  description,
  icon,
  breadcrumbs,
  sectionTitle,
  items,
  backHref = "/media",
  backLabel = "Back to Media Department",
}: MediaNavHubContentProps) {
  return (
    <AudioPageShell
      title={title}
      description={description}
      icon={icon}
      breadcrumbs={breadcrumbs}
      compactMobile
      backHref={backHref}
      backLabel={backLabel}
      accent="media"
    >
      <DashboardSection title={sectionTitle}>
        <div className="divide-y divide-white/[0.06]">
          {items.map((item) => (
            <DashboardRow
              key={item.id}
              href={item.href}
              icon={item.icon}
              accent="media"
              title={item.title}
            />
          ))}
        </div>
      </DashboardSection>
    </AudioPageShell>
  );
}
