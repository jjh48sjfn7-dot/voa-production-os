import type { EquipmentDefinition } from "@/data/lighting/v2/equipment/types";

export const chauvetSlimparProHUsb: EquipmentDefinition = {
  id: "chauvet-slimpar-pro-h-usb",
  slug: "chauvet-slimpar-pro-h-usb",
  name: "Chauvet DJ SlimPAR Pro H USB",
  categoryId: "fixtures",
  icon: "💡",
  purpose:
    "The church uses nine Chauvet DJ SlimPAR Pro H USB fixtures for Sunday worship lighting. Six are permanently mounted on the front/downstage truss at TR-1 through TR-6. Three floor fixtures are placed along the front edge of the stage each Sunday at Stage Left, Center, and Stage Right.",
  quickStart: [
    "Truss fixtures (TR-1–TR-6): verify power and aiming — do not remount weekly",
    "Floor fixtures: place Floor 1 (Stage Left), Floor 2 (Center), Floor 3 (Stage Right)",
    "Connect weekly DMX run before powering fixtures",
    "Confirm all fixtures on DMX Universe 1 with unique starting addresses (TBD)",
    "Aim truss fixtures down toward the stage; aim floor fixtures upward",
    "Verify all nine fixtures respond in Lightkey before service",
  ],
  specifications: [
    { label: "Model", value: "Chauvet DJ SlimPAR Pro H USB" },
    { label: "Total quantity", value: "9" },
    { label: "Truss fixtures", value: "6 — permanently mounted at TR-1 through TR-6" },
    {
      label: "Floor fixtures",
      value: "3 — Floor 1 (Stage Left), Floor 2 (Center), Floor 3 (Stage Right)",
    },
    { label: "DMX universe", value: "Universe 1" },
    { label: "DMX mode", value: "Same personality on all fixtures — exact mode TBD" },
    { label: "Starting addresses", value: "TBD — unique address per fixture" },
    { label: "Truss aiming", value: "Down toward stage / performance area" },
    { label: "Floor aiming", value: "Upward toward ceiling / audience area" },
    { label: "AC power", value: "From stage area — truss power is pre-run" },
  ],
  primaryConnections: [
    "DMX Universe 1 — in/out per fixture chain",
    "AC power — stage area (truss fixtures permanently powered infrastructure)",
    "Weekly DMX: FOH → Floor 3 → Floor 2 → Floor 1 → behind curtain → TR-1",
    "Permanent DMX: TR-1 → TR-2 → TR-3 → TR-4 → TR-5 → TR-6",
  ],
  bestPractices: [
    "Place floor fixtures before running the weekly DMX cable.",
    "Keep the FOH-to-stage DMX run along the right-side wall and neat.",
    "Do not disconnect the permanent TR-1 → TR-6 DMX chain on Sundays.",
    "Power fixtures only when the system is ready — do not power early.",
    "Verify truss aiming down and floor aiming up during setup.",
    "At teardown, disconnect the weekly DMX run and pack all three floor fixtures.",
    "Leave TR-1 through TR-6 mounted with permanent truss DMX connected.",
  ],
  commonProblems: [
    {
      id: "fixture-no-power",
      title: "Fixture Not Turning On",
      problem: "A SlimPAR does not power on or show any output.",
      basicChecks: [
        "Confirm AC power is connected at the fixture.",
        "Wait until lighting power-up is authorized — do not power early.",
        "Check the power cable at both ends.",
        "Notify the Lighting Lead if the fixture still does not respond.",
      ],
    },
    {
      id: "fixture-no-dmx",
      title: "Fixture Not Responding to DMX",
      problem: "A fixture powers on but does not respond to Lightkey control.",
      basicChecks: [
        "Confirm the weekly DMX run is connected through the full chain.",
        "Verify the permanent TR-1 → TR-6 chain is still connected.",
        "Check DMXking Micro connection at FOH.",
        "Confirm Lightkey shows Universe 1 output active.",
      ],
    },
  ],
  setupLinks: [
    { href: "/lighting/setup", label: "Sunday Setup" },
    { href: "/lighting/documentation/dmx-signal-flow", label: "DMX Signal Flow" },
    { href: "/lighting/documentation/fixture-layout", label: "Fixture Layout" },
  ],
  relatedEquipment: [
    { slug: "dmxking-micro", name: "DMXking Micro", href: "/lighting/equipment/item/dmxking-micro" },
    { slug: "lightkey-foh-control", name: "FOH Mac / Lightkey Control", href: "/lighting/equipment/item/lightkey-foh-control" },
  ],
};

