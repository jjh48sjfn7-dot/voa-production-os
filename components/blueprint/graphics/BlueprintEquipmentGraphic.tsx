import type { ComponentType } from "react";
import type { BlueprintGraphicId } from "@/data/blueprint/types";
import {
  BeltpackGraphic,
  ConsoleGraphic,
  DrumKitGraphic,
  FohSpeakerGraphic,
  KeyboardGraphic,
  MonitorWedgeGraphic,
  SnakeBoxGraphic,
  SubwooferGraphic,
  WirelessRackGraphic,
} from "@/components/blueprint/graphics/equipment/audio";
import {
  ComputerGraphic,
  CurtainGraphic,
  DisplayMonitorGraphic,
  ProjectorGraphic,
  ScreenGraphic,
} from "@/components/blueprint/graphics/equipment/media";
import {
  LightingControlGraphic,
  MicStandGraphic,
  ParFixtureGraphic,
} from "@/components/blueprint/graphics/equipment/stage";

export interface BlueprintGraphicProps {
  className?: string;
  placeholder?: boolean;
}

const graphicComponents: Record<
  BlueprintGraphicId,
  ComponentType<BlueprintGraphicProps>
> = {
  console: ConsoleGraphic,
  keyboard: KeyboardGraphic,
  "drum-kit": DrumKitGraphic,
  "snake-box": SnakeBoxGraphic,
  speaker: FohSpeakerGraphic,
  "monitor-wedge": MonitorWedgeGraphic,
  subwoofer: SubwooferGraphic,
  "wireless-rack": WirelessRackGraphic,
  beltpack: BeltpackGraphic,
  computer: ComputerGraphic,
  projector: ProjectorGraphic,
  screen: ScreenGraphic,
  "display-monitor": DisplayMonitorGraphic,
  curtain: CurtainGraphic,
  "mic-stand": MicStandGraphic,
  "lighting-control": LightingControlGraphic,
  "par-fixture": ParFixtureGraphic,
};

export function BlueprintEquipmentGraphic({
  graphic,
  className = "h-11 w-11 sm:h-14 sm:w-14",
  placeholder = false,
}: {
  graphic: BlueprintGraphicId;
  className?: string;
  placeholder?: boolean;
}) {
  const Component = graphicComponents[graphic];
  return <Component className={className} placeholder={placeholder} />;
}

export function getGraphicAccessibleName(graphic: BlueprintGraphicId): string {
  const names: Record<BlueprintGraphicId, string> = {
    console: "Yamaha TF5 mixing console",
    keyboard: "Keyboard",
    "drum-kit": "Drum kit",
    "snake-box": "Stage snake box",
    speaker: "FOH speaker cabinet",
    "monitor-wedge": "Stage monitor wedge",
    subwoofer: "Subwoofer cabinet",
    "wireless-rack": "Shure BLX288 wireless receiver rack",
    beltpack: "Behringer PM1 beltpack",
    computer: "Mac desktop computer station",
    projector: "Projector",
    screen: "Projection screen",
    "display-monitor": "Confidence monitor display",
    curtain: "Back curtain",
    "mic-stand": "Microphone stand",
    "lighting-control": "Lighting control desk",
    "par-fixture": "SlimPAR lighting fixture",
  };
  return names[graphic];
}

export type { BlueprintGraphicId };
