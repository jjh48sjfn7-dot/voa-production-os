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

export function VolunteerBottomNav() {
  const pathname = usePathname();
  const active = getVolunteerNavMatch(pathname);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#141414]/96 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
      aria-label="Volunteer"
    >
      <ul className="grid grid-cols-5 px-1 pt-1">
        {volunteerNavItems.map((item) => {
          const Icon = icons[item.match];
          const isActive = active === item.match;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-medium ${
                  isActive ? "text-[#FF5A00]" : "text-white/45"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
