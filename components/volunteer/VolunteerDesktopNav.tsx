"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  HelpCircle,
  Home,
  Layers,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandMark";
import {
  getVolunteerNavMatch,
  volunteerNavItems,
} from "@/lib/volunteer/nav";

const icons = {
  home: Home,
  journey: BookOpen,
  sunday: CalendarDays,
  department: Layers,
  help: HelpCircle,
} as const;

export function VolunteerDesktopNav() {
  const pathname = usePathname();
  const active = getVolunteerNavMatch(pathname);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 border-r border-white/[0.08] bg-[#141414] lg:flex lg:flex-col">
      <div className="flex flex-col items-center px-5 pb-4 pt-6">
        <BrandLogo
          asset="primary"
          className="h-auto w-full max-w-[9.5rem] object-contain object-center"
        />
        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
          Volunteer
        </p>
      </div>
      <nav className="flex-1 px-3 pt-2" aria-label="Volunteer">
        <ul className="space-y-1">
          {volunteerNavItems.map((item) => {
            const Icon = icons[item.match];
            const isActive = active === item.match;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white/[0.06] text-white"
                      : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                  }`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] ${isActive ? "text-[#FF5A00]" : ""}`}
                    strokeWidth={1.75}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
