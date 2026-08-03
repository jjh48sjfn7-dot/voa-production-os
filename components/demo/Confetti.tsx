"use client";

import { useMemo } from "react";

const COLORS = [
  "bg-red-400/80",
  "bg-emerald-400/70",
  "bg-amber-400/70",
  "bg-blue-400/60",
  "bg-purple-400/60",
];

interface ConfettiProps {
  active?: boolean;
}

export function Confetti({ active = true }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${(i * 17) % 100}%`,
        delay: `${(i * 0.07) % 2.5}s`,
        duration: `${2.2 + (i % 5) * 0.35}s`,
        color: COLORS[i % COLORS.length],
        size: i % 3 === 0 ? "h-2 w-1" : i % 3 === 1 ? "h-1.5 w-1.5" : "h-1 w-2",
        rotate: i % 2 === 0 ? "rotate-12" : "-rotate-12",
      })),
    []
  );

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden
    >
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`absolute top-0 rounded-sm opacity-0 motion-safe:animate-confetti-fall ${piece.color} ${piece.size} ${piece.rotate}`}
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
          }}
        />
      ))}
    </div>
  );
}
