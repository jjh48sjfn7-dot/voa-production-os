import type { StagePlotDocument } from "@/data/stage-plot/types";

/**
 * Audio Stage Plot — page copy and related links.
 *
 * PHYSICAL SOURCE OF TRUTH: data/blueprint/theater.ts
 * The volunteer map renders from shared Master Church Blueprint components
 * with overlay="audio". Do not duplicate equipment coordinates here.
 */
export const audioStagePlot: StagePlotDocument = {
  id: "audio-stage-plot",
  title: "Stage Plot",
  subtitle: "Where is our audio equipment located?",
  intro: {
    title: "Sunday audio layout",
    body: [
      "This map shows where each major piece of audio equipment is positioned during Sunday setup.",
      "Tap any item on the map for location details and links to equipment manuals.",
    ],
  },
  relatedLinks: [
    { title: "Sunday Setup", href: "/audio/setup" },
    { title: "Signal Flow", href: "/audio/documentation/signal-flow" },
    {
      title: "Input Patch List",
      href: "/audio/documentation/input-patch-list",
    },
    {
      title: "Output Routing",
      href: "/audio/documentation/output-routing",
    },
    { title: "Equipment", href: "/audio/equipment" },
  ],
};
