import type { SignalFlowPath } from "@/data/signal-flow/types";

export interface MediaProjectorSignalFlowDocument {
  title: string;
  subtitle: string;
  intro: string[];
  weeklyPathNote: string;
  permanentPathNote: string;
  signalPath: SignalFlowPath;
  teardownNote: string;
}

export const mediaProjectorSignalFlowDocument: MediaProjectorSignalFlowDocument =
  {
    title: "Projector Signal Flow",
    subtitle: "How display signal reaches the Epson projector",
    intro: [
      "The projector receives HDMI from a permanent truss-side CAT6 extender receiver. Each Sunday, volunteers connect the FOH side of the signal path.",
      "Media verifies the physical signal path — ProPresenter operation belongs to the future ProPresenter department.",
    ],
    weeklyPathNote:
      "Weekly setup — volunteers connect each Sunday: FOH Mac → USB-C → HDMI → gofanco transmitter → CAT6 along the right-side wall → behind curtain → permanent truss receiver. Power the FOH transmitter.",
    permanentPathNote:
      "Permanent — do not disconnect between Sundays: CAT6 extender receiver at truss → HDMI → Epson Home Cinema 2250 → projector power.",
    signalPath: {
      id: "media-projector-path",
      nodes: [
        { id: "foh-mac", name: "FOH Mac", icon: "computer" },
        { id: "usb-c", name: "USB-C", icon: "link" },
        { id: "hdmi", name: "HDMI", icon: "cable" },
        { id: "gofanco-tx", name: "gofanco Transmitter (FOH)", icon: "signal" },
        { id: "cat6", name: "CAT6 — Right Wall → Curtain → Truss", icon: "cable" },
        { id: "gofanco-rx", name: "Permanent Truss Receiver", icon: "signal" },
        { id: "hdmi-proj", name: "HDMI", icon: "cable" },
        {
          id: "projector",
          name: "Epson Home Cinema 2250",
          icon: "projector",
        },
      ],
    },
    teardownNote:
      "At teardown, disconnect and pack the FOH weekly connections only: USB-C → HDMI, gofanco transmitter, and the FOH end of the CAT6 run. Leave the permanent truss receiver, projector HDMI, and projector power connected.",
  };
