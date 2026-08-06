import type { EquipmentDefinition } from "@/data/audio/v2/equipment/types";

function createAccessoryItem(
  slug: string,
  name: string,
  icon: string,
  purpose: string
): EquipmentDefinition {
  return {
    id: slug,
    slug,
    name,
    categoryId: "accessories",
    icon,
    purpose,
    quickStart: [
      "Locate the approved storage area",
      "Inspect before each service",
      "Return to storage after teardown",
    ],
    specifications: [{ label: "Type", value: name }],
    primaryConnections: ["Used throughout the audio system"],
    bestPractices: [
      "Return to approved storage after service.",
      "Inspect for damage before use.",
      "Report missing or damaged items to the Audio Lead.",
    ],
    commonProblems: [
      {
        id: `${slug}-damaged`,
        title: "Damaged or Missing",
        basicChecks: [
          "Inspect the item before use.",
          "Check the approved storage location.",
          "Label and remove damaged items from service.",
          "Notify the Audio Lead.",
        ],
      },
    ],
    relatedEquipment: [{ slug: "yamaha-tf5", name: "Yamaha TF5" }],
    setupLinks: [
      { href: "/audio/setup", label: "Sunday Setup" },
      {
        href: "/audio/documentation/wiring-standards",
        label: "Wiring Standards",
      },
    ],
    downloads: [{ label: `${name} Reference`, href: "#" }],
  };
}

export const xlrCables = createAccessoryItem(
  "xlr-cables",
  "XLR Cables",
  "🔌",
  "Color-coded XLR cables connect microphones, snakes, and the Yamaha TF5."
);

export const powerCables = createAccessoryItem(
  "power-cables",
  "Power Cables",
  "⚡",
  "Power cables supply AC power to the Yamaha TF5, speakers, and rack equipment."
);

export const colorCodedWirelessXlrCables = createAccessoryItem(
  "color-coded-wireless-xlr-cables",
  "Color-Coded Wireless XLR Cables",
  "🎤",
  "Purple, Yellow, Green, and Blue XLR cables connect wireless receivers to TF5 Channels 17–20."
);

export const microphoneStands = createAccessoryItem(
  "microphone-stands",
  "Microphone Stands",
  "🎙️",
  "Microphone stands support wired and wireless microphones on stage."
);

export const speakerStands = createAccessoryItem(
  "speaker-stands",
  "Speaker Stands",
  "🔊",
  "Speaker stands support monitors and other approved speakers when needed."
);

export const cableCovers = createAccessoryItem(
  "cable-covers",
  "Cable Covers",
  "🛡️",
  "Cable covers protect signal paths across walkways during service."
);

export const adapters = createAccessoryItem(
  "adapters",
  "Adapters",
  "🔗",
  "Adapters connect mismatched audio connectors when approved by the Audio Lead."
);

export const diBoxes = createAccessoryItem(
  "di-boxes",
  "DI Boxes",
  "📦",
  "DI boxes convert instrument-level signals to balanced mic-level for the TF5."
);

export const keyboard: EquipmentDefinition = {
  id: "keyboard",
  slug: "keyboard",
  name: "Keyboard",
  categoryId: "playback",
  icon: "🎹",
  purpose:
    "The worship keyboard sends audio to the Yamaha TF5 through Stage Snake B for Sunday services.",
  quickStart: [
    "Confirm keyboard power and output level",
    "Connect keyboard output to Stage Snake B Input 1",
    "Verify TF5 Channel 16 receives signal",
    "Check keyboard level during soundcheck",
  ],
  specifications: [
    { label: "TF5 Channel", value: "16 — Keyboard" },
    { label: "Physical Input", value: "Stage Snake B Input 1" },
  ],
  primaryConnections: ["Stage Snake B — Input 1"],
  bestPractices: [
    "Verify keyboard level before service.",
    "Use the approved DI or direct connection.",
    "Do not change TF5 channel routing without Audio Lead approval.",
  ],
  commonProblems: [
    {
      id: "keyboard-no-signal",
      title: "No Keyboard Signal",
      basicChecks: [
        "Confirm keyboard is connected to Stage Snake B Input 1",
        "Check keyboard power and volume",
        "Verify TF5 Channel 16 is not muted",
        "Reseat the signal cable",
      ],
    },
  ],
  relatedEquipment: [
    { slug: "stage-snake-b", name: "Stage Snake B" },
    { slug: "yamaha-tf5", name: "Yamaha TF5" },
  ],
  setupLinks: [
    { href: "/audio/setup", label: "Sunday Setup" },
    {
      href: "/audio/documentation/tf5-channel-list",
      label: "TF5 Channel List",
    },
    {
      href: "/audio/troubleshooting/no-keyboard-audio",
      label: "No Keyboard Audio Troubleshooting",
    },
  ],
  downloads: [{ label: "Keyboard Patch Reference", href: "#" }],
};

export const accessoryItems: EquipmentDefinition[] = [
  xlrCables,
  powerCables,
  colorCodedWirelessXlrCables,
  microphoneStands,
  speakerStands,
  cableCovers,
  adapters,
  diBoxes,
  keyboard,
];
