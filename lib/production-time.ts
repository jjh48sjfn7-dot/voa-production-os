import { voaVenue } from "@/data/audio/venue";

export function getNextServiceDate(from: Date = new Date()): Date {
  const next = new Date(from);
  next.setHours(voaVenue.serviceHour, voaVenue.serviceMinute, 0, 0);

  const daysUntil =
    (voaVenue.serviceDay - next.getDay() + 7) % 7;

  if (daysUntil === 0 && from >= next) {
    next.setDate(next.getDate() + 7);
  } else {
    next.setDate(next.getDate() + daysUntil);
  }

  return next;
}

export function getServiceCountdown(from: Date = new Date()): {
  totalMs: number;
  hours: number;
  minutes: number;
  seconds: number;
  label: string;
  isLive: boolean;
  isPast: boolean;
} {
  const service = getNextServiceDate(from);
  const serviceEnd = new Date(service);
  serviceEnd.setHours(serviceEnd.getHours() + 2); // ~2 hr service block

  const totalMs = service.getTime() - from.getTime();
  const isLive = from >= service && from < serviceEnd;
  const isPast = from >= serviceEnd;

  const absMs = Math.max(0, Math.abs(totalMs));
  const hours = Math.floor(absMs / 3_600_000);
  const minutes = Math.floor((absMs % 3_600_000) / 60_000);
  const seconds = Math.floor((absMs % 60_000) / 1_000);

  let label: string;
  if (isLive) {
    label = "Service Live";
  } else if (isPast && totalMs < 0) {
    label = "Next Sunday Experience";
  } else {
    label = "Until Service Live";
  }

  return { totalMs, hours, minutes, seconds, label, isLive, isPast: totalMs < 0 && !isLive };
}

export function parseTimeToMinutes(time: string): number {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const mins = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return hours * 60 + mins;
}

export function getCurrentTimelineIndex(
  events: { time: string }[],
  now: Date = new Date()
): number {
  const nowMins = now.getHours() * 60 + now.getMinutes();
  let current = -1;
  for (let i = 0; i < events.length; i++) {
    if (parseTimeToMinutes(events[i].time) <= nowMins) current = i;
  }
  return current;
}
