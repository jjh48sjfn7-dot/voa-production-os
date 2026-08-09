export type DepartmentAccent =
  | "audio"
  | "lighting"
  | "media"
  | "operations"
  | "default";

/** VOA Antioch brand + shell surface tokens — Phase 1 global app shell */
export const brand = {
  orange: "#FF5A00",
  orangeHover: "#E65100",
  orangeMuted: "rgba(255, 90, 0, 0.12)",
  orangeRing: "rgba(255, 90, 0, 0.28)",
  white: "#FFFFFF",
  nearBlack: "#0D0D0D",
} as const;

export const shellTokens = {
  radius: {
    md: "rounded-xl",
    lg: "rounded-2xl",
  },
  shadow: {
    sidebar: "shadow-[4px_0_24px_rgba(0,0,0,0.45)]",
    chrome: "shadow-[0_4px_24px_rgba(0,0,0,0.5)]",
    inset: "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
  },
  nav: {
    row: "min-h-[44px] rounded-xl transition-[background-color,color,box-shadow,border-color] duration-200 ease-out",
    rowHover: "hover:bg-white/[0.04] hover:text-white",
    rowFocus:
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A00]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]",
    chevron:
      "text-white/35 transition-[background-color,color,transform] duration-200 hover:bg-white/[0.06] hover:text-white/70 active:scale-95",
    submenuRail: "border-white/[0.06]",
  },
  sidebar: {
    sectionLabel:
      "px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35",
    navActive:
      "relative border border-white/[0.08] bg-[#1A1A1A]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
    navActiveOrangeRail:
      "before:absolute before:inset-y-2.5 before:left-0 before:w-0.5 before:rounded-full before:bg-[#FF5A00]",
    navActiveIcon: "text-[#FF5A00]",
    submenuLink:
      "min-h-[40px] rounded-lg px-3 py-1.5 text-[12px] leading-snug transition-[background-color,color,border-color] duration-200 ease-out",
    submenuIdle: "text-white/45 hover:bg-white/[0.04] hover:text-white/70",
    emergencyRow:
      "flex min-h-[44px] w-full items-center gap-2.5 rounded-lg border border-red-500/20 bg-[#1A1A1A]/90 px-3 py-2 text-sm font-medium text-red-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-[background-color,border-color] duration-200 hover:border-red-500/30 hover:bg-[#1A1A1A]",
    emergencyRail:
      "before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-red-500",
  },
  button: {
    primary: `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#FF5A00] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(255,90,0,0.28),inset_0_1px_0_rgba(255,255,255,0.14)] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:bg-[#E65100] hover:shadow-[0_6px_20px_rgba(255,90,0,0.34)] active:scale-[0.98]`,
    secondary: `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:border-white/[0.14] hover:bg-white/[0.06] active:scale-[0.98]`,
  },
  pageHeader: {
    /** Sticky subpage strip — near-black shell surface (#141414 range) */
    strip:
      "sticky top-16 z-20 -mx-4 border-b bg-[#141414]/95 px-4 py-2.5 backdrop-blur-xl md:-mx-0 md:px-0",
    accentBorder: {
      audio: "border-red-500/25",
      lighting: "border-purple-500/25",
      media: "border-green-500/25",
      operations: "border-white/[0.07]",
      default: "border-white/[0.07]",
    },
  },
} as const;

export const theme = {
  background: "bg-[#0D0D0D]",
  backgroundAlt: "bg-[#141414]",
  surface: "bg-[#1A1A1A]",
  card: "bg-[#1A1A1A]/95",
  cardBorder: "border-white/[0.08]",
  cardHover: "hover:border-white/[0.12]",
  text: {
    primary: "text-white",
    secondary: "text-white/65",
    muted: "text-white/45",
  },
} as const;

export const departmentAccents: Record<
  DepartmentAccent,
  {
    gradient: string;
    text: string;
    bg: string;
    bar: string;
    ring: string;
    iconBg: string;
    glow: string;
    childRail: string;
    headerRail: string;
  }
