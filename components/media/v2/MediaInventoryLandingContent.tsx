"use client";

import { Package } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { NavigationRow } from "@/components/shared/NavigationRow";
import { mediaInventorySections } from "@/data/media/v2/inventory";

export function MediaInventoryLandingContent() {
  return (
    <AudioPageShell
      title="Inventory"
      description="Equipment owned by the Media Department."
      icon={Package}
      breadcrumbs={[
        { label: "Media Department", href: "/media" },
        { label: "Inventory" },
      ]}
      compactMobile
      backHref="/media"
      backLabel="Back to Media Department"
    >
      <DashboardSection title="Equipment">
        <div className="divide-y divide-white/[0.06]">
          {mediaInventorySections.map((section) => (
            <NavigationRow
              key={section.id}
              title={section.title}
              href={section.href}
            />
          ))}
        </div>
      </DashboardSection>
    </AudioPageShell>
  );
}
