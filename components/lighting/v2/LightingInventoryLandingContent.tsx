"use client";

import { Package } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { NavigationRow } from "@/components/shared/NavigationRow";
import { lightingInventorySections } from "@/data/lighting/v2/inventory";

export function LightingInventoryLandingContent() {
  return (
    <AudioPageShell
      title="Inventory"
      description="Equipment owned by the Lighting Department."
      icon={Package}
      breadcrumbs={[
        { label: "Lighting Department", href: "/lighting" },
        { label: "Inventory" },
      ]}
      compactMobile
      backHref="/lighting"
      backLabel="Back to Lighting Department"
    >
      <DashboardSection title="Equipment">
        <div className="divide-y divide-white/[0.06]">
          {lightingInventorySections.map((section) => (
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
