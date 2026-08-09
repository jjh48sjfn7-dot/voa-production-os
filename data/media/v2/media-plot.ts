import type { StagePlotDocument } from "@/data/stage-plot/types";

/**
 * Media Plot — page copy and related links.
 *
 * PHYSICAL SOURCE OF TRUTH: data/blueprint/theater.ts
 * Renders from shared Master Church Blueprint with overlay="media".
 */
export const mediaPlotDocument: StagePlotDocument = {
  id: "media-plot",
  title: "Media Plot",
  subtitle: "Where are our presentation displays and projector?",
  intro: {
    title: "Sunday presentation layout",
    body: [
      "This map shows the Epson projector, portable projection screen, FOH Mac, and confidence monitor used for Sunday worship presentation.",
      "Tap any item on the map for placement notes and equipment links.",
    ],
  },
  relatedLinks: [
    { title: "Sunday Setup", href: "/media/setup" },
    {
      title: "Projector Signal Flow",
      href: "/media/documentation/projector-signal-flow",
    },
    {
      title: "Confidence Monitor Signal Flow",
      href: "/media/documentation/confidence-monitor-signal-flow",
    },
    {
      title: "Projection Screen Setup",
      href: "/media/documentation/projection-screen-setup",
    },
    { title: "Equipment", href: "/media/equipment" },
  ],
};
