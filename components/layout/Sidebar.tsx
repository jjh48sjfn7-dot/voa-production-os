"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Home, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { BrandSidebarBranding } from "@/components/layout/BrandMark";
import { SidebarEmergency } from "@/components/layout/SidebarEmergency";
import { departmentAccents, shellTokens, theme } from "@/lib/theme";
import type { DepartmentAccent } from "@/lib/theme";
import type { NavItem } from "@/types";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const DEPARTMENT_SHORT_LABELS: Record<string, string> = {
  "/audio": "Audio",
  "/lighting": "Lighting",
  "/media": "Media",
};

function isDepartmentActive(href: string, pathname: string) {
  if (href === "/audio") {
    return pathname === "/audio" || pathname.startsWith("/audio/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getExpandedDepartments(pathname: string): Record<string, boolean> {
  const expanded: Record<string, boolean> = {};

  for (const item of navItems) {
    if (item.children && item.href) {
      expanded[item.href] = isDepartmentActive(item.href, pathname);
    }
  }

  return expanded;
}

function getDepartmentLabel(item: NavItem): string {
  if (!item.href) return item.label;
  return DEPARTMENT_SHORT_LABELS[item.href] ?? item.label.replace(/ Department$/, "");
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedDepartments, setExpandedDepartments] = useState<
    Record<string, boolean>
  >(() => getExpandedDepartments(pathname));

  useEffect(() => {
    setExpandedDepartments(getExpandedDepartments(pathname));
  }, [pathname]);

  const dashboardItem = navItems.find((item) => item.href === "/");
  const departmentItems = navItems.filter((item) => item.children && item.href);

  function isDashboardActive() {
    return pathname === "/";
  }

  function isChildActive(href: string) {
    return pathname === href;
  }

  function toggleDepartment(href: string) {
    setExpandedDepartments((current) => ({
      ...current,
      [href]: !current[href],
    }));
  }

  function renderDepartmentItem(item: NavItem) {
    const Icon = item.icon;
    const href = item.href!;
    const accent = (item.accent ?? "default") as DepartmentAccent;
    const colors = departmentAccents[accent];
    const departmentActive = isDepartmentActive(href, pathname);
    const expanded = !!expandedDepartments[href];
    const hasActiveChild = item.children?.some((child) =>
      isChildActive(child.href!)
    );
    const headerHighlighted = departmentActive || expanded;
    const headerActive =
      departmentActive && !hasActiveChild;

    return (
      <li key={item.href}>
        <div
          className={`relative flex min-h-[44px] items-center rounded-lg transition-[background-color,color,border-color,box-shadow] duration-200 ease-out ${
            headerHighlighted
              ? `${shellTokens.sidebar.navActive} ${colors.headerRail} ${
                  headerActive ? colors.text : "text-white/80"
                }`
              : `${theme.text.secondary} ${shellTokens.nav.rowHover}`
          }`}
        >
          <Link
            href={href}
            onClick={onClose}
            className={`flex min-h-[44px] min-w-0 flex-1 items-center gap-3 px-3 py-2 text-sm font-medium ${shellTokens.nav.rowFocus}`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                headerHighlighted ? "bg-white/[0.04]" : "bg-transparent"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  headerHighlighted ? colors.text : "text-white/55"
                }`}
              />
            </span>
            <span className="truncate">{getDepartmentLabel(item)}</span>
          </Link>
          <button
            type="button"
            onClick={() => toggleDepartment(href)}
            aria-expanded={expanded}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${getDepartmentLabel(item)}`}
            className={`mr-1 flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-md ${shellTokens.nav.chevron} ${shellTokens.nav.rowFocus}`}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-200 ease-out ${
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul
              className={`ml-4 space-y-0.5 border-l ${shellTokens.nav.submenuRail} pl-3 ${
                expanded ? "mt-1 pb-0.5" : "mt-0"
              }`}
            >
              {item.children!.map((child) => {
                const ChildIcon = child.icon;
                const childActive = isChildActive(child.href!);
                const childColors = departmentAccents[child.accent ?? accent];

                return (
                  <li key={child.label}>
                    <Link
                      href={child.href!}
                      onClick={onClose}
                      className={`relative flex items-center gap-2 ${shellTokens.sidebar.submenuLink} ${shellTokens.nav.rowFocus} ${
                        childActive
                          ? `${shellTokens.sidebar.navActive} ${childColors.headerRail} ${childColors.text} font-medium`
                          : shellTokens.sidebar.submenuIdle
                      }`}
                    >
                      <ChildIcon
                        className={`h-3.5 w-3.5 shrink-0 ${
                          childActive ? childColors.text : "text-white/35"
                        }`}
                      />
                      {child.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </li>
    );
  }

  const dashboardActive = isDashboardActive();

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r ${theme.cardBorder} bg-[#0D0D0D]/98 ${shellTokens.shadow.sidebar} backdrop-blur-2xl transition-transform duration-250 ease-[cubic-bezier(0.32,0.72,0,1)] lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`relative shrink-0 border-b ${theme.cardBorder} px-4 py-4 sm:px-5 sm:py-5`}
        >
          <Link
            href="/"
            onClick={onClose}
            className={`mx-auto flex w-full max-w-[14.5rem] justify-center ${shellTokens.nav.rowFocus} rounded-lg`}
          >
            <BrandSidebarBranding priority />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={`absolute right-3 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-lg text-white/45 transition-[background-color,color,transform] duration-200 hover:bg-white/[0.06] hover:text-white active:scale-95 lg:hidden ${shellTokens.nav.rowFocus}`}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-3 pt-3.5">
          {dashboardItem?.href && (
            <ul className="space-y-0.5">
              <li>
                <Link
                  href={dashboardItem.href}
                  onClick={onClose}
                  className={`relative flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${shellTokens.nav.row} ${shellTokens.nav.rowFocus} ${
                    dashboardActive
                      ? `${shellTokens.sidebar.navActive} ${shellTokens.sidebar.navActiveOrangeRail} text-white`
                      : `${theme.text.secondary} ${shellTokens.nav.rowHover} active:bg-white/[0.04]`
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                      dashboardActive
                        ? "bg-[#FF5A00]/10"
                        : "bg-transparent"
                    }`}
                  >
                    <Home
                      className={`h-4 w-4 ${
                        dashboardActive
                          ? shellTokens.sidebar.navActiveIcon
                          : "text-white/55"
                      }`}
                    />
                  </span>
                  Dashboard
                </Link>
              </li>
            </ul>
          )}

          <p className={shellTokens.sidebar.sectionLabel}>Departments</p>

          <ul className="space-y-0.5">
            {departmentItems.map((item) => renderDepartmentItem(item))}
          </ul>
        </nav>

        <SidebarEmergency onNavigate={onClose} />

        <div className={`shrink-0 border-t ${theme.cardBorder} px-5 py-3`}>
          <p className={`text-[11px] font-medium ${theme.text.muted}`}>
            VOA Production OS v1.0
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
