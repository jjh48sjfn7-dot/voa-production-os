"use client";

import {
  dashboardBlueprint,
  dashboardBlueprintIcon,
  dashboardContinue,
  dashboardContinueIcon,
  dashboardDepartments,
  dashboardQuickAccess,
} from "@/data/dashboard/v2";
import { DashboardRow } from "@/components/dashboard/DashboardRow";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { dashboardStyles } from "@/lib/dashboard-styles";

function focusGlobalSearch() {
  document
    .querySelector<HTMLInputElement>('input[aria-label="Search portal"]')
    ?.focus();
}

export function DashboardContent() {
  return (
    <div className="space-y-10 md:space-y-12">
      <DashboardSection title="Continue">
        <DashboardRow
          href={dashboardContinue.href}
          icon={dashboardContinueIcon}
          accent="audio"
          description={dashboardContinue.eyebrow}
          title={dashboardContinue.title}
        />
      </DashboardSection>

      <DashboardSection title="Master Church Blueprint">
        <DashboardRow
          href={dashboardBlueprint.href}
          icon={dashboardBlueprintIcon}
          accent="operations"
          description={dashboardBlueprint.description}
          title={dashboardBlueprint.title}
        />
      </DashboardSection>

      <DashboardSection title="Departments">
        <div className="divide-y divide-white/[0.06]">
          {dashboardDepartments.map((department) => (
            <DashboardRow
              key={department.id}
              href={department.href}
              icon={department.icon}
              accent={department.accent}
              title={department.name}
              description={department.description}
            />
          ))}
        </div>
      </DashboardSection>

      <DashboardSection title="Quick Access">
        <div className="divide-y divide-white/[0.06]">
          {dashboardQuickAccess.map((item) => (
            <DashboardRow
              key={item.id}
              href={item.href}
              icon={item.icon}
              accent="default"
              title={item.label}
              onClick={
                item.action === "focus-search" ? focusGlobalSearch : undefined
              }
            />
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
