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
      <defs>
        <linearGradient id="bp-stage-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(12,16,24,0.95)" />
          <stop offset="100%" stopColor="rgba(8,10,16,0.98)" />
        </linearGradient>
        <linearGradient id="bp-audience-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(18,28,38,0.55)" />
          <stop offset="100%" stopColor="rgba(10,14,20,0.75)" />
        </linearGradient>
      </defs>

      {/* Back wall / upstage */}
      <rect x="0" y="0" width="100" height="12" fill="rgba(8,12,18,0.92)" />
      <line
        x1="0"
        y1="12"
        x2="100"
        y2="12"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={0.35}
      />

      {/* Curved stage platform — raised */}
      <path
        d="M6 48
           Q6 44 12 42
           Q50 36 88 42
           Q94 44 94 48
           L94 12
           Q50 8 6 12
           Z"
        fill="url(#bp-stage-floor)"
        stroke="rgba(180,140,90,0.22)"
        strokeWidth={0.35}
      />

      {/* Wood-trimmed curved downstage apron lip */}
      <path
        d="M6 48 Q50 52 94 48"
        fill="none"
        stroke="rgba(196,154,98,0.55)"
        strokeWidth={0.65}
      />
      <path
        d="M6 49.2 Q50 53.2 94 49.2"
        fill="none"
        stroke="rgba(120,90,55,0.35)"
        strokeWidth={0.25}
      />

      {/* Stage zone guides — subtle */}
      <line
        x1="32"
        y1="14"
        x2="30"
        y2="46"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={0.12}
        strokeDasharray="1.2 1.2"
      />
      <line
        x1="68"
        y1="14"
        x2="70"
        y2="46"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={0.12}
        strokeDasharray="1.2 1.2"
      />

      {/* Front overhead truss TR-1 – TR-6 (downstage edge) */}
      <line
        x1="8"
        y1="46.5"
        x2="92"
        y2="46.5"
        stroke="rgba(148,163,184,0.42)"
        strokeWidth={0.55}
      />
      <line
        x1="8"
        y1="45.2"
        x2="92"
        y2="45.2"
        stroke="rgba(148,163,184,0.18)"
        strokeWidth={0.25}
      />
      {[14, 26, 38, 50, 62, 74].map((x, i) => (
        <g key={x}>
          <line
            x1={x}
            y1="45"
            x2={x}
            y2="47.2"
            stroke="rgba(148,163,184,0.35)"
            strokeWidth={0.28}
          />
          <text
            x={x}
            y="44.2"
            textAnchor="middle"
            fill="rgba(148,163,184,0.35)"
            fontSize="2.2"
            fontWeight="600"
          >
            TR-{i + 1}
          </text>
        </g>
      ))}

      {/* Stage-left access stairs */}
      <path
        d="M6 38 L3.5 42 L3.5 48 L6 48"
        fill="rgba(20,24,32,0.6)"
        stroke="rgba(200,200,210,0.25)"
        strokeWidth={0.25}
      />
      {[39, 41.5, 44, 46.5].map((y) => (
        <line
          key={`sl-${y}`}
          x1="3.5"
          y1={y}
          x2="6"
          y2={y}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={0.12}
        />
      ))}

      {/* Stage-right access stairs */}
      <path
        d="M94 38 L96.5 42 L96.5 48 L94 48"
        fill="rgba(20,24,32,0.6)"
        stroke="rgba(200,200,210,0.25)"
        strokeWidth={0.25}
      />
      {[39, 41.5, 44, 46.5].map((y) => (
        <line
          key={`sr-${y}`}
          x1="94"
          y1={y}
          x2="96.5"
          y2={y}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={0.12}
        />
      ))}

      {/* Audience floor */}
      <path
        d="M4 54 Q50 50 96 54 L96 98 L4 98 Z"
        fill="url(#bp-audience-floor)"
      />

      {/* Tiered curved seating rows */}
      {[58, 62, 66, 70, 74, 78, 82, 86].map((y) => (
        <path
          key={y}
          d={`M10 ${y} Q50 ${y + 1.2} 90 ${y}`}
          fill="none"
          stroke="rgba(72,180,170,0.08)"
          strokeWidth={0.14}
        />
      ))}

      {/* Central aisle */}
      <path
        d="M50 54 L50 96"
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={0.35}
        strokeDasharray="1.5 1.2"
      />

      {/* Side aisles */}
      <path
        d="M22 56 Q21 76 20 94"
        fill="none"
        stroke="rgba(255,255,255,0.03)"
        strokeWidth={0.25}
        strokeDasharray="1 1"
      />
      <path
        d="M78 56 Q79 76 80 94"
        fill="none"
        stroke="rgba(255,255,255,0.03)"
        strokeWidth={0.25}
        strokeDasharray="1 1"
      />

      {/* House-right raised side platform / walkway (FOH) */}
      <path
        d="M68 60
           L96 58
           Q98 58 98 62
           L98 88
           Q98 92 94 92
           L68 90
           Q64 88 64 84
           L64 64
           Q64 60 68 60 Z"
        fill="rgba(255,255,255,0.025)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={0.3}
      />
      <line
        x1="64"
        y1="64"
        x2="98"
        y2="62"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.2}
      />
      <text
        x="82"
        y="66.5"
        textAnchor="middle"
        fill="rgba(148,163,184,0.35)"
        fontSize="2.4"
        fontWeight="600"
      >
        FOH PLATFORM
      </text>
    </svg>
  );
}

