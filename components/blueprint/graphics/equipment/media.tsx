import { GraphicSvg, EquipmentShadow, s, sw, swb } from "@/components/blueprint/graphics/equipment/shared";

/** Mac desktop — monitor, stand, tower on desk */
export function ComputerGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 72 56" className={className}>
      <EquipmentShadow cx={36} cy={52} rx={28} ry={4} />
      <rect x="8" y="6" width="48" height="28" rx="2" stroke={s} strokeWidth={swb} />
      <rect x="14" y="12" width="36" height="16" rx="1" stroke={s} strokeWidth={sw} opacity={0.45} />
      <line x1="32" y1="34" x2="32" y2="40" stroke={s} strokeWidth={sw} />
      <line x1="22" y1="40" x2="42" y2="40" stroke={s} strokeWidth={swb} />
      <rect x="46" y="38" width="14" height="12" rx="1" stroke={s} strokeWidth={sw} />
    </GraphicSvg>
  );
}

/** Projector — overhead mount on front truss */
export function ProjectorGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 80 40" className={className}>
      <line x1="40" y1="2" x2="40" y2="8" stroke={s} strokeWidth={0.9} opacity={0.45} />
      <line x1="34" y1="2" x2="46" y2="2" stroke={s} strokeWidth={0.9} opacity={0.45} />
      <EquipmentShadow cx={32} cy={34} rx={22} ry={3} />
      <rect x="6" y="12" width="44" height="18" rx="2" stroke={s} strokeWidth={swb} />
      <circle cx="20" cy="21" r="5" stroke={s} strokeWidth={sw} />
      <path d="M50 21 L74 14 L74 28 Z" stroke={s} strokeWidth={swb} />
      <path
        d="M58 21 L74 21"
        stroke={s}
        strokeWidth={0.7}
        opacity={0.35}
        strokeDasharray="2 2"
      />
    </GraphicSvg>
  );
}

/** Wide projection screen */
export function ScreenGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 120 28" className={className}>
      <EquipmentShadow cx={60} cy={24} rx={50} ry={3} />
      <rect x="4" y="2" width="112" height="18" rx="1" stroke={s} strokeWidth={swb} />
      <line x1="4" y1="22" x2="116" y2="22" stroke={s} strokeWidth={sw} />
      <line x1="60" y1="22" x2="60" y2="26" stroke={s} strokeWidth={0.9} />
    </GraphicSvg>
  );
}

/** Confidence monitor on rolling floor stand */
export function DisplayMonitorGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 56 60" className={className}>
      <EquipmentShadow cx={28} cy={56} rx={18} ry={3} />
      <rect x="10" y="6" width="36" height="24" rx="2" stroke={s} strokeWidth={swb} />
      <rect x="14" y="10" width="28" height="16" rx="1" stroke={s} strokeWidth={sw} opacity={0.4} />
      <line x1="28" y1="30" x2="28" y2="42" stroke={s} strokeWidth={swb} />
      <line x1="18" y1="42" x2="38" y2="42" stroke={s} strokeWidth={swb} />
      <circle cx="20" cy="48" r="2.2" stroke={s} strokeWidth={0.9} />
      <circle cx="36" cy="48" r="2.2" stroke={s} strokeWidth={0.9} />
      <line x1="20" y1="48" x2="36" y2="48" stroke={s} strokeWidth={0.7} />
    </GraphicSvg>
  );
}

/** Back curtain — upstage backdrop */
export function CurtainGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 120 20" className={className}>
      <path
        d="M2 2 Q30 14 60 2 T118 2 L118 18 L2 18 Z"
        stroke={s}
        strokeWidth={sw}
        fill="rgba(148,163,184,0.05)"
      />
    </GraphicSvg>
  );
}
