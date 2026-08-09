import type { EquipmentDefinition } from "@/data/media/v2/equipment/types";
import { brandPhotos } from "@/lib/brand-photos";
export const fohMac: EquipmentDefinition = {
  id: "foh-mac",
  slug: "foh-mac",
  name: "FOH Mac",
  categoryId: "control",
  icon: "computer",
  image: brandPhotos.equipment.mediaComputer,
  imageAlt: "FOH iMac production computer",
  purpose:
    "The shared FOH Mac at the house-right side platform sends display outputs for Sunday worship. Media Department connects USB-C to HDMI paths for the projector signal chain and the confidence monitor. The same computer is also used by Audio (playback), Lighting (Lightkey), and eventually the ProPresenter operator — each department owns its own workflow.",
  quickStart: [
    "Confirm the FOH Mac is powered on and ready",
    "Connect USB-C → HDMI for the projector signal path",
    "Connect USB-C → HDMI for the confidence monitor",
    "Do not change ProPresenter content — Media verifies physical display outputs only",
  ],
  specifications: [
    { label: "Location", value: "FOH — house-right raised side platform" },
    { label: "Shared with", value: "Audio · Lighting · ProPresenter (future)" },
    { label: "Media outputs", value: "USB-C → HDMI (projector path and confidence monitor)" },
    { label: "ProPresenter operation", value: "Future ProPresenter department — not Media" },
  ],
  primaryConnections: [
    "USB-C → HDMI → gofanco transmitter → CAT6 → projector path",
    "USB-C → HDMI → 55-inch Roku TV confidence monitor",
  ],
  bestPractices: [
    "Connect display cables before powering displays.",
    "Media verifies that both display outputs are functional — not ProPresenter content.",
    "Do not disconnect permanent projector-side receiver or HDMI at the truss.",
    "Notify the Media Lead if a display output fails during setup.",
  ],
  setupLinks: [
    { href: "/media/setup", label: "Sunday Setup" },
    {
      href: "/media/documentation/projector-signal-flow",
      label: "Projector Signal Flow",
    },
    {
      href: "/media/documentation/confidence-monitor-signal-flow",
      label: "Confidence Monitor Signal Flow",
    },
  ],
  relatedEquipment: [
    {
      slug: "gofanco-hdmi-extender",
      name: "gofanco HDMI Extender",
      href: "/media/equipment/item/gofanco-hdmi-extender",
    },
    {
      slug: "roku-confidence-monitor",
      name: "55-inch Roku TV — Confidence Monitor",
      href: "/media/equipment/item/roku-confidence-monitor",
    },
    {
      name: "Media Computer (Audio playback reference)",
      href: "/audio/equipment/item/media-computer",
    },
  ],
};

export const epsonHomeCinema2250: EquipmentDefinition = {
  id: "epson-home-cinema-2250",
  slug: "epson-home-cinema-2250",
  name: "Epson Home Cinema 2250 Projector",
  categoryId: "projection",
  icon: "projector",
  image: brandPhotos.equipment.projector,
  imageAlt: "Epson Home Cinema 2250 projector",
  purpose:
    "The Epson Home Cinema 2250 is permanently mounted overhead on the front/downstage truss between TR-5 and TR-6. It projects Sunday worship content onto the portable projection screen.",
  quickStart: [
    "Confirm permanent HDMI from truss receiver to projector is connected",
    "Confirm permanent projector power is connected — do not reconnect weekly",
    "Turn on the projector during Sunday setup after the signal path is connected",
    "Verify a test image reaches the projection screen",
  ],
  specifications: [
    { label: "Model", value: "Epson Home Cinema 2250" },
    {
      label: "Mount",
      value: "Permanently mounted overhead on front truss between TR-5 and TR-6",
    },
    { label: "Power", value: "Permanently connected — volunteers turn on Sunday" },
    {
      label: "Video input",
      value: "HDMI from permanent truss-side CAT6 extender receiver",
    },
    { label: "Weekly volunteer work", value: "Turn on and verify image — do not remount or rewire" },
  ],
  primaryConnections: [
    "Permanent HDMI — CAT6 extender receiver at truss → projector",
    "Permanent AC power at truss mount",
    "Weekly signal — FOH Mac → gofanco transmitter → CAT6 → permanent receiver",
  ],
  bestPractices: [
    "Do not disconnect permanent projector-side HDMI or receiver wiring.",
    "Do not disconnect permanent projector power between Sundays.",
    "Turn the projector on only after the FOH signal path is connected.",
    "If there is no image, follow the projector troubleshooting guide before changing hardware.",
  ],
  setupLinks: [
    { href: "/media/setup", label: "Sunday Setup" },
    {
      href: "/media/documentation/projector-signal-flow",
      label: "Projector Signal Flow",
    },
  ],
  relatedEquipment: [
    {
      slug: "gofanco-hdmi-extender",
      name: "gofanco HDMI Extender",
      href: "/media/equipment/item/gofanco-hdmi-extender",
    },
    {
      slug: "skerell-projection-screen",
      name: "SKERELL 150-inch Projection Screen",
      href: "/media/equipment/item/skerell-projection-screen",
    },
  ],
};

