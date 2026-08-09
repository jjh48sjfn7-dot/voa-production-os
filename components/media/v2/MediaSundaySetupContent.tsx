"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SetupChecklist } from "@/components/audio/v2/SetupChecklist";
import { SundaySetupAccordion } from "@/components/audio/v2/SundaySetupAccordion";
import { SundaySetupMilestoneRow } from "@/components/audio/v2/SundaySetupMilestoneRow";
import {
  SUNDAY_SETUP_MEDIA_V1_STORAGE,
  getMediaSectionTaskCount,
  getMediaSetupItemIds,
  mediaSetupSections,
  mediaSetupUnloadTrailer,
} from "@/data/media/v2/sunday-setup";
import { useChecklist } from "@/hooks/useChecklist";
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
      <div
        className={`sticky top-16 z-20 -mx-4 border-b border-white/[0.07] bg-[#080f1a]/95 px-4 py-2.5 backdrop-blur-xl md:-mx-0 md:px-0`}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/media"
            className={`flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-slate-200`}
            aria-label="Back to Media Department"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-base font-semibold text-slate-50 sm:text-lg">
            Sunday Setup
          </h1>
        </div>
      </div>

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        Assemble displays, connect signal paths, and verify both outputs are ready.
      </p>

      <div className="mt-4 space-y-2 sm:mt-5">
        <SundaySetupMilestoneRow
          title={mediaSetupUnloadTrailer.title}
          emoji={mediaSetupUnloadTrailer.emoji}
        />

        {mediaSetupSections.map((section) => (
          <SundaySetupAccordion
            key={section.id}
            title={section.title}
            emoji={section.emoji}
            taskCount={getMediaSectionTaskCount(section)}
            open={openSectionId === section.id}
            onToggle={() => handleSectionToggle(section.id)}
          >
            {section.note && (
              <p className="pb-2 pt-1 text-[13px] leading-snug text-slate-500">
                {section.note}
              </p>
            )}
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
