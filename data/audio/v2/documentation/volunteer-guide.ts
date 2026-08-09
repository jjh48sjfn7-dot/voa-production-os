import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

export const volunteerGuide: DocumentationPageContent = {
  id: "volunteer-guide",
  purpose: "What every audio volunteer needs to know for Sunday service.",
  listSections: [
    {
      title: "Your Role",
      items: [
        "Follow the Sunday Setup checklist in order.",
        "Verify every patch before soundcheck begins.",
        "Keep the Audio Lead informed of any issues.",
      ],
    },
    {
      title: "Before Service",
      items: [
        "Load the approved Sunday Scene on the TF5.",
        "Confirm all stage snake connections are seated and labeled.",
        "Verify wireless receivers are powered and patched correctly.",
        "Keep Main L/R muted until soundcheck begins.",
      ],
    },
    {
      title: "During Service",
      items: [
        "Monitor channel mutes and fader levels.",
        "Respond quickly to monitor mix requests.",
        "Do not change routing or scenes without approval.",
      ],
    },
    {
      title: "After Service",
      items: [
        "Power down speakers first, then receivers, then the console.",
        "Coil and store cables using approved color bins.",
        "Report any damaged cables or missing labels to the Audio Lead.",
      ],
    },
    {
      title: "When to Ask for Help",
      items: [
        "Any source has no signal after basic checks.",
        "Feedback or hum that cannot be resolved quickly.",
        "Wrong scene loaded or routing looks unfamiliar.",
        "Any equipment will not power on.",
      ],
    },
  ],
  relatedResources: [
    {
      icon: "console",
      title: "Yamaha TF5",
      href: "/audio/equipment/item/yamaha-tf5",
    },
    {
      icon: "target",
      title: "Sunday Setup",
      href: "/audio/setup",
    },
    {
      icon: "tools",
      title: "Troubleshooting",
      href: "/audio/troubleshooting",
    },
    {
      icon: "verify",
      title: "Wiring Standards",
      href: "/audio/documentation/wiring-standards",
    },
    {
      icon: "speaker",
      title: "Output Routing",
      href: "/audio/documentation/output-routing",
    },
  ],
};
