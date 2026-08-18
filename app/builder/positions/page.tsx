import type { Metadata } from "next";
import { CreatePositionForm } from "@/components/builder/CreatePositionForm";
import { PositionList } from "@/components/builder/PositionList";
import { requireBuilderAccess } from "@/lib/builder/access";
import { loadBuilderPositionsPage } from "@/lib/builder/load-positions";
import { volunteerUi } from "@/lib/volunteer/ui";

export const metadata: Metadata = {
  title: "Positions | Builder | Production OS",
  description: "Create and view church position definitions.",
};

export default async function BuilderPositionsPage() {
  const access = await requireBuilderAccess();
  if (!access.ok) {
    return null;
  }

  const data = await loadBuilderPositionsPage(access.workspaceId);
  if (!data) {
    return (
      <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
        <h1 className="text-[26px] font-semibold tracking-tight text-white">
          Manage Position Definitions
        </h1>
        <p className={`mt-2 ${volunteerUi.body}`}>
          We couldn’t load positions. Please try again.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-[26px] font-semibold tracking-tight text-white">
          Manage Position Definitions
        </h1>
        <p className="mt-1 text-[14px] text-white/55">
          Create serving roles for this church. Qualification is a separate
          step.
        </p>
        <p className="mt-1 text-[13px] text-white/40">{access.workspaceName}</p>
      </header>
      <CreatePositionForm departments={data.departments} />
      <PositionList positions={data.positions} />
    </div>
  );
}