> = {
  audio: {
    gradient: "from-red-500 to-red-600",
    text: "text-red-400",
    bg: "bg-red-500/10",
    bar: "bg-red-500",
    ring: "focus:ring-red-500/20 focus:border-red-500/35",
    iconBg: "bg-red-500/15 text-red-400",
    glow: "group-hover:shadow-[0_8px_32px_rgba(239,68,68,0.12)]",
    childRail:
      "before:absolute before:-left-3 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-red-500",
    headerRail:
      "before:absolute before:inset-y-2.5 before:left-0 before:w-0.5 before:rounded-full before:bg-red-500",
  },
  lighting: {
    gradient: "from-purple-500 to-purple-600",
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    bar: "bg-purple-500",
    ring: "focus:ring-purple-500/20 focus:border-purple-500/35",
    iconBg: "bg-purple-500/15 text-purple-400",
    glow: "group-hover:shadow-[0_8px_32px_rgba(168,85,247,0.12)]",
    childRail:
      "before:absolute before:-left-3 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-purple-500",
    headerRail:
      "before:absolute before:inset-y-2.5 before:left-0 before:w-0.5 before:rounded-full before:bg-purple-500",
  },
  media: {
    gradient: "from-green-500 to-green-600",
    text: "text-green-400",
    bg: "bg-green-500/10",
    bar: "bg-green-500",
    ring: "focus:ring-green-500/20 focus:border-green-500/35",
    iconBg: "bg-green-500/15 text-green-400",
    glow: "group-hover:shadow-[0_8px_32px_rgba(34,197,94,0.12)]",
    childRail:
      "before:absolute before:-left-3 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-green-500",
    headerRail:
      "before:absolute before:inset-y-2.5 before:left-0 before:w-0.5 before:rounded-full before:bg-green-500",
  },
  operations: {
    gradient: "from-slate-500 to-slate-600",
    text: "text-slate-400",
    bg: "bg-slate-500/10",
    bar: "bg-slate-500",
    ring: "focus:ring-slate-500/20 focus:border-slate-500/35",
    iconBg: "bg-slate-500/15 text-slate-400",
    glow: "group-hover:shadow-[0_8px_32px_rgba(100,116,139,0.12)]",
    childRail:
      "before:absolute before:-left-3 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-slate-500",
    headerRail:
      "before:absolute before:inset-y-2.5 before:left-0 before:w-0.5 before:rounded-full before:bg-slate-500",
  },
  default: {
    gradient: "from-[#FF5A00] to-[#E65100]",
    text: "text-[#FF5A00]",
    bg: "bg-[#FF5A00]/10",
    bar: "bg-[#FF5A00]",
    ring: "focus:ring-[#FF5A00]/20 focus:border-[#FF5A00]/35",
    iconBg: "bg-[#FF5A00]/15 text-[#FF5A00]",
    glow: "group-hover:shadow-[0_8px_32px_rgba(255,90,0,0.12)]",
    childRail:
      "before:absolute before:-left-3 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-[#FF5A00]",
    headerRail:
      "before:absolute before:inset-y-2.5 before:left-0 before:w-0.5 before:rounded-full before:bg-[#FF5A00]",
  },
};

export function getDepartmentAccent(id: string): DepartmentAccent {
  if (id === "audio") return "audio";
  if (id === "lighting") return "lighting";
  if (id === "media") return "media";
  if (id === "operations") return "operations";
  return "default";
}

export const cardBase = `${shellTokens.radius.lg} border backdrop-blur-xl ${shellTokens.shadow.inset} shadow-[0_4px_20px_rgba(0,0,0,0.32)] transition-[transform,box-shadow,border-color] duration-200 ease-out`;

export const cardInteractive =
  "cursor-pointer hover:border-white/[0.12] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_28px_rgba(0,0,0,0.4)] active:scale-[0.995]";

export const badgeSoon =
  "ml-auto rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-white/45";
