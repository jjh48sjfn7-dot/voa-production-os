"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  LogIn,
  LogOut,
  MapPin,
  Package,
  Tag,
  User,
  Wrench,
} from "lucide-react";
import type { InventoryEntry } from "@/types/audio";
import {
  conditionStyles,
  INVENTORY_CHECKOUT_SCOPE,
  statusStyles,
} from "@/data/audio/inventory";
import {
  loadCheckoutItems,
  loadCheckoutRecord,
  saveCheckoutItems,
  saveCheckoutRecord,
} from "@/lib/storage";
import { voaLabels } from "@/data/audio/venue";
import { audioStyles } from "@/lib/audio-styles";
import { departmentAccents } from "@/lib/theme";

interface InventoryCardProps {
  item: InventoryEntry;
  index?: number;
}

export function InventoryCard({ item, index = 0 }: InventoryCardProps) {
  const [checkedOut, setCheckedOut] = useState(false);
  const [checkedOutBy, setCheckedOutBy] = useState<string | undefined>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const state = loadCheckoutItems(INVENTORY_CHECKOUT_SCOPE);
    const meta = loadCheckoutRecord(INVENTORY_CHECKOUT_SCOPE);
    setCheckedOut(!!state[item.id]);
    setCheckedOutBy(meta[item.id]?.by);
    setMounted(true);
  }, [item.id]);

  const toggleCheckout = useCallback(() => {
    setCheckedOut((prev) => {
      const next = !prev;
      const state = loadCheckoutItems(INVENTORY_CHECKOUT_SCOPE);
      const meta = loadCheckoutRecord(INVENTORY_CHECKOUT_SCOPE);
      saveCheckoutItems(INVENTORY_CHECKOUT_SCOPE, {
        ...state,
        [item.id]: next,
      });
      const by = next ? voaLabels.volunteerTeam : undefined;
      saveCheckoutRecord(INVENTORY_CHECKOUT_SCOPE, {
        ...meta,
        [item.id]: next
          ? { checkedOut: true, by, at: new Date().toISOString() }
          : { checkedOut: false },
      });
      setCheckedOutBy(by);
      return next;
    });
  }, [item.id]);

  return (
    <article
      className={`group flex flex-col overflow-hidden ${audioStyles.glass} ${audioStyles.cardHover} ${audioStyles.cardGlow} ${
        checkedOut ? "ring-1 ring-amber-500/30" : ""
      } animate-fade-in`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <div className="relative border-b border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent px-5 py-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${departmentAccents.audio.iconBg} ring-1 ring-white/[0.06]`}
          >
            <Package className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className={audioStyles.label}>{item.category}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <Tag className="h-3 w-3 shrink-0" />
              {item.assetNumber}
            </p>
          </div>
        </div>
        <span
          className={`absolute right-4 top-4 ${audioStyles.badge} ring-1 ${statusStyles[item.status]}`}
        >
          {item.status}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${audioStyles.cardPad}`}>
        <div>
          <p className={`${audioStyles.heading} text-[15px]`}>{item.name}</p>
        </div>

        <div className="mt-4 space-y-2.5 text-xs">
          <Row label="Condition">
            <span className={`font-medium capitalize ${conditionStyles[item.condition]}`}>
              {item.condition.replace("-", " ")}
            </span>
          </Row>
          <Row label="Quantity">
            <span className="font-medium tabular-nums text-slate-300">{item.quantity}</span>
          </Row>
          <Row label="Storage Location" icon={MapPin}>
            <span className="text-slate-300">{item.location}</span>
          </Row>
          <Row label="Checked Out By" icon={User}>
            <span className={checkedOut ? "text-amber-400" : "text-slate-500"}>
              {checkedOut ? (checkedOutBy ?? voaLabels.volunteerTeam) : "—"}
            </span>
          </Row>
          {(item.lastService || item.nextService) && (
            <Row label="Service Date" icon={Wrench}>
              <span className="text-slate-400">
                {item.nextService ? `Due ${item.nextService}` : `Last ${item.lastService}`}
              </span>
            </Row>
          )}
        </div>

        <button
          type="button"
          onClick={toggleCheckout}
          disabled={!mounted || item.status === "maintenance"}
          className={`mt-5 flex w-full min-h-[44px] items-center justify-center gap-2 ${audioStyles.transition} ${
            checkedOut
              ? "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30 hover:bg-amber-500/20"
              : `${audioStyles.btnSecondary} hover:text-white`
          } disabled:cursor-not-allowed disabled:opacity-40`}
        >
          {checkedOut ? (
            <>
              <LogOut className="h-4 w-4" />
              Check In
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Check Out
            </>
          )}
        </button>

        {checkedOut && (
          <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-amber-400/80">
            <CheckCircle2 className="h-3 w-3" />
            Currently checked out
          </p>
        )}
      </div>
    </article>
  );
}

function Row({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1 text-slate-500">
        {Icon && <Icon className="h-3 w-3 shrink-0" />}
        {label}
      </span>
      {children}
    </div>
  );
}
