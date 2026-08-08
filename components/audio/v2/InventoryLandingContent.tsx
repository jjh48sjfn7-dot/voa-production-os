"use client";

import { Package } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { NavigationRow } from "@/components/shared/NavigationRow";
import { inventoryLandingSections } from "@/data/audio/v2/inventory";
import { voaLabels } from "@/data/audio/venue";

export function InventoryLandingContent() {
  return (
    <AudioPageShell
      title="Inventory"
      description="Equipment owned by the Audio Department."
      icon={Package}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Inventory" },
      ]}
      compactMobile
    >
      <DashboardSection title="Equipment Categories">
        <div className="divide-y divide-white/[0.06]">
          {inventoryLandingSections.map((section) => (
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
