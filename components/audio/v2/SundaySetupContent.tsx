"use client";

import { useState } from "react";
import { SetupChecklist } from "@/components/audio/v2/SetupChecklist";
import { SundaySetupAccordion } from "@/components/audio/v2/SundaySetupAccordion";
import { SundaySetupMilestoneRow } from "@/components/audio/v2/SundaySetupMilestoneRow";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { useChecklist } from "@/hooks/useChecklist";
import {
  SUNDAY_SETUP_V2_STORAGE,
  getSectionTaskCount,
  getSundaySetupV2ItemIds,
  sundaySetupUnloadTrailer,
  sundaySetupV2Sections,
} from "@/data/audio/v2/sunday-setup";
import { audioStyles } from "@/lib/audio-styles";

const SUNDAY_SETUP_VALID_ITEM_IDS = getSundaySetupV2ItemIds();

export function SundaySetupContent() {
  const { checked, toggleItem } = useChecklist(
    SUNDAY_SETUP_V2_STORAGE,
    SUNDAY_SETUP_VALID_ITEM_IDS
  );
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  function handleSectionToggle(sectionId: string) {
    setOpenSectionId((current) => (current === sectionId ? null : sectionId));
  }

  return (
    <div>
      <AudioSubpageHeader
        backHref="/audio"
        backLabel="Back to Audio Department"
        title="Sunday Setup"
        accent="audio"
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        Prepare every audio system before service.
      </p>

      <div className="mt-4 space-y-2 sm:mt-5">
        <SundaySetupMilestoneRow
          title={sundaySetupUnloadTrailer.title}
          icon={sundaySetupUnloadTrailer.icon}
          accent="audio"
        />

        {sundaySetupV2Sections.map((section) => (
          <SundaySetupAccordion
            key={section.id}
            title={section.title}
            icon={section.icon}
            accent="audio"
            taskCount={getSectionTaskCount(section)}
            open={openSectionId === section.id}
            onToggle={() => handleSectionToggle(section.id)}
          >
            <SetupChecklist
              items={section.items}
              groups={section.groups}
              checked={checked}
              onToggle={toggleItem}
            />
          </SundaySetupAccordion>
        ))}
      </div>
    </div>
  );
}
