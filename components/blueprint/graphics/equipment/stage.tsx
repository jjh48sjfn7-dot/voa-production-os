import { GraphicSvg, EquipmentShadow, s, sw, swb, fill, fillStrong } from "@/components/blueprint/graphics/equipment/shared";

/** Microphone stand — top-down tripod */
export function MicStandGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 44 52" className={className}>
      <EquipmentShadow cx={22} cy={48} rx={14} ry={3} />
      <circle cx="22" cy="8" r="5.5" fill={fillStrong} stroke={s} strokeWidth={swb} />
      <circle cx="22" cy="8" r="2" fill="rgba(20,24,32,0.45)" />
      <line x1="22" y1="13.5" x2="22" y2="36" stroke={s} strokeWidth={swb} />
      <line x1="22" y1="36" x2="8" y2="46" stroke={s} strokeWidth={sw} />
      <line x1="22" y1="36" x2="36" y2="46" stroke={s} strokeWidth={sw} />
      <line x1="22" y1="36" x2="22" y2="48" stroke={s} strokeWidth={sw} />
    </GraphicSvg>
  );
}

/** Lighting control desk reference */
export function LightingControlGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 80 44" className={className}>
      <EquipmentShadow cx={40} cy={40} rx={30} ry={4} />
      <rect x="6" y="10" width="68" height="26" rx="2" stroke={s} strokeWidth={swb} />
      <rect x="12" y="14" width="22" height="8" rx="1" stroke={s} strokeWidth={sw} opacity={0.45} />
      {[24, 32, 40, 48, 56, 64].map((x) => (
        <circle key={x} cx={x} cy="26" r="2.8" stroke={s} strokeWidth={0.9} />
      ))}
      <line x1="12" y1="32" x2="68" y2="32" stroke={s} strokeWidth={0.7} opacity={0.35} />
    </GraphicSvg>
  );
}
