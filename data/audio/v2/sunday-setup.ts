import type { ChecklistItem } from "@/types";

export const SUNDAY_SETUP_V2_STORAGE = "sunday-setup-v2";

export interface SundaySetupChecklistGroup {
  label: string;
  items: ChecklistItem[];
}

export interface SundaySetupSection {
  id: string;
  title: string;
  emoji?: string;
  items?: ChecklistItem[];
  groups?: SundaySetupChecklistGroup[];
}

export const sundaySetupUnloadTrailer = {
  id: "unload-trailer",
  title: "Unload Trailer",
  emoji: "📦",
};

export const sundaySetupV2Sections: SundaySetupSection[] = [
  {
    id: "positioning",
    title: "Positioning",
    emoji: "🎯",
    items: [
      { id: "pos-drums", label: "Position Drums" },
      { id: "pos-snake", label: "Run Stage Snake A & B" },
      { id: "pos-foh-speakers", label: "Position FOH Speakers" },
      { id: "pos-monitors", label: "Position Monitors" },
    ],
  },
  {
    id: "setup-tf5",
    title: "Setup TF5",
    emoji: "🎚️",
    items: [
      { id: "tf5-power", label: "Power on TF5" },
      { id: "tf5-scene", label: "Load Sunday Scene" },
      { id: "tf5-mute-main", label: "Mute Main L/R Output" },
      {
        id: "tf5-xlrs",
        label: "Connect all stage input and output XLRs",
      },
      { id: "tf5-input-routing", label: "Verify Input Routing" },
      { id: "tf5-output-routing", label: "Verify Output Routing" },
      {
        id: "tf5-media-input",
        label: "Verify Media Computer Audio Input",
      },
      {
        id: "tf5-unmute-soundcheck",
        label: "Unmute System when Soundcheck Begins",
      },
    ],
  },
  {
    id: "stage-right",
    title: "Stage Right",
    emoji: "🔌",
    groups: [
      {
        label: "STAGE RIGHT — INPUTS",
        items: [
          { id: "sr-in-keyboard", label: "Patch Keyboard to Input 1" },
        ],
      },
      {
        label: "STAGE RIGHT — OUTPUTS",
        items: [
          {
            id: "sr-out-foh",
            label: "Patch Right FOH Speaker to Output 1",
          },
          {
            id: "sr-out-monitor",
            label: "Patch Right Monitor to Output 2",
          },
          { id: "sr-out-open-3", label: "Leave Output 3 Open" },
          { id: "sr-out-open", label: "Leave Output 4 Open" },
          {
            id: "sr-out-run",
            label:
              "Run patched outputs to FOH speakers and monitors",
          },
        ],
      },
    ],
  },
  {
    id: "stage-left",
    title: "Stage Left",
    emoji: "🔌",
    groups: [
      {
        label: "STAGE LEFT — INPUTS",
        items: [
          { id: "sl-in-kick", label: "Patch Kick to Input 1" },
          { id: "sl-in-snare", label: "Patch Snare to Input 2" },
          { id: "sl-in-toms", label: "Patch Toms to Input 3" },
          { id: "sl-in-floor-tom", label: "Patch Floor Tom to Input 4" },
          {
            id: "sl-in-overhead-1",
            label: "Patch Overhead Microphone 1 to Input 5",
          },
          {
            id: "sl-in-overhead-2",
            label: "Patch Overhead Microphone 2 to Input 6",
          },
        ],
      },
      {
        label: "STAGE LEFT — OUTPUTS",
        items: [
          {
            id: "sl-out-foh",
            label: "Patch Left FOH Speaker to Output 1",
          },
          {
            id: "sl-out-monitor",
            label: "Patch Left Monitor to Output 2",
          },
          {
            id: "sl-out-ie",
            label: "Patch Drummer In-Ear System to Output 3",
          },
          { id: "sl-out-open", label: "Leave Output 4 Open" },
          {
            id: "sl-out-run",
            label:
              "Run patched outputs to FOH speakers and monitors",
          },
        ],
      },
    ],
  },
  {
    id: "wireless",
    title: "Wireless Setup",
    emoji: "🎤",
    items: [
      {
        id: "wl-power",
        label: "Power on both microphone receivers",
      },
      {
        id: "wl-xlrs",
        label: "Connect all wireless XLRs using the matching cable colors",
      },
      { id: "wl-purple", label: "Patch Purple to Channel 17" },
      { id: "wl-yellow", label: "Patch Yellow to Channel 18" },
      { id: "wl-green", label: "Patch Green to Channel 19" },
      { id: "wl-blue", label: "Patch Blue to Channel 20" },
    ],
  },
  {
    id: "soundcheck",
    title: "Soundcheck",
    emoji: "🔊",
    items: [
      { id: "sc-powered-speakers", label: "Power on all powered speakers" },
      {
        id: "sc-monitors-audio",
        label: "Verify all monitors are passing audio",
      },
      { id: "sc-subwoofer", label: "Verify subwoofer output" },
      { id: "sc-keyboard", label: "Check keyboard signal" },
      { id: "sc-kick", label: "Check kick drum" },
      { id: "sc-snare", label: "Check snare" },
      { id: "sc-toms", label: "Check toms" },
      { id: "sc-overheads", label: "Check overhead microphones" },
      { id: "sc-wireless", label: "Check all wireless microphones" },
      {
        id: "sc-media-playback",
        label: "Verify media computer playback",
      },
      {
        id: "sc-foh-lr",
        label: "Confirm left and right FOH speakers",
      },
      {
        id: "sc-room-walk",
        label: "Walk the room for even coverage",
      },
      {
        id: "sc-monitor-mixes",
        label: "Adjust monitor mixes as needed",
      },
      { id: "sc-main-lr", label: "Verify Main L/R output level" },
      { id: "sc-pastor-mic", label: "Confirm pastor microphone" },
      {
        id: "sc-worship-leader-mic",
        label: "Confirm worship leader microphone",
      },
      {
        id: "sc-unmute",
        label: "Remove all unnecessary channel mutes",
      },
      { id: "sc-rehearsal", label: "Ready for rehearsal" },
    ],
  },
  {
    id: "service-ready",
    title: "Service Ready",
    emoji: "✅",
    items: [
      {
        id: "ready-stage-clean",
        label: "Confirm stage is clean and clear",
      },
      {
        id: "ready-cables",
        label: "Secure all visible cables and cable crossings",
      },
      {
        id: "ready-wl-batteries",
        label: "Confirm wireless microphone batteries",
      },
      { id: "ready-tf5-scene", label: "Save the current TF5 scene" },
      {
        id: "ready-media-playback",
        label: "Set media computer to pre-service playback",
      },
      {
        id: "ready-pastor-mic",
        label: "Confirm pastor microphone is ready",
      },
      {
        id: "ready-worship-leader-mic",
        label: "Confirm worship leader microphone is ready",
      },
      {
        id: "ready-channels-unmuted",
        label: "Confirm all required channels are unmuted",
      },
      {
        id: "ready-team-position",
        label: "Confirm volunteer team is in position",
      },
      { id: "ready-team-prayer", label: "Team prayer complete" },
      { id: "ready-for-service", label: "Ready for Service" },
    ],
  },
];

export function getSectionItems(section: SundaySetupSection): ChecklistItem[] {
  if (section.groups) {
    return section.groups.flatMap((group) => group.items);
  }
  return section.items ?? [];
}

export function getSectionTaskCount(section: SundaySetupSection): number {
  return getSectionItems(section).length;
}

export function getSundaySetupV2ItemIds(): string[] {
  return sundaySetupV2Sections.flatMap((section) =>
    getSectionItems(section).map((item) => item.id)
  );
}
