"use client";

import { Menu } from "lucide-react";
import { BrandCircleMark } from "@/components/layout/BrandMark";
import { GlobalSearchBar } from "@/components/ui/GlobalSearchBar";
import { useScrolled } from "@/hooks/useScrolled";
import { appUi } from "@/lib/app-ui";
import { shellTokens, theme } from "@/lib/theme";

interface TopBarProps {
  onMenuClick: () => void;
  title?: string;
}

export function TopBar({ onMenuClick, title }: TopBarProps) {
  const scrolled = useScrolled(4);

  return (
    <header
      className={`${appUi.stickyChrome} top-0 ${
        scrolled ? appUi.stickyChromeScrolled : ""
      }`}
    >
      <div className="flex h-[3.75rem] items-center gap-3 px-4 md:gap-4 md:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className={`flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl text-white/45 transition-[background-color,color,transform] duration-200 ease-out hover:bg-white/[0.06] hover:text-white active:scale-95 lg:hidden ${shellTokens.nav.rowFocus}`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block">
            <BrandCircleMark />
          </div>
        </div>

        {title && (
          <h1
            className={`hidden truncate text-[13px] font-medium tracking-[-0.01em] sm:block ${theme.text.secondary}`}
          >
            {title}
          </h1>
        )}

        <div className="ml-auto flex min-w-0 flex-1 items-center gap-1.5 sm:max-w-lg sm:gap-2 lg:max-w-md lg:flex-none lg:gap-3 xl:max-w-lg">
          <div className="lg:hidden">
            <BrandCircleMark />
          </div>
          <div className="min-w-0 flex-1">
            <GlobalSearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
