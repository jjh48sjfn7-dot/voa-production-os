import type { ReactNode, ComponentType } from "react";
import type { BlueprintGraphicId } from "@/data/blueprint/types";

interface BlueprintEquipmentGraphicProps {
  graphic: BlueprintGraphicId;
  className?: string;
}

const stroke = "currentColor";
const sw = 1.5;

function GraphicSvg({
  children,
  viewBox = "0 0 64 64",
  className,
}: {
  children: ReactNode;
  viewBox?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function DrumKitGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <circle cx="32" cy="36" r="10" stroke={stroke} strokeWidth={sw} />
      <circle cx="18" cy="28" r="6" stroke={stroke} strokeWidth={sw} />
      <circle cx="46" cy="28" r="6" stroke={stroke} strokeWidth={sw} />
      <circle cx="32" cy="20" r="5" stroke={stroke} strokeWidth={sw} />
      <line x1="32" y1="10" x2="32" y2="16" stroke={stroke} strokeWidth={sw} />
    </GraphicSvg>
  );
}

function KeyboardGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="8" y="24" width="48" height="16" rx="2" stroke={stroke} strokeWidth={sw} />
      <line x1="16" y1="24" x2="16" y2="40" stroke={stroke} strokeWidth={1} />
      <line x1="24" y1="24" x2="24" y2="40" stroke={stroke} strokeWidth={1} />
      <line x1="32" y1="24" x2="32" y2="40" stroke={stroke} strokeWidth={1} />
      <line x1="40" y1="24" x2="40" y2="40" stroke={stroke} strokeWidth={1} />
      <line x1="48" y1="24" x2="48" y2="40" stroke={stroke} strokeWidth={1} />
    </GraphicSvg>
  );
}

function MicStandGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <circle cx="32" cy="14" r="4" stroke={stroke} strokeWidth={sw} />
      <line x1="32" y1="18" x2="32" y2="48" stroke={stroke} strokeWidth={sw} />
      <line x1="22" y1="52" x2="42" y2="52" stroke={stroke} strokeWidth={sw} />
      <line x1="32" y1="48" x2="32" y2="52" stroke={stroke} strokeWidth={sw} />
    </GraphicSvg>
  );
}

function SpeakerGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="18" y="12" width="28" height="40" rx="3" stroke={stroke} strokeWidth={sw} />
      <circle cx="32" cy="24" r="6" stroke={stroke} strokeWidth={sw} />
      <circle cx="32" cy="40" r="4" stroke={stroke} strokeWidth={sw} />
    </GraphicSvg>
  );
}

function MonitorWedgeGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <path d="M12 44 L32 16 L52 44 Z" stroke={stroke} strokeWidth={sw} />
      <circle cx="32" cy="32" r="4" stroke={stroke} strokeWidth={sw} />
    </GraphicSvg>
  );
}

function ConsoleGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="6" y="20" width="52" height="28" rx="3" stroke={stroke} strokeWidth={sw} />
      <line x1="10" y1="28" x2="54" y2="28" stroke={stroke} strokeWidth={1} />
      {[14, 22, 30, 38, 46].map((x) => (
        <line key={x} x1={x} y1="32" x2={x} y2="42" stroke={stroke} strokeWidth={1.2} />
      ))}
    </GraphicSvg>
  );
}

function ComputerGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="12" y="14" width="40" height="28" rx="2" stroke={stroke} strokeWidth={sw} />
      <rect x="24" y="44" width="16" height="4" stroke={stroke} strokeWidth={sw} />
      <line x1="20" y1="48" x2="44" y2="48" stroke={stroke} strokeWidth={sw} />
    </GraphicSvg>
  );
}

function WirelessRackGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="14" y="12" width="36" height="40" rx="2" stroke={stroke} strokeWidth={sw} />
      <line x1="14" y1="24" x2="50" y2="24" stroke={stroke} strokeWidth={1} />
      <line x1="14" y1="36" x2="50" y2="36" stroke={stroke} strokeWidth={1} />
      <circle cx="22" cy="18" r="2" fill={stroke} />
      <circle cx="22" cy="30" r="2" fill={stroke} />
    </GraphicSvg>
  );
}

function ProjectorGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="14" y="24" width="36" height="16" rx="2" stroke={stroke} strokeWidth={sw} />
      <path d="M50 32 L58 28 L58 36 Z" stroke={stroke} strokeWidth={sw} />
      <circle cx="24" cy="32" r="4" stroke={stroke} strokeWidth={sw} />
    </GraphicSvg>
  );
}

function ScreenGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 64 40" className={className}>
      <rect x="4" y="4" width="56" height="32" rx="1" stroke={stroke} strokeWidth={sw} />
      <line x1="4" y1="36" x2="60" y2="36" stroke={stroke} strokeWidth={sw} />
    </GraphicSvg>
  );
}

function SnakeBoxGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="16" y="18" width="32" height="28" rx="2" stroke={stroke} strokeWidth={sw} />
      {[24, 32, 40].map((y) => (
        <circle key={y} cx="22" cy={y} r="2" stroke={stroke} strokeWidth={1} />
      ))}
      <line x1="36" y1="22" x2="52" y2="14" stroke={stroke} strokeWidth={1} />
      <line x1="36" y1="32" x2="52" y2="32" stroke={stroke} strokeWidth={1} />
    </GraphicSvg>
  );
}

function SubwooferGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="16" y="20" width="32" height="28" rx="3" stroke={stroke} strokeWidth={sw} />
      <circle cx="32" cy="34" r="10" stroke={stroke} strokeWidth={sw} />
      <circle cx="32" cy="34" r="4" stroke={stroke} strokeWidth={1} />
    </GraphicSvg>
  );
}

function DisplayMonitorGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="14" y="14" width="36" height="24" rx="2" stroke={stroke} strokeWidth={sw} />
      <line x1="32" y1="38" x2="32" y2="44" stroke={stroke} strokeWidth={sw} />
      <line x1="24" y1="44" x2="40" y2="44" stroke={stroke} strokeWidth={sw} />
    </GraphicSvg>
  );
}

function LightingControlGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg className={className}>
      <rect x="10" y="18" width="44" height="30" rx="2" stroke={stroke} strokeWidth={sw} />
      {[18, 26, 34, 42].map((x) => (
        <circle key={x} cx={x} cy="28" r="3" stroke={stroke} strokeWidth={1} />
      ))}
      <line x1="14" y1="38" x2="50" y2="38" stroke={stroke} strokeWidth={1} />
    </GraphicSvg>
  );
}

function CurtainGraphic({ className }: { className?: string }) {
  return (
    <GraphicSvg viewBox="0 0 64 24" className={className}>
      <path
        d="M4 4 Q16 14 32 4 T60 4 L60 20 L4 20 Z"
        stroke={stroke}
        strokeWidth={sw}
        fill="rgba(148,163,184,0.08)"
      />
    </GraphicSvg>
  );
}

const graphicComponents: Record<
  BlueprintGraphicId,
  ComponentType<{ className?: string }>
> = {
  "drum-kit": DrumKitGraphic,
  keyboard: KeyboardGraphic,
  "mic-stand": MicStandGraphic,
  speaker: SpeakerGraphic,
  "monitor-wedge": MonitorWedgeGraphic,
  console: ConsoleGraphic,
  computer: ComputerGraphic,
  "wireless-rack": WirelessRackGraphic,
  projector: ProjectorGraphic,
  screen: ScreenGraphic,
  "snake-box": SnakeBoxGraphic,
  subwoofer: SubwooferGraphic,
  "display-monitor": DisplayMonitorGraphic,
  "lighting-control": LightingControlGraphic,
  curtain: CurtainGraphic,
};

export function BlueprintEquipmentGraphic({
  graphic,
  className = "h-10 w-10 sm:h-12 sm:w-12",
}: BlueprintEquipmentGraphicProps) {
  const Component = graphicComponents[graphic];
  return <Component className={className} />;
}

export function getGraphicAccessibleName(graphic: BlueprintGraphicId): string {
  const names: Record<BlueprintGraphicId, string> = {
    "drum-kit": "Drum kit",
    keyboard: "Keyboard",
    "mic-stand": "Microphone stand",
    speaker: "Speaker",
    "monitor-wedge": "Stage monitor wedge",
    console: "Mixing console",
    computer: "Computer",
    "wireless-rack": "Wireless receiver rack",
    projector: "Projector",
    screen: "Projection screen",
    "snake-box": "Stage snake box",
    subwoofer: "Subwoofer",
    "display-monitor": "Display monitor",
    "lighting-control": "Lighting control",
    curtain: "Back curtain",
  };
  return names[graphic];
}
