import type { ChecklistItem } from "@/types";

export const SUNDAY_SETUP_MEDIA_V1_STORAGE = "sunday-setup-media-v1";

export const mediaSetupUnloadTrailer = {
  id: "unload-trailer",
  title: "Unload Trailer",
  emoji: "📦",
};

export interface MediaSetupSection {
  id: string;
  title: string;
  emoji?: string;
  note?: string;
  items: ChecklistItem[];
}

export const mediaSetupSections: MediaSetupSection[] = [
  {
    id: "assemble-projection-screen",
    title: "Assemble Projection Screen",
    emoji: "🖥️",
    items: [
      {
        id: "screen-assemble",
        label: "Assemble Portable Projection Screen",
        detail:
          "Portable/foldable 16:9 screen with stand. Setup takes approximately 15 minutes.",
      },
      {
        id: "screen-position",
        label: "Position center-stage/upstage in front of back curtain",
      },
      {
        id: "screen-stable",
        label: "Confirm screen is stable and positioned properly",
      },
    ],
  },
  {
    id: "setup-confidence-monitor",
    title: "Set Up Confidence Monitor",
    emoji: "📺",
    items: [
      { id: "cm-stand", label: "Position rolling stand at FOH — immediately right of FOH Mac" },
      { id: "cm-hook", label: "Hook 55-inch Roku TV onto stand using existing mounting brackets" },
      { id: "cm-usb-hdmi", label: "Connect USB-C → HDMI from FOH Mac" },
      { id: "cm-hdmi-tv", label: "Connect HDMI to TV" },
      { id: "cm-power", label: "Connect and power TV" },
    ],
  },
  {
    id: "connect-projector-path",
    title: "Connect FOH Projector Signal Path",
    emoji: "🔌",
    note: "The projector-side CAT6 receiver, HDMI connection, and projector power remain permanently connected.",
    items: [
      {
        id: "proj-cat6-run",
        label: "Run CAT6 tight along right-side wall → behind curtain → truss receiver",
      },
      { id: "proj-cat6-tx", label: "Connect CAT6 to transmitter" },
      { id: "proj-power-tx", label: "Connect and power gofanco transmitter" },
      { id: "proj-usb-c", label: "Connect USB-C from FOH Mac" },
      { id: "proj-usb-hdmi", label: "Connect USB-C → HDMI" },
      { id: "proj-hdmi-tx", label: "Connect HDMI into gofanco transmitter" },
    ],
  },
  {
    id: "power-displays",
    title: "Power Projector / Displays",
    emoji: "⚡",
    items: [
      { id: "power-tx", label: "Confirm FOH gofanco transmitter is powered" },
      {
        id: "power-projector",
        label: "Turn on Epson projector — permanent power stays connected",
      },
      { id: "power-cm", label: "Confirm Confidence Monitor TV is powered on" },
      { id: "power-ready", label: "Confirm all display devices are powered" },
    ],
  },
  {
    id: "verify-projector",
    title: "Verify Projector Image",
    emoji: "✅",
    items: [
      {
        id: "verify-proj-image",
        label: "Confirm projector displays a working image on the projection screen",
      },
      {
        id: "verify-proj-fit",
        label: "Adjust projector image to fit projection screen properly",
      },
      {
        id: "verify-proj-path",
        label: "If no image, check FOH weekly connections before changing permanent truss wiring",
      },
      {
        id: "verify-proj-not-pp",
        label: "Do not configure ProPresenter content — verify hardware/output only",
      },
    ],
  },
  {
    id: "verify-confidence-monitor",
    title: "Verify Confidence Monitor",
    emoji: "✅",
    items: [
      {
        id: "verify-cm-output",
        label: "Confirm Confidence Monitor shows a working display output",
      },
      {
        id: "verify-cm-cables",
        label: "Reseat USB-C → HDMI and HDMI to TV if the display is blank",
      },
      {
        id: "verify-cm-not-pp",
        label: "Do not configure ProPresenter content — verify display only",
      },
    ],
  },
  {
    id: "ready",
    title: "Ready for ProPresenter Operator",
    emoji: "🙌",
    items: [
      {
        id: "ready-both-displays",
        label: "Both displays are working and ready for the ProPresenter operator",
      },
    ],
  },
  {
    id: "teardown",
    title: "Teardown",
    emoji: "📦",
    items: [
      { id: "td-power", label: "Power down displays" },
      {
        id: "td-foh-cables",
        label: "Disconnect and pack FOH projector transmitter and weekly cables",
      },
      { id: "td-cm-disconnect", label: "Disconnect Confidence Monitor cables" },
      { id: "td-cm-remove", label: "Remove TV from rolling stand" },
      {
        id: "td-screen",
        label: "Disassemble projection screen and store components neatly in trailer",
      },
      {
        id: "td-store",
        label: "Store all Media gear neatly in trailer — leave permanent projector-side hardware connected",
      },
    ],
  },
];

export function getMediaSetupItemIds(): string[] {
  return mediaSetupSections.flatMap((section) =>
    section.items.map((item) => item.id)
  );
}

export function getMediaSectionTaskCount(section: MediaSetupSection): number {
  return section.items.length;
}