export const gofancoHdmiExtender: EquipmentDefinition = {
  id: "gofanco-hdmi-extender",
  slug: "gofanco-hdmi-extender",
  name: "gofanco 1080p 1x4 HDMI Extender Splitter",
  categoryId: "projection",
  icon: "cable",
  purpose:
    "The gofanco extender sends HDMI from the FOH Mac over CAT6 to the permanent receiver at the truss/projector side. The FOH transmitter is connected and powered each Sunday.",
  quickStart: [
    "Connect USB-C → HDMI from the FOH Mac",
    "Connect HDMI into the gofanco transmitter at FOH",
    "Connect and power the FOH transmitter",
    "Connect CAT6 from transmitter toward the permanent truss-side receiver",
    "Do not rebuild the permanent receiver or projector-side HDMI",
  ],
  specifications: [
    {
      label: "Model",
      value: "gofanco 1080p 1x4 HDMI Extender Splitter Over CAT5e/6/7",
    },
    { label: "FOH side", value: "Transmitter — connected and powered each Sunday" },
    {
      label: "Truss side",
      value: "Receiver — permanently connected to projector HDMI",
    },
    { label: "Cable run", value: "CAT6 along right-side wall → behind curtain → truss" },
  ],
  primaryConnections: [
    "FOH Mac → USB-C → HDMI → gofanco transmitter",
    "CAT6 — FOH transmitter → permanent truss receiver",
    "Permanent HDMI — receiver → Epson projector",
  ],
  bestPractices: [
    "Power the FOH transmitter each Sunday.",
    "Keep the CAT6 run neat along the right-side wall.",
    "Leave the permanent truss-side receiver and projector HDMI connected.",
    "At teardown, disconnect and pack the FOH transmitter and weekly cables only.",
  ],
  setupLinks: [
    { href: "/media/setup", label: "Sunday Setup" },
    {
      href: "/media/documentation/projector-signal-flow",
      label: "Projector Signal Flow",
    },
  ],
  relatedEquipment: [
    {
      slug: "epson-home-cinema-2250",
      name: "Epson Home Cinema 2250",
      href: "/media/equipment/item/epson-home-cinema-2250",
    },
    {
      slug: "cat6-projector-cable",
      name: "CAT6 Projector Signal Cable",
      href: "/media/equipment/item/cat6-projector-cable",
    },
    {
      slug: "usb-c-hdmi-adapters",
      name: "USB-C to HDMI Adapters/Cables",
      href: "/media/equipment/item/usb-c-hdmi-adapters",
    },
  ],
};

