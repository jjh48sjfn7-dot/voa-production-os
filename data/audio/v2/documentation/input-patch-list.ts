import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

// Future pages: TF5 Channel List, Output Routing, Signal Flow — will reference this page.

export const inputPatchList: DocumentationPageContent = {
  id: "input-patch-list",
  purpose: "Where does this cable physically plug in?",
  subtitle: "Official physical stage input assignments.",
  tableSections: [
    {
      title: "Stage Snake A",
      columns: [
        { key: "physicalInput", label: "Physical Input" },
        { key: "source", label: "Source" },
        { key: "notes", label: "Notes" },
      ],
      rows: [
        {
          physicalInput: "Input 1",
          source: "Kick",
          notes: "Drum Microphone",
        },
        {
          physicalInput: "Input 2",
          source: "Snare",
          notes: "Drum Microphone",
        },
        {
          physicalInput: "Input 3",
          source: "Toms",
          notes: "Drum Microphone",
        },
        {
          physicalInput: "Input 4",
          source: "Floor Tom",
          notes: "Drum Microphone",
        },
        {
          physicalInput: "Input 5",
          source: "Overhead Left",
          notes: "Drum Microphone",
        },
        {
          physicalInput: "Input 6",
          source: "Overhead Right",
          notes: "Drum Microphone",
        },
      ],
    },
    {
      title: "Stage Snake B",
      columns: [
        { key: "physicalInput", label: "Physical Input" },
        { key: "source", label: "Source" },
        { key: "notes", label: "Notes" },
      ],
      rows: [
        {
          physicalInput: "Input 1",
          source: "Keyboard",
          notes: "Stereo/Mono Feed",
        },
        {
          physicalInput: "Input 2",
          source: "Available",
          notes: "Reserved",
        },
        {
          physicalInput: "Input 3",
          source: "Available",
          notes: "Reserved",
        },
        {
          physicalInput: "Input 4",
          source: "Available",
          notes: "Reserved",
        },
        {
          physicalInput: "Input 5",
          source: "Available",
          notes: "Reserved",
        },
        {
          physicalInput: "Input 6",
          source: "Available",
          notes: "Reserved",
        },
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
      icon: "🎯",
      title: "Sunday Setup",
      href: "/audio/setup",
    },
    {
      icon: "🔄",
      title: "Signal Flow",
      href: "/audio/documentation/signal-flow",
    },
  ],
};
