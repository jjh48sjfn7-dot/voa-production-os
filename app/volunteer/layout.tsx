import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { VolunteerShell } from "@/components/volunteer/VolunteerShell";
import { getAuthIdentity } from "@/lib/auth/identity";

export const metadata: Metadata = {
  title: "Volunteer | Production OS",
  description: "Volunteer Mode — learn how your church operates.",
};

export default async function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const identity = await getAuthIdentity();
  if (!identity) {
    redirect("/login");
  }

  return <VolunteerShell>{children}</VolunteerShell>;
}
