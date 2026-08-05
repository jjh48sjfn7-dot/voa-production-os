import type { StagePlotDocument } from "@/data/stage-plot/types";

export const audioStagePlot: StagePlotDocument = {
  id: "audio-stage-plot",
  title: "Stage Plot",
  subtitle: "Where does this equipment belong?",
  zones: [
    {
      id: "foh",
      title: "FOH",
      items: [
        {
          id: "yamaha-tf5",
          name: "Yamaha TF5",
          emoji: "🎚️",
          equipmentReference: "yamaha-tf5",
          position: "foh",
          category: "console",
        },
        {
          id: "media-computer",
          name: "Media Computer",
          emoji: "💻",
          equipmentReference: "media-computer",
          position: "foh",
          category: "playback",
        },
        {
          id: "confidence-monitor",
          name: "Confidence Monitor",
          emoji: "📺",
          position: "foh",
          category: "monitors",
        },
      ],
    },
    {
      id: "stage-left",
      title: "Stage Left",
      columnGroup: "stage",
      items: [
        {
          id: "stage-snake-a",
          name: "Stage Snake A",
          emoji: "🔌",
          equipmentReference: "stage-snake-a",
          position: "stage-left",
          category: "stage-boxes",
        },
        {
          id: "drum-kit",
          name: "Drum Kit",
          emoji: "🥁",
          position: "stage-left",
          category: "instruments",
        },
        {
          id: "left-monitor",
          name: "Left Monitor",
          emoji: "📣",
          equipmentReference: "stage-monitor-left",
          position: "stage-left",
          category: "monitors",
        },
      ],
    },
    {
      id: "center-stage",
      title: "Center Stage",
      columnGroup: "stage",
      items: [
        {
          id: "pastor-position",
          name: "Pastor Position",
          emoji: "🎤",
          position: "center-stage",
          category: "positions",
        },
        {
          id: "worship-leader-position",
          name: "Worship Leader Position",
          emoji: "🎤",
          position: "center-stage",
          category: "positions",
        },
      ],
    },
    {
      id: "stage-right",
      title: "Stage Right",
      columnGroup: "stage",
      items: [
        {
          id: "keyboard",
          name: "Keyboard",
          emoji: "🎹",
          equipmentReference: "keyboard",
          position: "stage-right",
          category: "instruments",
        },
        {
          id: "stage-snake-b",
          name: "Stage Snake B",
          emoji: "🔌",
          equipmentReference: "stage-snake-b",
          position: "stage-right",
          category: "stage-boxes",
        },
        {
          id: "right-monitor",
          name: "Right Monitor",
          emoji: "📣",
          equipmentReference: "stage-monitor-right",
          position: "stage-right",
          category: "monitors",
        },
      ],
    },
    {
      id: "front-of-stage",
      title: "Front of Stage",
      items: [
        {
          id: "foh-speaker-left",
          name: "Left FOH Speaker",
          emoji: "🔊",
          equipmentReference: "qsc-kw153-left",
          position: "front-of-stage",
          category: "foh-speakers",
        },
        {
          id: "foh-speaker-right",
          name: "Right FOH Speaker",
          emoji: "🔊",
          equipmentReference: "qsc-kw153-right",
          position: "front-of-stage",
          category: "foh-speakers",
        },
      ],
    },
  ],
  relatedLinks: [
    { title: "Signal Flow", href: "/audio/documentation/signal-flow" },
    { title: "Channel List", href: "/audio/documentation/channel-list" },
    { title: "Sunday Setup", href: "/audio/setup" },
  ],
};
