import { GraphicSvg, EquipmentShadow, s, sw, swb } from "@/components/blueprint/graphics/equipment/shared";

/** Yamaha TF5 — wide mixing console, screen + fader banks */
export function ConsoleGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 120 52" className={className}>
      <EquipmentShadow cx={60} cy={48} rx={42} ry={5} />
      <rect x="4" y="10" width="112" height="36" rx="2" stroke={s} strokeWidth={swb} />
      <rect x="10" y="14" width="100" height="12" rx="1" stroke={s} strokeWidth={sw} opacity={0.75} />
      {Array.from({ length: 16 }, (_, i) => {
        const x = 14 + i * 6.2;
        return (
          <g key={x}>
            <rect x={x} y="30" width="3.5" height="12" rx="0.4" stroke={s} strokeWidth={0.9} />
            <line x1={x + 1.75} y1="27" x2={x + 1.75} y2="30" stroke={s} strokeWidth={0.8} />
          </g>
        );
      })}
    </GraphicSvg>
  );
}

/** Top-down keyboard — long horizontal keys */
export function KeyboardGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 120 36" className={className}>
      <EquipmentShadow cx={60} cy={32} rx={48} ry={4} />
      <rect x="4" y="8" width="112" height="20" rx="2" stroke={s} strokeWidth={swb} />
      {Array.from({ length: 18 }, (_, i) => (
        <rect
          key={i}
          x={8 + i * 6}
          y="12"
          width="4.5"
          height="12"
          stroke={s}
          strokeWidth={0.7}
        />
      ))}
      {[12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78].map((x) => (
        <rect
          key={`b${x}`}
          x={x}
          y="12"
          width="2.8"
          height="7"
          fill="rgba(148,163,184,0.2)"
          stroke={s}
          strokeWidth={0.5}
        />
      ))}
    </GraphicSvg>
  );
}

/** Drum kit — kick, snare, toms, cymbals from above */
export function DrumKitGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 88 72" className={className}>
      <EquipmentShadow cx={44} cy={66} rx={28} ry={5} />
      <ellipse cx="44" cy="52" rx="16" ry="11" stroke={s} strokeWidth={swb} />
      <circle cx="44" cy="52" r="4" stroke={s} strokeWidth={sw} />
      <circle cx="28" cy="40" r="8" stroke={s} strokeWidth={sw} />
      <circle cx="58" cy="38" r="7" stroke={s} strokeWidth={sw} />
      <circle cx="50" cy="48" r="5.5" stroke={s} strokeWidth={sw} />
      <circle cx="36" cy="48" r="5.5" stroke={s} strokeWidth={sw} />
      <ellipse cx="18" cy="24" rx="10" ry="3.5" stroke={s} strokeWidth={sw} />
      <ellipse cx="68" cy="22" rx="11" ry="3.5" stroke={s} strokeWidth={sw} />
      <ellipse cx="44" cy="16" rx="6" ry="2.5" stroke={s} strokeWidth={sw} />
      <line x1="18" y1="24" x2="18" y2="32" stroke={s} strokeWidth={0.9} />
      <line x1="68" y1="22" x2="68" y2="30" stroke={s} strokeWidth={0.9} />
      <line x1="44" y1="16" x2="44" y2="22" stroke={s} strokeWidth={0.9} />
    </GraphicSvg>
  );
}

/** Stage snake — MC-12 box with 3×4 XLR grid and fan-out */
export function SnakeBoxGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 72 64" className={className}>
      <EquipmentShadow cx={36} cy={58} rx={22} ry={4} />
      <rect x="14" y="18" width="36" height="34" rx="2" stroke={s} strokeWidth={swb} />
      {[22, 30, 38, 46].map((y, row) =>
        [22, 30, 38, 46].map((x, col) => (
          <g key={`${row}-${col}`}>
            <circle cx={x} cy={y} r="2.4" stroke={s} strokeWidth={0.9} />
            <circle cx={x} cy={y} r="0.8" fill={s} opacity={0.35} />
          </g>
        ))
      )}
      <path d="M50 26 Q58 22, 66 16" stroke={s} strokeWidth={1.1} />
      <path d="M50 34 Q62 34, 68 32" stroke={s} strokeWidth={1.1} />
      <path d="M50 42 Q58 46, 66 50" stroke={s} strokeWidth={1.1} />
      <path d="M50 50 Q60 54, 68 56" stroke={s} strokeWidth={1} opacity={0.6} />
    </GraphicSvg>
  );
}

