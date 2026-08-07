"use client";

import type { BlueprintOverlayId, TheaterBlueprint } from "@/data/blueprint/types";
import { BlueprintMapItem } from "@/components/blueprint/BlueprintMapItem";

interface BlueprintMapProps {
  blueprint: TheaterBlueprint;
  overlay: BlueprintOverlayId;
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
}

function BlueprintMapEnvironment() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {/* Back wall */}
      <rect
        x="0"
        y="0"
        width="100"
        height="14"
        fill="rgba(15,20,30,0.6)"
      />
      <line
        x1="0"
        y1="14"
        x2="100"
        y2="14"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={0.35}
      />

      {/* Stage platform floor */}
      <rect
        x="3"
        y="14"
        width="94"
        height="36"
        fill="rgba(160,130,90,0.07)"
      />
      <rect
        x="3"
        y="14"
        width="94"
        height="36"
        fill="none"
        stroke="rgba(180,150,110,0.18)"
        strokeWidth={0.3}
      />

      {/* Stage left / center / right dividers */}
      <line
        x1="33"
        y1="14"
        x2="33"
        y2="50"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={0.15}
        strokeDasharray="1 1"
      />
      <line
        x1="67"
        y1="14"
        x2="67"
        y2="50"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={0.15}
        strokeDasharray="1 1"
      />

      {/* Downstage lip / front edge */}
      <line
        x1="3"
        y1="50"
        x2="97"
        y2="50"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth={0.45}
      />

      {/* Front-of-stage strip */}
      <rect
        x="3"
        y="50"
        width="94"
        height="8"
        fill="rgba(255,255,255,0.02)"
      />

      {/* Audience floor */}
      <rect
        x="3"
        y="58"
        width="94"
        height="34"
        fill="rgba(80,100,120,0.06)"
      />

      {/* FOH zone hint — rear-right of audience */}
      <ellipse
        cx="72"
        cy="76"
        rx="22"
        ry="12"
        fill="rgba(255,255,255,0.015)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.2}
        strokeDasharray="1.5 1"
      />

      {/* Truss marks — upstage */}
      <line x1="28" y1="10" x2="28" y2="14" stroke="rgba(148,163,184,0.3)" strokeWidth={0.3} />
      <line x1="72" y1="10" x2="72" y2="14" stroke="rgba(148,163,184,0.3)" strokeWidth={0.3} />

      {/* Audience seating rows */}
      {[62, 66, 70, 74, 78, 82].map((y) => (
        <path
          key={y}
          d={`M8 ${y} Q50 ${y + 0.8} 92 ${y}`}
          fill="none"
          stroke="rgba(255,255,255,0.035)"
          strokeWidth={0.12}
        />
      ))}

      {/* Stage side steps suggestion */}
      <path d="M3 42 L1 46 L3 50" fill="none" stroke="rgba(180,150,110,0.2)" strokeWidth={0.25} />
      <path d="M97 42 L99 46 L97 50" fill="none" stroke="rgba(180,150,110,0.2)" strokeWidth={0.25} />
    </svg>
  );
}

function BlueprintMapLabels() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      <p
        className="absolute left-1/2 top-[1%] -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-600 sm:text-[9px]"
      >
        Back of Stage
      </p>

      <p
        className="absolute text-[8px] font-medium text-slate-500 sm:text-[9px]"
        style={{ left: "6%", top: "17%" }}
      >
        Stage Left
      </p>
      <p
        className="absolute hidden text-[7px] text-slate-600 sm:block"
        style={{ left: "6%", top: "20%" }}
      >
        Left when facing audience
      </p>

      <p
        className="absolute left-1/2 -translate-x-1/2 text-[8px] font-medium text-slate-500 sm:text-[9px]"
        style={{ top: "17%" }}
      >
        Center Stage
      </p>

      <p
        className="absolute text-right text-[8px] font-medium text-slate-500 sm:text-[9px]"
        style={{ right: "6%", top: "17%" }}
      >
        Stage Right
      </p>
      <p
        className="absolute hidden text-right text-[7px] text-slate-600 sm:block"
        style={{ right: "6%", top: "20%" }}
      >
        Right when facing audience
      </p>

      <p
        className="absolute left-1/2 top-[51%] -translate-x-1/2 text-[8px] font-medium uppercase tracking-wide text-slate-500"
      >
        Front of Stage
      </p>

      <p
        className="absolute left-1/2 top-[59%] -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600"
      >
        Audience
      </p>

      <p
        className="absolute text-[8px] font-medium text-slate-500"
        style={{ left: "58%", top: "68%" }}
      >
        FOH Position
      </p>

      {/* Orientation cue */}
      <div
        className="absolute bottom-[2%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-0.5"
      >
        <svg viewBox="0 0 24 16" className="h-3 w-6 text-slate-500" aria-hidden>
          <path
            d="M12 2 L12 12 M8 8 L12 2 L16 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-[9px] font-medium text-slate-500 sm:text-[10px]">
          Audience faces stage
        </p>
      </div>
    </div>
  );
}

export function BlueprintMap({
  blueprint,
  overlay,
  selectedItemId,
  onSelectItem,
}: BlueprintMapProps) {
  return (
    <div
      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-lg border border-white/[0.06] bg-[#040810] sm:rounded-xl"
      style={{ aspectRatio: "4 / 5" }}
    >
      <p className="sr-only">
        Top-down theater map for {blueprint.venue.name}. Stage at the top,
        audience at the bottom. Tap equipment to view details.
      </p>

      <BlueprintMapEnvironment />
      <BlueprintMapLabels />

      {blueprint.items.map((item) => (
        <BlueprintMapItem
          key={item.id}
          item={item}
          overlay={overlay}
          selected={selectedItemId === item.id}
          onSelect={onSelectItem}
        />
      ))}
    </div>
  );
}
