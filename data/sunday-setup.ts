import {
  Clock,
  Lightbulb,
  Mic2,
  Monitor,
  Heart,
  Truck,
  Volume2,
} from "lucide-react";
import type { SetupSection } from "@/types";
import { voaLabels, voaVenue } from "@/data/audio/venue";

export const sundaySetupSections: SetupSection[] = [
  {
    id: "arrive",
    title: "Arrive at 8:00 AM",
    icon: Clock,
    volunteer: "David Okonkwo — Team Lead",
    estimatedMinutes: 15,
    items: [
      {
        type: "checklist",
        items: [
          { id: "arrive-unlock", label: "Unlock sanctuary & production storage" },
          { id: "arrive-greet", label: "Greet team at south parking lot" },
          { id: "arrive-review", label: "Review volunteer assignments & timeline" },
          { id: "arrive-unload", label: `Open trailer at ${voaVenue.trailerLocation}` },
        ],
      },
    ],
  },
  {
    id: "trailer",
    title: "Unload Trailer",
    icon: Truck,
    volunteer: "Load Crew",
    estimatedMinutes: 25,
    items: [
      {
        type: "checklist",
        items: [
          { id: "trailer-cases", label: `Roll ${voaLabels.qscMains} & sub cases to sanctuary` },
          { id: "trailer-speakers", label: `Place JBL SRX835P L/R at ${voaLabels.foh} (${voaLabels.centerScreen})` },
          { id: "trailer-snakes", label: `Run digital snake to ${voaLabels.rio} — ${voaLabels.stageLeft} & ${voaLabels.stageRight}` },
          { id: "trailer-truss", label: "Coordinate lighting truss with Lighting team" },
        ],
      },
    ],
  },
  {
    id: "audio",
    title: `${voaLabels.audioDepartment} Setup`,
    icon: Mic2,
    volunteer: `Marcus Chen — ${voaLabels.foh}`,
    estimatedMinutes: 30,
    items: [
      {
        type: "list",
        items: [
          `Power ${voaVenue.console} — load scene “VOA Pre-Service”`,
          `Connect ${voaLabels.stageLeft} (${voaLabels.drumPosition}) and ${voaLabels.stageRight} (${voaLabels.keyboardPosition})`,
          `Power ${voaLabels.qscMains} LAST (after line check)`,
          "Verify all mics from Case A — match patch sheet",
          "Test pastor wireless (Shure BLX) — fresh battery",
        ],
      },
    ],
  },
  {
    id: "lighting",
    title: "Set Up Lighting",
    icon: Lightbulb,
    volunteer: "Lighting Team",
    estimatedMinutes: 20,
    items: [
      {
        type: "list",
        items: ["Power lights", "Check DMX universe 1", "Test worship & speaking scenes"],
      },
    ],
  },
  {
    id: "media",
    title: "Set Up Media",
    icon: Monitor,
    volunteer: "Elena Vasquez — Media",
    estimatedMinutes: 15,
    items: [
      {
        type: "list",
        items: [
          "Open ProPresenter on Mac Mini",
          "Load today’s worship set & sermon slides",
          "Test projector & confidence monitor",
          voaVenue.streaming,
        ],
      },
    ],
  },
  {
    id: "soundcheck",
    title: "Sound Check",
    icon: Volume2,
    volunteer: "Sofia Reyes — Monitors",
    estimatedMinutes: 35,
    items: [
      {
        type: "list",
        items: [
          "Vocal line check — all 4 BGVs + lead at -18 dBFS",
          "Full band mix — confirm drum sub on Aux 3",
          "Ring out monitors — cut 250 Hz if Antioch room rings",
          "Recall scene “VOA Sunday Worship” before 10:15",
        ],
      },
    ],
  },
  {
    id: "prayer",
    title: "Team Prayer",
    icon: Heart,
    volunteer: "All Teams",
    estimatedMinutes: 10,
    items: [
      {
        type: "list",
        items: [
          "Pray together at 10:00 AM",
          "Review service flow with Pastor & worship leader",
          "Confirm pastor mic mute during worship (Ch 5)",
        ],
      },
    ],
  },
];

export const SETUP_ESTIMATED_MINUTES = sundaySetupSections.reduce(
  (sum, s) => sum + (s.estimatedMinutes ?? 0),
  0
);

export function getAllChecklistItemIds(): string[] {
  return getSetupChecklistItems().map((item) => item.id);
}

export interface SetupChecklistItem {
  id: string;
  label: string;
  section: string;
}

export function getSetupChecklistItems(): SetupChecklistItem[] {
  return sundaySetupSections.flatMap((section) =>
    section.items.flatMap((item) =>
      item.type === "checklist"
        ? item.items.map((i) => ({
            id: i.id,
            label: i.label,
            section: section.title,
          }))
        : []
    )
  );
}
