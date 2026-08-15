import { VolunteerBottomNav } from "@/components/volunteer/VolunteerBottomNav";
import { VolunteerDesktopNav } from "@/components/volunteer/VolunteerDesktopNav";
import { VolunteerSessionProvider } from "@/components/volunteer/VolunteerSessionProvider";
import { VolunteerTopBar } from "@/components/volunteer/VolunteerTopBar";
import { volunteerUi } from "@/lib/volunteer/ui";
import type { VolunteerSession } from "@/lib/volunteer/types";

export function VolunteerShell({
  session,
  children,
}: {
  session: VolunteerSession;
  children: React.ReactNode;
}) {
  return (
    <VolunteerSessionProvider session={session}>
      <div className={volunteerUi.page}>
        <VolunteerDesktopNav />
        <div className="lg:pl-56">
          <VolunteerTopBar />
          <main className="px-4 pb-28 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pb-10">
            <div className="mx-auto max-w-2xl">{children}</div>
          </main>
        </div>
        <VolunteerBottomNav />
      </div>
    </VolunteerSessionProvider>
  );
}
