"use client";

import { createContext, useContext } from "react";
import { getDemoVolunteerSession } from "@/data/volunteer/demo-session";
import type { VolunteerSession } from "@/lib/volunteer/types";

const VolunteerSessionContext = createContext<VolunteerSession | null>(null);

export function VolunteerSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VolunteerSessionContext.Provider value={getDemoVolunteerSession()}>
      {children}
    </VolunteerSessionContext.Provider>
  );
}

export function useVolunteerSession(): VolunteerSession {
  const session = useContext(VolunteerSessionContext);
  if (!session) {
    throw new Error("useVolunteerSession must be used within VolunteerSessionProvider");
  }
  return session;
}
