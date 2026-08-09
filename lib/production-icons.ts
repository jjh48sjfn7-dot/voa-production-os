import type { LucideIcon } from "lucide-react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  AudioLines,
  Cable,
  CheckCircle2,
  Drum,
  Headphones,
  Lightbulb,
  Link2,
  Map,
  MapPin,
  Mic2,
  Monitor,
  Package,
  PartyPopper,
  Piano,
  Presentation,
  Projector,
  Radio,
  SlidersHorizontal,
  Target,
  Tv,
  Volume2,
  Wrench,
  Zap,
} from "lucide-react";

/** Shared Production OS icon vocabulary — Lucide-first, ~20 reusable concepts. */
export type ProductionIconId =
  | "package"
  | "target"
  | "console"
  | "cable"
  | "microphone"
  | "speaker"
  | "subwoofer"
  | "monitor"
  | "verify"
  | "power"
  | "computer"
  | "display"
  | "projector"
  | "screen"
  | "fixture"
  | "dmx-control"
  | "location"
  | "ready"
  | "keyboard"
  | "signal"
  | "link"
  | "tools"
  | "drums"
  | "headphones"
  | "signal-out"
  | "signal-in"
  | "map";

export const productionIcons: Record<ProductionIconId, LucideIcon> = {
  package: Package,
  target: Target,
  console: SlidersHorizontal,
  cable: Cable,
  microphone: Mic2,
  speaker: Volume2,
  subwoofer: AudioLines,
  monitor: Volume2,
  verify: CheckCircle2,
  power: Zap,
  computer: Monitor,
  display: Tv,
  projector: Projector,
  screen: Presentation,
  fixture: Lightbulb,
  "dmx-control": SlidersHorizontal,
  location: MapPin,
  ready: PartyPopper,
  keyboard: Piano,
  signal: Radio,
  link: Link2,
  tools: Wrench,
  drums: Drum,
  headphones: Headphones,
  "signal-out": ArrowUpFromLine,
  "signal-in": ArrowDownToLine,
  map: Map,
};

export const productionIconLabels: Record<ProductionIconId, string> = {
  package: "Package / storage",
  target: "Position / aim",
  console: "Mixing console",
  cable: "Cable / connection",
  microphone: "Microphone",
  speaker: "Speaker",
  subwoofer: "Subwoofer",
  monitor: "Stage monitor",
  verify: "Verify / check",
  power: "Power",
  computer: "Computer",
  display: "Display / TV",
  projector: "Projector",
  screen: "Projection screen",
  fixture: "Lighting fixture",
  "dmx-control": "Control / mix bus",
  location: "Placement",
  ready: "Ready for service",
  keyboard: "Keyboard",
  signal: "Wireless / data signal",
  link: "Adapter / link",
  tools: "Tools / accessories",
  drums: "Drums",
  headphones: "In-ear monitor",
  "signal-out": "Output path",
  "signal-in": "Input path",
  map: "Plot / map",
};

export function getProductionIcon(id: ProductionIconId): LucideIcon {
  return productionIcons[id];
}
