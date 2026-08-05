"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";
import type { EquipmentTroubleshootingItem } from "@/data/audio/v2/equipment/types";

function TroubleshootingItemContent({
  item,
}: {
  item: EquipmentTroubleshootingItem;
}) {
  const hasProblem = !!item.problem;
  const hasCauses = !!item.possibleCauses?.length;
  const hasChecks = !!item.basicChecks?.length;
  const stepsOnly = hasChecks && !hasProblem && !hasCauses;

  if (stepsOnly) {
    return (
      <ul className="space-y-1">
        {item.basicChecks!.map((check) => (
          <li key={check} className={`${audioStyles.body} text-slate-300`}>
            {check}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-4">
      {hasProblem && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Problem
          </p>
          <p className={`mt-1.5 ${audioStyles.body} text-slate-200`}>{item.problem}</p>
        </div>
      )}
      {hasCauses && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Possible Causes
          </p>
          <ul className="mt-1.5 space-y-1">
            {item.possibleCauses!.map((cause) => (
              <li key={cause} className={`${audioStyles.body} text-slate-300`}>
                {cause}
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasChecks && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Basic Checks
          </p>
          <ul className="mt-1.5 space-y-1">
            {item.basicChecks!.map((check) => (
              <li key={check} className={`${audioStyles.body} text-slate-300`}>
                {check}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface EquipmentTroubleshootingProps {
  items: EquipmentTroubleshootingItem[];
}

export function EquipmentTroubleshooting({
  items,
}: EquipmentTroubleshootingProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  function handleToggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const open = openId === item.id;

        return (
          <div key={item.id} className={`overflow-hidden ${audioStyles.card}`}>
            <button
              type="button"
              onClick={() => handleToggle(item.id)}
              className="flex min-h-[52px] w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5"
              aria-expanded={open}
            >
              <p className="flex-1 text-base font-semibold text-slate-50">
                {item.title}
              </p>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ease-out ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-white/[0.06] px-4 pb-4 pt-3 sm:px-5">
                  <TroubleshootingItemContent item={item} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
