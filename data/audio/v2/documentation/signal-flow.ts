import type { SignalFlowVolunteerDocument } from "@/data/audio/v2/documentation/signal-flow-types";

export const signalFlowVolunteerDocument: SignalFlowVolunteerDocument = {
  id: "signal-flow",
  title: "Signal Flow",
  subtitle: "How does sound travel through our system?",
  intro: {
    title: "What is Signal Flow?",
    body: [
      "Signal flow is the path audio takes from its source to its destination.",
      "Following the path helps volunteers understand the system and identify where a problem may be occurring.",
    ],
  },
  groups: [
    {
      id: "keyboard",
      title: "🎹 Keyboard to FOH",
      steps: [
        {
          id: "keyboard-source",
          helper: "Where sound starts",
          lines: ["Keyboard"],
          icon: "keyboard",
          equipmentSlug: "keyboard",
        },
        {
          id: "keyboard-snake",
          helper: "Where sound enters",
          lines: ["Stage Snake B", "Input 1"],
          icon: "cable",
          equipmentSlug: "stage-snake-b",
        },
        {
          id: "keyboard-channel",
          helper: "Where sound is mixed",
          lines: ["Yamaha TF5", "Channel 16 — Keys"],
          icon: "console",
          equipmentSlug: "yamaha-tf5",
        },
        {
          id: "keyboard-main",
          helper: "House mix",
          lines: ["Main L/R Mix"],
          icon: "dmx-control",
        },
        {
          id: "keyboard-outputs",
          helper: "Where sound leaves the console",
          lines: ["TF5 Outputs", "15 — Left FOH", "16 — Right FOH"],
          icon: "signal-out",
        },
        {
          id: "keyboard-physical",
          helper: "Physical outputs",
          lines: [
            "Stage Snake A Output 1 — Left FOH",
            "Stage Snake B Output 1 — Right FOH",
          ],
          icon: "cable",
        },
        {
          id: "keyboard-foh",
          helper: "Where the congregation hears it",
          lines: ["QSC K12.2 FOH Speakers", "Left and Right"],
          icon: "speaker",
          equipmentSlug: "qsc-k12-2",
        },
      ],
      relatedLinks: [
        {
          title: "Keyboard Equipment",
          href: "/audio/equipment/item/keyboard",
        },
        {
          title: "Stage Snake B",
          href: "/audio/equipment/item/stage-snake-b",
        },
        {
          title: "Yamaha TF5",
          href: "/audio/equipment/item/yamaha-tf5",
        },
        {
          title: "TF5 Channel List",
          href: "/audio/documentation/tf5-channel-list",
        },
        {
          title: "Output Routing",
          href: "/audio/documentation/output-routing",
        },
        {
          title: "No Keyboard Audio",
          href: "/audio/troubleshooting/no-keyboard-audio",
        },
      ],
    },
    {
      id: "wireless",
      title: "🎤 Wireless Microphones to FOH",
      wireless: {
        headSteps: [
          {
            id: "wireless-mic",
            helper: "Where sound starts",
            lines: ["Wireless Microphone"],
            icon: "microphone",
          },
          {
            id: "wireless-receiver",
            helper: "Where the receiver picks it up",
            lines: ["Shure BLX288 Receiver"],
            icon: "microphone",
            equipmentSlug: "shure-blx-receiver",
          },
        ],
        colors: [
          {
            id: "wireless-purple",
            color: "Purple",
            localInput: "TF5 Local Input 17",
            channel: "TF5 Channel 17 — Purple",
          },
          {
            id: "wireless-yellow",
            color: "Yellow",
            localInput: "TF5 Local Input 18",
            channel: "TF5 Channel 18 — Yellow",
          },
          {
            id: "wireless-green",
            color: "Green",
            localInput: "TF5 Local Input 19",
            channel: "TF5 Channel 19 — Green",
          },
          {
            id: "wireless-blue",
            color: "Blue",
            localInput: "TF5 Local Input 20",
            channel: "TF5 Channel 20 — Blue",
          },
        ],
        tailSteps: [
          {
            id: "wireless-main",
            helper: "House mix",
            lines: ["Main L/R Mix"],
            icon: "dmx-control",
          },
          {
            id: "wireless-outputs",
            helper: "Where sound leaves the console",
            lines: ["TF5 Outputs 15 and 16"],
            icon: "signal-out",
          },
          {
            id: "wireless-foh",
            helper: "Where the congregation hears it",
            lines: ["QSC K12.2 FOH Speakers"],
            icon: "speaker",
            equipmentSlug: "qsc-k12-2",
          },
        ],
      },
      relatedLinks: [
        {
          title: "Shure BLX288",
          href: "/audio/equipment/item/shure-blx-receiver",
        },
        {
          title: "TF5 Channel List",
          href: "/audio/documentation/tf5-channel-list",
        },
        {
          title: "Output Routing",
          href: "/audio/documentation/output-routing",
        },
        {
          title: "No Wireless Microphone",
          href: "/audio/troubleshooting/no-wireless-microphone",
        },
        { title: "Sunday Setup", href: "/audio/setup" },
      ],
    },
    {
      id: "drums",
      title: "🥁 Drums to FOH",
      drumSources: [
        {
          id: "kick",
          name: "Kick",
          snakeInput: "Stage Snake A Input 1",
          channel: "TF5 Channel 28",
        },
        {
          id: "snare",
          name: "Snare",
          snakeInput: "Stage Snake A Input 2",
          channel: "TF5 Channel 25",
        },
        {
          id: "toms",
          name: "Toms",
          snakeInput: "Stage Snake A Input 3",
          channel: "TF5 Channel 26",
        },
        {
          id: "floor-tom",
          name: "Floor Tom",
          snakeInput: "Stage Snake A Input 4",
          channel: "TF5 Channel 27",
        },
        {
          id: "overhead-left",
          name: "Overhead Left",
          snakeInput: "Stage Snake A Input 5",
          channel: "TF5 Channel 29",
        },
        {
          id: "overhead-right",
          name: "Overhead Right",
          snakeInput: "Stage Snake A Input 6",
          channel: "TF5 Channel 30",
        },
      ],
      steps: [
        {
          id: "drums-main",
          helper: "All drum channels combine here",
          lines: ["Main L/R Mix"],
          icon: "dmx-control",
        },
        {
          id: "drums-outputs",
          helper: "Where sound leaves the console",
          lines: ["TF5 Outputs 15 and 16"],
          icon: "signal-out",
        },
        {
          id: "drums-physical",
          helper: "Physical outputs",
          lines: ["Stage Snake A/B Output 1"],
          icon: "cable",
        },
        {
          id: "drums-foh",
          helper: "Where the congregation hears it",
          lines: ["QSC K12.2 FOH Speakers"],
          icon: "speaker",
          equipmentSlug: "qsc-k12-2",
        },
      ],
      relatedLinks: [
        {
          title: "Stage Snake A",
          href: "/audio/equipment/item/stage-snake-a",
        },
        {
          title: "Yamaha TF5",
          href: "/audio/equipment/item/yamaha-tf5",
        },
        {
          title: "Input Patch List",
          href: "/audio/documentation/input-patch-list",
        },
        {
          title: "TF5 Channel List",
          href: "/audio/documentation/tf5-channel-list",
        },
        {
          title: "No Drum Audio",
          href: "/audio/troubleshooting/no-drum-audio",
        },
      ],
    },
    {
      id: "media-computer",
      title: "💻 Media Computer to FOH",
      steps: [
        {
          id: "playback-source",
          helper: "Where sound starts",
          lines: ["Mac Desktop", "ProPresenter / Audio Playback"],
          icon: "computer",
          equipmentSlug: "media-computer",
        },
        {
          id: "playback-inputs",
          helper: "Where sound enters",
          lines: ["TF5 Local Inputs", "31 and 32"],
          icon: "signal-in",
        },
        {
          id: "playback-channels",
          helper: "Where sound is mixed",
          lines: ["TF5 Channels", "31 — Computer Left", "32 — Computer Right"],
          icon: "console",
          equipmentSlug: "yamaha-tf5",
        },
        {
          id: "playback-main",
          helper: "House mix",
          lines: ["Main L/R Mix"],
          icon: "dmx-control",
        },
        {
          id: "playback-outputs",
          helper: "Where sound leaves the console",
          lines: ["TF5 Outputs", "15 and 16"],
          icon: "signal-out",
        },
        {
          id: "playback-foh",
          helper: "Where the congregation hears it",
          lines: ["QSC K12.2 FOH Speakers"],
          icon: "speaker",
          equipmentSlug: "qsc-k12-2",
        },
      ],
      relatedLinks: [
        {
          title: "Playback Equipment",
          href: "/audio/equipment/playback",
        },
        {
          title: "Yamaha TF5",
          href: "/audio/equipment/item/yamaha-tf5",
        },
        {
          title: "TF5 Channel List",
          href: "/audio/documentation/tf5-channel-list",
        },
        {
          title: "Output Routing",
          href: "/audio/documentation/output-routing",
        },
        {
          title: "No Computer Playback",
          href: "/audio/troubleshooting/no-computer-playback",
        },
      ],
    },
    {
      id: "stage-monitoring",
      title: "🎧 Stage Monitoring",
      monitorPaths: [
        {
          id: "drummer-in-ear",
          title: "Drummer In-Ear",
          steps: [
            {
              id: "drummer-mix",
              helper: "Monitor mix on the console",
              lines: ["TF5 Drummer Monitor Mix"],
              icon: "dmx-control",
              equipmentSlug: "yamaha-tf5",
            },
            {
              id: "drummer-output",
              helper: "Where sound leaves the console",
              lines: ["TF5 Output 3"],
              icon: "signal-out",
            },
            {
              id: "drummer-snake",
              helper: "Physical output",
              lines: ["Stage Snake A Output 3"],
              icon: "cable",
              equipmentSlug: "stage-snake-a",
            },
            {
              id: "drummer-pm1",
              helper: "Personal monitor beltpack",
              lines: ["Behringer PM1"],
              icon: "headphones",
              equipmentSlug: "drummer-in-ear-system",
            },
            {
              id: "drummer-ears",
              helper: "What the drummer hears",
              lines: ["Drummer In-Ears"],
              icon: "headphones",
            },
          ],
        },
        {
          id: "left-monitor",
          title: "Left Stage Monitor",
          steps: [
            {
              id: "left-mix",
              helper: "Monitor mix on the console",
              lines: ["TF5 Left Monitor Mix"],
              icon: "dmx-control",
              equipmentSlug: "yamaha-tf5",
            },
            {
              id: "left-output",
              helper: "Where sound leaves the console",
              lines: ["TF5 Output 4"],
              icon: "signal-out",
            },
            {
              id: "left-snake",
              helper: "Physical output",
              lines: ["Stage Snake A Output 2"],
              icon: "cable",
              equipmentSlug: "stage-snake-a",
            },
            {
              id: "left-speaker",
              helper: "On-stage speaker",
              lines: ["QSC K10.2 Left Monitor"],
              icon: "monitor",
              equipmentSlug: "qsc-k10-2",
            },
          ],
        },
        {
          id: "right-monitor",
          title: "Right Stage Monitor",
          steps: [
            {
              id: "right-mix",
              helper: "Monitor mix on the console",
              lines: ["TF5 Right Monitor Mix"],
              icon: "dmx-control",
              equipmentSlug: "yamaha-tf5",
            },
            {
              id: "right-output",
              helper: "Where sound leaves the console",
              lines: ["TF5 Output 5"],
              icon: "signal-out",
            },
            {
              id: "right-snake",
              helper: "Physical output",
              lines: ["Stage Snake B Output 2"],
              icon: "cable",
              equipmentSlug: "stage-snake-b",
            },
            {
              id: "right-speaker",
              helper: "On-stage speaker",
              lines: ["QSC K10.2 Right Monitor"],
              icon: "monitor",
              equipmentSlug: "qsc-k10-2",
            },
          ],
        },
      ],
      relatedLinks: [
        {
          title: "Stage Monitoring Equipment",
          href: "/audio/equipment/monitors",
        },
        {
          title: "Behringer PM1",
          href: "/audio/equipment/item/drummer-in-ear-system",
        },
        {
          title: "Stage Snake A",
          href: "/audio/equipment/item/stage-snake-a",
        },
        {
          title: "Stage Snake B",
          href: "/audio/equipment/item/stage-snake-b",
        },
        {
          title: "Output Routing",
          href: "/audio/documentation/output-routing",
        },
        {
          title: "No Stage Monitor",
          href: "/audio/troubleshooting/no-stage-monitor",
        },
      ],
    },
  ],
  relatedDocumentation: [
    {
      title: "Input Patch List",
      href: "/audio/documentation/input-patch-list",
    },
    {
      title: "TF5 Channel List",
      href: "/audio/documentation/tf5-channel-list",
    },
    {
      title: "Output Routing",
      href: "/audio/documentation/output-routing",
    },
    { title: "Stage Plot", href: "/audio/documentation/stage-plot" },
    { title: "Sunday Setup", href: "/audio/setup" },
  ],
};
