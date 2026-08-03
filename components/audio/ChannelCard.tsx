"use client";

import {
  Cable,
  Filter,
  Mic,
  MonitorSpeaker,
  StickyNote,
  Zap,
} from "lucide-react";
import type { ChannelAssignment } from "@/types/audio";
import {
  channelStatusStyles,
  channelTypeStyles,
  colorTagStyles,
} from "@/data/audio/channels";
import { audioStyles } from "@/lib/audio-styles";
import { voaLabels, stageBoxLabel } from "@/data/audio/venue";

interface ChannelCardProps {
  channel: ChannelAssignment;
  index?: number;
}

export function ChannelCard({ channel, index = 0 }: ChannelCardProps) {
  const styles = channelTypeStyles[channel.type];
  const sends = channel.monitorSends ?? (channel.monitorMix ? [channel.monitorMix] : []);

  return (
    <article
      className={`group border-l-[3px] ${styles.border} ${audioStyles.glass} ${audioStyles.cardHover} overflow-hidden ${audioStyles.cardGlow} animate-fade-in`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Header row */}
      <div className={`border-b border-white/[0.06] ${audioStyles.cardPad}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br ${styles.number} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/[0.07]`}
            >
              <span className="text-[10px] font-medium uppercase tracking-wider opacity-60">
                Ch
              </span>
              <span className="text-xl font-bold tabular-nums leading-none">
                {channel.channel}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${colorTagStyles[channel.colorTag] ?? colorTagStyles.Default}`}
                  title={`Color: ${channel.colorTag}`}
                />
                <p className={`${audioStyles.heading} text-base`}>{channel.name}</p>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">{channel.source}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className={`${audioStyles.badge} ring-1 ${styles.badge}`}>
              {channel.type}
            </span>
            <span className={`${audioStyles.badge} ring-1 ${channelStatusStyles[channel.status]}`}>
              {channel.status}
            </span>
          </div>
        </div>
      </div>

      {/* Patch sheet grid */}
      <div className="grid gap-px bg-white/[0.03] sm:grid-cols-2">
        <PatchField icon={Mic} label="Microphone" value={channel.microphone} />
        <PatchField icon={Cable} label="Cable Type" value={channel.cableType} />
        <PatchField
          label="Position"
          value={stageBoxLabel(channel.stageBox)}
        />
        <PatchField
          icon={Zap}
          label="Gain Target"
          value={channel.gain}
          highlight
        />
        <PatchField icon={Filter} label="HPF" value={channel.hpf} />
        <PatchField
          label="Phantom Power"
          value={channel.phantom ? "+48V On" : "Off"}
          accent={channel.phantom ? "text-purple-400" : undefined}
        />
        {sends.length > 0 && (
          <div className="col-span-full border-t border-white/[0.04] bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <MonitorSpeaker className="h-3.5 w-3.5 text-red-400" />
              <span className={audioStyles.patchLabel}>Monitor Sends</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {sends.map((send) => (
                <span
                  key={send}
                  className="rounded-md bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-300 ring-1 ring-red-500/20"
                >
                  {send}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {channel.notes && (
        <div className="flex items-start gap-2 border-t border-white/[0.05] bg-white/[0.02] px-4 py-3">
          <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
          <p className="text-xs leading-relaxed text-slate-400">{channel.notes}</p>
        </div>
      )}
    </article>
  );
}

function PatchField({
  icon: Icon,
  label,
  value,
  highlight,
  accent,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
  accent?: string;
}) {
  return (
    <div className={`bg-[#0a1220]/60 px-4 py-3 ${audioStyles.transition} group-hover:bg-[#0c1525]/85`}>
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3 text-slate-500" />}
        <span className={audioStyles.patchLabel}>{label}</span>
      </div>
      <p
        className={`mt-1 text-sm font-medium ${accent ?? (highlight ? "text-red-300" : "text-slate-200")}`}
      >
        {value}
      </p>
    </div>
  );
}
