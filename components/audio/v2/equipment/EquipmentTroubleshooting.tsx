"use client";

import { useState } from "react";
import { TroubleshootingCard } from "@/components/shared/TroubleshootingCard";
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
      {items.map((item) => (
        <TroubleshootingCard
          key={item.id}
          title={item.title}
          open={openId === item.id}
          onToggle={() => handleToggle(item.id)}
        >
          <TroubleshootingItemContent item={item} />
        </TroubleshootingCard>
      ))}
    </div>
  );
}
