import type { SignalFlowDocument } from "@/data/signal-flow/types";

export const audioSignalFlow: SignalFlowDocument = {
  id: "audio-signal-flow",
  title: "Signal Flow",
  subtitle: "Follow the complete audio path through the system.",
  paths: [
    {
      id: "keyboard-path",
      nodes: [
        { id: "keyboard", name: "Keyboard", emoji: "🎹", equipmentSlug: "keyboard" },
        {
          id: "stage-snake-b",
          name: "Stage Snake B",
          emoji: "🔌",
          equipmentSlug: "stage-snake-b",
        },
        {
          id: "tf5-keyboard",
          name: "Yamaha TF5",
          emoji: "🎚️",
          equipmentSlug: "yamaha-tf5",
        },
        { id: "main-lr-keyboard", name: "Main L/R", emoji: "🎛️" },
        {
          id: "foh-keyboard",
          name: "FOH Speakers",
          emoji: "🔊",
          equipmentSlug: "qsc-kw153",
        },
      ],
    },
    {
      id: "drums-path",
      nodes: [
        { id: "drum-mics", name: "Drum Microphones", emoji: "🥁" },
        {
          id: "stage-snake-a",
          name: "Stage Snake A",
          emoji: "🔌",
          equipmentSlug: "stage-snake-a",
        },
        {
          id: "tf5-drums",
          name: "Yamaha TF5",
          emoji: "🎚️",
          equipmentSlug: "yamaha-tf5",
        },
        { id: "main-lr-drums", name: "Main L/R", emoji: "🎛️" },
        {
          id: "foh-drums",
          name: "FOH Speakers",
          emoji: "🔊",
          equipmentSlug: "qsc-kw153",
        },
      ],
    },
    {
      id: "wireless-path",
      nodes: [
        {
          id: "wireless-mics",
          name: "Wireless Microphones",
          emoji: "🎤",
        },
        {
          id: "blx-receivers",
          name: "Shure BLX Receivers",
          emoji: "🎤",
          equipmentSlug: "shure-blx-receiver",
        },
        {
          id: "tf5-wireless",
          name: "Yamaha TF5",
          emoji: "🎚️",
          equipmentSlug: "yamaha-tf5",
        },
        { id: "main-lr-wireless", name: "Main L/R", emoji: "🎛️" },
        {
          id: "foh-wireless",
          name: "FOH Speakers",
          emoji: "🔊",
          equipmentSlug: "qsc-kw153",
        },
      ],
    },
  ],
  relatedLinks: [
    { title: "Stage Plot", href: "/audio/documentation/stage-plot" },
    { title: "Channel List", href: "/audio/documentation/channel-list" },
    { title: "Sunday Setup", href: "/audio/setup" },
  ],
};
