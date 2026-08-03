"use client";

import { useState } from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lightbulb,
  XCircle,
} from "lucide-react";
import type { TroubleshootingIssue } from "@/types/audio";
import { severityStyles } from "@/data/audio/troubleshooting";
import { Checklist } from "@/components/checklists/Checklist";
import { audioStyles } from "@/lib/audio-styles";

interface DiagnosticWizardProps {
  issue: TroubleshootingIssue;
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
  storageId: string;
}

export function DiagnosticWizard({
  issue,
  checked,
  onToggle,
  storageId,
}: DiagnosticWizardProps) {
  const [step, setStep] = useState(0);
  const styles = severityStyles[issue.severity];
  const completed = issue.steps.filter((s) => checked[s.id]).length;
  const allDone = completed === issue.steps.length;
  const currentStep = issue.steps[step];

  return (
    <div
      className={`border-l-[3px] ${styles.border} ${audioStyles.glass} overflow-hidden ${audioStyles.cardGlow}`}
    >
      {issue.emergency && (
        <div className="flex items-center gap-2 border-b border-red-500/20 bg-red-500/10 px-5 py-3">
          <AlertOctagon className="h-4 w-4 shrink-0 text-red-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-red-300">
            Emergency — address immediately if occurring during service
          </p>
        </div>
      )}

      <div className={`border-b border-white/[0.06] ${audioStyles.cardPad}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`${audioStyles.badge} ring-1 ${styles.badge}`}>
                {issue.severity} severity
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2.5 py-1 text-xs text-slate-400 ring-1 ring-white/[0.06]">
                <Clock className="h-3 w-3" />
                Est. {issue.estimatedTime}
              </span>
            </div>
            <h3 className={`mt-3 ${audioStyles.heading}`}>{issue.title}</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold tabular-nums text-white">
              {completed}/{issue.steps.length}
            </p>
            <p className="text-xs text-slate-500">steps complete</p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={`h-full rounded-full ${styles.dot} shadow-[0_0_10px_currentColor] transition-[width] duration-[500ms] ease-out`}
            style={{ width: `${(completed / issue.steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-5 md:p-6">
        <p className={audioStyles.label}>Symptoms</p>
        <ul className="mt-2 space-y-1.5">
          {issue.symptoms.map((symptom) => (
            <li key={symptom} className="flex items-start gap-2 text-sm text-slate-400">
              <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`} />
              {symptom}
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/[0.06] backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2">
            <p className={audioStyles.label}>
              Step {step + 1} of {issue.steps.length}
            </p>
            {currentStep && checked[currentStep.id] && (
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            )}
          </div>

          {currentStep && (
            <>
              <div className="mt-3">
                <Checklist
                  id={storageId}
                  items={[currentStep]}
                  checked={checked}
                  onToggle={(id) => {
                    onToggle(id);
                    if (!checked[id] && step < issue.steps.length - 1) {
                      setTimeout(() => setStep((s) => s + 1), 350);
                    }
                  }}
                  accent="audio"
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-green-500/15 bg-green-500/5 p-3.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-green-400">
                    <CheckCircle2 className="h-3 w-3" />
                    Expected Result
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {currentStep.expectedResult}
                  </p>
                </div>
                <div className="rounded-xl border border-amber-500/15 bg-amber-500/5 p-3.5">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                    <XCircle className="h-3 w-3" />
                    If Failed
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {currentStep.ifFailed}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="mt-5 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className={`inline-flex min-h-[44px] items-center gap-1 rounded-xl px-3 py-2 text-sm disabled:opacity-30 ${audioStyles.btnGhost}`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <div className="flex items-center gap-1">
              {issue.steps.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(i)}
                  className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-all duration-200 ${
                    i === step ? "scale-110" : "hover:bg-white/[0.04]"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                  aria-current={i === step ? "step" : undefined}
                >
                  <span
                    className={`block rounded-full transition-all duration-200 ${
                      i === step
                        ? `${styles.dot} h-2.5 w-5 shadow-[0_0_8px_currentColor]`
                        : checked[s.id]
                          ? "h-2 w-2 bg-green-500/60"
                          : "h-2 w-2 bg-white/[0.1]"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(issue.steps.length - 1, s + 1))}
              disabled={step === issue.steps.length - 1}
              className={`inline-flex min-h-[44px] items-center gap-1 rounded-xl px-3 py-2 text-sm disabled:opacity-30 ${audioStyles.btnGhost}`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5">
          <p className={`mb-2 ${audioStyles.label}`}>Recommended Actions</p>
          <ul className="space-y-2">
            {issue.recommendedActions.map((action) => (
              <li
                key={action}
                className="flex items-start gap-2 rounded-xl bg-white/[0.03] px-3 py-2.5 text-sm text-slate-400 ring-1 ring-white/[0.04]"
              >
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/80" />
                {action}
              </li>
            ))}
          </ul>
        </div>

        {allDone ? (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-green-500/5 p-5 animate-slide-up">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
            <div>
              <p className="text-sm font-semibold text-green-400">Diagnostic complete</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{issue.resolution}</p>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className={`flex items-center gap-1.5 ${audioStyles.label}`}>
              <AlertTriangle className="h-3 w-3" />
              Completion Checklist
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Complete all {issue.steps.length} steps to confirm resolution. Expected outcome:{" "}
              {issue.resolution}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
