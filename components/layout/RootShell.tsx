"use client";

import { usePathname } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  isAdminPath,
  isAuthUiPath,
  isBuilderPath,
  isVolunteerPath,
} from "@/lib/auth/paths";

/** Keeps Volunteer Mode, Admin, Builder, and Auth screens out of the operational shell. */
export function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (
    isVolunteerPath(pathname) ||
    isAdminPath(pathname) ||
    isBuilderPath(pathname) ||
    isAuthUiPath(pathname)
  ) {
    return <>{children}</>;
  }

  return <AppLayout>{children}</AppLayout>;
}
