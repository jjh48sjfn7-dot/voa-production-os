import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { VolunteerSessionError } from "@/components/volunteer/VolunteerSessionError";
import { VolunteerShell } from "@/components/volunteer/VolunteerShell";
import { getAuthIdentity } from "@/lib/auth/identity";
import { loadVolunteerSession } from "@/lib/volunteer/load-session";

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

  const result = await loadVolunteerSession(identity.sub);
  if (!result.ok) {
    return <VolunteerSessionError />;
  }

  return <VolunteerShell session={result.session}>{children}</VolunteerShell>;
}
