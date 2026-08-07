import { GraphicSvg, s, sw, swb } from "@/components/blueprint/graphics/equipment/shared";

/** Microphone stand — top-down tripod */
export function MicStandGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 48 56" className={className}>
      <circle cx="24" cy="10" r="5" stroke={s} strokeWidth={swb} />
      <line x1="24" y1="15" x2="24" y2="38" stroke={s} strokeWidth={swb} />
      <line x1="24" y1="38" x2="10" y2="50" stroke={s} strokeWidth={sw} />
      <line x1="24" y1="38" x2="38" y2="50" stroke={s} strokeWidth={sw} />
      <line x1="24" y1="38" x2="24" y2="52" stroke={s} strokeWidth={sw} />
    </GraphicSvg>
  );
}

/** Lighting control desk reference */
export function LightingControlGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 72 48" className={className}>
      <rect x="6" y="12" width="60" height="28" rx="2" stroke={s} strokeWidth={swb} />
      <rect x="12" y="16" width="20" height="8" rx="1" stroke={s} strokeWidth={sw} opacity={0.5} />
      {[22, 30, 38, 46, 54].map((x) => (
        <circle key={x} cx={x} cy="30" r="3" stroke={s} strokeWidth={1} />
      ))}
      <line x1="12" y1="36" x2="60" y2="36" stroke={s} strokeWidth={0.8} opacity={0.4} />
    </GraphicSvg>
  );
}
