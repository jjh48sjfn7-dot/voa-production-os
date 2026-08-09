/** Audio Department UI tokens — consistent spacing, hierarchy, motion */

import { uiButtons, uiCardHover, uiSpacing, uiType } from "@/lib/ui-tokens";

const shadowPanel =
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.34)]";
const shadowPanelHover =
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_32px_rgba(0,0,0,0.4)]";
const transitionBase =
  "transition-[transform,box-shadow,border-color,background-color,color] duration-200 ease-out";

export const audioStyles = {
  /* Spacing rhythm */
  page: uiSpacing.page,
  section: uiSpacing.section,
  sectionTitle: "mb-5 flex items-center gap-2.5",
  cardPad: uiSpacing.cardPad,
  cardPadLg: uiSpacing.cardPadLg,
  gridGap: uiSpacing.gridGap,
  stackSm: "space-y-3",
  stackMd: "space-y-4",

  /* Surfaces */
  glass: `rounded-2xl border border-white/[0.08] bg-[#121f33]/92 ${shadowPanel} backdrop-blur-xl`,
  card: `rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] ${shadowPanel} backdrop-blur-xl`,
  cardHover: `${uiCardHover} ${shadowPanelHover}`,
  cardGlow:
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_32px_rgba(239,68,68,0.1)]",
  cardInteractive: "cursor-default",
  inset: "rounded-xl bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-white/[0.05]",

  /* Typography */
  display: uiType.display,
  displayLg: uiType.displayLg,
  heading: uiType.heading,
  subheading: "text-sm font-medium text-slate-400",
  body: uiType.body,
  caption: uiType.caption,
  label: uiType.label,
  stat: "text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl",
  statLg:
    "text-4xl font-bold tabular-nums tracking-[-0.03em] text-white sm:text-5xl",

  badge:
    "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.09em]",

  /* Buttons */
  btnPrimary: uiButtons.primary,
  btnPrimarySm: uiButtons.primarySm,
  btnSecondary: uiButtons.secondary,
  btnGhost: uiButtons.ghost,

  /* Sticky chrome */
  stickyHeader:
    "sticky top-16 z-20 -mx-4 border-b bg-[#141414]/92 px-4 py-4 shadow-[0_2px_16px_rgba(0,0,0,0.28)] backdrop-blur-2xl backdrop-saturate-150 duration-200 data-[scrolled=true]:shadow-[0_6px_28px_rgba(0,0,0,0.42)] md:-mx-0 md:rounded-2xl md:border md:px-6",

  stickyToolbar:
    "sticky top-[4.75rem] z-10 -mx-4 border-b border-white/[0.06] bg-[#141414]/88 px-4 py-3 backdrop-blur-xl duration-200 data-[scrolled=true]:shadow-[0_4px_20px_rgba(0,0,0,0.32)] md:top-[5.5rem] md:-mx-0 md:rounded-xl md:border md:px-4",

  /* Patch sheet / metrics */
  metric: `rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 ${shadowPanel} backdrop-blur-xl ${transitionBase} hover:border-white/[0.11] hover:bg-white/[0.04]`,
  patchRow:
    "grid gap-3 border-b border-white/[0.04] py-3 last:border-0 sm:grid-cols-2 lg:grid-cols-4",
  patchLabel:
    "text-[10px] font-medium uppercase tracking-[0.09em] text-slate-500",
  patchValue: "mt-1 text-sm font-medium tabular-nums text-slate-200",

  /* Motion */
  transition: transitionBase,
  link: "text-red-400 transition-colors duration-200 ease-out hover:text-red-300",
} as const;

export const motion = {
  enter: "animate-[fade-in_0.35s_ease-out_forwards]",
  card: `motion-safe:${transitionBase}`,
} as const;
