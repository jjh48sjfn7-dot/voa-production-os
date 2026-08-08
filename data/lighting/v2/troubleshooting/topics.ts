import type { TroubleshootingGuide, TroubleshootingTopicMeta } from "@/data/audio/v2/troubleshooting/types";
import { Lightbulb, Power, Unplug, WifiOff } from "lucide-react";

export const lightingTroubleshootingTopics: TroubleshootingTopicMeta[] = [
  {
    id: "fixture-not-turning-on",
    title: "Fixture Not Turning On",
    href: "/lighting/troubleshooting/fixture-not-turning-on",
    icon: Power,
  },
  {
    id: "no-dmx-control",
    title: "No DMX Control",
    href: "/lighting/troubleshooting/no-dmx-control",
    icon: Unplug,
  },
  {
    id: "one-fixture-not-responding",
    title: "One Fixture Not Responding",
    href: "/lighting/troubleshooting/one-fixture-not-responding",
    icon: Lightbulb,
  },
  {
    id: "lightkey-not-connected",
    title: "Lightkey Not Connected",
    href: "/lighting/troubleshooting/lightkey-not-connected",
    icon: WifiOff,
  },
];

const standardLightingDocs = [
  {
    name: "DMX Signal Flow",
    href: "/lighting/documentation/dmx-signal-flow",
  },
  {
    name: "Fixture Layout",
    href: "/lighting/documentation/fixture-layout",
  },
];

export const lightingTroubleshootingGuides: Record<string, TroubleshootingGuide> = {
  "fixture-not-turning-on": {
    id: "fixture-not-turning-on",
    problem: "A SlimPAR fixture does not power on or show any light output.",
    signalPath: {
      id: "fixture-power-path",
      nodes: [
        { id: "power", name: "Stage AC Power", emoji: "⚡" },
        { id: "fixture", name: "SlimPAR Fixture", emoji: "💡" },
      ],
    },
    checks: [
      "Confirm lighting power-up has been authorized — do not power early.",
      "Check the fixture power cable at both ends.",
      "For floor fixtures, confirm the fixture is placed and powered at the front edge of the stage.",
      "For truss fixtures, confirm truss power infrastructure is connected.",
      "Try a different known-good power connection if available and approved by the Lighting Lead.",
      "Notify the Lighting Lead if the fixture still does not turn on.",
    ],
    relatedEquipment: [
      {
        name: "Chauvet DJ SlimPAR Pro H USB",
        href: "/lighting/equipment/item/chauvet-slimpar-pro-h-usb",
      },
    ],
    relatedDocumentation: standardLightingDocs,
  },
  "no-dmx-control": {
    id: "no-dmx-control",
    problem: "Fixtures may power on, but none respond to Lightkey control.",
    signalPath: {
      id: "no-dmx-path",
      nodes: [
        { id: "mac", name: "FOH Mac", emoji: "💻" },
        { id: "lightkey", name: "Lightkey", emoji: "🎛️" },
        { id: "dmxking", name: "DMXking Micro", emoji: "🔌" },
        { id: "universe", name: "Universe 1", emoji: "📡" },
        { id: "fixtures", name: "All Fixtures", emoji: "💡" },
      ],
    },
    checks: [
      "Confirm Lightkey is open on the FOH Mac.",
      "Verify the DMXking Micro is connected to the Mac.",
      "Check the DMX output cable from the DMXking Micro to the weekly chain.",
      "Confirm the weekly DMX run: FOH → Floor 3 → Floor 2 → Floor 1 → TR-1.",
      "Verify the permanent TR-1 → TR-6 chain is still connected.",
      "Confirm Universe 1 output is active in Lightkey.",
      "Notify the Lighting Lead if no fixtures respond.",
    ],
    relatedEquipment: [
      {
        name: "FOH Mac / Lightkey Control",
        href: "/lighting/equipment/item/lightkey-foh-control",
      },
      {
        name: "DMXking Micro",
        href: "/lighting/equipment/item/dmxking-micro",
      },
    ],
    relatedDocumentation: standardLightingDocs,
  },
  "one-fixture-not-responding": {
    id: "one-fixture-not-responding",
    problem: "One fixture does not respond while others work in Lightkey.",
    signalPath: {
      id: "single-fixture-path",
      nodes: [
        { id: "lightkey", name: "Lightkey", emoji: "🎛️" },
        { id: "chain", name: "DMX Chain", emoji: "🔌" },
        { id: "fixture", name: "One SlimPAR", emoji: "💡" },
      ],
    },
    checks: [
      "Identify which fixture is not responding (TR-1–TR-6 or Floor 1–3).",
      "Check the DMX cable in and out at that fixture.",
      "For floor fixtures, confirm placement and DMX connections at the front edge of the stage.",
      "For truss fixtures, confirm the fixture is powered and aimed correctly.",
      "Check the fixture before and after in the DMX chain — a break upstream can affect downstream fixtures.",
      "Notify the Lighting Lead if the fixture still does not respond.",
    ],
    relatedEquipment: [
      {
        name: "Chauvet DJ SlimPAR Pro H USB",
        href: "/lighting/equipment/item/chauvet-slimpar-pro-h-usb",
      },
    ],
    relatedDocumentation: [
      ...standardLightingDocs,
      {
        name: "DMX Addressing",
        href: "/lighting/documentation/dmx-addressing",
      },
    ],
  },
  "lightkey-not-connected": {
    id: "lightkey-not-connected",
    problem: "Lightkey cannot connect to the DMXking Micro or shows no DMX output.",
    signalPath: {
      id: "lightkey-connection-path",
      nodes: [
        { id: "mac", name: "FOH Mac", emoji: "💻" },
        { id: "lightkey", name: "Lightkey", emoji: "🎛️" },
        { id: "dmxking", name: "DMXking Micro", emoji: "🔌" },
      ],
    },
    checks: [
      "Confirm the FOH Mac is powered on and awake.",
      "Open Lightkey and check for connection errors.",
      "Verify the DMXking Micro USB cable is connected to the Mac.",
      "Confirm the DMXking Micro has power if required.",
      "Quit and reopen Lightkey if the interface was connected after launch.",
      "Notify the Lighting Lead if Lightkey still cannot connect.",
    ],
    relatedEquipment: [
      {
        name: "FOH Mac / Lightkey Control",
        href: "/lighting/equipment/item/lightkey-foh-control",
      },
      {
        name: "DMXking Micro",
        href: "/lighting/equipment/item/dmxking-micro",
      },
    ],
    relatedDocumentation: standardLightingDocs,
  },
};

export function getLightingTroubleshootingTopic(
  id: string
): TroubleshootingTopicMeta | undefined {
  return lightingTroubleshootingTopics.find((topic) => topic.id === id);
}

export function getLightingTroubleshootingGuide(
  id: string
): TroubleshootingGuide | undefined {
  return lightingTroubleshootingGuides[id];
}
