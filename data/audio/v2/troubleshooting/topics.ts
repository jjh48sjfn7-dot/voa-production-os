import {
  AlertTriangle,
  Drum,
  Headphones,
  Keyboard,
  Mic2,
  Monitor,
  Power,
  VolumeX,
} from "lucide-react";
import type { TroubleshootingGuide, TroubleshootingTopicMeta } from "@/data/audio/v2/troubleshooting/types";
import {
  standardRelatedDocumentation,
  standardRelatedEquipment,
} from "@/data/audio/v2/troubleshooting/shared";

const tf5Node = {
  id: "tf5",
  name: "TF5",
  emoji: "🎚️",
  equipmentSlug: "yamaha-tf5",
} as const;

const outputsNode = { id: "outputs", name: "Outputs", emoji: "🎛️" } as const;

const speakerNode = { id: "speaker", name: "Speaker", emoji: "🔊" } as const;

export const troubleshootingTopics: TroubleshootingTopicMeta[] = [
  {
    id: "no-keyboard-audio",
    title: "No Keyboard Audio",
    href: "/audio/troubleshooting/no-keyboard-audio",
    icon: Keyboard,
  },
  {
    id: "no-wireless-microphone",
    title: "No Wireless Microphone",
    href: "/audio/troubleshooting/no-wireless-microphone",
    icon: Mic2,
  },
  {
    id: "no-drum-audio",
    title: "No Drum Audio",
    href: "/audio/troubleshooting/no-drum-audio",
    icon: Drum,
  },
  {
    id: "no-foh-audio",
    title: "No FOH Audio",
    href: "/audio/troubleshooting/no-foh-audio",
    icon: VolumeX,
  },
  {
    id: "no-stage-monitor",
    title: "No Stage Monitor",
    href: "/audio/troubleshooting/no-stage-monitor",
    icon: Headphones,
  },
  {
    id: "no-computer-playback",
    title: "No Computer Playback",
    href: "/audio/troubleshooting/no-computer-playback",
    icon: Monitor,
  },
  {
    id: "console-will-not-power-on",
    title: "Console Will Not Power On",
    href: "/audio/troubleshooting/console-will-not-power-on",
    icon: Power,
  },
  {
    id: "feedback",
    title: "Feedback",
    href: "/audio/troubleshooting/feedback",
    icon: AlertTriangle,
  },
];