export const rokuConfidenceMonitor: EquipmentDefinition = {
  id: "roku-confidence-monitor",
  slug: "roku-confidence-monitor",
  name: "55-inch Roku TV — Confidence Monitor",
  categoryId: "displays",
  icon: "display",
  purpose:
    "The 55-inch Roku TV serves as the FOH confidence monitor on a rolling stand immediately right of the FOH Mac. Media sets up the physical display each Sunday. ProPresenter content configuration belongs to the future ProPresenter department.",
  quickStart: [
    "Position the rolling stand immediately right of the FOH Mac",
    "Hook the TV onto the stand using its existing mounting brackets",
    "Connect USB-C → HDMI from the FOH Mac",
    "Connect HDMI to the TV and power the TV",
    "Verify the display shows a working output — do not configure ProPresenter content",
  ],
  specifications: [
    { label: "Display", value: "55-inch Roku TV" },
    { label: "Exact TV brand/model", value: "TBD" },
    { label: "Location", value: "FOH — rolling stand immediately right of FOH Mac" },
    { label: "Mounting", value: "TV hooks onto stand each Sunday using existing brackets" },
    { label: "Signal", value: "FOH Mac → USB-C → HDMI → TV" },
    {
      label: "Content",
      value: "May show lyrics, stage display, timer, or notes — configured by ProPresenter operator (future department)",
    },
  ],
  primaryConnections: [
    "FOH Mac → USB-C → HDMI → 55-inch Roku TV",
    "AC power to TV",
  ],
  bestPractices: [
    "Place the stand immediately right of the FOH Mac.",
    "Hook the TV securely onto the stand before connecting cables.",
    "Media verifies the display works — not ProPresenter programming.",
    "At teardown, disconnect cables, remove TV from stand, and store neatly in trailer.",
  ],
  setupLinks: [
    { href: "/media/setup", label: "Sunday Setup" },
    {
      href: "/media/documentation/confidence-monitor-signal-flow",
      label: "Confidence Monitor Signal Flow",
    },
  ],
  relatedEquipment: [
    {
      slug: "confidence-monitor-stand",
      name: "Confidence Monitor Rolling Stand",
      href: "/media/equipment/item/confidence-monitor-stand",
    },
    { slug: "foh-mac", name: "FOH Mac", href: "/media/equipment/item/foh-mac" },
  ],
};

export const confidenceMonitorStand: EquipmentDefinition = {
  id: "confidence-monitor-stand",
  slug: "confidence-monitor-stand",
  name: "Confidence Monitor Rolling Stand",
  categoryId: "displays",
  icon: "package",
  purpose:
    "The rolling stand holds the 55-inch Roku TV confidence monitor at FOH, immediately right of the FOH Mac. The TV and stand are separate pieces — volunteers hook the TV onto the stand each Sunday.",
  quickStart: [
    "Roll the stand into position immediately right of the FOH Mac",
    "Hook the TV onto the stand using its existing mounting brackets",
    "Confirm the stand is stable before connecting cables",
  ],
  specifications: [
    { label: "Type", value: "Rolling floor stand" },
    { label: "Location", value: "FOH — immediately right of FOH Mac" },
    { label: "TV mounting", value: "TV hooks onto stand using existing brackets" },
  ],
  primaryConnections: ["Supports 55-inch Roku TV confidence monitor"],
  bestPractices: [
    "Position the stand before hooking on the TV.",
    "Do not move the stand while cables are connected during service.",
    "At teardown, remove the TV from the stand before rolling the stand away.",
  ],
  relatedEquipment: [
    {
      slug: "roku-confidence-monitor",
      name: "55-inch Roku TV — Confidence Monitor",
      href: "/media/equipment/item/roku-confidence-monitor",
    },
  ],
};

export const skerellProjectionScreen: EquipmentDefinition = {
  id: "skerell-projection-screen",
  slug: "skerell-projection-screen",
  name: "SKERELL 150-inch Portable Projection Screen",
  categoryId: "displays",
  icon: "screen",
  purpose:
    "The SKERELL 150-inch portable projection screen is assembled center-stage/upstage in front of the back curtain each Sunday. Setup takes approximately 15 minutes.",
  quickStart: [
    "Retrieve screen components from the trailer",
    "Assemble the portable screen — allow approximately 15 minutes",
    "Position center-stage/upstage in front of the back curtain",
    "Confirm the screen is stable and positioned properly",
    "At teardown, disassemble and store components neatly in the trailer",
  ],
  specifications: [
    { label: "Model", value: "SKERELL portable projection screen" },
    { label: "Size", value: "150-inch · 16:9" },
    { label: "Type", value: "Portable/foldable with stand" },
    { label: "Setup time", value: "Approximately 15 minutes" },
    {
      label: "Storage",
      value: "Components stored neatly in trailer — original carry bag is broken; replacement solution TBD",
    },
  ],
  primaryConnections: ["Receives projected image from Epson Home Cinema 2250"],
  bestPractices: [
    "Assemble before powering the projector for image verification.",
    "Position directly in front of the back curtain at center-stage.",
    "Do not pack the screen into the original carry bag — it is broken.",
    "Disassemble projection screen and store components neatly in trailer.",
  ],
  setupLinks: [
    { href: "/media/setup", label: "Sunday Setup" },
    {
      href: "/media/documentation/projection-screen-setup",
      label: "Projection Screen Setup",
    },
  ],
  relatedEquipment: [
    {
      slug: "epson-home-cinema-2250",
      name: "Epson Home Cinema 2250",
      href: "/media/equipment/item/epson-home-cinema-2250",
    },
  ],
};

