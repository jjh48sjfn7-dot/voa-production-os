import type { Metadata } from "next";
import { InviteVolunteerPanel } from "@/components/admin/InviteVolunteerPanel";
import { PendingInvitationsPanel } from "@/components/admin/PendingInvitationsPanel";
import { TeamAssignmentPanel } from "@/components/admin/TeamAssignmentPanel";
import { requireAdminAccess } from "@/lib/admin/access";
import { loadAdminPendingInvitations } from "@/lib/admin/load-invitations";
import { loadAdminTeamPage } from "@/lib/admin/load-team";
import { volunteerUi } from "@/lib/volunteer/ui";

export const metadata: Metadata = {
  title: "Team | Admin | Production OS",
  description: "Assign volunteers to Production departments.",
};

export default async function AdminTeamPage() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return null;
  }

  const [data, invitations] = await Promise.all([
    loadAdminTeamPage(access),
    loadAdminPendingInvitations(access.workspaceId),
  ]);
  if (!data) {
    return (
      <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
        <h1 className="text-[26px] font-semibold tracking-tight text-white">
          Team
        </h1>
        <p className={`mt-2 ${volunteerUi.body}`}>
          We couldn’t load the team list. Please try again.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[26px] font-semibold tracking-tight text-white">
          Team
        </h1>
        <p className="mt-1 text-[14px] text-white/55">
          Assign volunteers to Production departments.
        </p>
        <p className="mt-1 text-[13px] text-white/40">{data.workspaceName}</p>
      </header>
      <InviteVolunteerPanel />
      {invitations ? (
        <PendingInvitationsPanel invitations={invitations} />
      ) : (
        <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
          <p className={volunteerUi.eyebrow}>Pending Invitations</p>
          <p className={`mt-2 ${volunteerUi.body}`}>
            We couldn’t load invitations. Please try again.
          </p>
        </section>
      )}
      {data.members.length === 0 || data.departments.length === 0 ? (
        <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
          <p className={volunteerUi.body}>
            {data.departments.length === 0
              ? "No Production departments are available to assign yet."
              : "No active team members are available to assign yet."}
          </p>
        </section>
      ) : (
        <TeamAssignmentPanel
          members={data.members}
          departments={data.departments}
        />
      )}
    </div>
  );
}
