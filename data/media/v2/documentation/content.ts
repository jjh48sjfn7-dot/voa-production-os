import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

export const projectionScreenSetup: DocumentationPageContent = {
  id: "projection-screen-setup",
  purpose:
    "The SKERELL 150-inch portable projection screen is assembled center-stage/upstage in front of the back curtain each Sunday. Setup takes approximately 15 minutes.",
  headerInfo: {
    title: "Overview",
    body: [
      "This is a portable/foldable 16:9 screen with stand — not a permanent LED wall.",
      "Components are stored neatly in the trailer. The original carry bag is broken — do not instruct volunteers to pack the screen into a carry bag. Replacement storage solution is TBD.",
    ],
  },
  listSections: [
    {
      title: "Sunday setup",
      items: [
        "Retrieve screen components from trailer",
        "Assemble Portable Projection Screen — allow approximately 15 minutes",
        "Position center-stage/upstage in front of back curtain",
        "Confirm screen is stable and positioned properly",
      ],
    },
    {
      title: "Sunday teardown",
      items: [
        "Disassemble projection screen and store components neatly in trailer",
        "Do not pack into the original carry bag — it is broken",
      ],
    },
  ],
  relatedResources: [
    {
      icon: "🖥️",
      title: "SKERELL 150-inch Portable Projection Screen",
      href: "/media/equipment/item/skerell-projection-screen",
    },
    {
      icon: "🗺️",
      title: "Media Plot",
      href: "/media/documentation/media-plot",
    },
    {
      icon: "📽️",
      title: "Projector Signal Flow",
      href: "/media/documentation/projector-signal-flow",
    },
  ],
};
