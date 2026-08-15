import { volunteerEmptyCopy } from "@/lib/volunteer/labels";
import { volunteerUi } from "@/lib/volunteer/ui";

export function VolunteerSessionError() {
  return (
    <div className={volunteerUi.page}>
      <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-4 py-16 text-center">
        <h1 className="text-[26px] font-semibold tracking-tight text-white">
          {volunteerEmptyCopy.sessionUnavailable}
        </h1>
        <p className={`mt-3 ${volunteerUi.body}`}>
          {volunteerEmptyCopy.sessionUnavailableDetail}
        </p>
      </main>
    </div>
  );
}
