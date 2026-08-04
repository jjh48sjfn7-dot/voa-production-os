import type { ChecklistItem } from "@/types";

export const SUNDAY_SETUP_V2_STORAGE = "sunday-setup-v2";

export interface SundaySetupSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

function placeholderItems(sectionId: string, count = 3): ChecklistItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${sectionId}-item-${index + 1}`,
    label: "Placeholder checklist item",
  }));
}

export const sundaySetupV2Sections: SundaySetupSection[] = [
  { id: "trailer-storage", title: "Trailer & Storage", items: placeholderItems("trailer-storage") },
  { id: "stage", title: "Stage", items: placeholderItems("stage") },
  { id: "foh", title: "FOH", items: placeholderItems("foh") },
  { id: "stage-left", title: "Stage Left", items: placeholderItems("stage-left") },
  { id: "stage-right", title: "Stage Right", items: placeholderItems("stage-right") },
  { id: "playback", title: "Playback", items: placeholderItems("playback") },
  { id: "wireless", title: "Wireless", items: placeholderItems("wireless") },
  { id: "soundcheck", title: "Soundcheck", items: placeholderItems("soundcheck") },
  { id: "service-ready", title: "Service Ready", items: placeholderItems("service-ready") },
];

export function getSundaySetupV2ItemIds(): string[] {
  return sundaySetupV2Sections.flatMap((section) =>
    section.items.map((item) => item.id)
  );
}
