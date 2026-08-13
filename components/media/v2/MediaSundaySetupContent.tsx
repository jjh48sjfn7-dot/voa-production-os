"use client";

import { useState } from "react";
import { SetupChecklist } from "@/components/audio/v2/SetupChecklist";
import { SundaySetupAccordion } from "@/components/audio/v2/SundaySetupAccordion";
import { SundaySetupMilestoneRow } from "@/components/audio/v2/SundaySetupMilestoneRow";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { SetupReference } from "@/components/shared/SetupReference";
import {
  SUNDAY_SETUP_MEDIA_V1_STORAGE,
  getMediaSectionTaskCount,
  getMediaSetupItemIds,
  mediaSetupSections,
  mediaSetupUnloadTrailer,
} from "@/data/media/v2/sunday-setup";
import { useChecklist } from "@/hooks/useChecklist";
import { mediaConfidenceMonitorReferences, mediaSundaySetupReferences } from "@/lib/reference-photos";
import { audioStyles } from "@/lib/audio-styles";

const MEDIA_SETUP_VALID_ITEM_IDS = getMediaSetupItemIds();

export function MediaSundaySetupContent() {
  const { checked, toggleItem } = useChecklist(
    SUNDAY_SETUP_MEDIA_V1_STORAGE,
    MEDIA_SETUP_VALID_ITEM_IDS
  );
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  function handleSectionToggle(sectionId: string) {
    setOpenSectionId((current) => (current === sectionId ? null : sectionId));
  }

  return (
    <div>
      <AudioSubpageHeader
        backHref="/media"
        backLabel="Back to Media Department"
        title="Sunday Setup"
        accent="media"
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        Assemble displays, connect signal paths, and verify both outputs are ready.
      </p>

      <div className="mt-4 space-y-2 sm:mt-5">
        <SundaySetupMilestoneRow
          title={mediaSetupUnloadTrailer.title}
          icon={mediaSetupUnloadTrailer.icon}
          accent="media"
        />

        {mediaSetupSections.map((section) => {
          const sectionReference = mediaSundaySetupReferences[section.id];

          return (
          <SundaySetupAccordion
            key={section.id}
            title={section.title}
            icon={section.icon}
            accent="media"
            taskCount={getMediaSectionTaskCount(section)}
            open={openSectionId === section.id}
            onToggle={() => handleSectionToggle(section.id)}
          >
            {section.note && (
              <p className="pb-2 pt-1 text-[13px] leading-snug text-slate-500">
                {section.note}
              </p>
            )}
            {sectionReference && (
              <div className="pb-3 pt-1">
                <SetupReference photo={sectionReference} />
              </div>
            )}
            {section.id === "setup-confidence-monitor" && (
              <div className="space-y-4 pb-3 pt-1">
                <SetupReference
                  photo={mediaConfidenceMonitorReferences.spatial}
                  label="Overall position"
                />
                <SetupReference
                  photo={mediaConfidenceMonitorReferences.connectionDetail}
                  label="HDMI connection detail"
                />
              </div>
            )}
            <SetupChecklist
              items={section.items}
              checked={checked}
              onToggle={toggleItem}
            />
          </SundaySetupAccordion>
          );
        })}
      </div>
    </div>
  );
}
