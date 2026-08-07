"use client";

import type { BlueprintOverlayId, TheaterBlueprint } from "@/data/blueprint/types";
import { BlueprintMapItem } from "@/components/blueprint/BlueprintMapItem";

interface BlueprintMapProps {
  blueprint: TheaterBlueprint;
  overlay: BlueprintOverlayId;
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
}

function BlueprintMapBackground({ blueprint }: { blueprint: TheaterBlueprint }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {blueprint.mapRegions.map((region) => (
        <g key={region.id}>
          <rect
            x={region.bounds.x}
            y={region.bounds.y}
            width={region.bounds.w}
            height={region.bounds.h}
            rx={0.8}
            fill="transparent"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={0.2}
            strokeDasharray={region.id === "foh" ? "1.2 0.8" : "0.6 0.6"}
          />
        </g>
      ))}

      {/* Stage platform outline */}
      <rect
        x="4"
        y="14"
        width="92"
        height="36"
        rx="1"
        fill="rgba(255,255,255,0.015)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={0.25}
      />
      <line
        x1="33"
        y1="14"
        x2="33"
        y2="50"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.2}
        strokeDasharray="0.8 0.8"
      />
      <line
        x1="67"
        y1="14"
        x2="67"
        y2="50"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.2}
        strokeDasharray="0.8 0.8"
      />

      {/* Truss reference marks */}
      <line x1="28" y1="12" x2="28" y2="16" stroke="rgba(148,163,184,0.35)" strokeWidth={0.35} />
      <line x1="72" y1="12" x2="72" y2="16" stroke="rgba(148,163,184,0.35)" strokeWidth={0.35} />
      <text x="28" y="11" textAnchor="middle" fill="rgba(148,163,184,0.45)" fontSize="2.2">
        Truss
      </text>
      <text x="72" y="11" textAnchor="middle" fill="rgba(148,163,184,0.45)" fontSize="2.2">
        Truss
      </text>

      {/* Audience seating hint */}
      {[62, 66, 70, 74, 78].map((y) => (
        <line
          key={y}
          x1="10"
          y1={y}
          x2="90"
          y2={y}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={0.15}
        />
      ))}
    </svg>
  );
}

function BlueprintMapLabels({ blueprint }: { blueprint: TheaterBlueprint }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {blueprint.mapRegions.map((region) => (
        <div
          key={region.id}
          className="absolute px-1"
          style={{
            left: `${region.bounds.x}%`,
            top: `${region.bounds.y + 0.5}%`,
            width: `${region.bounds.w}%`,
          }}
        >
          <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-500 sm:text-[9px]">
            {region.label}
          </p>
          {region.beginnerLabel && (
            <p className="hidden text-[8px] text-slate-600 sm:block">
              {region.beginnerLabel}
            </p>
          )}
        </div>
      ))}

      <div
        className="absolute text-center"
        style={{ left: "4%", top: "18%", width: "28%" }}
      >
        <p className="text-[8px] font-medium text-slate-500 sm:text-[9px]">
          Stage Left
        </p>
        <p className="hidden text-[7px] leading-snug text-slate-600 sm:block">
          Left when facing audience
        </p>
      </div>
      <div
        className="absolute text-center"
        style={{ left: "68%", top: "18%", width: "28%" }}
      >
        <p className="text-[8px] font-medium text-slate-500 sm:text-[9px]">
          Stage Right
        </p>
        <p className="hidden text-[7px] leading-snug text-slate-600 sm:block">
          Right when facing audience
        </p>
      </div>
      <div
        className="absolute text-center"
        style={{ left: "36%", top: "18%", width: "28%" }}
      >
        <p className="text-[8px] font-medium text-slate-500 sm:text-[9px]">
          Center Stage
        </p>
      </div>

      <div
        className="absolute flex w-full flex-col items-center"
        style={{ top: "92%" }}
      >
        <p className="text-[10px] font-semibold text-slate-400 sm:text-xs">
          ↑ Audience faces this direction ↑
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
      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-white/[0.08] bg-[#050a12]"
      style={{ aspectRatio: "4 / 5" }}
    >
      <p className="sr-only">
        Top-down theater map for {blueprint.venue.name}. Back of stage at the
        top, audience at the bottom. Select equipment to view details.
      </p>

      <BlueprintMapBackground blueprint={blueprint} />
      <BlueprintMapLabels blueprint={blueprint} />

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
