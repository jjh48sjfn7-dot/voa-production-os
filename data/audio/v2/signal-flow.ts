import type { SignalFlowDocument } from "@/data/signal-flow/types";

export const audioSignalFlow: SignalFlowDocument = {
  id: "audio-signal-flow",
  title: "Signal Flow",
  subtitle: "Follow the complete audio path through the system.",
  paths: [
    {
      id: "keyboard-path",
      nodes: [
        {
          id: "keyboard",
          name: "Keyboard",
          icon: "keyboard",
          equipmentSlug: "keyboard",
        },
        {
          id: "stage-snake-b",
          name: "Stage Snake B",
          icon: "cable",
          equipmentSlug: "stage-snake-b",
        },
        {
          id: "tf5-keyboard",
          name: "Yamaha TF5",
          icon: "console",
          equipmentSlug: "yamaha-tf5",
        },
        { id: "main-lr-keyboard", name: "Main L/R", icon: "dmx-control" },
        {
          id: "foh-keyboard",
          name: "FOH Speakers",
          icon: "speaker",
          equipmentSlug: "qsc-k12-2",
        },
      ],
    },
    {
      id: "drums-path",
      nodes: [
        { id: "drum-mics", name: "Drum Microphones", icon: "drums" },
        {
          id: "stage-snake-a",
          name: "Stage Snake A",
          icon: "cable",
          equipmentSlug: "stage-snake-a",
        },
        {
          id: "tf5-drums",
          name: "Yamaha TF5",
          icon: "console",
          equipmentSlug: "yamaha-tf5",
        },
        { id: "main-lr-drums", name: "Main L/R", icon: "dmx-control" },
        {
          id: "foh-drums",
          name: "FOH Speakers",
          icon: "speaker",
          equipmentSlug: "qsc-k12-2",
        },
      ],
    },
    {
      id: "wireless-path",
      nodes: [
        {
          id: "wireless-mics",
          name: "Wireless",
          icon: "microphone",
        },
        {
          id: "blx-receivers",
          name: "Shure BLX Receivers",
          icon: "microphone",
          equipmentSlug: "shure-blx-receiver",
        },
        {
          id: "tf5-wireless",
          name: "Yamaha TF5",
          icon: "console",
          equipmentSlug: "yamaha-tf5",
        },
        { id: "main-lr-wireless", name: "Main L/R", icon: "dmx-control" },
        {
          id: "foh-wireless",
          name: "FOH Speakers",
          icon: "speaker",
          equipmentSlug: "qsc-k12-2",
        },
      ],
    },
  ],
  relatedLinks: [
    { title: "Stage Plot", href: "/audio/documentation/stage-plot" },
    { title: "TF5 Channel List", href: "/audio/documentation/tf5-channel-list" },
    { title: "Sunday Setup", href: "/audio/setup" },
  ],
};
