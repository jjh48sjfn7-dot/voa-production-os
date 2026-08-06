import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

// Future updates may include: Livestream Output, Recording Output, Cry Room Output,
// Lobby Audio, Broadcast Mix. Do not implement these now.

const outputColumns = [
  { key: "output", label: "TF5 Output" },
  { key: "destination", label: "Destination" },
  { key: "physicalConnection", label: "Physical Connection" },
  { key: "notes", label: "Notes" },
];

export const outputRouting: DocumentationPageContent = {
  id: "output-routing",
  purpose: "Where does each TF5 output go?",
  subtitle: "Official Yamaha TF5 output assignments.",
  tableSections: [
    {
      title: "Main Outputs",
      columns: outputColumns,
      rows: [
        {
          output: "Output 15",
          destination: "Left FOH Speaker",
          physicalConnection: "Stage Snake A Output 1 — QSC K12.2",
          notes: "Primary Left House Mix",
        },
        {
          output: "Output 16",
          destination: "Right FOH Speaker",
          physicalConnection: "Stage Snake B Output 1 — QSC K12.2",
          notes: "Primary Right House Mix",
        },
      ],
    },
    {
      title: "Monitor Outputs",
      columns: outputColumns,
      rows: [
        {
          output: "Output 4",
          destination: "Left Stage Monitor",
          physicalConnection: "Stage Snake A Output 2 — QSC K10.2",
          notes: "Stage Left Monitor Mix",
        },
        {
          output: "Output 5",
          destination: "Right Stage Monitor",
          physicalConnection: "Stage Snake B Output 2 — QSC K10.2",
          notes: "Stage Right Monitor Mix",
        },
        {
          output: "Output 3",
          destination: "Drummer In-Ear System",
          physicalConnection: "Stage Snake A Output 3 — Behringer PM1",
          notes: "Dedicated Drum Mix",
        },
      ],
    },
    {
      title: "Subwoofer Output",
      columns: outputColumns,
      rows: [
        {
          output: "Output 6",
          destination: "Subwoofer",
          physicalConnection: "TF5 Output 6 — placeholder until finalized",
          notes: "Subwoofer routing pending final configuration",
        },
      ],
    },
  ],
  infoSections: [
    {
      title: "Understanding Output Routing",
      body: [
        "Outputs do not have to match their physical connector numbers.",
        "A TF5 output can be assigned to any compatible physical output.",
        "Always verify routing before changing assignments.",
        "Only Audio Leads should modify output routing.",
      ],
    },
  ],
  listSections: [
    {
      title: "Best Practices",
      items: [
        "Verify routing before every service.",
        "Never repurpose an output without approval.",
        "Confirm monitor mixes during Soundcheck.",
        "Label every cable.",
        "Keep routing documentation updated.",
      ],
    },
  ],
  relatedResources: [
    {
      icon: "🎚️",
      title: "Yamaha TF5",
      href: "/audio/equipment/item/yamaha-tf5",
    },
    {
      icon: "📥",
      title: "Input Patch List",
      href: "/audio/documentation/input-patch-list",
    },
    {
      icon: "🎛️",
      title: "TF5 Channel List",
      href: "/audio/documentation/tf5-channel-list",
    },
    {
      icon: "🔌",
      title: "Stage Snake A",
      href: "/audio/equipment/item/stage-snake-a",
    },
    {
      icon: "🔌",
      title: "Stage Snake B",
      href: "/audio/equipment/item/stage-snake-b",
    },
    {
      icon: "🔄",
      title: "Signal Flow",
      href: "/audio/documentation/signal-flow",
    },
    {
      icon: "🎯",
      title: "Sunday Setup",
      href: "/audio/setup",
    },
  ],
};
