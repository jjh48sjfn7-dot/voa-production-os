"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { emergencyCategories } from "@/data/dashboard/v1";
import { shellTokens } from "@/lib/theme";

interface SidebarEmergencyProps {
  onNavigate?: () => void;
}

export function SidebarEmergency({ onNavigate }: SidebarEmergencyProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/[0.06] px-3 py-3">
      {open && (
        <div className="mb-2 animate-slide-up rounded-lg border border-red-500/15 bg-[#1A1A1A]/95 p-2">
          <div className="grid grid-cols-2 gap-1.5">
            {emergencyCategories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="flex min-h-[44px] items-center justify-center rounded-md border border-red-500/15 bg-red-500/[0.06] px-2 py-2 text-center text-[12px] font-medium leading-snug text-red-300 transition-colors hover:border-red-500/25 hover:bg-red-500/10"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Emergency troubleshooting"
        className={`relative w-full ${shellTokens.sidebar.emergencyRow} ${shellTokens.sidebar.emergencyRail} ${shellTokens.nav.rowFocus}`}
      >
        <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
        <span>Emergency</span>
      </button>
    </div>
  );
}
