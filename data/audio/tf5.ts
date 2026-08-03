import {
  Cpu,
  Layers,
  Music2,
  Radio,
  SlidersHorizontal,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import type { ContentBlock, EmergencyProcedure, QuickReferenceCard, Tf5Stat } from "@/types/audio";
import { voaLabels, voaVenue } from "@/data/audio/venue";

export const TF5_STORAGE_ID = "audio-tf5";

export const tf5DashboardStats: Tf5Stat[] = [
  { id: "overview", label: "Console Overview", value: voaLabels.tf5, hint: `${voaVenue.church} ${voaLabels.foh}`, icon: SlidersHorizontal },
  { id: "inputs", label: "Inputs", value: "48", hint: "32 Rio stage + 16 local/USB", icon: Radio },
  { id: "mixes", label: "Mixes", value: "20", hint: "Main L/R + 18 aux/matrix", icon: Layers },
  { id: "fx", label: "FX", value: "8", hint: "Hall reverb, slap delay, plate", icon: Sparkles },
  { id: "scenes", label: "Scenes", value: "3", hint: "VOA Pre-Service · Worship · Speaking", icon: Music2 },
  { id: "udk", label: "User Defined Keys", value: "12", hint: "Layer A/B · Mute worship · Talkback", icon: Cpu },
  { id: "dca", label: "DCA Groups", value: "8", hint: "Vocals · Band · Drums · Playback", icon: Users },
];

export const tf5QuickRefs: QuickReferenceCard[] = [
  { id: "sample", title: "Sample Rate", value: "48 kHz", hint: "Fixed — do not change" },
  { id: "scenes", title: "Active Scene", value: "VOA Sunday Worship", hint: "Recall before 10:15 AM" },
  { id: "layers", title: "Layers", value: "A + B", hint: "A = band · B = speech/playback" },
  { id: "main", title: "Main Output", value: "L/R → QSC GX5", hint: `${voaLabels.qscMains} on AFTER line check` },
  { id: "aux", title: "Monitor Sends", value: "Aux 1–6", hint: "Ring out before worship" },
  { id: "gain", title: "Target Gain", value: "-18 dBFS", hint: "Peak on channel meter" },
];

export const tf5SignalFlow = [
  { id: "inputs", label: voaLabels.rio, sub: `${voaLabels.stageLeft} + ${voaLabels.stageRight}` },
  { id: "tf5", label: voaLabels.tf5, sub: "Mix / EQ / Route" },
  { id: "main", label: "Main L/R", sub: `${voaLabels.qscMains} → JBL SRX835P` },
  { id: "aux", label: "Aux 1–6", sub: "Wedges + drummer sub" },
];

export const tf5Emergency: EmergencyProcedure[] = [
  {
    id: "no-audio",
    title: "Total Audio Loss",
    steps: [
      "Check Yamaha TF5 main fader — bring to unity if down",
      `Verify QSC GX5 power on both amps (${voaLabels.foh} rack)`,
      "Check Yamaha TF5 Main L/R routing → analog outs 1/2",
      "Recall scene “VOA Sunday Worship” (last known good)",
      "Swap pastor to wired SM58 on spare channel if needed",
    ],
  },
  {
    id: "feedback",
    title: "Runaway Feedback",
    steps: [
      "Pull down monitor send on offending Aux immediately",
      "Mute channel on Yamaha TF5 Layer A",
      "Lower main fader if feedback is in FOH",
      "Reposition wedge — behind vocal mic null",
      "Cut 250–400 Hz narrow on monitor mix (Antioch room)",
    ],
  },
  {
    id: "power",
    title: "Power Event / Pop",
    steps: [
      "Pull Yamaha TF5 main fader down immediately",
      `Power OFF ${voaLabels.qscMains} first (protect JBL SRX835P)`,
      "Check NL4 speaker cables at amp outputs",
      `Power on: ${voaLabels.tf5} → ${voaLabels.rio} → ${voaLabels.qscMains} (last)`,
      "Quick line check before continuing service",
    ],
  },
];

export const tf5Blocks: ContentBlock[] = [
  {
    id: "power-on",
    title: "Power On Sequence",
    description: "VOA Antioch standard — avoid pops on JBL mains.",
    icon: Zap,
    type: "checklist",
    items: [
      { id: "tf5-power-console", label: `Power on ${voaLabels.tf5}` },
      { id: "tf5-power-stagebox", label: `Power on ${voaLabels.rio} (${voaLabels.stageLeft} & ${voaLabels.stageRight})` },
      { id: "tf5-power-amps", label: `Power on ${voaLabels.qscMains} (LAST)` },
      { id: "tf5-verify-routing", label: `Verify ${voaLabels.stageLeft} & ${voaLabels.stageRight} input routing` },
      { id: "tf5-load-scene", label: "Load scene “VOA Pre-Service”" },
    ],
  },
  {
    id: "layer-setup",
    title: "Layer & Scene Setup",
    description: "Three scenes for VOA Antioch Sunday flow.",
    icon: Layers,
    type: "checklist",
    items: [
      { id: "tf5-layer-a", label: "Layer A — Worship band (Ch 1–16)" },
      { id: "tf5-layer-b", label: "Layer B — Speaking / playback / pastor" },
      { id: "tf5-scene-worship", label: "Recall “VOA Sunday Worship”" },
      { id: "tf5-scene-service", label: "Recall “VOA Speaking” for message" },
      { id: "tf5-scene-save", label: "Save changes before teardown" },
    ],
  },
  {
    id: "routing",
    title: "Input / Output Routing",
    icon: Radio,
    type: "list",
    listItems: [
      `${voaLabels.rio} SB1 (${voaLabels.stageLeft} · ${voaLabels.drumPosition}) → ${voaLabels.tf5} Inputs 1–16`,
      `${voaLabels.rio} SB2 (${voaLabels.stageRight} · ${voaLabels.keyboardPosition}) → ${voaLabels.tf5} Inputs 17–32`,
      `${voaLabels.tf5} Main L/R → QSC GX5 → JBL SRX835P`,
      `${voaLabels.tf5} Aux 1–6 → Monitor amps / IEM`,
      "Mac Mini playback → Ch 15/16 (stereo)",
      "Pastor wireless → Ch 5 (mute during worship)",
    ],
  },
  {
    id: "mix-basics",
    title: "Mixing — VOA Antioch Room",
    icon: SlidersHorizontal,
    type: "list",
    listItems: [
      "HPF vocals at 100 Hz — room builds low end",
      "Cut 250–350 Hz on vocals if muddy",
      "Compress vocals 3:1, 30 ms attack, 6 dB GR",
      "Drummer sub on Aux 3 — high-pass at 40 Hz",
      "Ring out monitors before 10:15 — watch 250 Hz",
    ],
  },
  {
    id: "pre-service",
    title: "Pre-Service Console Check",
    icon: Music2,
    type: "checklist",
    items: [
      { id: "tf5-check-faders", label: "Faders at unity — worship mutes verified" },
      { id: "tf5-check-phant", label: "+48V only on overheads (Ch 13/14)" },
      { id: "tf5-check-recording", label: "USB record armed if streaming" },
      { id: "tf5-check-talkback", label: "Talkback mic tested (Ch 17)" },
      { id: "tf5-check-main", label: "Main L/R confirmed on analog out 1/2" },
    ],
  },
];

export function getTf5ChecklistIds(): string[] {
  return tf5Blocks.flatMap((block) =>
    block.type === "checklist" && block.items ? block.items.map((i) => i.id) : []
  );
}
