import { AlertTriangle } from "lucide-react";
import type { ContentBlock, TroubleshootingIssue } from "@/types/audio";
import { voaLabels } from "@/data/audio/venue";

export const TROUBLESHOOTING_STORAGE_ID = "audio-troubleshooting";

export const troubleshootingIssues: TroubleshootingIssue[] = [
  {
    id: "no-signal",
    title: "No Signal on Channel",
    severity: "high",
    estimatedTime: "5–10 min",
    emergency: true,
    symptoms: [
      "Channel meter shows no activity",
      "No sound from that input",
      "Fader up but nothing heard",
    ],
    checklistId: "ts-no-signal",
    steps: [
      { id: "ts-ns-gain", label: "Check gain knob — increase if needed", expectedResult: "Channel meter shows input signal at -18 dBFS", ifFailed: "Proceed to mute check and cable swap" },
      { id: "ts-ns-mute", label: "Verify channel is not muted", expectedResult: "Mute indicator off, fader at unity", ifFailed: "Check DCA mute groups and scene recall" },
      { id: "ts-ns-cable", label: "Swap XLR cable to test", expectedResult: "Signal returns with known-good cable", ifFailed: "Issue is at source or Rio3224-D2 — continue to step 4" },
      { id: "ts-ns-stagebox", label: "Check Rio3224-D2 input connection", expectedResult: "Correct input patched and labeled", ifFailed: "Re-patch and verify snake continuity" },
      { id: "ts-ns-phantom", label: "Enable phantom if condenser mic", expectedResult: "+48V indicator on, condenser activates", ifFailed: "Try different mic or check phantom circuit" },
      { id: "ts-ns-routing", label: `Verify input routing on ${voaLabels.tf5}`, expectedResult: "Input assigned to correct channel", ifFailed: "Reset routing or recall last good scene" },
    ],
    recommendedActions: [
      "Start with the simplest fix — unmute and raise gain",
      "Always test with a known-good cable",
      `Check ${voaLabels.rio} label matches ${voaLabels.tf5} channel`,
    ],
    resolution: "Most no-signal issues are caused by muted channels, bad cables, or incorrect gain staging.",
  },
  {
    id: "feedback",
    title: "Feedback / Ringing",
    severity: "high",
    estimatedTime: "3–8 min",
    emergency: true,
    symptoms: [
      "High-pitched squeal or howling",
      "Ringing when vocal gets loud",
      "Monitor feedback during worship",
    ],
    checklistId: "ts-feedback",
    steps: [
      { id: "ts-fb-low-mons", label: "Lower monitor send level", expectedResult: "Feedback stops or reduces significantly", ifFailed: "Mute offending channel immediately" },
      { id: "ts-fb-move-wedge", label: "Reposition wedge away from mic", expectedResult: "Mic null point achieved, no ringing", ifFailed: "Try EQ cut at problem frequency" },
      { id: "ts-fb-eq-cut", label: "Cut offending frequency with EQ", expectedResult: "Ring eliminated with narrow -6 dB cut", ifFailed: "Run full monitor ring-out procedure" },
      { id: "ts-fb-hpf", label: "Apply HPF on vocal channels", expectedResult: "Low-frequency buildup reduced", ifFailed: "Check for room resonance issues" },
      { id: "ts-fb-ringout", label: "Run monitor ring-out procedure", expectedResult: "All monitor mixes stable at performance level", ifFailed: "Escalate to audio lead for room tuning" },
    ],
    recommendedActions: [
      "Lower monitors before touching main FOH",
      "Use narrow EQ cut, not wide boost cuts",
      "Move wedge behind mic null point",
    ],
    resolution: "Lower monitor levels first, then EQ the problem frequency. Reposition wedges if persistent.",
  },
  {
    id: "hum",
    title: "Ground Hum / Buzz",
    severity: "medium",
    estimatedTime: "10–15 min",
    symptoms: [
      "60 Hz hum on channels",
      "Buzz on DI or keyboard input",
      "Hum increases when touching equipment",
    ],
    checklistId: "ts-hum",
    steps: [
      { id: "ts-hum-ground", label: "Check ground lift on DI box", expectedResult: "Hum eliminated or significantly reduced", ifFailed: "Check power circuit commonality" },
      { id: "ts-hum-power", label: "Verify all gear on same power circuit", expectedResult: "No ground loop between circuits", ifFailed: "Use power conditioner or relocate gear" },
      { id: "ts-hum-cable", label: "Replace suspect cable", expectedResult: "Clean signal with new cable", ifFailed: "Isolate by unplugging inputs one at a time" },
      { id: "ts-hum-isolate", label: "Isolate source — unplug one input at a time", expectedResult: "Hum source identified", ifFailed: "Contact facilities for electrical inspection" },
    ],
    recommendedActions: [
      "Ground lift on DI is the first thing to try",
      "Never lift ground on power cables",
      "Isolate by unplugging one source at a time",
    ],
    resolution: "Ground loops are usually fixed with DI ground lift or ensuring common power source.",
  },
  {
    id: "distortion",
    title: "Distortion / Clipping",
    severity: "medium",
    estimatedTime: "3–5 min",
    symptoms: [
      "Crackling or distorted sound",
      "Red clip light on channel",
      "Distorted playback or vocals",
    ],
    checklistId: "ts-distortion",
    steps: [
      { id: "ts-dist-gain", label: "Reduce channel gain", expectedResult: "Clip light off, clean signal at -18 dBFS", ifFailed: "Engage input pad" },
      { id: "ts-dist-pad", label: "Engage pad on hot input", expectedResult: "Headroom restored without clipping", ifFailed: "Lower source output level" },
      { id: "ts-dist-fader", label: "Lower fader and re-set gain", expectedResult: "Proper gain staging achieved", ifFailed: "Check amplifier gain settings" },
      { id: "ts-dist-amp", label: "Check amplifier gain settings", expectedResult: "Amps not clipping at current mix level", ifFailed: "Reduce main output or amp sensitivity" },
    ],
    recommendedActions: [
      "Fix at the gain stage, not the fader",
      "Target -18 dBFS on channel meters",
      "Engage pad on hot DI or keyboard outputs",
    ],
    resolution: "Reduce gain at the source. Aim for peaks at -18 dBFS on the channel meter.",
  },
  {
    id: "wireless-drop",
    title: "Wireless Dropout",
    severity: "medium",
    estimatedTime: "5–10 min",
    symptoms: [
      "Wireless mic cuts in and out",
      "Static or dropouts during movement",
      "Receiver shows low RF signal",
    ],
    checklistId: "ts-wireless",
    steps: [
      { id: "ts-wl-battery", label: "Replace transmitter battery", expectedResult: "Stable RF signal, no dropouts", ifFailed: "Check antenna position" },
      { id: "ts-wl-antenna", label: "Check receiver antenna position", expectedResult: "Full RF bars on receiver display", ifFailed: "Scan for clear frequency" },
      { id: "ts-wl-freq", label: "Scan for clear frequency", expectedResult: "Clean channel assigned, no interference", ifFailed: "Verify line-of-sight to receiver" },
      { id: "ts-wl-distance", label: "Verify line-of-sight to receiver", expectedResult: "Reliable signal throughout stage area", ifFailed: "Reposition receiver or add antenna distribution" },
    ],
    recommendedActions: [
      "Fresh batteries fix 80% of wireless issues",
      "Antennas at 45° angle, fully extended",
      "Rescan if new interference appears",
    ],
    resolution: "Fresh batteries fix most dropouts. Rescan frequencies if interference persists.",
  },
];

