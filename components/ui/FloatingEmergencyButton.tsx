"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, X } from "lucide-react";
import { emergencyCategories } from "@/data/dashboard/v1";

interface FloatingEmergencyButtonProps {
  className?: string;
}

/** Mobile-only quick access when the sidebar drawer is closed. */
export function FloatingEmergencyButton({
  className = "",
}: FloatingEmergencyButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close emergency menu"
        />
      )}

      <div
        className={`fixed bottom-6 left-4 z-50 pb-[env(safe-area-inset-bottom)] sm:bottom-8 sm:left-8 ${className}`}
      >
        {open && (
          <div className="mb-3 w-[min(calc(100vw-2rem),280px)] animate-slide-up rounded-2xl border border-red-500/25 bg-[#141414]/95 p-3 shadow-2xl shadow-red-500/10 backdrop-blur-2xl">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                Emergency
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.06]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {emergencyCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={cat.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center justify-center rounded-xl bg-red-500/10 px-3 py-3 text-center text-sm font-medium text-red-300 ring-1 ring-red-500/20 transition-all active:scale-95 hover:bg-red-500/20"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex min-h-[52px] items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(239,68,68,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] transition-[transform,box-shadow] duration-200 ease-out active:scale-[0.97] ${
            open ? "ring-2 ring-red-400/40" : "hover:shadow-[0_6px_24px_rgba(239,68,68,0.4)]"
          }`}
          aria-label="Emergency troubleshooting"
          aria-expanded={open}
        >
          <AlertTriangle className="h-5 w-5" />
          <span className="hidden sm:inline">Emergency</span>
        </button>
      </div>
    </>
  );
}
