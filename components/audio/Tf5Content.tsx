"use client";

import { SlidersHorizontal } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { ContentBlockRenderer } from "@/components/audio/ContentBlockRenderer";
import { Tf5Panel } from "@/components/audio/Tf5Panel";
import { TF5_STORAGE_ID, tf5Blocks, getTf5ChecklistIds } from "@/data/audio/tf5";
import { useChecklist } from "@/hooks/useChecklist";
import { useProgress } from "@/hooks/useProgress";
import { calculateProgress } from "@/lib/progress";
import { loadCheckedItems } from "@/lib/storage";
import { voaLabels, voaVenue } from "@/data/audio/venue";
import { SectionHeader } from "@/components/ui/PageHeader";

export function Tf5Content() {
  const { checked, toggleItem } = useChecklist(TF5_STORAGE_ID);
  const itemIds = getTf5ChecklistIds();
  const progress = useProgress(itemIds, checked);

  function loadProgress() {
    return calculateProgress(loadCheckedItems(TF5_STORAGE_ID), itemIds);
  }

  return (
    <AudioPageShell
      title={voaLabels.tf5}
      description={`${voaLabels.tf5} at ${voaVenue.church} — VOA scenes, QSC/JBL routing, power sequence, and ${voaLabels.preService.toLowerCase()} console checks.`}
      icon={SlidersHorizontal}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: voaLabels.tf5 },
      ]}
      progress={{
        stats: progress,
        loadFromStorage: loadProgress,
        title: `${voaLabels.tf5} Checklist Progress`,
        description: `${voaLabels.preService} console checks saved locally`,
      }}
    >
      <Tf5Panel />

      <section>
        <SectionHeader title="Console Checklists" />
        <ContentBlockRenderer
          blocks={tf5Blocks}
          storageId={TF5_STORAGE_ID}
          checked={checked}
          onToggle={toggleItem}
        />
      </section>
    </AudioPageShell>
  );
}
