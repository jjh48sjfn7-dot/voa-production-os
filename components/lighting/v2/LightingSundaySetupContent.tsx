"use client";

import { useState } from "react";
import { SetupChecklist } from "@/components/audio/v2/SetupChecklist";
import { SundaySetupAccordion } from "@/components/audio/v2/SundaySetupAccordion";
import { SundaySetupMilestoneRow } from "@/components/audio/v2/SundaySetupMilestoneRow";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import {
  SUNDAY_SETUP_LIGHTING_V1_STORAGE,
  getLightingSectionTaskCount,
  getLightingSetupItemIds,
  lightingSetupSections,
  lightingSetupUnloadTrailer,
} from "@/data/lighting/v2/sunday-setup";
import { useChecklist } from "@/hooks/useChecklist";
import { audioStyles } from "@/lib/audio-styles";

const LIGHTING_SETUP_VALID_ITEM_IDS = getLightingSetupItemIds();

export function LightingSundaySetupContent() {
  const { checked, toggleItem } = useChecklist(
    SUNDAY_SETUP_LIGHTING_V1_STORAGE,
    LIGHTING_SETUP_VALID_ITEM_IDS
  );
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  function handleSectionToggle(sectionId: string) {
    setOpenSectionId((current) => (current === sectionId ? null : sectionId));
  }

  return (
    <div>
      <AudioSubpageHeader
        backHref="/lighting"
        backLabel="Back to Lighting Department"
        title="Sunday Setup"
        accent="lighting"
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        Prepare all nine SlimPAR fixtures before service.
      </p>

      <div className="mt-4 space-y-2 sm:mt-5">
        <SundaySetupMilestoneRow
          title={lightingSetupUnloadTrailer.title}
          icon={lightingSetupUnloadTrailer.icon}
          accent="lighting"
        />

        {lightingSetupSections.map((section) => (
          <SundaySetupAccordion
            key={section.id}
            title={section.title}
            icon={section.icon}
            accent="lighting"
            taskCount={getLightingSectionTaskCount(section)}
            open={openSectionId === section.id}
            onToggle={() => handleSectionToggle(section.id)}
          >
            <SetupChecklist
              items={section.items}
              checked={checked}
              onToggle={toggleItem}
            />
          </SundaySetupAccordion>
        ))}
      </div>
    </div>
  );
}
