import type { ChecklistItem } from "@/types";

export const SUNDAY_SETUP_LIGHTING_V1_STORAGE = "sunday-setup-lighting-v1";

export const lightingSetupUnloadTrailer = {
  id: "unload-trailer",
  title: "Unload Trailer",
  emoji: "📦",
};

export interface LightingSetupSection {
  id: string;
  title: string;
  emoji?: string;
  items: ChecklistItem[];
}

export const lightingSetupSections: LightingSetupSection[] = [
  {
    id: "place-floor-lights",
    title: "Place Floor Lights",
    emoji: "📍",
    items: [
      { id: "floor-1", label: "Place Floor 1 — Stage Left" },
      { id: "floor-2", label: "Place Floor 2 — Center" },
      { id: "floor-3", label: "Place Floor 3 — Stage Right" },
    ],
  },
  {
    id: "run-dmx",
    title: "Run DMX",
    emoji: "🔌",
    items: [
      {
        id: "dmx-wall",
        label: "Run DMX from FOH along the right-side wall — keep the run neat",
      },
      { id: "dmx-floor-3", label: "Connect Floor 3" },
      { id: "dmx-floor-2", label: "Connect Floor 2" },
      { id: "dmx-floor-1", label: "Connect Floor 1" },
      { id: "dmx-curtain", label: "Continue behind curtain" },
      { id: "dmx-tr-1", label: "Connect to TR-1" },
      {
        id: "dmx-tr-chain",
        label: "Confirm permanent TR-1 → TR-6 chain remains connected",
      },
    ],
  },
  {
    id: "lighting-control",
    title: "Lighting Control",
    emoji: "💻",
    items: [
      { id: "ctrl-mac", label: "Confirm FOH Mac is ready" },
      { id: "ctrl-lightkey", label: "Open Lightkey" },
      { id: "ctrl-dmxking", label: "Confirm DMXking Micro connection" },
    ],
  },
  {
    id: "power",
    title: "Power",
    emoji: "⚡",
    items: [
      {
        id: "power-wait",
        label: "Power lighting when ready — do not power early",
      },
    ],
  },
  {
    id: "aiming",
    title: "Aiming",
    emoji: "🎯",
    items: [
      {
        id: "aim-truss",
        label: "Verify TR-1 through TR-6 aim toward the stage / performance area",
      },
      {
        id: "aim-floor",
        label:
          "Verify Floor 1 through Floor 3 aim upward toward the ceiling / audience area",
      },
    ],
  },
  {
    id: "function-check",
    title: "Function Check",
    emoji: "✅",
    items: [
      { id: "func-all", label: "Confirm all 9 fixtures respond" },
      {
        id: "func-individual",
        label: "Confirm individual fixture control works in Lightkey",
      },
      { id: "func-none-dead", label: "Confirm no fixture is unresponsive" },
    ],
  },
  {
    id: "ready",
    title: "Ready",
    emoji: "🙌",
    items: [{ id: "ready-lighting", label: "Lighting ready for service" }],
  },
];

export function getLightingSetupItemIds(): string[] {
  return lightingSetupSections.flatMap((section) =>
    section.items.map((item) => item.id)
  );
}

export function getLightingSectionTaskCount(section: LightingSetupSection): number {
  return section.items.length;
}
