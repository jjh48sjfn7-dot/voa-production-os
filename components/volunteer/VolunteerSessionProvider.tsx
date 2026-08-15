"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { VolunteerSession } from "@/lib/volunteer/types";

const VolunteerSessionContext = createContext<VolunteerSession | null>(null);

export function VolunteerSessionProvider({
  session,
  children,
}: {
  session: VolunteerSession;
  children: ReactNode;
}) {
  return (
    <VolunteerSessionContext.Provider value={session}>
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
