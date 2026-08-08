import type { StagePlotDocument } from "@/data/stage-plot/types";

/**
 * Lighting Plot — page copy and related links.
 *
 * PHYSICAL SOURCE OF TRUTH: data/blueprint/theater.ts
 * Renders from shared Master Church Blueprint with overlay="lighting".
 */
export const lightingPlotDocument: StagePlotDocument = {
  id: "lighting-plot",
  title: "Lighting Plot",
  subtitle: "Where are our lighting fixtures located?",
  intro: {
    title: "Sunday lighting layout",
    body: [
      "This map shows all nine Chauvet DJ SlimPAR Pro H USB fixtures — six on the front truss and three weekly floor fixtures.",
      "Tap any fixture on the map for placement notes and equipment links.",
    ],
  },
  relatedLinks: [
    { title: "Sunday Setup", href: "/lighting/setup" },
    { title: "DMX Signal Flow", href: "/lighting/documentation/dmx-signal-flow" },
    { title: "Fixture Layout", href: "/lighting/documentation/fixture-layout" },
    { title: "DMX Addressing", href: "/lighting/documentation/dmx-addressing" },
    { title: "Equipment", href: "/lighting/equipment" },
  ],
};
