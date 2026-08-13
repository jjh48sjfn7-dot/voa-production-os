import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

export const wiringStandards: DocumentationPageContent = {
  id: "wiring-standards",
  purpose: "Approved wiring and patching standards for Sunday service.",
  listSections: [
    {
      title: "Patching",
      items: [
        "Match every cable label before patching.",
        "Use the approved color-coded wireless XLR cables.",
        "Patch Purple to Channel 17, Yellow to 18, Green to 19, and Blue to 20.",
        "Leave Stage Snake A Output 4 and Stage Snake B Output 4 open unless approved.",
      ],
    },
    {
      title: "Cable Routing",
      items: [
        "Run Stage Snake A and B along the approved wall route.",
        "Keep connectors clear of walkways.",
        "Separate signal cables from power cables where possible.",
      ],
    },
    {
      title: "Power Sequence",
      items: [
        "Complete all signal connections before powering speakers.",
        "Mute Main L/R before connecting or disconnecting equipment.",
        "Power speakers LAST.",
      ],
    },
    {
      title: "Safety",
      items: [
        "Inspect connectors for damage before use.",
        "Label and remove damaged cables from service.",
        "Notify the Audio Lead before changing any approved patch.",
      ],
    },
  ],
  visualSupplements: [
    {
      afterListSectionTitle: "Cable Routing",
      sequenceKey: "venueCablePath",
    },
  ],
  relatedResources: [
    {
      icon: "console",
      title: "Yamaha TF5",
      href: "/audio/equipment/item/yamaha-tf5",
    },
    {
      icon: "signal-in",
      title: "Input Patch List",
      href: "/audio/documentation/input-patch-list",
    },
    {
      icon: "speaker",
      title: "Output Routing",
      href: "/audio/documentation/output-routing",
    },
    {
      icon: "target",
      title: "Sunday Setup",
      href: "/audio/setup",
    },
  ],
};
