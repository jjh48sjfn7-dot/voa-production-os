import { Mic2, Radio, Volume2 } from "lucide-react";
import type { ChannelAssignment, ContentBlock } from "@/types/audio";
import { voaLabels } from "@/data/audio/venue";

export const CHANNELS_STORAGE_ID = "audio-channels";

export const channelAssignments: ChannelAssignment[] = [
  { id: "ch1", channel: 1, name: "Lead Vocal", microphone: "Shure SM58", source: "Stage Left · Drum Position · In 1", type: "vocal", gain: "-18 dBFS", phantom: false, hpf: "100 Hz", cableType: "XLR", stageBox: 1, monitorMix: "Aux 1", monitorSends: ["Aux 1"], colorTag: "Red", status: "active", notes: "Worship leader — HPF 100 Hz, compress 3:1" },
  { id: "ch2", channel: 2, name: "BGV 1", microphone: "SM58", source: "Stage Left · Drum Position · In 2", type: "vocal", gain: "-18 dBFS", phantom: false, hpf: "100 Hz", cableType: "XLR", stageBox: 1, monitorMix: "Aux 5", monitorSends: ["Aux 5"], colorTag: "Orange", status: "active" },
  { id: "ch3", channel: 3, name: "BGV 2", microphone: "SM58", source: "Stage Left · Drum Position · In 3", type: "vocal", gain: "-18 dBFS", phantom: false, hpf: "100 Hz", cableType: "XLR", stageBox: 1, monitorMix: "Aux 5", monitorSends: ["Aux 5"], colorTag: "Orange", status: "active" },
  { id: "ch4", channel: 4, name: "BGV 3", microphone: "SM58", source: "Stage Left · Drum Position · In 4", type: "vocal", gain: "-18 dBFS", phantom: false, hpf: "100 Hz", cableType: "XLR", stageBox: 1, monitorMix: "Aux 5", monitorSends: ["Aux 5"], colorTag: "Orange", status: "active" },
  { id: "ch5", channel: 5, name: "Pastor Mic", microphone: "Shure BLX288 HH", source: "Wireless → Ch 5", type: "vocal", gain: "-16 dBFS", phantom: false, hpf: "80 Hz", cableType: "Wireless", stageBox: 1, monitorMix: "Aux 1", monitorSends: ["Aux 1"], colorTag: "Yellow", status: "active", notes: "Mute during worship — unmute for welcome & message" },
  { id: "ch6", channel: 6, name: "Keys L", microphone: "Keyboard DI", source: "Stage Left · Drum Position · In 6", type: "instrument", gain: "-20 dBFS", phantom: false, hpf: "Off", cableType: "DI", stageBox: 1, monitorMix: "Aux 4", monitorSends: ["Aux 4"], colorTag: "Blue", status: "active" },
  { id: "ch7", channel: 7, name: "Keys R", microphone: "Keyboard DI", source: "Stage Left · Drum Position · In 7", type: "instrument", gain: "-20 dBFS", phantom: false, hpf: "Off", cableType: "DI", stageBox: 1, monitorMix: "Aux 4", monitorSends: ["Aux 4"], colorTag: "Blue", status: "active" },
  { id: "ch8", channel: 8, name: "Acoustic Guitar", microphone: "Acoustic DI", source: "Stage Left · Drum Position · In 8", type: "instrument", gain: "-18 dBFS", phantom: false, hpf: "80 Hz", cableType: "DI", stageBox: 1, monitorMix: "Aux 2", monitorSends: ["Aux 2"], colorTag: "Green", status: "active" },
  { id: "ch9", channel: 9, name: "Electric Guitar", microphone: "SM57 on Amp", source: "Stage Right · Keyboard Position · In 1", type: "instrument", gain: "-18 dBFS", phantom: false, hpf: "Off", cableType: "XLR", stageBox: 2, monitorMix: "Aux 2", monitorSends: ["Aux 2"], colorTag: "Green", status: "active" },
  { id: "ch10", channel: 10, name: "Bass", microphone: "Bass DI", source: "Stage Right · Keyboard Position · In 2", type: "instrument", gain: "-18 dBFS", phantom: false, hpf: "40 Hz", cableType: "DI", stageBox: 2, monitorMix: "Aux 3", monitorSends: ["Aux 3"], colorTag: "Purple", status: "active" },
  { id: "ch11", channel: 11, name: "Kick Drum", microphone: "Beta 52A", source: "Stage Right · Keyboard Position · In 3", type: "instrument", gain: "-14 dBFS", phantom: false, hpf: "Off", cableType: "XLR", stageBox: 2, monitorMix: "Aux 3", monitorSends: ["Aux 3"], colorTag: "Purple", status: "active" },
  { id: "ch12", channel: 12, name: "Snare", microphone: "SM57", source: "Stage Right · Keyboard Position · In 4", type: "instrument", gain: "-16 dBFS", phantom: false, hpf: "Off", cableType: "XLR", stageBox: 2, monitorMix: "Aux 3", monitorSends: ["Aux 3"], colorTag: "Purple", status: "active" },
  { id: "ch13", channel: 13, name: "Overhead L", microphone: "Condenser", source: "Stage Right · Keyboard Position · In 5", type: "instrument", gain: "-20 dBFS", phantom: true, hpf: "120 Hz", cableType: "XLR", stageBox: 2, monitorMix: "Aux 3", monitorSends: ["Aux 3"], colorTag: "Purple", status: "active" },
  { id: "ch14", channel: 14, name: "Overhead R", microphone: "Condenser", source: "Stage Right · Keyboard Position · In 6", type: "instrument", gain: "-20 dBFS", phantom: true, hpf: "120 Hz", cableType: "XLR", stageBox: 2, monitorMix: "Aux 3", monitorSends: ["Aux 3"], colorTag: "Purple", status: "active" },
  { id: "ch15", channel: 15, name: "Playback L", microphone: "Mac Mini Out", source: "Stage Right · Keyboard Position · In 15", type: "playback", gain: "-12 dBFS", phantom: false, hpf: "Off", cableType: "TRS", stageBox: 2, monitorMix: "Aux 4", monitorSends: ["Aux 4"], colorTag: "Cyan", status: "active" },
  { id: "ch16", channel: 16, name: "Playback R", microphone: "Mac Mini Out", source: "Stage Right · Keyboard Position · In 16", type: "playback", gain: "-12 dBFS", phantom: false, hpf: "Off", cableType: "TRS", stageBox: 2, monitorMix: "Aux 4", monitorSends: ["Aux 4"], colorTag: "Cyan", status: "active" },
  { id: "ch17", channel: 17, name: "Talkback", microphone: "Console Mic", source: "Yamaha TF5 Local", type: "talkback", gain: "-18 dBFS", phantom: true, hpf: "120 Hz", cableType: "XLR", stageBox: 0, colorTag: "Gray", status: "spare", notes: "FOH talkback — not routed to mains" },
];

