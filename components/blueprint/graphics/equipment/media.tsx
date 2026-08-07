import { GraphicSvg, s, sw, swb } from "@/components/blueprint/graphics/equipment/shared";

/** Mac desktop station — monitor and base */
export function ComputerGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 64 56" className={className}>
      <rect x="10" y="8" width="44" height="28" rx="2" stroke={s} strokeWidth={swb} />
      <rect x="18" y="14" width="28" height="16" rx="1" stroke={s} strokeWidth={sw} opacity={0.5} />
      <rect x="26" y="38" width="12" height="4" stroke={s} strokeWidth={sw} />
      <line x1="20" y1="44" x2="44" y2="44" stroke={s} strokeWidth={swb} />
      <rect x="38" y="46" width="10" height="6" rx="1" stroke={s} strokeWidth={sw} />
    </GraphicSvg>
  );
}

/** Projector with lens */
export function ProjectorGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 72 40" className={className}>
      <rect x="8" y="12" width="40" height="20" rx="2" stroke={s} strokeWidth={swb} />
      <circle cx="22" cy="22" r="5" stroke={s} strokeWidth={sw} />
      <path d="M48 22 L68 16 L68 28 Z" stroke={s} strokeWidth={swb} />
      <line x1="56" y1="22" x2="68" y2="22" stroke={s} strokeWidth={0.8} opacity={0.4} />
    </GraphicSvg>
  );
}

/** Wide projection screen */
export function ScreenGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 96 32" className={className}>
      <rect x="4" y="4" width="88" height="20" rx="1" stroke={s} strokeWidth={swb} />
      <line x1="4" y1="26" x2="92" y2="26" stroke={s} strokeWidth={sw} />
      <line x1="48" y1="26" x2="48" y2="30" stroke={s} strokeWidth={1} />
    </GraphicSvg>
  );
}

/** Confidence monitor on stand */
export function DisplayMonitorGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 56 56" className={className}>
      <rect x="10" y="10" width="36" height="24" rx="2" stroke={s} strokeWidth={swb} />
      <line x1="28" y1="34" x2="28" y2="44" stroke={s} strokeWidth={swb} />
      <line x1="18" y1="44" x2="38" y2="44" stroke={s} strokeWidth={swb} />
    </GraphicSvg>
  );
}

/** Back curtain reference */
export function CurtainGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 96 24" className={className}>
      <path
        d="M4 4 Q24 16 48 4 T92 4 L92 20 L4 20 Z"
        stroke={s}
        strokeWidth={sw}
        fill="rgba(148,163,184,0.06)"
      />
    </GraphicSvg>
  );
}
