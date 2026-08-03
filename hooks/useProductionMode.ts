"use client";

import { useCallback, useEffect, useState } from "react";
import { PRODUCTION_STORAGE_ID } from "@/data/audio/production";
import { loadFromStorage, saveToStorage } from "@/lib/storage";

interface ProductionState {
  active: boolean;
  startedAt: string | null;
  notes: string;
}

const DEFAULT: ProductionState = {
  active: false,
  startedAt: null,
  notes: "",
};

function loadState(): ProductionState {
  return loadFromStorage(`production:${PRODUCTION_STORAGE_ID}`, DEFAULT);
}

function saveState(state: ProductionState): void {
  saveToStorage(`production:${PRODUCTION_STORAGE_ID}`, state);
}

export function useProductionMode() {
  const [state, setState] = useState<ProductionState>(DEFAULT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  const startSunday = useCallback(() => {
    setState((prev) => {
      const next = {
        active: true,
        startedAt: new Date().toISOString(),
        notes: prev.notes,
      };
      saveState(next);
      return next;
    });
  }, []);

  const endSunday = useCallback(() => {
    setState((prev) => {
      const next = { active: false, startedAt: null, notes: prev.notes };
      saveState(next);
      return next;
    });
  }, []);

  const setNotes = useCallback((notes: string) => {
    setState((prev) => {
      const next = { ...prev, notes };
      saveState(next);
      return next;
    });
  }, []);

  return {
    active: state.active,
    startedAt: state.startedAt,
    notes: state.notes,
    startSunday,
    endSunday,
    setNotes,
    mounted,
  };
}
