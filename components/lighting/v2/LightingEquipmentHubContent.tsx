"use client";

import { Wrench } from "lucide-react";
import { AudioEmojiNavRow } from "@/components/audio/v2/AudioEmojiNavRow";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { lightingEquipmentCategories } from "@/data/lighting/v2/equipment";
import { audioStyles } from "@/lib/audio-styles";

export function LightingEquipmentHubContent() {
  return (
    <div>
      <AudioSubpageHeader
        backHref="/lighting"
        backLabel="Back to Lighting Department"
        title="Equipment"
        accent="lighting"
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        What lighting equipment do we use?
      </p>

      <div className="mt-4 space-y-2 sm:mt-5">
        {lightingEquipmentCategories.map((category) => (
          <AudioEmojiNavRow
            key={category.id}
            title={category.title}
            icon={category.icon}
            accent="lighting"
            href={category.href}
          />
        ))}
      </div>
    </div>
  );
}
