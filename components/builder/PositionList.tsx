import type { BuilderPosition } from "@/lib/builder/load-positions";
import { volunteerUi } from "@/lib/volunteer/ui";

export function PositionList({ positions }: { positions: BuilderPosition[] }) {
  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
      <p className={volunteerUi.eyebrow}>Position Definitions</p>
      {positions.length === 0 ? (
        <p className={`mt-2 ${volunteerUi.body}`}>No positions configured yet.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {positions.map((position) => (
            <li
              key={position.id}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3"
            >
              <p className="text-[14px] font-medium text-white">{position.name}</p>
              <p className={`mt-1 ${volunteerUi.muted}`}>
                {position.departmentName}
                {position.isActive ? "" : " · Inactive"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
