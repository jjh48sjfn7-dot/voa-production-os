"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  ExternalLink,
  RotateCcw,
  Target,
} from "lucide-react";
import { Confetti } from "@/components/demo/Confetti";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  demoCompletedCount,
  demoSteps,
  DEMO_MISSION,
  isDemoComplete,
  type DemoProgress,
  type DemoStep,
} from "@/data/demo";
import { useDemoMode } from "@/hooks/useDemoMode";
import { audioStyles } from "@/lib/audio-styles";
import { dashboardStyles } from "@/lib/dashboard-styles";
import { voaLabels } from "@/data/audio/venue";

export function DemoContent() {
  const { progress, startDemo, completeStep, resetDemo } = useDemoMode();
  const complete = isDemoComplete(progress);

  return (
    <div className={`${dashboardStyles.page} relative`}>
      <DemoResetButton onReset={resetDemo} />

      {complete ? (
        <>
          <Confetti active />
          <CelebrationScreen />
        </>
      ) : !progress.started ? (
        <WelcomeScreen onStart={startDemo} />
      ) : (
        <>
          <PageHeader
            eyebrow="Live Demo"
            title="VOA Production OS Demo"
            description="Complete all three steps to finish the challenge."
            icon={Target}
          />

          <DemoProgressBar progress={progress} />

          <div className={`grid gap-5 ${audioStyles.gridGap}`}>
            {demoSteps.map((step) => (
              <DemoStepCard
                key={step.id}
                step={step}
                done={progress[step.id]}
                onComplete={() => completeStep(step.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DemoResetButton({ onReset }: { onReset: () => void }) {
  return (
    <div className="absolute right-0 top-0 z-10">
      <button
        type="button"
        onClick={onReset}
        className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-slate-300 active:scale-[0.98]`}
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset Demo
      </button>
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div
      className={`${dashboardStyles.card} ${dashboardStyles.cardPadLg} animate-fade-in pt-12 sm:pt-14`}
    >
      <p className={dashboardStyles.eyebrow}>Live Demo</p>
      <h1 className={`mt-2 ${dashboardStyles.display}`}>
        Welcome to VOA Production OS
      </h1>
      <p className={`mt-3 text-lg font-medium text-slate-300`}>Version 1.0</p>
      <p className={`mt-1 ${dashboardStyles.body}`}>
        Built for Victory Outreach Antioch
      </p>

      <div className="mt-8 border-t border-white/[0.06] pt-8">
        <p className={dashboardStyles.label}>Mission</p>
        <blockquote
          className={`mt-3 border-l-2 border-red-500/40 pl-4 ${dashboardStyles.mission}`}
        >
          {DEMO_MISSION}
        </blockquote>
      </div>

      <button
        type="button"
        onClick={onStart}
        className={`mt-10 w-full sm:w-auto ${audioStyles.btnPrimary} px-8 py-3.5 text-base`}
      >
        Start Demo
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function DemoProgressBar({ progress }: { progress: DemoProgress }) {
  const completedCount = demoCompletedCount(progress);
  const pct = Math.round((completedCount / 3) * 100);

  return (
    <div className={`${dashboardStyles.card} ${dashboardStyles.cardPad}`}>
      <div className="flex items-center justify-between gap-4">
        <p className={dashboardStyles.label}>Demo progress</p>
        <span className="text-sm font-semibold tabular-nums text-slate-300">
          {completedCount} of 3
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
        {demoSteps.map((step) => {
          const done = progress[step.id];
          const active =
            !done &&
            demoSteps.findIndex((s) => !progress[s.id]) === step.number - 1;

          return (
            <div
              key={step.id}
              className={`rounded-xl border px-3 py-3 text-center transition-colors duration-200 sm:px-4 sm:py-4 ${
                done
                  ? "border-emerald-500/25 bg-emerald-500/[0.08]"
                  : active
                    ? "border-red-500/25 bg-red-500/[0.06]"
                    : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                {done ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Circle
                    className={`h-4 w-4 ${active ? "text-red-400" : "text-slate-600"}`}
                  />
                )}
                <span
                  className={`text-xs font-semibold uppercase tracking-wider sm:text-[11px] ${
                    done
                      ? "text-emerald-400"
                      : active
                        ? "text-red-400"
                        : "text-slate-500"
                  }`}
                >
                  Step {step.number}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function DemoStepCard({
  step,
  done,
  onComplete,
}: {
  step: DemoStep;
  done: boolean;
  onComplete: () => void;
}) {
  return (
    <article
      className={`${dashboardStyles.card} ${dashboardStyles.cardPad} ${
        done ? "ring-1 ring-emerald-500/20" : ""
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
              done
                ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25"
                : "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
            }`}
          >
            {done ? <Check className="h-5 w-5" /> : step.number}
          </div>
          <div>
            <p className={dashboardStyles.label}>Step {step.number}</p>
            <h2 className={`mt-0.5 ${dashboardStyles.title}`}>{step.title}</h2>
          </div>
        </div>
        {done && (
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/20">
            Complete
          </span>
        )}
      </div>

      <p className={`mt-4 ${dashboardStyles.body}`}>{step.instructions}</p>
      {step.hint && (
        <p className={`mt-2 ${dashboardStyles.caption}`}>{step.hint}</p>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        {step.href && (
          <Link
            href={step.href}
            className={`inline-flex min-h-[44px] items-center justify-center gap-2 ${audioStyles.btnSecondary}`}
          >
            {step.hrefLabel}
            <ExternalLink className="h-4 w-4 opacity-70" />
          </Link>
        )}
        {!done && (
          <button
            type="button"
            onClick={onComplete}
            className={audioStyles.btnPrimary}
          >
            Mark Complete
            <Check className="h-4 w-4" />
          </button>
        )}
      </div>
    </article>
  );
}

function CelebrationScreen() {
  return (
    <div
      className={`${dashboardStyles.card} ${dashboardStyles.cardPadLg} animate-celebrate pt-12 text-center sm:pt-14`}
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-2 ring-emerald-500/30">
        <CheckCircle2 className="h-12 w-12 text-emerald-400" />
      </div>

      <h1 className={`mt-8 ${dashboardStyles.display}`}>Congratulations!</h1>
      <p className={`mt-4 ${dashboardStyles.body} mx-auto max-w-md`}>
        You completed the VOA Production OS Demo.
      </p>
      <p className="mt-2 text-lg font-semibold text-emerald-400">
        You are {voaLabels.productionReady}.
      </p>

      <Link
        href="/"
        className={`mt-10 inline-flex ${audioStyles.btnPrimary} px-8`}
      >
        Return to Dashboard
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
