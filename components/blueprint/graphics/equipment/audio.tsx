import { GraphicSvg, s, sw, swb } from "@/components/blueprint/graphics/equipment/shared";

/** Yamaha TF5 — mixing console with faders and screen */
export function ConsoleGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 96 56" className={className}>
      <rect x="4" y="8" width="88" height="44" rx="3" stroke={s} strokeWidth={swb} />
      <rect x="10" y="12" width="76" height="10" rx="1" stroke={s} strokeWidth={sw} opacity={0.7} />
      {[18, 26, 34, 42, 50, 58, 66, 74].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="26" width="4" height="20" rx="0.5" stroke={s} strokeWidth={1} />
          <line x1={x} y1="22" x2={x} y2="26" stroke={s} strokeWidth={1} />
        </g>
      ))}
    </GraphicSvg>
  );
}

/** Top-down keyboard with visible keys */
export function KeyboardGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 96 40" className={className}>
      <rect x="4" y="10" width="88" height="22" rx="2" stroke={s} strokeWidth={swb} />
      {Array.from({ length: 14 }, (_, i) => (
        <rect
          key={i}
          x={8 + i * 6}
          y="14"
          width="4.5"
          height="14"
          stroke={s}
          strokeWidth={0.8}
        />
      ))}
      {[10, 16, 22, 28, 34, 40, 46, 52, 58, 64].map((x) => (
        <rect key={`b${x}`} x={x} y="14" width="3" height="8" fill="rgba(148,163,184,0.25)" stroke={s} strokeWidth={0.6} />
      ))}
    </GraphicSvg>
  );
}

/** Drum kit — kick, snare, toms, cymbals */
export function DrumKitGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <ellipse cx="40" cy="48" rx="14" ry="10" stroke={s} strokeWidth={swb} />
      <circle cx="40" cy="48" r="4" stroke={s} strokeWidth={sw} />
      <circle cx="24" cy="36" r="7" stroke={s} strokeWidth={sw} />
      <circle cx="56" cy="34" r="6" stroke={s} strokeWidth={sw} />
      <circle cx="48" cy="44" r="5" stroke={s} strokeWidth={sw} />
      <circle cx="32" cy="44" r="5" stroke={s} strokeWidth={sw} />
      <ellipse cx="20" cy="22" rx="8" ry="3" stroke={s} strokeWidth={sw} />
      <ellipse cx="58" cy="20" rx="9" ry="3" stroke={s} strokeWidth={sw} />
      <line x1="20" y1="22" x2="20" y2="30" stroke={s} strokeWidth={1} />
      <line x1="58" y1="20" x2="58" y2="28" stroke={s} strokeWidth={1} />
    </GraphicSvg>
  );
}

/** Stage snake box with sockets and cable tail */
export function SnakeBoxGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="18" y="22" width="36" height="32" rx="2" stroke={s} strokeWidth={swb} />
      {[30, 38, 46, 54].map((y) => (
        <circle key={y} cx="26" cy={y} r="2.5" stroke={s} strokeWidth={1} />
      ))}
      <path d="M54 30 C62 26, 68 22, 72 18" stroke={s} strokeWidth={1.2} />
      <path d="M54 38 C64 38, 70 36, 74 34" stroke={s} strokeWidth={1.2} />
      <path d="M54 46 C62 50, 68 52, 72 54" stroke={s} strokeWidth={1.2} />
    </GraphicSvg>
  );
}

/** QSC K12.2 FOH — upright cabinet top-down */
export function FohSpeakerGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 48 64" className={className}>
      <rect x="10" y="6" width="28" height="52" rx="2" stroke={s} strokeWidth={swb} />
      <circle cx="24" cy="22" r="7" stroke={s} strokeWidth={sw} />
      <circle cx="24" cy="22" r="2" stroke={s} strokeWidth={0.8} />
      <circle cx="24" cy="40" r="5" stroke={s} strokeWidth={sw} />
      <line x1="10" y1="6" x2="38" y2="6" stroke={s} strokeWidth={1} opacity={0.5} />
    </GraphicSvg>
  );
}

/** QSC K10.2 wedge monitor — distinct trapezoid shape */
export function MonitorWedgeGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <path d="M14 56 L40 18 L66 56 Z" stroke={s} strokeWidth={swb} />
      <path d="M22 52 L40 28 L58 52 Z" stroke={s} strokeWidth={sw} opacity={0.6} />
      <circle cx="40" cy="42" r="4" stroke={s} strokeWidth={sw} />
      <line x1="40" y1="18" x2="40" y2="12" stroke={s} strokeWidth={1} strokeDasharray="2 2" />
    </GraphicSvg>
  );
}

/** Subwoofer — large cabinet, dashed for placeholder */
export function SubwooferGraphic({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: boolean;
}) {
  return (
    <GraphicSvg viewBox="0 0 56 48" className={className}>
      <rect
        x="8"
        y="10"
        width="40"
        height="32"
        rx="3"
        stroke={s}
        strokeWidth={swb}
        strokeDasharray={placeholder ? "4 3" : undefined}
      />
      <circle cx="28" cy="26" r="12" stroke={s} strokeWidth={sw} />
      <circle cx="28" cy="26" r="4" stroke={s} strokeWidth={0.8} />
    </GraphicSvg>
  );
}

/** Shure BLX288 dual rack receiver with antennas */
export function WirelessRackGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 64 56" className={className}>
      <rect x="8" y="14" width="48" height="18" rx="1.5" stroke={s} strokeWidth={swb} />
      <rect x="8" y="34" width="48" height="18" rx="1.5" stroke={s} strokeWidth={swb} />
      <line x1="8" y1="23" x2="56" y2="23" stroke={s} strokeWidth={0.8} opacity={0.5} />
      <line x1="8" y1="43" x2="56" y2="43" stroke={s} strokeWidth={0.8} opacity={0.5} />
      <line x1="18" y1="8" x2="18" y2="14" stroke={s} strokeWidth={1.2} />
      <line x1="46" y1="8" x2="46" y2="14" stroke={s} strokeWidth={1.2} />
      <circle cx="18" cy="7" r="2" stroke={s} strokeWidth={1} />
      <circle cx="46" cy="7" r="2" stroke={s} strokeWidth={1} />
      <circle cx="20" cy="20" r="1.5" fill={s} />
      <circle cx="20" cy="40" r="1.5" fill={s} />
    </GraphicSvg>
  );
}

/** Behringer PM1 beltpack — for future map use */
export function BeltpackGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 40 48" className={className}>
      <rect x="8" y="12" width="24" height="28" rx="3" stroke={s} strokeWidth={swb} />
      <circle cx="20" cy="24" r="6" stroke={s} strokeWidth={sw} />
      <line x1="20" y1="18" x2="20" y2="14" stroke={s} strokeWidth={1} />
      <circle cx="20" cy="12" r="2" stroke={s} strokeWidth={0.8} />
      <circle cx="32" cy="36" r="2" stroke={s} strokeWidth={1} />
      <line x1="32" y1="36" x2="38" y2="40" stroke={s} strokeWidth={1} />
    </GraphicSvg>
  );
}
