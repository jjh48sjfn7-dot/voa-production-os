"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { voaLabels } from "@/data/audio/venue";
import { departmentAccents, theme } from "@/lib/theme";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href?: string) {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    if (href === "/audio") return pathname === "/audio";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function isChildActive(href: string) {
    return pathname === href;
  }

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r ${theme.cardBorder} ${theme.backgroundAlt}/98 shadow-[4px_0_24px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-transform duration-250 ease-[cubic-bezier(0.32,0.72,0,1)] lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`flex h-16 shrink-0 items-center justify-between border-b ${theme.cardBorder} px-6`}
        >
          <Link href="/" onClick={onClose} className="group min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-red-400">
              VOA Antioch
            </p>
            <p className="truncate text-sm font-semibold tracking-[-0.01em] text-white transition-colors duration-150 group-hover:text-red-300">
              {voaLabels.sundayExperience}
            </p>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl text-slate-400 transition-[background-color,color,transform] duration-200 hover:bg-white/[0.06] hover:text-white active:scale-95 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const accent = item.accent ?? "default";
              const colors = departmentAccents[accent];

              return (
                <li key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-[background-color,color] duration-200 ease-out ${
                        active && !item.children?.some((c) => isChildActive(c.href!))
                          ? `${colors.bg} ${colors.text} shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`
                          : `${theme.text.secondary} hover:bg-white/[0.05] hover:text-white active:bg-white/[0.07]`
                      }`}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        active && !item.children?.some((c) => isChildActive(c.href!))
                          ? "bg-white/[0.06]"
                          : "bg-transparent"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium ${theme.text.primary}`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                  )}

                  {item.children && (
                    <ul
                      className={`ml-3 mt-1 space-y-0.5 border-l ${theme.cardBorder} pl-3`}
                    >
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const childActive = isChildActive(child.href!);
                        const childColors = departmentAccents[child.accent ?? accent];

                        return (
                          <li key={child.label}>
                            <Link
                              href={child.href!}
                              onClick={onClose}
                              className={`relative flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-[background-color,color] duration-200 ease-out ${
                                childActive
                                  ? `${childColors.bg} ${childColors.text} font-medium before:absolute before:-left-3 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-red-500/70`
                                  : `${theme.text.muted} hover:bg-white/[0.05] hover:text-slate-300 active:bg-white/[0.07]`
                              }`}
                            >
                              <ChildIcon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                              {child.label}
                              {childActive && (
                                <ChevronRight className="ml-auto h-3 w-3 opacity-50" />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`shrink-0 border-t ${theme.cardBorder} px-6 py-5`}>
          <p className={`text-xs font-medium ${theme.text.muted}`}>
            VOA Production OS v1.0
          </p>
          <p className="mt-0.5 text-xs text-slate-600">
            Built for Victory Outreach Antioch
          </p>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
    </>
  );
}
