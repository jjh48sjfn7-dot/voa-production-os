"use client";

import type { LucideIcon } from "lucide-react";
import type { BreadcrumbItem } from "@/types/audio";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DashboardRow } from "@/components/dashboard/DashboardRow";
import { DashboardSection } from "@/components/dashboard/DashboardSection";

interface AudioNavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

interface AudioNavHubContentProps {
  title: string;
  description: string;
  icon: LucideIcon;
  breadcrumbs: BreadcrumbItem[];
  sectionTitle: string;
  items: AudioNavItem[];
}

export function AudioNavHubContent({
  title,
  description,
  icon,
  breadcrumbs,
  sectionTitle,
  items,
}: AudioNavHubContentProps) {
  return (
    <AudioPageShell
      title={title}
      description={description}
      icon={icon}
      breadcrumbs={breadcrumbs}
      compactMobile
    >
      <DashboardSection title={sectionTitle}>
        <div className="divide-y divide-white/[0.06]">
          {items.map((item) => (
            <DashboardRow
              key={item.id}
              href={item.href}
              icon={item.icon}
              accent="audio"
              title={item.title}
            />
          ))}
        </div>
      </DashboardSection>
    </AudioPageShell>
  );
}
