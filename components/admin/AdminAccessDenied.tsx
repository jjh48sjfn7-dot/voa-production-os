import Link from "next/link";
import { volunteerEmptyCopy } from "@/lib/volunteer/labels";
import { volunteerUi } from "@/lib/volunteer/ui";

const deniedCopy = {
  no_workspace: {
    title: "No church team connected",
    body: "This page is available after an active church team membership is connected to this account.",
  },
  multiple: {
    title: volunteerEmptyCopy.multipleChurchTeams,
    body: "Admin team assignment needs a single active church team. A workspace switcher is not available yet.",
  },
  not_admin: {
    title: "Admin access required",
    body: "This page is limited to people with an explicit Admin permission for this church team.",
  },
  unavailable: {
    title: "Admin is unavailable",
    body: volunteerEmptyCopy.sessionUnavailableDetail,
  },
} as const;

export function AdminAccessDenied({
  reason,
}: {
  reason: keyof typeof deniedCopy;
}) {
  const copy = deniedCopy[reason];
  return (
    <div className={volunteerUi.page}>
      <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-4 py-16 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
          Production OS
        </p>
        <h1 className="mt-3 text-[26px] font-semibold tracking-tight text-white">
          {copy.title}
        </h1>
        <p className={`mt-3 ${volunteerUi.body}`}>{copy.body}</p>
        <Link
          href="/volunteer"
          className={`${volunteerUi.ghost} mt-8 self-center text-[#FF8A4C]`}
        >
          Volunteer Mode
        </Link>
      </main>
    </div>
  );
}
