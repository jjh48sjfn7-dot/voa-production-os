export type DepartmentAccent = "audio" | "lighting" | "media" | "operations" | "default";

export const theme = {
  background: "bg-[#080f1a]",
  backgroundAlt: "bg-[#0c1524]",
  surface: "bg-[#101c2e]",
  card: "bg-[#121f33]/95",
  cardBorder: "border-white/[0.07]",
  cardHover: "hover:border-white/[0.11]",
  text: {
    primary: "text-slate-50",
    secondary: "text-slate-400",
    muted: "text-slate-500",
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
  },
  lighting: {
    gradient: "from-purple-500 to-purple-600",
    text: "text-purple-400",
    bg: "bg-purple-500/10",
    bar: "bg-purple-500",
    ring: "focus:ring-purple-500/20 focus:border-purple-500/35",
    iconBg: "bg-purple-500/15 text-purple-400",
    glow: "group-hover:shadow-[0_8px_32px_rgba(168,85,247,0.12)]",
  },
  media: {
    gradient: "from-green-500 to-green-600",
    text: "text-green-400",
    bg: "bg-green-500/10",
    bar: "bg-green-500",
    ring: "focus:ring-green-500/20 focus:border-green-500/35",
    iconBg: "bg-green-500/15 text-green-400",
    glow: "group-hover:shadow-[0_8px_32px_rgba(34,197,94,0.12)]",
  },
  operations: {
    gradient: "from-slate-500 to-slate-600",
    text: "text-slate-400",
    bg: "bg-slate-500/10",
    bar: "bg-slate-500",
    ring: "focus:ring-slate-500/20 focus:border-slate-500/35",
    iconBg: "bg-slate-500/15 text-slate-400",
    glow: "group-hover:shadow-[0_8px_32px_rgba(100,116,139,0.12)]",
  },
  default: {
    gradient: "from-blue-500 to-blue-600",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    bar: "bg-blue-500",
    ring: "focus:ring-blue-500/20 focus:border-blue-500/35",
    iconBg: "bg-blue-500/15 text-blue-400",
    glow: "group-hover:shadow-[0_8px_32px_rgba(59,130,246,0.12)]",
  },
};

export function getDepartmentAccent(id: string): DepartmentAccent {
  if (id === "audio") return "audio";
  if (id === "lighting") return "lighting";
  if (id === "media") return "media";
  if (id === "operations") return "operations";
  return "default";
}

export const cardBase =
  "rounded-2xl border backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.28)] transition-[transform,box-shadow,border-color] duration-200 ease-out";

export const cardInteractive =
  "cursor-pointer hover:border-white/[0.11] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_28px_rgba(0,0,0,0.36)] active:scale-[0.995]";

export const badgeSoon =
  "ml-auto rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-slate-500";