/** FOH speaker — tall upright cabinet (distinct from wedge) */
export function FohSpeakerGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 40 72" className={className}>
      <EquipmentShadow cx={20} cy={68} rx={14} ry={4} />
      <rect x="8" y="4" width="24" height="60" rx="2" stroke={s} strokeWidth={swb} />
      <circle cx="20" cy="22" r="7" stroke={s} strokeWidth={sw} />
      <circle cx="20" cy="22" r="2.5" stroke={s} strokeWidth={0.8} />
      <circle cx="20" cy="42" r="5" stroke={s} strokeWidth={sw} />
      <rect x="8" y="4" width="24" height="3" fill="rgba(148,163,184,0.12)" stroke="none" />
    </GraphicSvg>
  );
}

/** Stage monitor wedge — angled toward performers */
export function MonitorWedgeGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 72 56" className={className}>
      <EquipmentShadow cx={36} cy={52} rx={24} ry={4} />
      <path d="M8 50 L36 12 L64 50 Z" stroke={s} strokeWidth={swb} />
      <path d="M16 46 L36 22 L56 46 Z" stroke={s} strokeWidth={sw} opacity={0.55} />
      <circle cx="36" cy="38" r="4.5" stroke={s} strokeWidth={sw} />
      <path d="M36 12 L44 8" stroke={s} strokeWidth={0.9} strokeDasharray="2 2" opacity={0.5} />
    </GraphicSvg>
  );
}

/** Subwoofer — large heavy cabinet */
export function SubwooferGraphic({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: boolean;
}) {
  return (
    <GraphicSvg viewBox="0 0 64 44" className={className}>
      <EquipmentShadow cx={32} cy={40} rx={24} ry={5} />
      <rect
        x="6"
        y="8"
        width="52"
        height="30"
        rx="3"
        stroke={s}
        strokeWidth={swb}
        strokeDasharray={placeholder ? "5 3" : undefined}
      />
      <circle cx="32" cy="23" r="13" stroke={s} strokeWidth={sw} />
      <circle cx="32" cy="23" r="5" stroke={s} strokeWidth={0.9} />
    </GraphicSvg>
  );
}

/** Shure BLX288 dual rack with antennas */
export function WirelessRackGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 72 52" className={className}>
      <EquipmentShadow cx={36} cy={48} rx={28} ry={4} />
      <rect x="10" y="16" width="52" height="14" rx="1.5" stroke={s} strokeWidth={swb} />
      <rect x="10" y="32" width="52" height="14" rx="1.5" stroke={s} strokeWidth={swb} />
      <line x1="10" y1="23" x2="62" y2="23" stroke={s} strokeWidth={0.7} opacity={0.45} />
      <line x1="10" y1="39" x2="62" y2="39" stroke={s} strokeWidth={0.7} opacity={0.45} />
      <line x1="22" y1="10" x2="22" y2="16" stroke={s} strokeWidth={1.2} />
      <line x1="50" y1="10" x2="50" y2="16" stroke={s} strokeWidth={1.2} />
      <circle cx="22" cy="8" r="2.2" stroke={s} strokeWidth={1} />
      <circle cx="50" cy="8" r="2.2" stroke={s} strokeWidth={1} />
      <circle cx="18" cy="22" r="1.5" fill={s} />
      <circle cx="18" cy="38" r="1.5" fill={s} />
    </GraphicSvg>
  );
}

/** Behringer PM1 beltpack */
export function BeltpackGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 40 48" className={className}>
      <EquipmentShadow cx={20} cy={44} rx={12} ry={3} />
      <rect x="8" y="12" width="24" height="28" rx="3" stroke={s} strokeWidth={swb} />
      <circle cx="20" cy="24" r="6" stroke={s} strokeWidth={sw} />
      <circle cx="32" cy="36" r="2" stroke={s} strokeWidth={1} />
      <line x1="32" y1="36" x2="38" y2="40" stroke={s} strokeWidth={1} />
    </GraphicSvg>
  );
}
