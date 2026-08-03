import { uiSpacing, uiType, uiCardHover } from "@/lib/ui-tokens";
import { cardBase, theme } from "@/lib/theme";

/** Shared tokens for the home dashboard */
export const dashboardStyles = {
  page: uiSpacing.page,
  sectionGap: "mt-6 sm:mt-7",
  section: uiSpacing.section,

  card: `${cardBase} ${theme.card} ${theme.cardBorder}`,
  cardPad: uiSpacing.cardPad,
  cardPadLg: uiSpacing.cardPadLg,
  cardInner:
    "rounded-xl border border-white/[0.06] bg-white/[0.025] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",

  cardHover: uiCardHover,

  label: uiType.label,
  eyebrow: uiType.eyebrow,
  title: uiType.heading,
  display: uiType.display,
  displayLg: uiType.displayLg,
  subtitle: uiType.mission,
  body: uiType.body,
  caption: uiType.caption,
  mission: uiType.mission,

  iconBox:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/[0.06] [&>svg]:h-[18px] [&>svg]:w-[18px]",
  iconBoxLg:
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/[0.06] sm:h-12 sm:w-12 [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-[22px] sm:[&>svg]:w-[22px]",

  iconSm: "h-[18px] w-[18px]",
  iconMd: "h-5 w-5",
  iconLg: "h-[22px] w-[22px]",

  enter: "animate-fade-in opacity-0 [animation-fill-mode:forwards]",
  slideUp: "animate-slide-up opacity-0 [animation-fill-mode:forwards]",
} as const;

export function dashboardPrimaryGradient(className = "") {
  return `bg-gradient-to-br from-red-500/[0.1] via-[#121f33]/96 to-[#0c1524]/96 ${className}`;
}
