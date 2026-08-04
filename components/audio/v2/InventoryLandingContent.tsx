"use client";

import { Package } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { inventoryLandingSections } from "@/data/audio/v2/inventory";
import { audioStyles } from "@/lib/audio-styles";
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
            <div
              key={section.id}
              className="flex min-h-[52px] items-center px-4 py-3.5 sm:px-5 sm:py-4"
            >
              <p className={`${audioStyles.heading} text-slate-50`}>{section.title}</p>
            </div>
          ))}
        </div>
      </DashboardSection>
    </AudioPageShell>
  );
}
