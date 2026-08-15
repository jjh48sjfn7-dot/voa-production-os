import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminAccessDenied } from "@/components/admin/AdminAccessDenied";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminAccess } from "@/lib/admin/access";

export const metadata: Metadata = {
  title: "Admin | Production OS",
  description: "Assign volunteers to Production departments.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access = await requireAdminAccess();

  if (!access.ok) {
    if (access.reason === "unauthenticated") {
      redirect("/login");
    }
    return <AdminAccessDenied reason={access.reason} />;
  }

  return <AdminShell>{children}</AdminShell>;
}
