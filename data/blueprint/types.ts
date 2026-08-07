/** Shared Master Church Blueprint — department and overlay identifiers */

export type BlueprintDepartment =
  | "audio"
  | "lighting"
  | "media"
  | "video"
  | "power"
  | "network"
  | "cable-routing";

export type BlueprintOverlayId = BlueprintDepartment | "all" | "stage";

export type BlueprintItemType =
  | "equipment"
  | "position"
  | "stage"
  | "display"
  | "placeholder"
  | "reference";

export type BlueprintItemStatus = "approved" | "placeholder" | "planned";

export type BlueprintGraphicId =
  | "screen"
  | "projector"
  | "curtain"
  | "snake-box"
  | "monitor-wedge"
  | "drum-kit"
  | "mic-stand"
  | "keyboard"
  | "speaker"
  | "subwoofer"
  | "console"
  | "computer"
  | "wireless-rack"
  | "display-monitor"
  | "lighting-control";

/** Normalized position on the theater map (percentage, top-left anchor) */
export interface BlueprintMapPosition {
  x: number;
  y: number;
  rotate?: number;
}

export interface BlueprintVenue {
  id: string;
  name: string;
  venueType: string;
  notes: string[];
}

export interface BlueprintZone {
  id: string;
  name: string;
  beginnerLabel?: string;
  description: string;
  order: number;
}

export interface BlueprintItemPosition {
  col?: number;
  order: number;
}

export interface BlueprintItem {
  id: string;
  name: string;
  icon: string;
  zoneId: string;
  departments: BlueprintDepartment[];
  itemType: BlueprintItemType;
  equipmentSlug?: string;
  href?: string;
  position: BlueprintItemPosition;
  mapPosition: BlueprintMapPosition;
  graphic: BlueprintGraphicId;
  notes?: string[];
  status: BlueprintItemStatus;
  mapLabel?: string;
}

export interface BlueprintMapRegion {
  id: string;
  label: string;
  beginnerLabel?: string;
  /** SVG rect bounds as percentages */
  bounds: { x: number; y: number; w: number; h: number };
}

export interface BlueprintMapRow {
  id: string;
  zoneIds: string[];
  layout: "full" | "columns";
  columnCount?: number;
  variant?: "default" | "audience-band";
  nestedZoneId?: string;
}

export interface TheaterBlueprint {
  venue: BlueprintVenue;
  zones: BlueprintZone[];
  items: BlueprintItem[];
  mapRegions: BlueprintMapRegion[];
  mapLayout: {
    orientationLabel: string;
    rows: BlueprintMapRow[];
  };
  overlays: BlueprintDepartment[];
}

export const blueprintStageZoneIds = [
  "back-of-stage",
  "stage-left",
  "center-stage",
  "stage-right",
  "front-of-stage",
] as const;

export const blueprintDepartmentLabels: Record<BlueprintDepartment, string> = {
  audio: "Audio",
  lighting: "Lighting",
  media: "Media",
  video: "Video",
  power: "Power",
  network: "Network",
  "cable-routing": "Cable Routing",
};

export const blueprintOverlayLabels: Record<BlueprintOverlayId, string> = {
  all: "All",
  stage: "Stage",
  audio: "Audio",
  lighting: "Lighting",
  media: "Media",
  video: "Video",
  power: "Power",
  network: "Network",
  "cable-routing": "Cable Routing",
};

export const blueprintDepartmentColors: Record<
  BlueprintDepartment,
  { border: string; bg: string; dot: string; ring: string }
> = {
  audio: {
    border: "border-rose-500/40",
    bg: "bg-rose-500/15",
    dot: "bg-rose-400",
    ring: "ring-rose-400/60",
  },
  lighting: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/15",
    dot: "bg-amber-400",
    ring: "ring-amber-400/60",
  },
  media: {
    border: "border-sky-500/40",
    bg: "bg-sky-500/15",
    dot: "bg-sky-400",
    ring: "ring-sky-400/60",
  },
  video: {
    border: "border-violet-500/40",
    bg: "bg-violet-500/15",
    dot: "bg-violet-400",
    ring: "ring-violet-400/60",
  },
  power: {
    border: "border-orange-500/40",
    bg: "bg-orange-500/15",
    dot: "bg-orange-400",
    ring: "ring-orange-400/60",
  },
  network: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/15",
    dot: "bg-emerald-400",
    ring: "ring-emerald-400/60",
  },
  "cable-routing": {
    border: "border-teal-500/40",
    bg: "bg-teal-500/15",
    dot: "bg-teal-400",
    ring: "ring-teal-400/60",
  },
};
