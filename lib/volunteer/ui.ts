import { theme } from "@/lib/theme";

export const volunteerUi = {
  page: `min-h-screen ${theme.background} ${theme.text.primary}`,
  card: `rounded-2xl border ${theme.cardBorder} bg-[#1C1C1C] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`,
  cardPad: "p-4 sm:p-5",
  eyebrow:
    "text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40",
  title: "text-[17px] font-semibold tracking-tight text-white",
  body: "text-[14px] leading-relaxed text-white/60",
  muted: "text-[13px] leading-snug text-white/45",
  orange: "text-[#FF5A00]",
  cta: "inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#FF5A00] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#E65100]",
  ghost:
    "inline-flex min-h-[40px] items-center justify-center rounded-xl px-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white",
} as const;
