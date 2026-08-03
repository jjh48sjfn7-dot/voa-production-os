/** Shared UI tokens — native app panel feel (not marketing-site cards) */

export const appUi = {
  /** Inset highlight + drop shadow for embedded panels */
  panel:
    "rounded-2xl border border-white/[0.07] bg-[#121f33]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.32)] backdrop-blur-xl",

  panelHover:
    "transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:border-white/[0.11] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_32px_rgba(0,0,0,0.38)] active:scale-[0.995]",

  /** Sticky chrome — top bar, page headers */
  stickyChrome:
    "sticky z-30 border-b border-white/[0.06] bg-[#0c1524]/88 backdrop-blur-2xl backdrop-saturate-150 transition-[box-shadow,border-color] duration-200",

  stickyChromeScrolled:
    "shadow-[0_4px_24px_rgba(0,0,0,0.45)] border-white/[0.08]",

  /** Search field — consistent across global + local */
  searchInput:
    "min-h-[44px] w-full rounded-xl border border-white/[0.07] bg-white/[0.035] py-2.5 pl-10 text-[15px] text-slate-100 placeholder:text-slate-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] transition-[border-color,box-shadow,background-color] duration-150 ease-out focus:border-red-500/35 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_0_0_3px_rgba(239,68,68,0.08)] sm:text-sm",

  searchDropdown:
    "absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-[min(70vh,420px)] overflow-y-auto rounded-xl border border-white/[0.08] bg-[#0c1524]/98 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-2xl animate-dropdown-in",

  searchResult:
    "flex w-full min-h-[44px] flex-col items-start rounded-lg px-3 py-2.5 text-left transition-[background-color,transform] duration-100 ease-out active:scale-[0.99]",

  searchResultActive: "bg-red-500/15 text-white",
  searchResultIdle: "hover:bg-white/[0.06]",

  /** Icon containers — fixed size for alignment */
  iconSm: "flex h-9 w-9 shrink-0 items-center justify-center [&>svg]:h-[18px] [&>svg]:w-[18px]",
  iconMd: "flex h-10 w-10 shrink-0 items-center justify-center [&>svg]:h-5 [&>svg]:w-5",
  iconLg: "flex h-11 w-11 shrink-0 items-center justify-center [&>svg]:h-[22px] [&>svg]:w-[22px]",

  /** Skeleton blocks */
  skeleton: "animate-shimmer rounded-lg bg-white/[0.04]",
  skeletonLine: "h-3.5 animate-shimmer rounded-md bg-white/[0.04]",
} as const;
