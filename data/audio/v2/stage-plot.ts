import type { StagePlotDocument } from "@/data/stage-plot/types";

export const audioStagePlot: StagePlotDocument = {
  id: "audio-stage-plot",
  title: "Stage Plot",
  subtitle: "Where is everything located on Sunday morning?",
  intro: {
    title: "What is the Stage Plot?",
    body: [
      "The Stage Plot shows where each major piece of audio equipment is positioned during Sunday setup.",
      "Use this page to identify equipment locations before making connections.",
    ],
  },
  items: [
    {
      id: "drum-kit",
      name: "Drum Kit",
      icon: "🥁",
      itemType: "stage",
      position: "center-stage",
      locationNotes: [
        "Located Center Stage.",
        "Connected to Stage Snake A.",
      ],
    },
    {
      id: "stage-snake-a",
      name: "Stage Snake A",
      icon: "🔌",
      equipmentSlug: "stage-snake-a",
      itemType: "equipment",
      position: "stage-left",
      locationNotes: [
        "Left side of the stage (when facing the audience).",
        "Carries drum mics and the left monitor output.",
      ],
    },
    {
      id: "left-monitor",
      name: "Left Monitor",
      icon: "📣",
      equipmentSlug: "qsc-k10-2",
      itemType: "equipment",
      position: "stage-left",
      locationNotes: [
        "Left side of the stage (when facing the audience).",
        "On-stage speaker for musicians on the left.",
      ],
    },
    {
      id: "keyboard",
      name: "Keyboard",
      icon: "🎹",
      equipmentSlug: "keyboard",
      itemType: "equipment",
      position: "stage-right",
      locationNotes: [
        "Located Stage Right.",
        "Connected to Stage Snake B Input 1.",
      ],
    },
    {
      id: "stage-snake-b",
      name: "Stage Snake B",
      icon: "🔌",
      equipmentSlug: "stage-snake-b",
      itemType: "equipment",
      position: "stage-right",
      locationNotes: [
        "Right side of the stage (when facing the audience).",
        "Carries the keyboard input and right monitor output.",
      ],
    },
    {
      id: "right-monitor",
      name: "Right Monitor",
      icon: "📣",
      equipmentSlug: "qsc-k10-2",
      itemType: "equipment",
      position: "stage-right",
      locationNotes: [
        "Right side of the stage (when facing the audience).",
        "On-stage speaker for musicians on the right.",
      ],
    },
    {
      id: "foh-speaker-left",
      name: "FOH Left Speaker",
      icon: "🔊",
      equipmentSlug: "qsc-k12-2",
      itemType: "equipment",
      position: "front-of-stage",
      locationNotes: ["Placed front-left of the stage."],
    },
    {
      id: "subwoofer",
      name: "Subwoofer (Placeholder)",
      icon: "🔉",
      equipmentSlug: "subwoofer",
      itemType: "equipment",
      position: "front-of-stage",
      locationNotes: [
        "Front of stage — exact placement to be confirmed.",
        "Low bass reinforcement for the sanctuary.",
      ],
    },
    {
      id: "foh-speaker-right",
      name: "FOH Right Speaker",
      icon: "🔊",
      equipmentSlug: "qsc-k12-2",
      itemType: "equipment",
      position: "front-of-stage",
      locationNotes: ["Placed front-right of the stage."],
    },
    {
      id: "mac-desktop",
      name: "Mac Desktop",
      icon: "💻",
      equipmentSlug: "media-computer",
      itemType: "equipment",
      position: "foh",
      locationNotes: [
        "Located in the audience at FOH.",
        "Runs ProPresenter and audio playback.",
      ],
    },
    {
      id: "yamaha-tf5",
      name: "Yamaha TF5",
      icon: "🎚️",
      equipmentSlug: "yamaha-tf5",
      itemType: "equipment",
      position: "foh",
      locationNotes: [
        "Located in the audience at FOH.",
        "Main mixing console for Sunday services.",
      ],
    },
    {
      id: "wireless-receivers",
      name: "Wireless Receivers",
      icon: "🎤",
      href: "/audio/equipment/wireless",
      itemType: "equipment",
      position: "foh",
      locationNotes: [
        "Located in the audience at FOH.",
        "Shure BLX288 receivers for handheld microphones.",
      ],
    },
  ],
  mapRows: [
    {
      id: "center-stage",
      zones: [
        {
          id: "center-stage-zone",
          title: "Center Stage",
          itemIds: ["drum-kit"],
        },
      ],
    },
    {
      id: "stage-sides",
      zones: [
        {
          id: "stage-left-zone",
          title: "Stage Left",
          plainTitle: "Left side of the stage (when facing the audience)",
          itemIds: ["stage-snake-a", "left-monitor"],
        },
        {
          id: "stage-right-zone",
          title: "Stage Right",
          plainTitle: "Right side of the stage (when facing the audience)",
          itemIds: ["keyboard", "stage-snake-b", "right-monitor"],
        },
      ],
    },
    {
      id: "front-of-stage",
      zones: [
        {
          id: "front-of-stage-zone",
          title: "Front of Stage",
          plainTitle: "Closest to the congregation",
          itemIds: ["foh-speaker-left", "subwoofer", "foh-speaker-right"],
        },
      ],
    },
    {
      id: "foh-position",
      zones: [
        {
          id: "foh-position-zone",
          title: "FOH Position",
          plainTitle: "Located in the audience",
          itemIds: ["mac-desktop", "yamaha-tf5", "wireless-receivers"],
        },
      ],
    },
  ],
  relatedLinks: [
    { title: "Sunday Setup", href: "/audio/setup" },
    { title: "Signal Flow", href: "/audio/documentation/signal-flow" },
    {
      title: "Input Patch List",
      href: "/audio/documentation/input-patch-list",
    },
    {
      title: "Output Routing",
      href: "/audio/documentation/output-routing",
    },
    { title: "Equipment", href: "/audio/equipment" },
  ],
};

export function getStagePlotItemById(
  document: StagePlotDocument,
  id: string
): StagePlotDocument["items"][number] | undefined {
  return document.items.find((item) => item.id === id);
}
