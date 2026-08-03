"use client";

import { useScrolled } from "@/hooks/useScrolled";
import { audioStyles } from "@/lib/audio-styles";

interface StickyToolbarProps {
  children: React.ReactNode;
  className?: string;
}

/** Wraps page toolbars with scroll-reactive shadow. */
export function StickyToolbar({ children, className = "" }: StickyToolbarProps) {
  const scrolled = useScrolled(80);

  return (
    <div
      className={`${audioStyles.stickyToolbar} ${className}`}
      data-scrolled={scrolled || undefined}
    >
      {children}
    </div>
  );
}
