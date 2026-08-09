import type {
  TroubleshootingGuide,
  TroubleshootingTopicMeta,
} from "@/data/audio/v2/troubleshooting/types";
import { Monitor, MonitorOff, Plug, Projector, Settings2 } from "lucide-react";

export const mediaTroubleshootingTopics: TroubleshootingTopicMeta[] = [
  {
    id: "projector-has-no-image",
    title: "Projector Has No Image",
    href: "/media/troubleshooting/projector-has-no-image",
    icon: Projector,
  },
  {
    id: "confidence-monitor-is-blank",
    title: "Confidence Monitor Is Blank",
    href: "/media/troubleshooting/confidence-monitor-is-blank",
    icon: MonitorOff,
  },
  {
    id: "propresenter-output-not-showing",
    title: "ProPresenter Output Isn't Showing",
    href: "/media/troubleshooting/propresenter-output-not-showing",
    icon: Monitor,
  },
  {
    id: "cat6-extender-no-signal",
    title: "CAT6 / Extender Has No Signal",
    href: "/media/troubleshooting/cat6-extender-no-signal",
    icon: Plug,
  },
  {
    id: "wrong-display-output-selected",
    title: "Wrong Display / Output Selected",
    href: "/media/troubleshooting/wrong-display-output-selected",
    icon: Settings2,
  },
];

const standardMediaDocs = [
  {
    name: "Projector Signal Flow",
    href: "/media/documentation/projector-signal-flow",
  },
  {
    name: "Confidence Monitor Signal Flow",
    href: "/media/documentation/confidence-monitor-signal-flow",
  },
];

const projectorSignalPath: TroubleshootingGuide["signalPath"] = {
  id: "projector-troubleshooting-path",
  nodes: [
    { id: "mac", name: "FOH Mac", emoji: "💻" },
    { id: "usb-hdmi", name: "USB-C → HDMI", emoji: "🔗" },
    { id: "gofanco", name: "gofanco Transmitter", emoji: "📡" },
    { id: "cat6", name: "CAT6 Run", emoji: "🔌" },
    { id: "receiver", name: "Permanent Truss Receiver", emoji: "📡" },
    { id: "projector", name: "Epson Projector", emoji: "📽️" },
    { id: "screen", name: "Projection Screen", emoji: "🖥️" },
  ],
};

const confidenceSignalPath: TroubleshootingGuide["signalPath"] = {
  id: "confidence-troubleshooting-path",
  nodes: [
    { id: "mac", name: "FOH Mac", emoji: "💻" },
    { id: "usb-hdmi", name: "USB-C → HDMI", emoji: "🔗" },
    { id: "tv", name: "55-inch Roku TV", emoji: "📺" },
  ],
};

