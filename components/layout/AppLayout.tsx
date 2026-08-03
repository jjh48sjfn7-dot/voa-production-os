"use client";

import { useState } from "react";
import { SearchProvider } from "@/lib/search-context";
import { theme } from "@/lib/theme";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { AppFooter } from "./AppFooter";
import { FloatingEmergencyButton } from "@/components/ui/FloatingEmergencyButton";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SearchProvider>
      <div className={`min-h-screen ${theme.background} ${theme.text.primary}`}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:pl-72">
          <TopBar
            onMenuClick={() => setSidebarOpen(true)}
            title={title}
          />
          <main className="animate-fade-in px-4 py-5 pb-28 pt-5 md:px-7 md:py-8 md:pb-24 lg:px-9">
            <div className="mx-auto max-w-6xl">
              {children}
              <AppFooter />
            </div>
          </main>
        </div>
        <FloatingEmergencyButton />
      </div>
    </SearchProvider>
  );
}
