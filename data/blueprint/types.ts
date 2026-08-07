/** Shared Master Church Blueprint — department and overlay identifiers */

export type BlueprintDepartment =
  | "audio"
  | "lighting"
  | "media"
  | "video"
  | "power"
  | "network"
  | "cable-routing";

export type BlueprintOverlayId = BlueprintDepartment | "all";

export type BlueprintItemType =
  | "equipment"
  | "position"
  | "stage"
  | "display"
  | "placeholder";

export type BlueprintItemStatus = "approved" | "placeholder" | "planned";

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
  /** Normalized column within zone grid (1-based) */
  col?: number;
  /** Sort order within zone when col is not used */
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
  notes?: string[];
  status: BlueprintItemStatus;
  mapLabel?: string;
}

export interface BlueprintMapRow {
  id: string;
  zoneIds: string[];
  /** full = one zone spans width; columns = side-by-side zones */
  layout: "full" | "columns";
  columnCount?: number;
  /** Audience band is label-only with optional nested zone */
  variant?: "default" | "audience-band";
  nestedZoneId?: string;
}

export interface TheaterBlueprint {
  venue: BlueprintVenue;
  zones: BlueprintZone[];
  items: BlueprintItem[];
  mapLayout: {
    orientationLabel: string;
    rows: BlueprintMapRow[];
  };
  overlays: BlueprintDepartment[];
}

export const blueprintDepartmentLabels: Record<BlueprintDepartment, string> = {
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
  { border: string; bg: string; dot: string }
> = {
  audio: {
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
    dot: "bg-rose-400",
  },
  lighting: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    dot: "bg-amber-400",
  },
  media: {
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    dot: "bg-sky-400",
  },
  video: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    dot: "bg-violet-400",
  },
  power: {
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    dot: "bg-orange-400",
  },
  network: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
  "cable-routing": {
    border: "border-teal-500/30",
    bg: "bg-teal-500/10",
    dot: "bg-teal-400",
  },
};