function BlueprintMapLabels() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      <p className="absolute left-1/2 top-[0.5%] -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-600 sm:text-[9px]">
        Back of Stage
      </p>

      <p
        className="absolute text-[8px] font-medium text-slate-500 sm:text-[9px]"
        style={{ left: "8%", top: "18%" }}
      >
        Stage Left
      </p>
      <p
        className="absolute hidden text-[7px] text-slate-600 sm:block"
        style={{ left: "8%", top: "21%" }}
      >
        Drums · Snake A
      </p>

      <p
        className="absolute left-1/2 -translate-x-1/2 text-[8px] font-medium text-slate-500 sm:text-[9px]"
        style={{ top: "18%" }}
      >
        Center Stage
      </p>
      <p
        className="absolute left-1/2 hidden -translate-x-1/2 text-[7px] text-slate-600 sm:block"
        style={{ top: "21%" }}
      >
        Center Mic
      </p>

      <p
        className="absolute text-right text-[8px] font-medium text-slate-500 sm:text-[9px]"
        style={{ right: "8%", top: "18%" }}
      >
        Stage Right
      </p>
      <p
        className="absolute hidden text-right text-[7px] text-slate-600 sm:block"
        style={{ right: "8%", top: "21%" }}
      >
        Keyboard · Snake B
      </p>

      <p
        className="absolute left-1/2 top-[47.5%] -translate-x-1/2 text-[7px] font-medium uppercase tracking-wide text-slate-500 sm:text-[8px]"
      >
        Front Truss · TR-1–TR-6
      </p>

      <p
        className="absolute left-1/2 top-[55%] -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-600"
      >
        Audience
      </p>

      <p
        className="absolute text-[7px] font-medium text-slate-500 sm:text-[8px]"
        style={{ left: "72%", top: "61%" }}
      >
        FOH · House Right
      </p>

      <div className="absolute bottom-[2%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-0.5">
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
  const sortedItems = [...blueprint.items].sort((a, b) => {
    if (a.status === "placeholder" && a.id === "subwoofer") return -1;
    if (b.status === "placeholder" && b.id === "subwoofer") return 1;
    return 0;
  });

  return (
    <div
      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-lg border border-white/[0.06] bg-[#03060c] sm:rounded-xl"
      style={{ aspectRatio: "4 / 5" }}
    >
      <p className="sr-only">
        Hybrid architectural theater map for {blueprint.venue.name}. Curved stage
        at the top, audience below, FOH on the house-right side platform. Tap
        equipment to view details.
      </p>

      <BlueprintMapEnvironment />
      <BlueprintMapLabels />

      {sortedItems.map((item) => (
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
