"use client";

import type { LucideIcon } from "lucide-react";
import type { BreadcrumbItem } from "@/types/audio";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DashboardRow } from "@/components/dashboard/DashboardRow";
import { DashboardSection } from "@/components/dashboard/DashboardSection";

interface LightingNavItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

interface LightingNavHubContentProps {
  title: string;
  description: string;
  icon: LucideIcon;
  breadcrumbs: BreadcrumbItem[];
  sectionTitle: string;
  items: LightingNavItem[];
  backHref?: string;
  backLabel?: string;
}

export function LightingNavHubContent({
  title,
  description,
  icon,
  breadcrumbs,
  sectionTitle,
  items,
  backHref = "/lighting",
  backLabel = "Back to Lighting Department",
}: LightingNavHubContentProps) {
  return (
    <AudioPageShell
      title={title}
      description={description}
      icon={icon}
      breadcrumbs={breadcrumbs}
      compactMobile
      backHref={backHref}
      backLabel={backLabel}
      accent="lighting"
    >
      <DashboardSection title={sectionTitle}>
        <div className="divide-y divide-white/[0.06]">
          {items.map((item) => (
            <DashboardRow
              key={item.id}
              href={item.href}
              icon={item.icon}
              accent="lighting"
              title={item.title}
            />
          ))}
        </div>
      </DashboardSection>
    </AudioPageShell>
  );
}
