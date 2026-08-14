"use client";

import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";

/** Keeps Volunteer Mode out of the operational shell without changing AppLayout. */
export function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVolunteer =
    pathname === "/volunteer" || pathname.startsWith("/volunteer/");

  if (isVolunteer) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}
