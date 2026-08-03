"use client";

import Link from "next/link";
import { ArrowRight, Headphones, Play, Radio, Search } from "lucide-react";
import { Breadcrumbs } from "@/components/audio/Breadcrumbs";
import { PageSkeleton } from "@/components/audio/PageSkeleton";
import { EmptyState } from "@/components/audio/EmptyState";
import { audioHubMeta, audioPages } from "@/data/audio/pages";
import { voaLabels, voaVenue } from "@/data/audio/venue";
import { useSearch } from "@/lib/search-context";
import { useMounted } from "@/hooks/useMounted";
import { useScrolled } from "@/hooks/useScrolled";
import { audioStyles } from "@/lib/audio-styles";
import { uiPageIcon } from "@/lib/ui-tokens";
import { departmentAccents } from "@/lib/theme";
import { SectionHeader } from "@/components/ui/PageHeader";

export function AudioHubContent() {
  const { matchesQuery } = useSearch();
  const mounted = useMounted();
  const headerScrolled = useScrolled(8);
  const colors = departmentAccents.audio;

  const resources = audioPages.filter((p) => p.id !== "production");
  const filtered = resources.filter(
    (page) => matchesQuery(page.title) || matchesQuery(page.description)
  );

  if (!mounted) return <PageSkeleton />;

  return (
    <div className={audioStyles.page}>
      <div
        className={audioStyles.stickyHeader}
        data-scrolled={headerScrolled || undefined}
      >
        <Breadcrumbs items={[{ label: voaLabels.audioDepartment }]} />

        <header className="mt-4">
          <div className="flex items-start gap-4">
            <div className={uiPageIcon}>
              <Headphones />
            </div>
            <div className="min-w-0 pt-0.5">
              <h1 className={audioStyles.display}>{audioHubMeta.title}</h1>
              <p className={`mt-1.5 max-w-3xl ${audioStyles.body}`}>
                {audioHubMeta.description}
              </p>
            </div>
          </div>
        </header>
      </div>

      {/* Sunday Experience hero */}
      <Link href="/audio/production" className="group block animate-fade-in">
        <div
          className={`relative overflow-hidden ${audioStyles.glass} ${audioStyles.cardHover} ${audioStyles.cardPadLg} ${colors.glow}`}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-500/10 blur-3xl transition-opacity duration-[250ms] group-hover:opacity-100" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.iconBg} ring-1 ring-red-500/15`}
              >
                <Radio className="h-6 w-6" />
              </div>
              <div>
                <p className={audioStyles.label}>
                  Primary · {voaLabels.sundayExperience}
                </p>
                <h2 className={`mt-1 ${audioStyles.displayLg}`}>
                  {voaLabels.sundayExperience}
                </h2>
                <p className={`mt-1.5 max-w-lg ${audioStyles.body}`}>
                  Countdown to {voaLabels.serviceLive}, live timeline,{" "}
                  {voaLabels.productionReady.toLowerCase()}, {voaLabels.qscMains},{" "}
                  and emergency shortcuts.
                </p>
              </div>
            </div>
            <span className={`${audioStyles.btnPrimary} shrink-0 self-start sm:self-center`}>
              <Play className="h-4 w-4 fill-current" />
              Open {voaLabels.sundayExperience}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>

      <section className="animate-fade-in">
        <SectionHeader
          title="Guides & Resources"
          description={`Reference docs for ${voaVenue.church} ${voaLabels.audioDepartment}`}
        />

        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No guides found"
            description="Try a different search term to find audio resources."
          />
        ) : (
          <div className={`grid sm:grid-cols-2 ${audioStyles.gridGap}`}>
            {filtered.map((page, i) => {
              const Icon = page.icon;
              return (
                <Link key={page.id} href={page.href} className="group block">
                  <div
                    className={`h-full ${audioStyles.glass} ${audioStyles.cardHover} ${audioStyles.cardPad} ${audioStyles.cardGlow} animate-fade-in`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colors.iconBg} ring-1 ring-white/[0.06] ${audioStyles.transition} group-hover:ring-red-500/20`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className={audioStyles.heading}>{page.title}</h3>
                          <p className={`mt-1.5 line-clamp-2 ${audioStyles.body}`}>
                            {page.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        className={`h-5 w-5 shrink-0 text-slate-600 ${audioStyles.transition} group-hover:translate-x-0.5 ${colors.text}`}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