export const troubleshootingGuides: Record<string, TroubleshootingGuide> = {
  "no-keyboard-audio": {
    id: "no-keyboard-audio",
    problem: "Keyboard audio is not heard through the house or monitors.",
    signalPath: {
      id: "keyboard-signal-path",
      nodes: [
        { id: "keyboard", name: "Keyboard", emoji: "🎹" },
        {
          id: "stage-snake-b",
          name: "Stage Snake B",
          emoji: "🔌",
          equipmentSlug: "stage-snake-b",
        },
        tf5Node,
        outputsNode,
        speakerNode,
      ],
    },
    checks: [
      "Confirm the keyboard is powered on and output volume is up.",
      "Verify the keyboard is patched to Stage Snake B Input 1.",
      "Check Stage Snake B is connected at both ends.",
      "Confirm TF5 Channel 16 is not muted.",
      "Verify gain and fader level on Channel 16.",
      "Trace the cable from keyboard to the stage snake.",
    ],
    relatedEquipment: standardRelatedEquipment,
    relatedDocumentation: standardRelatedDocumentation,
  },
  "no-wireless-microphone": {
    id: "no-wireless-microphone",
    problem: "A wireless handheld microphone has no RF or audio on the console.",
    signalPath: {
      id: "wireless-signal-path",
      nodes: [
        { id: "wireless-mic", name: "Wireless Microphone", emoji: "🎤" },
        {
          id: "blx288",
          name: "BLX288",
          emoji: "🎤",
          equipmentSlug: "shure-blx-receiver",
        },
        tf5Node,
        outputsNode,
        speakerNode,
      ],
    },
    checks: [
      "Confirm the receiver is powered on and antennas are connected.",
      "Replace weak microphone batteries.",
      "Verify the matching color XLR is patched to the correct TF5 channel.",
      "Check Purple → 17, Yellow → 18, Green → 19, Blue → 20.",
      "Confirm RF and audio indicators on the receiver.",
      "Verify the TF5 channel is not muted and gain is set.",
    ],
    relatedEquipment: standardRelatedEquipment,
    relatedDocumentation: standardRelatedDocumentation,
  },
  "no-drum-audio": {
    id: "no-drum-audio",
    problem: "One or more drum microphones are not passing signal to the TF5.",
    signalPath: {
      id: "drum-signal-path",
      nodes: [
        { id: "drum-mics", name: "Drum Microphones", emoji: "🥁" },
        {
          id: "stage-snake-a",
          name: "Stage Snake A",
          emoji: "🔌",
          equipmentSlug: "stage-snake-a",
        },
        tf5Node,
        outputsNode,
        speakerNode,
      ],
    },
    checks: [
      "Confirm drum microphones are patched to the correct Stage Snake A inputs.",
      "Verify Stage Snake A is connected at both ends.",
      "Check TF5 drum channels 25–30 are not muted.",
      "Verify gain on the affected drum channel.",
      "Reseat the XLR at the stage box and trace the cable.",
      "Swap the cable if a single drum mic has no signal.",
    ],
    relatedEquipment: standardRelatedEquipment,
    relatedDocumentation: standardRelatedDocumentation,
  },
  "no-foh-audio": {
    id: "no-foh-audio",
    problem: "No audio is heard from the front-of-house speakers.",
    signalPath: {
      id: "foh-signal-path",
      nodes: [
        { id: "sources", name: "Sources", emoji: "🎤" },
        tf5Node,
        outputsNode,
        { id: "foh-speaker", name: "QSC K12.2", emoji: "🔊" },
      ],
    },
    checks: [
      "Verify Main L/R is unmuted on the TF5.",
      "Confirm FOH speakers are powered on.",
      "Check output routing to Main L/R.",
      "Verify Stage Snake outputs to FOH speakers.",
      "Inspect speaker and amplifier cables.",
      "Recall the approved Sunday Scene if routing looks wrong.",
    ],
    relatedEquipment: standardRelatedEquipment,
    relatedDocumentation: standardRelatedDocumentation,
  },
  "no-stage-monitor": {
    id: "no-stage-monitor",
    problem: "A stage monitor or in-ear feed is not receiving audio.",
    signalPath: {
      id: "monitor-signal-path",
      nodes: [
        { id: "sources", name: "Sources", emoji: "🎤" },
        tf5Node,
        outputsNode,
        { id: "stage-monitor", name: "QSC K10.2", emoji: "📣" },
      ],
    },
    checks: [
      "Verify the correct monitor mix is assigned on the TF5.",
      "Confirm the mix output is not muted.",
      "Check the stage monitor is powered on.",
      "Verify the Stage Snake monitor output patch.",
      "Confirm mix send level during soundcheck.",
      "Review Output Routing for the assigned mix.",
    ],
    relatedEquipment: standardRelatedEquipment,
    relatedDocumentation: standardRelatedDocumentation,
  },
  "no-computer-playback": {
    id: "no-computer-playback",
    problem: "Media computer playback is not heard through the audio system.",
    signalPath: {
      id: "playback-signal-path",
      nodes: [
        { id: "media-computer", name: "Media Computer", emoji: "💻" },
        tf5Node,
        outputsNode,
        speakerNode,
      ],
    },
    checks: [
      "Confirm the media computer is playing audio.",
      "Verify playback cables to TF5 local inputs.",
      "Check TF5 channels 31–32 are not muted.",
      "Confirm computer output volume is up.",
      "Verify the Sunday Scene playback routing.",
      "Check Main L/R is unmuted after soundcheck.",
    ],
    relatedEquipment: standardRelatedEquipment,
    relatedDocumentation: standardRelatedDocumentation,
  },
  "console-will-not-power-on": {
    id: "console-will-not-power-on",
    problem: "The Yamaha TF5 console will not power on.",
    signalPath: {
      id: "console-power-path",
      nodes: [
        { id: "power", name: "Power", emoji: "⚡" },
        tf5Node,
      ],
    },
    checks: [
      "Verify AC power is connected to the TF5.",
      "Check the power cable seating at the console.",
      "Confirm the outlet has power.",
      "Hold the power button firmly.",
      "Notify the Audio Lead before attempting further steps.",
    ],
    relatedEquipment: standardRelatedEquipment,
    relatedDocumentation: standardRelatedDocumentation,
  },
  feedback: {
    id: "feedback",
    problem: "Feedback or ringing is heard in monitors or FOH speakers.",
    signalPath: {
      id: "feedback-signal-path",
      nodes: [
        { id: "microphone", name: "Microphone", emoji: "🎤" },
        tf5Node,
        outputsNode,
        speakerNode,
      ],
    },
    checks: [
      "Lower the monitor send on the offending mix immediately.",
      "Mute the problem channel on the TF5 if feedback continues.",
      "Reposition the wedge or microphone away from the speaker.",
      "Reduce gain on the affected channel.",
      "Cut 250–400 Hz on the monitor mix if needed.",
      "Notify the Audio Lead if feedback cannot be controlled quickly.",
    ],
    relatedEquipment: standardRelatedEquipment,
    relatedDocumentation: standardRelatedDocumentation,
  },
};

export function getTroubleshootingTopic(
  id: string
): TroubleshootingTopicMeta | undefined {
  return troubleshootingTopics.find((topic) => topic.id === id);
}

export function getTroubleshootingGuide(
  id: string
): TroubleshootingGuide | undefined {
  return troubleshootingGuides[id];
}
