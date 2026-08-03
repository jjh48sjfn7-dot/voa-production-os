import { audioStyles } from "@/lib/audio-styles";
import { appUi } from "@/lib/app-ui";

function SkeletonBlock({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <div
      className={`${appUi.skeleton} animate-skeleton ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

export function PageSkeleton() {
  return (
    <div className={`${audioStyles.page} animate-fade-in`}>
      {/* Sticky header area */}
      <div className={`${audioStyles.glass} ${audioStyles.cardPad} space-y-5`}>
        <div className="flex items-center justify-between gap-4">
          <SkeletonBlock className="h-3.5 w-44 rounded-md" delay={0} />
          <SkeletonBlock className="h-9 w-28 rounded-xl" delay={30} />
        </div>
        <div className="flex items-start gap-4">
          <SkeletonBlock className="h-12 w-12 shrink-0 rounded-xl md:h-14 md:w-14" delay={50} />
          <div className="min-w-0 flex-1 space-y-2.5 pt-0.5">
            <SkeletonBlock className="h-7 w-64 max-w-full rounded-lg" delay={70} />
            <SkeletonBlock className="h-3.5 w-full max-w-xl rounded-md" delay={90} />
            <SkeletonBlock className="h-3.5 w-3/5 max-w-md rounded-md" delay={110} />
          </div>
        </div>
      </div>

      {/* Progress card */}
      <div className={`${audioStyles.glass} ${audioStyles.cardPad}`}>
        <SkeletonBlock className="h-3 w-24 rounded-md" delay={130} />
        <SkeletonBlock className="mt-2 h-5 w-48 rounded-md" delay={150} />
        <div className="mt-6 flex items-end justify-between">
          <SkeletonBlock className="h-12 w-20 rounded-lg" delay={170} />
          <SkeletonBlock className="h-3.5 w-16 rounded-md" delay={190} />
        </div>
        <SkeletonBlock className="mt-5 h-2.5 w-full rounded-full" delay={210} />
        <div className={`mt-5 grid grid-cols-3 ${audioStyles.gridGap}`}>
          {[0, 1, 2].map((i) => (
            <SkeletonBlock
              key={i}
              className="h-[72px] rounded-xl"
              delay={230 + i * 40}
            />
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className={`grid sm:grid-cols-2 ${audioStyles.gridGap}`}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`${audioStyles.glass} ${audioStyles.cardPad}`}>
            <div className="flex items-start gap-3.5">
              <SkeletonBlock className="h-10 w-10 shrink-0 rounded-xl" delay={350 + i * 50} />
              <div className="min-w-0 flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-32 rounded-md" delay={370 + i * 50} />
                <SkeletonBlock className="h-3 w-full rounded-md" delay={390 + i * 50} />
                <SkeletonBlock className="h-3 w-4/5 rounded-md" delay={410 + i * 50} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
