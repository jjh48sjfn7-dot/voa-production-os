import { departmentAccents } from "@/lib/theme";

const transition =
  "transition-[transform,box-shadow,border-color,background-color,color] duration-200 ease-out";

/** Canonical spacing rhythm — shared across dashboard and audio */
export const uiSpacing = {
  page: "space-y-8 md:space-y-10",
  section: "space-y-5 md:space-y-6",
  sectionHeader: "mb-5",
  gridGap: "gap-5",
  cardPad: "p-5 sm:p-6",
  cardPadLg: "p-6 sm:p-7",
} as const;

/** Canonical typography — single source for headers and body copy */
export const uiType = {
  eyebrow:
    "text-[11px] font-semibold uppercase tracking-[0.12em] text-red-400/90",
  display:
    "text-[1.375rem] font-semibold leading-[1.15] tracking-[-0.035em] text-slate-50 sm:text-[1.625rem] md:text-[1.75rem]",
  displayLg:
    "text-xl font-semibold leading-tight tracking-[-0.03em] text-slate-50 sm:text-2xl",
  heading:
    "text-[15px] font-semibold leading-snug tracking-[-0.02em] text-slate-50 sm:text-base",
  body: "text-[14px] leading-[1.6] text-slate-400 sm:text-[15px]",
  caption: "text-[13px] leading-snug text-slate-500",
  label:
    "text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-500",
  mission:
    "text-[15px] leading-relaxed text-slate-400 sm:text-base sm:leading-relaxed",
} as const;

/** Button variants — consistent CTAs app-wide */
export const uiButtons = {
  primary: `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${departmentAccents.audio.gradient} px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(239,68,68,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] ${transition} hover:shadow-[0_6px_20px_rgba(239,68,68,0.38)] active:scale-[0.98]`,
  primarySm: `inline-flex min-h-[40px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${departmentAccents.audio.gradient} px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(239,68,68,0.28),inset_0_1px_0_rgba(255,255,255,0.1)] ${transition} hover:shadow-[0_6px_20px_rgba(239,68,68,0.36)] active:scale-[0.98]`,
  secondary: `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${transition} hover:border-white/[0.14] hover:bg-white/[0.06] active:scale-[0.98]`,
  ghost: `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-400 ${transition} hover:bg-white/[0.05] hover:text-white active:scale-[0.98]`,
} as const;

/** Page icon badge — matches AudioPageShell */
export const uiPageIcon = `flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${departmentAccents.audio.gradient} text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_16px_rgba(239,68,68,0.2)] md:h-14 md:w-14 [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-7 md:[&>svg]:w-7`;

export const uiCardHover = `${transition} hover:border-white/[0.12] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.4)] active:scale-[0.995]`;
