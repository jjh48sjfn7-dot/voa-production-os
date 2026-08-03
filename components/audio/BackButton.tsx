"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { voaLabels } from "@/data/audio/venue";
import { audioStyles } from "@/lib/audio-styles";

export function BackButton() {
  return (
    <Link
      href="/audio"
      className={`group inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[13px] font-medium text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-slate-200 ${audioStyles.cardGlow}`}
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-[250ms] group-hover:-translate-x-0.5" />
      Back to {voaLabels.audioDepartment}
    </Link>
  );
}
