"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_DEMO_PROGRESS,
  DEMO_STORAGE_KEY,
  type DemoProgress,
} from "@/data/demo";
import { loadFromStorage, saveToStorage } from "@/lib/storage";

function loadProgress(): DemoProgress {
  return loadFromStorage(DEMO_STORAGE_KEY, DEFAULT_DEMO_PROGRESS);
}

function saveProgress(progress: DemoProgress): void {
  saveToStorage(DEMO_STORAGE_KEY, progress);
}

export function useDemoMode() {
  const [progress, setProgress] = useState<DemoProgress>(DEFAULT_DEMO_PROGRESS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress((prev) =>
      prev === DEFAULT_DEMO_PROGRESS ? loadProgress() : prev
    );
    setMounted(true);
  }, []);

  const persist = useCallback((next: DemoProgress) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  const startDemo = useCallback(() => {
    setProgress((prev) => {
      const next = { ...prev, started: true };
      saveProgress(next);
      return next;
    });
  }, []);

  const completeStep = useCallback(
    (step: keyof Pick<DemoProgress, "step1" | "step2" | "step3">) => {
      const current = loadProgress();
      persist({ ...current, [step]: true });
    },
    [persist]
  );

  const resetDemo = useCallback(() => {
    persist(DEFAULT_DEMO_PROGRESS);
  }, [persist]);

  return {
    progress,
    mounted,
    startDemo,
    completeStep,
    resetDemo,
  };
}
