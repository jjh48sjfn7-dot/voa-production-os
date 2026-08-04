import type { ChecklistItem } from "@/types";
import { Truck } from "lucide-react";

export const SUNDAY_SETUP_V2_STORAGE = "sunday-setup-v2";

export interface SundaySetupSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export const sundaySetupUnloadTrailer = {
  id: "unload-trailer",
  title: "Unload Trailer",
  icon: Truck,
};

export const sundaySetupV2Sections: SundaySetupSection[] = [
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
      { id: "sc-powered-speakers", label: "Power on all powered speakers" },
      { id: "sc-monitors-audio", label: "Verify all monitors are passing audio" },
      { id: "sc-subwoofer", label: "Verify subwoofer output" },
      { id: "sc-keyboard", label: "Check keyboard signal" },
      { id: "sc-kick", label: "Check kick drum" },
      { id: "sc-snare", label: "Check snare" },
      { id: "sc-toms", label: "Check toms" },
      { id: "sc-overheads", label: "Check overhead microphones" },
      { id: "sc-wireless", label: "Check all wireless microphones" },
      { id: "sc-media-playback", label: "Verify media computer playback" },
      { id: "sc-foh-lr", label: "Confirm left and right FOH speakers" },
      { id: "sc-room-walk", label: "Walk the room for even coverage" },
      { id: "sc-monitor-mixes", label: "Adjust monitor mixes as needed" },
      { id: "sc-main-lr", label: "Verify Main L/R output level" },
      { id: "sc-pastor-mic", label: "Confirm pastor microphone" },
      { id: "sc-worship-leader-mic", label: "Confirm worship leader microphone" },
      { id: "sc-unmute", label: "Remove all unnecessary channel mutes" },
      { id: "sc-rehearsal", label: "Ready for rehearsal" },
    ],
  },
  {
    id: "service-ready",
    title: "Service Ready",
    items: [
      { id: "ready-stage-clean", label: "Confirm stage is clean and clear" },
      { id: "ready-cables", label: "Secure all visible cables and cable crossings" },
      { id: "ready-wl-batteries", label: "Confirm wireless microphone batteries" },
      { id: "ready-tf5-scene", label: "Save the current TF5 scene" },
      { id: "ready-media-playback", label: "Set media computer to pre-service playback" },
      { id: "ready-pastor-mic", label: "Confirm pastor microphone is ready" },
      { id: "ready-worship-leader-mic", label: "Confirm worship leader microphone is ready" },
      { id: "ready-channels-unmuted", label: "Confirm all required channels are unmuted" },
      { id: "ready-team-position", label: "Confirm volunteer team is in position" },
      { id: "ready-team-prayer", label: "Team prayer complete" },
      { id: "ready-for-service", label: "Ready for Service" },
    ],
  },
];

export function getSundaySetupV2ItemIds(): string[] {
  return sundaySetupV2Sections.flatMap((section) =>
    section.items.map((item) => item.id)
  );
}
