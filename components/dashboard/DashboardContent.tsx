"use client";

import { useEffect, useMemo, useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { DashboardDemoCard } from "@/components/dashboard/DashboardDemoCard";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import {
  DashboardEquipmentAlerts,
  DashboardIncompleteTasks,
  DashboardNextStep,
  DashboardReadinessPanel,
} from "@/components/dashboard/DashboardPanels";
import { ServiceTimeline } from "@/components/dashboard/ServiceTimeline";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageSkeleton } from "@/components/audio/PageSkeleton";
import { getAllChecklistItemIds } from "@/data/sunday-setup";
import { useChecklist } from "@/hooks/useChecklist";
import { useMounted } from "@/hooks/useMounted";
import { useProgress } from "@/hooks/useProgress";
import { buildDashboardSnapshot } from "@/lib/dashboard-state";
import { dashboardStyles } from "@/lib/dashboard-styles";
import { calculateProgress } from "@/lib/progress";
import { loadCheckedItems } from "@/lib/storage";
import { voaLabels, voaVenue } from "@/data/audio/venue";

const SETUP_STORAGE = "sunday-setup";

const MISSION =
  "Centralizing production knowledge so every volunteer can serve with confidence.";

export function DashboardContent() {
  const mounted = useMounted();
  const { checked } = useChecklist(SETUP_STORAGE);
  const setupIds = getAllChecklistItemIds();
  const setupProgress = useProgress(setupIds, checked);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const displayProgress =
    mounted && setupProgress.total > 0
      ? setupProgress
      : calculateProgress(loadCheckedItems(SETUP_STORAGE), setupIds);

  const snapshot = useMemo(() => {
    if (!mounted) return null;
    return buildDashboardSnapshot(checked, displayProgress, now);
  }, [mounted, checked, displayProgress, now]);

  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.enter} style={{ animationDelay: "0ms" }}>
        <PageHeader
          eyebrow="VOA Production OS"
          title={voaVenue.church}
          description={`${voaLabels.audioDepartment} · ${voaLabels.sundayExperience}`}
          icon={LayoutDashboard}
        />
        <blockquote
          className={`mt-5 border-l-2 border-red-500/40 pl-4 ${dashboardStyles.mission}`}
        >
          {MISSION}
        </blockquote>
      </div>

      <div className={dashboardStyles.slideUp} style={{ animationDelay: "40ms" }}>
        <DashboardDemoCard />
      </div>

      <div className={dashboardStyles.slideUp} style={{ animationDelay: "60ms" }}>
        <DashboardHero setupProgress={displayProgress} checked={checked} />
      </div>

      {mounted && snapshot ? (
        <>
          <div
            className={`grid gap-5 lg:grid-cols-3 ${dashboardStyles.slideUp}`}
            style={{ animationDelay: "120ms" }}
          >
            <div className="lg:col-span-1">
              <DashboardReadinessPanel snapshot={snapshot} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
              <DashboardIncompleteTasks snapshot={snapshot} />
              <DashboardEquipmentAlerts snapshot={snapshot} />
            </div>
          </div>

          <div className={dashboardStyles.slideUp} style={{ animationDelay: "180ms" }}>
            <DashboardNextStep nextStep={snapshot.nextStep} />
          </div>
        </>
      ) : (
        <div className={dashboardStyles.slideUp} style={{ animationDelay: "120ms" }}>
          <PageSkeleton />
        </div>
      )}

      <div className={dashboardStyles.slideUp} style={{ animationDelay: "240ms" }}>
        <ServiceTimeline />
      </div>
    </div>
  );
}
