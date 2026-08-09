import type { SignalFlowPath } from "@/data/signal-flow/types";

export interface MediaConfidenceMonitorSignalFlowDocument {
  title: string;
  subtitle: string;
  intro: string[];
  setupNote: string;
  signalPath: SignalFlowPath;
  contentNote: string;
}

export const mediaConfidenceMonitorSignalFlowDocument: MediaConfidenceMonitorSignalFlowDocument =
  {
    title: "Confidence Monitor Signal Flow",
    subtitle: "How display signal reaches the FOH confidence monitor",
    intro: [
      "The 55-inch Roku TV confidence monitor sits on a rolling stand immediately right of the FOH Mac.",
      "Media connects the physical display path and verifies the output works. ProPresenter content configuration belongs to the future ProPresenter department.",
    ],
    setupNote:
      "Each Sunday: position the rolling stand, hook the TV onto the stand using existing mounting brackets, connect USB-C → HDMI from the Mac, connect HDMI to the TV, and power the TV.",
    signalPath: {
      id: "media-confidence-monitor-path",
      nodes: [
        { id: "foh-mac", name: "FOH Mac", emoji: "💻" },
        { id: "usb-c", name: "USB-C", emoji: "🔗" },
        { id: "hdmi", name: "HDMI", emoji: "🔌" },
        { id: "tv", name: "55-inch Roku TV", emoji: "📺" },
      ],
    },
    contentNote:
      "The confidence monitor may eventually display lyrics, stage display, next slide, clock/timer, or speaker notes — but Media does not configure or operate that ProPresenter content.",
  };