export const dmxkingMicro: EquipmentDefinition = {
  id: "dmxking-micro",
  slug: "dmxking-micro",
  name: "DMXking Micro",
  categoryId: "control",
  icon: "🔌",
  purpose:
    "The DMXking Micro is the DMX interface at FOH. Lightkey on the FOH Mac sends lighting control to Universe 1 through this device.",
  quickStart: [
    "Confirm the DMXking Micro is connected to the FOH Mac",
    "Confirm the DMX output cable to the weekly fixture chain is connected",
    "Open Lightkey and verify Universe 1 output",
    "Do not change interface settings without Lighting Lead approval",
  ],
  specifications: [
    { label: "Model", value: "DMXking Micro" },
    { label: "Location", value: "FOH — house-right side platform" },
    { label: "Software", value: "Lightkey on FOH Mac Desktop" },
    { label: "Output", value: "DMX Universe 1" },
    { label: "Weekly DMX path", value: "FOH → Floor 3 → Floor 2 → Floor 1 → TR-1" },
  ],
  primaryConnections: [
    "USB — FOH Mac Desktop (Lightkey)",
    "DMX out — Universe 1 to weekly fixture chain",
  ],
  bestPractices: [
    "Confirm the interface is connected before opening Lightkey.",
    "Keep the DMX output cable routed along the right-side wall with the weekly run.",
    "Do not disconnect the permanent TR-1 → TR-6 truss DMX chain.",
    "Notify the Lighting Lead if Universe 1 does not output.",
  ],
  setupLinks: [
    { href: "/lighting/setup", label: "Sunday Setup" },
    { href: "/lighting/documentation/dmx-signal-flow", label: "DMX Signal Flow" },
  ],
  relatedEquipment: [
    { slug: "lightkey-foh-control", name: "FOH Mac / Lightkey Control", href: "/lighting/equipment/item/lightkey-foh-control" },
    { slug: "chauvet-slimpar-pro-h-usb", name: "Chauvet DJ SlimPAR Pro H USB", href: "/lighting/equipment/item/chauvet-slimpar-pro-h-usb" },
  ],
};

export const lightkeyFohControl: EquipmentDefinition = {
  id: "lightkey-foh-control",
  slug: "lightkey-foh-control",
  name: "FOH Mac / Lightkey Control",
  categoryId: "control",
  icon: "💻",
  purpose:
    "Official lighting control runs on the FOH Mac Desktop using Lightkey. The same computer may run other production software, but Lightkey is the lighting control application for all nine SlimPAR fixtures on Universe 1.",
  quickStart: [
    "Confirm the FOH Mac is powered on and ready",
    "Open Lightkey",
    "Confirm DMXking Micro is connected",
    "Verify Universe 1 output before testing fixtures",
    "Lightkey scene names — TBD (owner will provide later)",
  ],
  specifications: [
    { label: "Computer", value: "FOH Mac Desktop" },
    { label: "Lighting software", value: "Lightkey" },
    { label: "DMX interface", value: "DMXking Micro" },
    { label: "Universe", value: "Universe 1 — all nine SlimPAR fixtures" },
    { label: "Scene presets", value: "TBD — confirm with Lighting Lead" },
    { label: "Hardware console", value: "None — software control only" },
  ],
  primaryConnections: [
    "Lightkey → DMXking Micro → DMX Universe 1",
    "DMXking Micro USB to FOH Mac",
  ],
  bestPractices: [
    "Use Lightkey for all Sunday lighting control — there is no separate lighting console.",
    "Do not change fixture addressing or personalities without Lighting Lead approval.",
    "Scene names and presets are TBD — do not invent worship or speaking scenes.",
    "Confirm individual fixture control works during Sunday setup.",
    "Notify the Lighting Lead if Lightkey cannot connect to the DMX interface.",
  ],
  setupLinks: [
    { href: "/lighting/setup", label: "Sunday Setup" },
    { href: "/lighting/documentation/dmx-signal-flow", label: "DMX Signal Flow" },
  ],
  relatedEquipment: [
    { slug: "dmxking-micro", name: "DMXking Micro" },
    { slug: "chauvet-slimpar-pro-h-usb", name: "Chauvet DJ SlimPAR Pro H USB" },
  ],
};

export const lightingEquipmentItems: EquipmentDefinition[] = [
  chauvetSlimparProHUsb,
  dmxkingMicro,
  lightkeyFohControl,
];
