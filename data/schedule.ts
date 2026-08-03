import type { ScheduleItem } from "@/types";
import { voaLabels } from "@/data/audio/venue";

export const todaysSchedule: ScheduleItem[] = [
  { team: voaLabels.volunteerTeam, time: "8:00 AM" },
  { team: "Worship Team", time: "9:00 AM" },
  { team: "Service", time: "10:30 AM" },
];
