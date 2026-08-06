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

export const accessoryItems: EquipmentDefinition[] = [
  xlrCables,
  powerCables,
  colorCodedWirelessXlrCables,
  microphoneStands,
  speakerStands,
  cableCovers,
  adapters,
  diBoxes,
];