export const channelBlocks: ContentBlock[] = [
  {
    id: "gain-staging",
    title: "Gain Staging Checklist",
    description: "Set gains before applying EQ or compression.",
    icon: Volume2,
    type: "checklist",
    items: [
      { id: "ch-gain-vocals", label: "Vocal channels peaked at -18 dBFS" },
      { id: "ch-gain-instruments", label: "Instrument channels peaked at -18 dBFS" },
      { id: "ch-gain-playback", label: "Playback at appropriate level" },
      { id: "ch-gain-no-clip", label: "No clipping on any input meter" },
    ],
  },
  {
    id: "monitor-sends",
    title: "Monitor Send Reference",
    icon: Radio,
    type: "list",
    listItems: [
      "Aux 1 — Lead vocal wedge",
      "Aux 2 — Band mix wedge",
      "Aux 3 — Drummer sub",
      "Aux 4 — Keys / playback IEM",
      "Aux 5 — BGV wedge",
      "Aux 6 — Spare",
    ],
  },
  {
    id: "labeling",
    title: "Channel Labeling",
    icon: Mic2,
    type: "checklist",
    items: [
      { id: "ch-label-console", label: `All channels labeled on ${voaLabels.tf5}` },
      { id: "ch-label-stagebox", label: "Rio3224-D2 inputs labeled" },
      { id: "ch-label-snake", label: "Snake connections verified" },
    ],
  },
];

export const channelTypeStyles: Record<
  ChannelAssignment["type"],
  { badge: string; border: string; number: string }
> = {
  vocal: {
    badge: "text-red-400 bg-red-500/12 ring-red-500/20",
    border: "border-l-red-500/60",
    number: "from-red-500/20 to-red-600/10 text-red-400",
  },
  instrument: {
    badge: "text-blue-400 bg-blue-500/12 ring-blue-500/20",
    border: "border-l-blue-500/60",
    number: "from-blue-500/20 to-blue-600/10 text-blue-400",
  },
  playback: {
    badge: "text-green-400 bg-green-500/12 ring-green-500/20",
    border: "border-l-green-500/60",
    number: "from-green-500/20 to-green-600/10 text-green-400",
  },
  talkback: {
    badge: "text-slate-400 bg-slate-500/12 ring-slate-500/20",
    border: "border-l-slate-500/60",
    number: "from-slate-500/20 to-slate-600/10 text-slate-400",
  },
};

export const channelStatusStyles: Record<
  ChannelAssignment["status"],
  string
> = {
  active: "text-emerald-400 bg-emerald-500/12 ring-emerald-500/20",
  spare: "text-slate-400 bg-slate-500/12 ring-slate-500/20",
  offline: "text-red-400 bg-red-500/12 ring-red-500/20",
};

export const colorTagStyles: Record<string, string> = {
  Red: "bg-red-500",
  Orange: "bg-orange-500",
  Yellow: "bg-yellow-500",
  Green: "bg-green-500",
  Blue: "bg-blue-500",
  Purple: "bg-purple-500",
  Cyan: "bg-cyan-500",
  Gray: "bg-slate-500",
  Default: "bg-slate-600",
};

export function getChannelChecklistIds(): string[] {
  return channelBlocks.flatMap((block) =>
    block.type === "checklist" && block.items ? block.items.map((i) => i.id) : []
  );
}
