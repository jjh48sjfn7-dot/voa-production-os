import {
  Cable,
  Radio,
  Router,
  Speaker,
  Volume2,
  Wifi,
  Zap,
} from "lucide-react";
import type { ContentBlock, SignalConnection, SignalNode } from "@/types/audio";
import { voaLabels, voaVenue } from "@/data/audio/venue";

export const DIAGRAM_STORAGE_ID = "audio-diagram";

export const signalNodes: SignalNode[] = [
  {
    id: "stage",
    label: "Stage — VOA Antioch",
    description: "SM58 vocals, SM57/Beta52 drums, Radial DIs, Mac Mini playback.",
    icon: Radio,
    outputs: ["Rio3224-D2"],
  },
  {
    id: "stagebox",
    label: "Rio3224-D2",
    description: `${voaVenue.stageBoxes.sb1}. ${voaVenue.stageBoxes.sb2}.`,
    icon: Cable,
    outputs: [voaLabels.tf5],
  },
  {
    id: "tf5",
    label: voaLabels.tf5,
    description: `${voaVenue.console}. Scene: VOA Sunday Worship.`,
    icon: Zap,
    outputs: [voaLabels.qscMains, "Monitor Sends", "Network"],
  },
  {
    id: "router",
    label: "Netgear GS108 Switch",
    description: `${voaLabels.tf5} control + StageMix iPad on sanctuary Wi-Fi.`,
    icon: Router,
    outputs: ["Ubiquiti AP"],
  },
  {
    id: "ap",
    label: "Ubiquiti Access Point",
    description: `StageMix remote control from ${voaLabels.foh} iPad.`,
    icon: Wifi,
    outputs: [],
  },
  {
    id: "amps",
    label: "QSC GX5 Amplifiers",
    description: `${voaLabels.qscMains} — ${voaLabels.foh} rack. Power on last.`,
    icon: Speaker,
    outputs: ["JBL SRX835P", "SRX818S Sub"],
  },
  {
    id: "foh",
    label: "JBL SRX835P (L/R)",
    description: `${voaLabels.qscMains} — left/right of ${voaLabels.centerScreen}.`,
    icon: Speaker,
    outputs: [],
  },
  {
    id: "sub",
    label: "JBL SRX818S Subwoofer",
    description: `Center sub — 80 Hz crossover from ${voaLabels.tf5}.`,
    icon: Volume2,
    outputs: [],
  },
  {
    id: "monitors",
    label: "Monitors & IEM",
    description: "Aux 1–6: vocal wedge, band mix, drummer sub, keys IEM.",
    icon: Volume2,
    outputs: [],
  },
];

export const signalConnections: SignalConnection[] = [
  { from: "stage", to: "stagebox", label: "XLR / TRS" },
  { from: "stagebox", to: "tf5", label: "Dante / Rio" },
  { from: "tf5", to: "router", label: "Control Network" },
  { from: "router", to: "ap", label: "Wi-Fi" },
  { from: "tf5", to: "amps", label: "Main L/R Out" },
  { from: "amps", to: "foh", label: "NL4 Speaker" },
  { from: "amps", to: "sub", label: "Sub Feed" },
  { from: "tf5", to: "monitors", label: "Aux 1–6" },
];

export const diagramBlocks: ContentBlock[] = [
  {
    id: "connection-check",
    title: "Connection Verification",
    description: "Complete before 9:30 AM sound check.",
    icon: Cable,
    type: "checklist",
    items: [
      { id: "diag-snake-stagebox", label: `${voaLabels.stageLeft} & ${voaLabels.stageRight} Rio powered and linked` },
      { id: "diag-snake-console", label: `${voaLabels.tf5} sees all 32 ${voaLabels.rio} inputs` },
      { id: "diag-main-amps", label: `${voaLabels.tf5} Main L/R → QSC GX5 inputs` },
      { id: "diag-main-speakers", label: `${voaLabels.qscMains} → JBL SRX835P L/R + sub` },
      { id: "diag-monitors", label: "Aux 1–6 → wedges / drummer sub" },
      { id: "diag-playback", label: "Mac Mini → Ch 15/16 stereo" },
    ],
  },
  {
    id: "signal-notes",
    title: "VOA Antioch Signal Notes",
    type: "list",
    listItems: [
      `${voaLabels.rio} SB1 (${voaLabels.stageLeft} · ${voaLabels.drumPosition}) → ${voaLabels.tf5} Inputs 1–16`,
      `${voaLabels.rio} SB2 (${voaLabels.stageRight} · ${voaLabels.keyboardPosition}) → ${voaLabels.tf5} Inputs 17–32`,
      "Pastor wireless (Shure BLX) → Ch 5 — mute during worship",
      "Playback from ProPresenter → Ch 15/16",
      `${voaLabels.qscMains} OFF first at teardown — protect JBL SRX835P`,
    ],
  },
];

export function getDiagramChecklistIds(): string[] {
  return diagramBlocks.flatMap((block) =>
    block.type === "checklist" && block.items ? block.items.map((i) => i.id) : []
  );
}
