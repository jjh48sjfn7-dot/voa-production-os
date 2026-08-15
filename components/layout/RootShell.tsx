"use client";

import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { isAdminPath, isAuthUiPath, isVolunteerPath } from "@/lib/auth/paths";

/** Keeps Volunteer Mode, Admin, and Auth screens out of the operational shell. */
export function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (isVolunteerPath(pathname) || isAdminPath(pathname) || isAuthUiPath(pathname)) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}