export const usbCHdmiAdapters: EquipmentDefinition = {
  id: "usb-c-hdmi-adapters",
  slug: "usb-c-hdmi-adapters",
  name: "USB-C to HDMI Adapters/Cables",
  categoryId: "projection",
  icon: "link",
  purpose:
    "USB-C to HDMI adapters and cables connect the FOH Mac to HDMI paths for the projector signal chain and the confidence monitor.",
  quickStart: [
    "Connect USB-C from the FOH Mac",
    "Connect HDMI to the gofanco transmitter (projector path)",
    "Use a separate USB-C → HDMI for the confidence monitor when both paths are active",
  ],
  specifications: [
    { label: "Type", value: "USB-C to HDMI adapters/cables" },
    { label: "Projector path", value: "Mac → USB-C → HDMI → gofanco transmitter" },
    { label: "Confidence monitor path", value: "Mac → USB-C → HDMI → 55-inch Roku TV" },
    { label: "Exact adapter brands/models", value: "TBD" },
  ],
  primaryConnections: [
    "FOH Mac USB-C → HDMI → gofanco transmitter",
    "FOH Mac USB-C → HDMI → confidence monitor TV",
  ],
  bestPractices: [
    "Confirm both adapters/cables are available before setup.",
    "Reseat connections if a display path drops during setup.",
    "Pack adapters with the FOH weekly cable kit at teardown.",
  ],
  relatedEquipment: [
    { slug: "foh-mac", name: "FOH Mac", href: "/media/equipment/item/foh-mac" },
    {
      slug: "gofanco-hdmi-extender",
      name: "gofanco HDMI Extender",
      href: "/media/equipment/item/gofanco-hdmi-extender",
    },
  ],
};

export const cat6ProjectorCable: EquipmentDefinition = {
  id: "cat6-projector-cable",
  slug: "cat6-projector-cable",
  name: "CAT6 Projector Signal Cable",
  categoryId: "projection",
  icon: "cable",
  purpose:
    "CAT6 carries the HDMI extender signal from the FOH gofanco transmitter along the right-side wall, behind the curtain, to the permanent truss-side receiver.",
  quickStart: [
    "Connect CAT6 to the gofanco transmitter at FOH",
    "Run CAT6 tight along the right-side wall",
    "Continue behind the curtain toward the truss",
    "Connect to the permanent projector-side CAT6 receiver",
    "Do not disconnect the permanent receiver-to-projector HDMI",
  ],
  specifications: [
    { label: "Cable type", value: "CAT6" },
    {
      label: "Weekly route",
      value: "FOH → right-side wall → behind curtain → truss receiver",
    },
    {
      label: "Permanent end",
      value: "Truss-side receiver → HDMI → Epson projector (do not disconnect weekly)",
    },
    { label: "Exact cable length", value: "TBD" },
  ],
  primaryConnections: [
    "gofanco transmitter (FOH) → CAT6 → permanent truss receiver",
  ],
  bestPractices: [
    "Keep the CAT6 run neat along the right-side wall.",
    "Do not disconnect permanent truss-side receiver wiring.",
    "At teardown, disconnect and pack the FOH end of the weekly CAT6 run.",
  ],
  setupLinks: [
    {
      href: "/media/documentation/projector-signal-flow",
      label: "Projector Signal Flow",
    },
  ],
  relatedEquipment: [
    {
      slug: "gofanco-hdmi-extender",
      name: "gofanco HDMI Extender",
      href: "/media/equipment/item/gofanco-hdmi-extender",
    },
  ],
};

export const mediaEquipmentItems: EquipmentDefinition[] = [
  fohMac,
  epsonHomeCinema2250,
  gofancoHdmiExtender,
  rokuConfidenceMonitor,
  confidenceMonitorStand,
  skerellProjectionScreen,
  usbCHdmiAdapters,
  cat6ProjectorCable,
];
