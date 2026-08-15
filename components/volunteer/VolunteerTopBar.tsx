"use client";

import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import { BrandCircleMark } from "@/components/layout/BrandMark";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { volunteerWorkspaceLabel } from "@/lib/volunteer/labels";
import { shellTokens } from "@/lib/theme";

export function VolunteerTopBar() {
  const session = useVolunteerSession();
  const noticeCount = session.notices.length;

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#141414]/94 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-3 px-4 lg:h-[3.75rem] lg:px-6">
        <div className="lg:hidden">
          <BrandCircleMark className="h-10 w-10 sm:h-11 sm:w-11" />
        </div>
        <p className="hidden min-w-0 truncate text-[13px] text-white/50 lg:block">
          {volunteerWorkspaceLabel(session)}
        </p>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-white/45 hover:bg-white/[0.06] hover:text-white ${shellTokens.nav.rowFocus}`}
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className={`relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-white/45 hover:bg-white/[0.06] hover:text-white ${shellTokens.nav.rowFocus}`}
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
            {noticeCount > 0 && (
              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#FF5A00]" />
            )}
          </button>
          <Link
            href="/volunteer/profile"
            className={`flex min-h-[44px] min-w-[44px] items-center justify-center ${shellTokens.nav.rowFocus}`}
            aria-label="Profile"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5A00]/18 text-[12px] font-semibold text-[#FF8A4C]">
              {session.user?.avatarInitials ? (
                session.user.avatarInitials
              ) : (
                <User className="h-4 w-4" strokeWidth={1.75} />
              )}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
