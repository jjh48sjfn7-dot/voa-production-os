/** Victory Outreach Antioch — venue & service configuration */
export const voaVenue = {
  church: "Victory Outreach Antioch",
  campus: "East Antioch Campus",
  address: "1800 Hillcrest Ave, Antioch, CA 94509",
  serviceDay: 0, // Sunday
  serviceHour: 10,
  serviceMinute: 30,
  serviceLabel: "10:30 AM",
  timezone: "America/Los_Angeles",
  fohLocation: "FOH — Center Screen",
  trailerLocation: "South parking lot — Bay 2",
  stageBoxes: {
    sb1: "Rio3224-D2 SB1 — Stage Left · Drum Position · inputs 1–16",
    sb2: "Rio3224-D2 SB2 — Stage Right · Keyboard Position · inputs 17–32",
  },
  console: "Yamaha TF5 — FOH rack",
  streaming: "Mac Mini → ProPresenter + USB record on Yamaha TF5",
} as const;

/** Shared display labels — routes unchanged, copy is VOA-specific */
export const voaLabels = {
  sundayExperience: "Sunday Experience",
  volunteerTeam: "Volunteer Team",
  audioDepartment: "Audio Department",
  productionReady: "Production Ready",
  preService: "Pre-Service",
  serviceLive: "Service Live",
  postService: "Post-Service",
  foh: "FOH",
  tf5: "Yamaha TF5",
  rio: "Rio3224-D2",
  qscMains: "QSC mains",
  stageLeft: "Stage Left",
  stageRight: "Stage Right",
  drumPosition: "Drum Position",
  keyboardPosition: "Keyboard Position",
  centerScreen: "Center Screen",
} as const;

/** Stage box display by patch number (1 = Stage Left, 2 = Stage Right) */
export function stageBoxLabel(box: number): string {
  if (box === 1) return `${voaLabels.stageLeft} · ${voaLabels.drumPosition}`;
  if (box === 2) return `${voaLabels.stageRight} · ${voaLabels.keyboardPosition}`;
  return voaLabels.tf5;
}
