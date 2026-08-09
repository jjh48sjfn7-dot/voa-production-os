import type { SignalFlowPath } from "@/data/signal-flow/types";

export interface LightingDmxSignalFlowDocument {
  title: string;
  subtitle: string;
  intro: string[];
  weeklyPathNote: string;
  permanentPathNote: string;
  signalPath: SignalFlowPath;
  teardownNote: string;
}

export const lightingDmxSignalFlowDocument: LightingDmxSignalFlowDocument = {
  title: "DMX Signal Flow",
  subtitle: "How lighting control reaches every fixture",
  intro: [
    "Lighting control runs from the FOH Mac through Lightkey and the DMXking Micro to all nine SlimPAR fixtures on Universe 1.",
    "Volunteers connect a weekly DMX cable run each Sunday. The truss chain from TR-1 through TR-6 stays permanently connected.",
  ],
  weeklyPathNote:
    "Weekly setup — volunteers connect each Sunday: FOH → Floor 3 → Floor 2 → Floor 1 → behind curtain → TR-1. Run the cable along the right-side wall and keep it neat.",
  permanentPathNote:
    "Permanent — do not reconnect on Sundays: TR-1 → TR-2 → TR-3 → TR-4 → TR-5 → TR-6.",
  signalPath: {
    id: "lighting-dmx-universe-1",
    nodes: [
      { id: "foh-mac", name: "FOH Mac Desktop", icon: "computer" },
      { id: "lightkey", name: "Lightkey", icon: "dmx-control" },
      { id: "dmxking", name: "DMXking Micro", icon: "cable" },
      { id: "universe-1", name: "Universe 1", icon: "signal" },
      { id: "floor-3", name: "Floor 3 — Stage Right", icon: "fixture" },
      { id: "floor-2", name: "Floor 2 — Center", icon: "fixture" },
      { id: "floor-1", name: "Floor 1 — Stage Left", icon: "fixture" },
      { id: "tr-1", name: "TR-1", icon: "fixture" },
      { id: "tr-2", name: "TR-2", icon: "fixture" },
      { id: "tr-3", name: "TR-3", icon: "fixture" },
      { id: "tr-4", name: "TR-4", icon: "fixture" },
      { id: "tr-5", name: "TR-5", icon: "fixture" },
      { id: "tr-6", name: "TR-6", icon: "fixture" },
    ],
  },
  teardownNote:
    "At teardown, disconnect the weekly run from FOH through Floor 3, Floor 2, Floor 1, and TR-1. Leave the permanent TR-1 → TR-6 chain connected.",
};
