"use client";

import { Menu } from "lucide-react";
import { GlobalSearchBar } from "@/components/ui/GlobalSearchBar";
import { useScrolled } from "@/hooks/useScrolled";
import { appUi } from "@/lib/app-ui";
import { theme } from "@/lib/theme";

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
        <button
          type="button"
          onClick={onMenuClick}
          className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl text-slate-400 transition-[background-color,color,transform] duration-200 ease-out hover:bg-white/[0.06] hover:text-white active:scale-95 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {title && (
          <h1
            className={`hidden truncate text-[13px] font-medium tracking-[-0.01em] sm:block ${theme.text.secondary}`}
          >
            {title}
          </h1>
        )}

        <div className="ml-auto w-full max-w-md flex-1 sm:max-w-lg">
          <GlobalSearchBar />
        </div>
      </div>
    </header>
  );
}
