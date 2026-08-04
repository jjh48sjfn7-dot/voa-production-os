import type { EquipmentDefinition } from "@/data/audio/v2/equipment/types";

export const yamahaTf5: EquipmentDefinition = {
  id: "yamaha-tf5",
  slug: "yamaha-tf5",
  name: "Yamaha TF5",
  categoryId: "console",
  icon: "🎚️",
  purpose:
    "The Yamaha TF5 is the primary audio console for Victory Outreach Antioch. It controls all microphones, playback audio, stage monitors, and FOH speakers during Sunday service.",
  quickStart: [
    "Power on TF5",
    "Wait for full boot",
    "Load Sunday Scene",
    "Verify Main L/R is muted",
    "Verify Media Computer input",
    "Verify stage snake inputs",
    "Verify Stage outputs",
    "Ready for Soundcheck",
  ],
  connections: [
    { label: "Power", items: ["AC Power"] },
    { label: "Inputs", items: ["Stage Snake A", "Stage Snake B"] },
    { label: "Playback", items: ["Media Computer"] },
    {
      label: "Outputs",
      items: ["FOH Speakers", "Stage Monitors", "Drummer In-Ear"],
    },
  ],
  sundaySetup: {
    href: "/audio/setup",
    label: "Open Sunday Setup",
    description: "Setup TF5 section",
  },
  commonProblems: [
    {
      id: "no-audio",
      title: "No Audio",
      problem: "No sound is coming from the console or speakers.",
      possibleCauses: [
        "Main L/R output is muted",
        "Powered speakers are off",
        "Output routing is incorrect",
        "Cable is unplugged",
      ],
      basicChecks: [
        "Confirm TF5 is powered on and fully booted",
        "Check Main L/R mute status",
        "Verify powered speakers are on",
        "Confirm output cables are connected",
      ],
    },
    {
      id: "console-frozen",
      title: "Console Frozen",
      problem: "The TF5 screen or controls are not responding.",
      possibleCauses: [
        "Console is still booting",
        "Temporary software freeze",
        "Network connection issue",
      ],
      basicChecks: [
        "Wait for full boot to complete",
        "Try pressing Home on the touchscreen",
        "Power cycle the console if unresponsive",
      ],
    },
    {
      id: "no-input-signal",
      title: "No Input Signal",
      problem: "A channel shows no input signal on the TF5.",
      possibleCauses: [
        "Source is not connected",
        "Wrong input is patched",
        "Channel is muted or gain is too low",
        "Stage snake cable is unplugged",
      ],
      basicChecks: [
        "Verify the source is connected at the stage box",
        "Confirm input routing on the TF5",
        "Check channel mute and fader level",
        "Trace the cable from stage to console",
      ],
    },
    {
      id: "no-output-signal",
      title: "No Output Signal",
      problem: "A monitor or speaker output is not receiving signal.",
      possibleCauses: [
        "Output routing is incorrect",
        "Output is muted",
        "Speaker or monitor is powered off",
        "Output cable is unplugged",
      ],
      basicChecks: [
        "Verify output routing on the TF5",
        "Check output mute status",
        "Confirm the speaker or monitor is powered on",
        "Inspect output cables at the stage box",
      ],
    },
    {
      id: "media-not-playing",
      title: "Media Computer Not Playing",
      problem: "Playback from the media computer is not heard through the system.",
      possibleCauses: [
        "Media computer volume is muted",
        "Wrong input is selected on TF5",
        "Playback cable is unplugged",
        "Channel is muted on the console",
      ],
      basicChecks: [
        "Confirm media computer is playing audio",
        "Verify playback cable is connected",
        "Check the media input channel on the TF5",
        "Confirm the channel is unmuted",
      ],
    },
  ],
  downloads: [
    { label: "User Manual", href: "#" },
    { label: "Channel List", href: "#" },
    { label: "Sunday Scene", href: "#" },
    { label: "Signal Flow", href: "#" },
  ],
  relatedEquipment: [
    { slug: "stage-snake-a", name: "Stage Snake A" },
    { slug: "stage-snake-b", name: "Stage Snake B" },
    { slug: "media-computer", name: "Media Computer" },
    { slug: "qsc-kw153", name: "QSC KW153" },
    { slug: "shure-blx-receiver", name: "Shure BLX Receiver" },
  ],
};

export const stageSnakeA: EquipmentDefinition = {
  id: "stage-snake-a",
  slug: "stage-snake-a",
  name: "Stage Snake A",
  categoryId: "stage-boxes",
  icon: "🔌",
  purpose:
    "Stage Snake A carries drum and stage-left inputs from the platform to the Yamaha TF5.",
  relatedEquipment: [
    { slug: "yamaha-tf5", name: "Yamaha TF5" },
    { slug: "stage-snake-b", name: "Stage Snake B" },
  ],
};

export const stageSnakeB: EquipmentDefinition = {
  id: "stage-snake-b",
  slug: "stage-snake-b",
  name: "Stage Snake B",
  categoryId: "stage-boxes",
  icon: "🔌",
  purpose:
    "Stage Snake B carries keyboard and stage-right inputs from the platform to the Yamaha TF5.",
  relatedEquipment: [
    { slug: "yamaha-tf5", name: "Yamaha TF5" },
    { slug: "stage-snake-a", name: "Stage Snake A" },
  ],
};

export const shureBlxReceiver: EquipmentDefinition = {
  id: "shure-blx-receiver",
  slug: "shure-blx-receiver",
  name: "Shure BLX Receiver",
  categoryId: "wireless",
  icon: "🎤",
  purpose:
    "Shure BLX receivers provide wireless microphone audio to the Yamaha TF5 during Sunday service.",
  relatedEquipment: [{ slug: "yamaha-tf5", name: "Yamaha TF5" }],
};

export const qscKw153: EquipmentDefinition = {
  id: "qsc-kw153",
  slug: "qsc-kw153",
  name: "QSC KW153",
  categoryId: "foh-speakers",
  icon: "🔊",
  purpose:
    "QSC KW153 powered speakers deliver front-of-house audio for the sanctuary.",
  relatedEquipment: [{ slug: "yamaha-tf5", name: "Yamaha TF5" }],
};

export const stageMonitor: EquipmentDefinition = {
  id: "stage-monitor",
  slug: "stage-monitor",
  name: "Stage Monitor",
  categoryId: "monitors",
  icon: "📣",
  purpose:
    "Stage monitors provide on-stage audio for musicians and vocalists during service.",
  relatedEquipment: [{ slug: "yamaha-tf5", name: "Yamaha TF5" }],
};

export const mediaComputer: EquipmentDefinition = {
  id: "media-computer",
  slug: "media-computer",
  name: "Media Computer",
  categoryId: "playback",
  icon: "💻",
  purpose:
    "The media computer sends playback and presentation audio to the Yamaha TF5.",
  relatedEquipment: [{ slug: "yamaha-tf5", name: "Yamaha TF5" }],
};

export const equipmentItems: EquipmentDefinition[] = [
  yamahaTf5,
  stageSnakeA,
  stageSnakeB,
  shureBlxReceiver,
  qscKw153,
  stageMonitor,
  mediaComputer,
];
