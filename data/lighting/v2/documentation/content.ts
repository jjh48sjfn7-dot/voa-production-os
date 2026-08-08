import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

export const fixtureLayout: DocumentationPageContent = {
  id: "fixture-layout",
  purpose:
    "Nine Chauvet DJ SlimPAR Pro H USB fixtures serve Sunday worship lighting. Six are permanently mounted on the front/downstage truss. Three floor fixtures are placed along the front edge of the stage each week.",
  headerInfo: {
    title: "Fixture overview",
    body: [
      "Truss fixtures aim down toward the stage. Floor fixtures aim upward toward the ceiling and audience area.",
      "All fixtures operate on DMX Universe 1 with the same DMX mode. Exact starting addresses are TBD.",
    ],
  },
  tableSections: [
    {
      title: "Permanent truss fixtures (6)",
      columns: [
        { key: "position", label: "Position" },
        { key: "mount", label: "Mount" },
        { key: "aim", label: "Aiming" },
        { key: "sunday", label: "Sunday duty" },
      ],
      rows: [
        {
          position: "TR-1",
          mount: "Front/downstage truss",
          aim: "Down toward stage",
          sunday: "Power when ready · verify aiming · confirm function",
        },
        {
          position: "TR-2",
          mount: "Front/downstage truss",
          aim: "Down toward stage",
          sunday: "Power when ready · verify aiming · confirm function",
        },
        {
          position: "TR-3",
          mount: "Front/downstage truss",
          aim: "Down toward stage",
          sunday: "Power when ready · verify aiming · confirm function",
        },
        {
          position: "TR-4",
          mount: "Front/downstage truss",
          aim: "Down toward stage",
          sunday: "Power when ready · verify aiming · confirm function",
        },
        {
          position: "TR-5",
          mount: "Front/downstage truss",
          aim: "Down toward stage",
          sunday: "Power when ready · verify aiming · confirm function",
        },
        {
          position: "TR-6",
          mount: "Front/downstage truss",
          aim: "Down toward stage",
          sunday: "Power when ready · verify aiming · confirm function",
        },
      ],
    },
    {
      title: "Weekly floor fixtures (3)",
      columns: [
        { key: "fixture", label: "Fixture" },
        { key: "location", label: "Location" },
        { key: "aim", label: "Aiming" },
        { key: "sunday", label: "Sunday duty" },
      ],
      rows: [
        {
          fixture: "Floor 1",
          location: "Stage Left — front downstage edge",
          aim: "Upward toward ceiling / audience",
          sunday: "Place · connect DMX · aim · power · pack at teardown",
        },
        {
          fixture: "Floor 2",
          location: "Center — front downstage edge",
          aim: "Upward toward ceiling / audience",
          sunday: "Place · connect DMX · aim · power · pack at teardown",
        },
        {
          fixture: "Floor 3",
          location: "Stage Right — front downstage edge",
          aim: "Upward toward ceiling / audience",
          sunday: "Place · connect DMX · aim · power · pack at teardown",
        },
      ],
    },
  ],
  listSections: [
    {
      title: "Teardown",
      items: [
        "Disconnect the weekly DMX run: FOH → Floor 3 → Floor 2 → Floor 1 → behind curtain → TR-1",
        "Pack Floor 1, Floor 2, and Floor 3",
        "Leave TR-1 through TR-6 mounted",
        "Leave permanent TR-1 → TR-6 DMX connected",
      ],
    },
  ],
  relatedResources: [
    {
      icon: "💡",
      title: "Chauvet DJ SlimPAR Pro H USB",
      href: "/lighting/equipment/item/chauvet-slimpar-pro-h-usb",
    },
    {
      icon: "🗺️",
      title: "Lighting Plot",
      href: "/lighting/documentation/lighting-plot",
    },
  ],
};

export const dmxAddressing: DocumentationPageContent = {
  id: "dmx-addressing",
  purpose:
    "All nine SlimPAR fixtures operate on DMX Universe 1. Each fixture uses the same DMX mode and has a unique starting address so Lightkey can control them independently.",
  placeholderMessage:
    "Exact fixture starting addresses — TBD. Confirm with the Lighting Lead before changing any address or DMX mode.",
  tableSections: [
    {
      title: "Addressing summary",
      columns: [
        { key: "item", label: "Item" },
        { key: "value", label: "Status" },
      ],
      rows: [
        { item: "Universe", value: "Universe 1 — all nine fixtures" },
        { item: "DMX mode / personality", value: "Same on all fixtures — exact mode TBD" },
        { item: "TR-1 starting address", value: "TBD" },
        { item: "TR-2 starting address", value: "TBD" },
        { item: "TR-3 starting address", value: "TBD" },
        { item: "TR-4 starting address", value: "TBD" },
        { item: "TR-5 starting address", value: "TBD" },
        { item: "TR-6 starting address", value: "TBD" },
        { item: "Floor 1 starting address", value: "TBD" },
        { item: "Floor 2 starting address", value: "TBD" },
        { item: "Floor 3 starting address", value: "TBD" },
      ],
    },
  ],
  relatedResources: [
    {
      icon: "🔌",
      title: "DMX Signal Flow",
      href: "/lighting/documentation/dmx-signal-flow",
    },
    {
      icon: "💻",
      title: "FOH Mac / Lightkey Control",
      href: "/lighting/equipment/item/lightkey-foh-control",
    },
  ],
};
