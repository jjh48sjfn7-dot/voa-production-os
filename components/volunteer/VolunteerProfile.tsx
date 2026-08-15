"use client";

import { logoutAction } from "@/app/auth/actions";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { VolunteerStubPage } from "@/components/volunteer/VolunteerStubPage";
import {
  volunteerEmptyCopy,
  volunteerWorkspaceLabel,
} from "@/lib/volunteer/labels";
import { volunteerUi } from "@/lib/volunteer/ui";

export function VolunteerProfile() {
  const session = useVolunteerSession();
  const workspaceLabel = volunteerWorkspaceLabel(session);
  const assigned =
    session.departmentAssignments.filter((assignment) => assignment.active)
      .length > 0;

  const body = session.membership
    ? `Connected to ${workspaceLabel}. ${
        assigned
          ? "Department assignment details coming next."
          : volunteerEmptyCopy.notAssigned
      } Availability and serving history coming next.`
    : `${workspaceLabel}. Availability and serving history coming next.`;

  return (
    <div>
      <VolunteerStubPage title="Profile" body={body} />
      <form action={logoutAction} className="mt-8">
        <button type="submit" className={volunteerUi.ghost}>
          Sign out
        </button>
      </form>
    </div>
  );
}
