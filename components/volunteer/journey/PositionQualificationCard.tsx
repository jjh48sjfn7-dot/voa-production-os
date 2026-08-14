import type { PositionQualificationView } from "@/lib/volunteer/journey";
import { volunteerUi } from "@/lib/volunteer/ui";

interface PositionQualificationCardProps {
  view: PositionQualificationView;
}

export function PositionQualificationCard({ view }: PositionQualificationCardProps) {
  return (
    <article className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className={volunteerUi.title}>{view.name}</h3>
          <p className={`mt-0.5 text-[13px] ${view.locked ? "text-white/40" : "text-white/70"}`}>
            {view.statusLabel}
          </p>
        </div>
        {view.isCurrent && !view.locked && (
          <span className="rounded-full bg-[#FF5A00]/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#FF8A4C]">
            Current
          </span>
        )}
      </div>

      {view.requiresLabel && (
        <p className={`mt-3 ${volunteerUi.muted}`}>{view.requiresLabel}</p>
      )}

      {view.isCurrent && !view.locked && (
        <dl className="mt-4 space-y-2">
          {view.trainingLabel && (
            <div className="flex justify-between gap-3 text-[13px]">
              <dt className="text-white/45">Training</dt>
              <dd className="font-medium text-white">{view.trainingLabel}</dd>
            </div>
          )}
          {view.shadowingLabel && (
            <div className="flex justify-between gap-3 text-[13px]">
              <dt className="text-white/45">Shadowing</dt>
              <dd className="font-medium text-white">{view.shadowingLabel}</dd>
            </div>
          )}
          {view.competenciesLabel && (
            <div className="flex justify-between gap-3 text-[13px]">
              <dt className="text-white/45">Competencies</dt>
              <dd className="font-medium text-white">{view.competenciesLabel}</dd>
            </div>
          )}
          {view.nextRequirement && (
            <div className="flex justify-between gap-3 pt-1 text-[13px]">
              <dt className="text-white/45">Next requirement</dt>
              <dd className="max-w-[60%] text-right font-medium text-white">
                {view.nextRequirement}
              </dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}
