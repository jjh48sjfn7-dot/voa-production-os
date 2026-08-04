"use client";

import { AudioEmojiNavRow } from "@/components/audio/v2/AudioEmojiNavRow";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { equipmentCategories } from "@/data/audio/v2/equipment";
import { audioStyles } from "@/lib/audio-styles";

export function EquipmentHubContent() {
  return (
    <div>
      <AudioSubpageHeader
        backHref="/audio"
        backLabel="Back to Audio Department"
        title="Equipment"
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        What audio equipment do we use?
      </p>

      <div className="mt-4 space-y-2 sm:mt-5">
        {equipmentCategories.map((category) => (
          <AudioEmojiNavRow
            key={category.id}
            title={category.title}
            emoji={category.emoji}
            href={category.href}
          />
        ))}
      </div>
    </div>
  );
}
