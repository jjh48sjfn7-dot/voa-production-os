export const DEMO_STORAGE_KEY = "demo-mode";

export const DEMO_MISSION =
  "Centralizing production knowledge so every volunteer can serve with confidence.";

export interface DemoStep {
  id: "step1" | "step2" | "step3";
  number: number;
  title: string;
  instructions: string;
  hint?: string;
  href?: string;
  hrefLabel?: string;
}

export const demoSteps: DemoStep[] = [
  {
    id: "step1",
    number: 1,
    title: "Find the Pastor Microphone",
    instructions:
      "Use the search bar or Channel List to locate the Pastor microphone.",
    hint: "Pastor Mic is on Channel 5 — Shure BLX288 wireless.",
    href: "/audio/channels",
    hrefLabel: "Open Channel List",
  },
  {
    id: "step2",
    number: 2,
    title: "Find the No Sound Troubleshooting Guide",
    instructions:
      "Navigate to Troubleshooting and locate the No Sound guide.",
    hint: 'Look for "No Signal on Channel" in the troubleshooting library.',
    href: "/audio/troubleshooting#issue-no-signal",
    hrefLabel: "Open Troubleshooting",
  },
  {
    id: "step3",
    number: 3,
    title: "Complete One Sunday Setup Task",
    instructions:
      "Navigate to Sunday Setup and check off any checklist item.",
    hint: "Pre-Service Checklist saves progress locally on this device.",
    href: "/audio/setup",
    hrefLabel: "Open Pre-Service Checklist",
  },
];

export interface DemoProgress {
  started: boolean;
  step1: boolean;
  step2: boolean;
  step3: boolean;
}

export const DEFAULT_DEMO_PROGRESS: DemoProgress = {
  started: false,
  step1: false,
  step2: false,
  step3: false,
};

export function isDemoComplete(progress: DemoProgress): boolean {
  return progress.step1 && progress.step2 && progress.step3;
}

export function demoCompletedCount(progress: DemoProgress): number {
  return [progress.step1, progress.step2, progress.step3].filter(Boolean).length;
}
