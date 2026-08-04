import type { ChecklistItem } from "@/types";

export const SUNDAY_SETUP_V2_STORAGE = "sunday-setup-v2";

export interface SundaySetupSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export const sundaySetupV2Sections: SundaySetupSection[] = [
  {
    id: "trailer-storage",
    title: "Trailer & Storage",
    items: [
      { id: "trailer-unlock", label: "Unlock trailer" },
      { id: "trailer-lights", label: "Power trailer lights" },
      { id: "trailer-cables", label: "Remove cable trunks" },
      { id: "trailer-speakers", label: "Remove speaker carts" },
    ],
  },
  {
    id: "stage",
    title: "Stage",
    items: [
      { id: "stage-drums", label: "Position drums" },
      { id: "stage-snake", label: "Run stage snake" },
      { id: "stage-mics", label: "Place microphones" },
      { id: "stage-monitors", label: "Position monitors" },
    ],
  },
  {
    id: "foh",
    title: "FOH",
    items: [
      { id: "foh-console", label: "Roll out console" },
      { id: "foh-power", label: "Connect power" },
      { id: "foh-network", label: "Connect network" },
      { id: "foh-tf5", label: "Verify TF5 boots" },
    ],
  },
  {
    id: "stage-left",
    title: "Stage Left",
    items: [
      { id: "sl-sb1", label: "Connect Rio SB1" },
      { id: "sl-drums", label: "Patch drum inputs" },
      { id: "sl-signal", label: "Verify stage left signal" },
      { id: "sl-label", label: "Label stage box inputs" },
    ],
  },
  {
    id: "stage-right",
    title: "Stage Right",
    items: [
      { id: "sr-sb2", label: "Connect Rio SB2" },
      { id: "sr-keys", label: "Patch keyboard and guitar inputs" },
      { id: "sr-signal", label: "Verify stage right signal" },
      { id: "sr-label", label: "Label stage box inputs" },
    ],
  },
  {
    id: "playback",
    title: "Playback",
    items: [
      { id: "pb-mac", label: "Connect Mac Mini output" },
      { id: "pb-levels", label: "Verify playback levels" },
      { id: "pb-walkin", label: "Test walk-in music" },
      { id: "pb-record", label: "Confirm USB record armed" },
    ],
  },
  {
    id: "wireless",
    title: "Wireless",
    items: [
      { id: "wl-scan", label: "Scan RF environment" },
      { id: "wl-sync", label: "Sync wireless receivers" },
      { id: "wl-pastor", label: "Assign pastor mic frequency" },
      { id: "wl-range", label: "Test wireless range on stage" },
    ],
  },
  {
    id: "soundcheck",
    title: "Soundcheck",
    items: [
      { id: "sc-monitors", label: "Ring out monitors" },
      { id: "sc-pastor", label: "Set pastor mic gain" },
      { id: "sc-band", label: "Balance worship band" },
      { id: "sc-foh", label: "Confirm FOH mix in sanctuary" },
    ],
  },
  {
    id: "service-ready",
    title: "Service Ready",
    items: [
      { id: "ready-scene", label: "Recall worship scene" },
      { id: "ready-comms", label: "Confirm volunteer comms" },
      { id: "ready-line", label: "Final line check with team" },
      { id: "ready-doors", label: "Ready for doors open" },
    ],
  },
];

export function getSundaySetupV2ItemIds(): string[] {
  return sundaySetupV2Sections.flatMap((section) =>
    section.items.map((item) => item.id)
  );
}
