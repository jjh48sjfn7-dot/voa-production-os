import { audioStyles } from "@/lib/audio-styles";

type StatusBadgeVariant = "default" | "available" | "active";

interface StatusBadgeProps {
  label: string;
  variant?: StatusBadgeVariant;
}

const variantStyles: Record<StatusBadgeVariant, string> = {
  default: "text-slate-300 bg-slate-500/12 ring-slate-500/20",
  available: "text-emerald-400 bg-emerald-500/12 ring-emerald-500/20",
  active: "text-red-400 bg-red-500/12 ring-red-500/20",
};

export function StatusBadge({ label, variant = "default" }: StatusBadgeProps) {
  return (
    <span
      className={`${audioStyles.badge} ring-1 ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
