import { GraphicSvg, EquipmentShadow, s, sw, swb, fill, fillStrong } from "@/components/blueprint/graphics/equipment/shared";

/** Mac desktop — iMac-style FOH computer */
export function ComputerGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 72 56" className={className}>
      <EquipmentShadow cx={36} cy={52} rx={28} ry={4} />
      <rect x="8" y="6" width="48" height="28" rx="2.5" fill={fillStrong} stroke={s} strokeWidth={swb} />
      <rect x="14" y="12" width="36" height="16" rx="1.5" fill="rgba(30,40,55,0.45)" stroke={s} strokeWidth={sw * 0.8} />
      <line x1="32" y1="34" x2="32" y2="40" stroke={s} strokeWidth={sw} />
      <line x1="20" y1="40" x2="44" y2="40" stroke={s} strokeWidth={swb} />
      <path d="M26 40 Q32 46 38 40" fill="none" stroke={s} strokeWidth={sw * 0.8} />
      <rect x="46" y="38" width="14" height="12" rx="1.5" fill={fill} stroke={s} strokeWidth={sw} />
    </GraphicSvg>
  );
}

/** Projector — overhead on truss */
export function ProjectorGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 80 40" className={className}>
      <line x1="40" y1="1" x2="40" y2="7" stroke={s} strokeWidth={1} opacity={0.5} />
      <line x1="33" y1="1" x2="47" y2="1" stroke={s} strokeWidth={1} opacity={0.5} />
      <EquipmentShadow cx={32} cy={34} rx={22} ry={3} />
      <rect x="6" y="12" width="44" height="18" rx="2.5" fill={fillStrong} stroke={s} strokeWidth={swb} />
      <circle cx="20" cy="21" r="5.5" fill={fill} stroke={s} strokeWidth={sw} />
      <path d="M50 21 L74 13 L74 29 Z" fill={fill} stroke={s} strokeWidth={swb} />
    </GraphicSvg>
  );
}

/** Portable projection screen */
export function ScreenGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 120 28" className={className}>
      <EquipmentShadow cx={60} cy={24} rx={50} ry={3} />
      <rect x="4" y="2" width="112" height="18" rx="1.5" fill={fill} stroke={s} strokeWidth={swb} />
      <line x1="4" y1="22" x2="116" y2="22" stroke={s} strokeWidth={sw} />
      <line x1="60" y1="22" x2="60" y2="26" stroke={s} strokeWidth={0.9} />
    </GraphicSvg>
  );
}

/** Confidence monitor on rolling stand */
export function DisplayMonitorGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 56 64" className={className}>
      <EquipmentShadow cx={28} cy={60} rx={18} ry={3} />
      <rect x="10" y="4" width="36" height="26" rx="2.5" fill={fillStrong} stroke={s} strokeWidth={swb} />
      <rect x="14" y="8" width="28" height="18" rx="1.5" fill="rgba(30,40,55,0.4)" stroke={s} strokeWidth={sw * 0.75} />
      <line x1="28" y1="30" x2="28" y2="44" stroke={s} strokeWidth={swb} />
      <line x1="16" y1="44" x2="40" y2="44" stroke={s} strokeWidth={swb} />
      <circle cx="18" cy="52" r="2.5" fill={fill} stroke={s} strokeWidth={0.9} />
      <circle cx="38" cy="52" r="2.5" fill={fill} stroke={s} strokeWidth={0.9} />
      <line x1="18" y1="52" x2="38" y2="52" stroke={s} strokeWidth={0.75} />
    </GraphicSvg>
  );
}

/** Back curtain */
export function CurtainGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 120 20" className={className}>
      <path
        d="M2 2 Q30 14 60 2 T118 2 L118 18 L2 18 Z"
        stroke={s}
        strokeWidth={sw}
        fill="rgba(148,163,184,0.06)"
      />
    </GraphicSvg>
  );
}
