import { theme } from "@/lib/theme";

/** Shared UI tokens — native app panel feel (not marketing-site cards) */

export const appUi = {
  /** Inset highlight + drop shadow for embedded panels */
  panel: `rounded-2xl border ${theme.cardBorder} ${theme.card} shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl`,

  panelHover:
    "transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:border-white/[0.12] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_32px_rgba(0,0,0,0.42)] active:scale-[0.995]",

  /** Sticky chrome — top bar, page headers */
  stickyChrome: `sticky z-30 border-b ${theme.cardBorder} bg-[#141414]/92 backdrop-blur-2xl backdrop-saturate-150 transition-[box-shadow,border-color] duration-200`,

  stickyChromeScrolled: "shadow-[0_4px_24px_rgba(0,0,0,0.5)] border-white/[0.1]",

  /** Search field — consistent across global + local */
  searchInput:
    "min-h-[44px] w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-2.5 pl-10 text-[15px] text-white placeholder:text-white/45 shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] transition-[border-color,box-shadow,background-color] duration-150 ease-out focus:border-[#FF5A00]/35 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#FF5A00]/20 focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_0_0_3px_rgba(255,90,0,0.08)] sm:text-sm",

  searchDropdown:
    "absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-[min(70vh,420px)] overflow-y-auto rounded-xl border border-white/[0.1] bg-[#141414]/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-2xl animate-dropdown-in",

  searchResult:
    "flex w-full min-h-[44px] flex-col items-start rounded-lg px-3 py-2.5 text-left transition-[background-color,transform] duration-100 ease-out active:scale-[0.99]",

  searchResultActive: "bg-[#FF5A00]/15 text-white",
  searchResultIdle: "hover:bg-white/[0.06]",

  /** Icon containers — fixed size for alignment */
  iconSm: "flex h-9 w-9 shrink-0 items-center justify-center [&>svg]:h-[18px] [&>svg]:w-[18px]",
  iconMd: "flex h-10 w-10 shrink-0 items-center justify-center [&>svg]:h-5 [&>svg]:w-5",
  iconLg: "flex h-11 w-11 shrink-0 items-center justify-center [&>svg]:h-[22px] [&>svg]:w-[22px]",

  /** Skeleton blocks */
  skeleton: "animate-shimmer rounded-lg bg-white/[0.04]",
  skeletonLine: "h-3.5 animate-shimmer rounded-md bg-white/[0.04]",
} as const;