export const mediaTroubleshootingGuides: Record<string, TroubleshootingGuide> = {
  "projector-has-no-image": {
    id: "projector-has-no-image",
    problem: "The Epson projector is on but no image appears on the projection screen.",
    signalPath: projectorSignalPath,
    checks: [
      "Confirm the projection screen is assembled and positioned in front of the back curtain.",
      "Confirm the projector is powered on — permanent power stays connected.",
      "Check the FOH weekly path: USB-C → HDMI → gofanco transmitter → CAT6.",
      "Confirm the gofanco transmitter at FOH is powered.",
      "Reseat the CAT6 at the FOH transmitter and at the permanent truss receiver if accessible.",
      "Do not disconnect permanent truss receiver HDMI or projector power.",
      "Verify a test image if the ProPresenter operator can send one — Media checks hardware, not content.",
      "Notify the Media Lead if the projector still shows no image.",
    ],
    relatedEquipment: [
      {
        name: "Epson Home Cinema 2250",
        href: "/media/equipment/item/epson-home-cinema-2250",
      },
      {
        name: "gofanco HDMI Extender",
        href: "/media/equipment/item/gofanco-hdmi-extender",
      },
    ],
    relatedDocumentation: standardMediaDocs,
  },
  "confidence-monitor-is-blank": {
    id: "confidence-monitor-is-blank",
    problem: "The confidence monitor TV is powered on but shows no display.",
    signalPath: confidenceSignalPath,
    checks: [
      "Confirm the TV is hooked securely onto the rolling stand.",
      "Confirm the TV is powered on and on the correct input — exact input name TBD.",
      "Reseat USB-C → HDMI from the FOH Mac.",
      "Reseat HDMI at the TV.",
      "Confirm the Mac is awake and sending a display output.",
      "Do not configure ProPresenter content — verify physical connections only.",
      "Notify the Media Lead if the monitor stays blank after reseating cables.",
    ],
    relatedEquipment: [
      {
        name: "55-inch Roku TV — Confidence Monitor",
        href: "/media/equipment/item/roku-confidence-monitor",
      },
      { name: "FOH Mac", href: "/media/equipment/item/foh-mac" },
    ],
    relatedDocumentation: [
      {
        name: "Confidence Monitor Signal Flow",
        href: "/media/documentation/confidence-monitor-signal-flow",
      },
    ],
  },
  "propresenter-output-not-showing": {
    id: "propresenter-output-not-showing",
    problem:
      "The ProPresenter operator reports that presentation output is not appearing on one or both displays.",
    signalPath: projectorSignalPath,
    checks: [
      "First verify physical display paths are connected and powered — see Projector Has No Image and Confidence Monitor Is Blank.",
      "Confirm both USB-C → HDMI paths are connected at the Mac.",
      "Confirm the gofanco transmitter is powered and the CAT6 run is connected.",
      "Confirm the projection screen is assembled and the projector is on.",
      "Confirm the confidence monitor TV is powered and on the correct input.",
      "If physical paths are verified and output still fails, contact the ProPresenter operator or Media Lead — ProPresenter configuration is not Media's responsibility.",
      "Do not invent ProPresenter menu steps.",
    ],
    relatedEquipment: [{ name: "FOH Mac", href: "/media/equipment/item/foh-mac" }],
    relatedDocumentation: standardMediaDocs,
  },
  "cat6-extender-no-signal": {
    id: "cat6-extender-no-signal",
    problem:
      "The projector path shows no signal and the issue appears to be in the CAT6 extender run.",
    signalPath: projectorSignalPath,
    checks: [
      "Confirm the gofanco transmitter at FOH is powered.",
      "Reseat HDMI into the gofanco transmitter.",
      "Reseat CAT6 at the FOH transmitter.",
      "Trace the CAT6 run along the right-side wall and behind the curtain for obvious disconnects.",
      "Reseat CAT6 at the permanent truss receiver if safely accessible.",
      "Do not disconnect permanent receiver-to-projector HDMI.",
      "Do not replace or re-route permanent truss wiring without Media Lead approval.",
      "Notify the Media Lead if signal is still missing.",
    ],
    relatedEquipment: [
      {
        name: "gofanco HDMI Extender",
        href: "/media/equipment/item/gofanco-hdmi-extender",
      },
      {
        name: "CAT6 Projector Signal Cable",
        href: "/media/equipment/item/cat6-projector-cable",
      },
    ],
    relatedDocumentation: standardMediaDocs,
  },
  "wrong-display-output-selected": {
    id: "wrong-display-output-selected",
    problem:
      "A display is on but shows the wrong source, desktop, or no expected presentation output.",
    signalPath: confidenceSignalPath,
    checks: [
      "Confirm which display is wrong — projector screen or confidence monitor.",
      "Reseat the USB-C → HDMI cable for the affected display path.",
      "Confirm the TV input is correct — exact input name TBD.",
      "Confirm the Mac is awake and not showing only the desktop on the wrong display.",
      "If the issue is ProPresenter sending to the wrong output, contact the ProPresenter operator — Media verifies physical paths, not software routing.",
      "Do not invent macOS or ProPresenter display settings.",
      "Notify the Media Lead if physical connections are verified but output is still wrong.",
    ],
    relatedEquipment: [{ name: "FOH Mac", href: "/media/equipment/item/foh-mac" }],
    relatedDocumentation: standardMediaDocs,
  },
};

export function getMediaTroubleshootingTopic(
  id: string
): TroubleshootingTopicMeta | undefined {
  return mediaTroubleshootingTopics.find((topic) => topic.id === id);
}

export function getMediaTroubleshootingGuide(
  id: string
): TroubleshootingGuide | undefined {
  return mediaTroubleshootingGuides[id];
}
