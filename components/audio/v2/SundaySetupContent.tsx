"use client";

import { BookOpen } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { Checklist } from "@/components/checklists/Checklist";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { useChecklist } from "@/hooks/useChecklist";
import {
  SUNDAY_SETUP_V2_STORAGE,
  sundaySetupV2Sections,
} from "@/data/audio/v2/sunday-setup";
import { voaLabels } from "@/data/audio/venue";

export function SundaySetupContent() {
  const { checked, toggleItem } = useChecklist(SUNDAY_SETUP_V2_STORAGE);

  return (
    <AudioPageShell
      title="Sunday Setup"
      description="Complete every section before service begins."
      icon={BookOpen}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Sunday Setup" },
      ]}
      compactMobile
    >
      <div className="space-y-3">
        {sundaySetupV2Sections.map((section, index) => (
          <Accordion
            key={section.id}
            id={section.id}
            title={section.title}
            defaultOpen={index === 0}
            compactMobile
          >
            <Checklist
              id={SUNDAY_SETUP_V2_STORAGE}
              items={section.items}
              checked={checked}
              onToggle={toggleItem}
              accent="audio"
            />
          </Accordion>
        ))}
      </div>
    </AudioPageShell>
  );
}