export const troubleshootingBlocks: ContentBlock[] = [
  {
    id: "emergency-checklist",
    title: "Emergency Audio Checklist",
    description: "Run through this if multiple issues occur at once.",
    icon: AlertTriangle,
    type: "checklist",
    items: [
      { id: "ts-em-main", label: "Check main fader and output level" },
      { id: "ts-em-power", label: "Verify all amps and console powered" },
      { id: "ts-em-cables", label: "Check main L/R cable connections" },
      { id: "ts-em-scene", label: "Recall last known good scene" },
      { id: "ts-em-backup", label: "Switch to backup mic if needed" },
    ],
  },
];

export const severityStyles: Record<
  TroubleshootingIssue["severity"],
  { badge: string; border: string; dot: string; glow: string }
> = {
  low: {
    badge: "text-slate-400 bg-slate-500/12 ring-slate-500/20",
    border: "border-l-slate-500",
    dot: "bg-slate-500",
    glow: "shadow-slate-500/10",
  },
  medium: {
    badge: "text-amber-400 bg-amber-500/12 ring-amber-500/20",
    border: "border-l-amber-500",
    dot: "bg-amber-500",
    glow: "shadow-amber-500/10",
  },
  high: {
    badge: "text-red-400 bg-red-500/12 ring-red-500/20",
    border: "border-l-red-500",
    dot: "bg-red-500",
    glow: "shadow-red-500/10",
  },
};

export function getTroubleshootingChecklistIds(): string[] {
  const blockIds = troubleshootingBlocks.flatMap((block) =>
    block.type === "checklist" && block.items ? block.items.map((i) => i.id) : []
  );
  const issueIds = troubleshootingIssues.flatMap((issue) =>
    issue.steps.map((s) => s.id)
  );
  return [...blockIds, ...issueIds];
}
