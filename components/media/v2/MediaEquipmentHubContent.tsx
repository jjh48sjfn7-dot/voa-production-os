"use client";

import { AudioEmojiNavRow } from "@/components/audio/v2/AudioEmojiNavRow";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { mediaEquipmentCategories } from "@/data/media/v2/equipment/categories";
import { audioStyles } from "@/lib/audio-styles";

export function MediaEquipmentHubContent() {
  return (
    <div>
      <AudioSubpageHeader
        backHref="/media"
        backLabel="Back to Media Department"
        title="Equipment"
        accent="media"
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        What presentation and display equipment do we use?
      </p>

      <div className="mt-4 space-y-2 sm:mt-5">
        {mediaEquipmentCategories.map((category) => (
          <AudioEmojiNavRow
            key={category.id}
            title={category.title}
            icon={category.icon}
            accent="media"
            href={category.href}
          />
        ))}
      </div>
    </div>
  );
}
