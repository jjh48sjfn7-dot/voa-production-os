import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BuilderAccessDenied } from "@/components/builder/BuilderAccessDenied";
import { BuilderShell } from "@/components/builder/BuilderShell";
import { requireBuilderAccess } from "@/lib/builder/access";

export const metadata: Metadata = {
  title: "Builder | Production OS",
  description: "Configure church production positions.",
};

export default async function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access = await requireBuilderAccess();

  if (!access.ok) {
    if (access.reason === "unauthenticated") {
      redirect("/login");
    }
    return <BuilderAccessDenied reason={access.reason} />;
  }

  return <BuilderShell>{children}</BuilderShell>;
}
