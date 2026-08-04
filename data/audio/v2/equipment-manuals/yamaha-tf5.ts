import type { EquipmentManual } from "@/data/audio/v2/equipment-manuals/types";

export const yamahaTf5Manual: EquipmentManual = {
  slug: "yamaha-tf5",
  name: "Yamaha TF5",
  categoryHref: "/audio/equipment/console",
  categoryTitle: "Console",
  purpose:
    "The Yamaha TF5 is the primary audio console for Victory Outreach Antioch. It controls all microphones, playback audio, stage monitors and FOH speakers during Sunday service.",
  quickStart: [
    "Power on TF5",
    "Wait for full boot",
    "Load Sunday Scene",
    "Verify Main L/R is muted",
    "Verify Media Computer input",
    "Verify Stage Snake inputs",
    "Verify Stage outputs",
    "Ready for Soundcheck",
  ],
  connections: [
    { label: "Power", items: ["AC Power"] },
    {
      label: "Inputs",
      items: ["Stage Snake A", "Stage Snake B", "Playback", "Media Computer"],
    },
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
  troubleshooting: [
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
  related: [
    {
      title: "Stage Snake A",
      href: "/audio/equipment/stage-boxes/stage-snake-a",
    },
    {
      title: "Stage Snake B",
      href: "/audio/equipment/stage-boxes/stage-snake-b",
    },
    {
      title: "Media Computer",
      href: "/audio/equipment/playback/media-computer",
    },
    {
      title: "QSC KW153",
      href: "/audio/equipment/foh-speakers",
    },
    {
      title: "Shure BLX Receiver",
      href: "/audio/equipment/wireless/shure-blx-dual-receiver-1",
    },
  ],
};
