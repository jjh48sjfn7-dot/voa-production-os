import type { Metadata } from "next";
import { VolunteerShell } from "@/components/volunteer/VolunteerShell";

export const metadata: Metadata = {
  title: "Volunteer | Production OS",
  description: "Volunteer Mode — learn how your church operates.",
};

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VolunteerShell>{children}</VolunteerShell>;
}
