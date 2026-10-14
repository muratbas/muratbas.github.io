"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/features/navigation/Header";
import { Footer } from "@/features/navigation/Footer";
import { TabKey, VisualFilter } from "@/features/navigation/NavMenu";
import { MasonryGrid } from "@/features/portfolio/MasonryGrid";
import { WorkDrawer } from "@/features/portfolio/WorkDrawer";
import { Lightbox } from "@/features/portfolio/Lightbox";
import { WritingList } from "@/features/writing/WritingList";
import { AboutView } from "@/features/about/AboutView";
import { WORK_PROJECTS, VISUAL_ITEMS } from "@/features/portfolio/portfolio.data";
import { WorkProject, VisualItem } from "@/features/portfolio/portfolio.types";

function PortfolioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Single Source of Truth: derive activeTab & visualFilter directly from URL searchParams
  const tabParam = searchParams.get("tab") as TabKey | null;
  const activeTab: TabKey =
    tabParam && ["work", "visuals", "writing", "about"].includes(tabParam)
      ? tabParam
      : "work";

  const filterParam = searchParams.get("filter") as VisualFilter | null;
  const visualFilter: VisualFilter =
    filterParam && ["art", "photos"].includes(filterParam)
      ? filterParam
      : "all";

  const [selectedWork, setSelectedWork] = useState<WorkProject | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const handleTabChange = (newTab: TabKey) => {
    const url = newTab === "work" ? "/" : `/?tab=${newTab}`;
    router.push(url, { scroll: false });
  };

  const handleVisualFilterChange = (filter: VisualFilter) => {
    if (filter === "all") {
      router.push("/?tab=visuals", { scroll: false });
    } else {
      router.push(`/?tab=visuals&filter=${filter}`, { scroll: false });
    }
  };

  // Filter visual items based on active sub-filter
  const filteredVisuals = useMemo(() => {
    if (visualFilter === "all") return VISUAL_ITEMS;
    return VISUAL_ITEMS.filter((item) => item.category === visualFilter);
  }, [visualFilter]);

  const handleOpenVisual = (item: VisualItem) => {
    const index = filteredVisuals.findIndex((v) => v.id === item.id);
    if (index !== -1) {
      setLightboxIndex(index);
      setIsLightboxOpen(true);
    }
  };

  // Prepare items for MasonryGrid
  const workItems = WORK_PROJECTS.map((project) => ({
    ...project,
    type: "work" as const,
  }));

  const visualItems = filteredVisuals.map((visual) => ({
    ...visual,
    type: "visual" as const,
  }));

  return (
    <div className="flex-1 flex flex-col justify-between w-full min-h-screen">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        visualFilter={visualFilter}
        onVisualFilterChange={handleVisualFilterChange}
      />

      <main className="flex-1 w-full">
        {activeTab === "work" && (
          <MasonryGrid
            items={workItems}
            onSelectWork={(project) => setSelectedWork(project)}
            onSelectVisual={() => {}}
          />
        )}

        {activeTab === "visuals" && (
          <MasonryGrid
            items={visualItems}
            onSelectWork={() => {}}
            onSelectVisual={handleOpenVisual}
          />
        )}

        {activeTab === "writing" && <WritingList />}

        {activeTab === "about" && <AboutView />}
      </main>

      {/* Work Project Drawer / Modal */}
      <WorkDrawer
        project={selectedWork}
        onClose={() => setSelectedWork(null)}
      />

      {/* Visuals Lightbox */}
      <Lightbox
        items={filteredVisuals}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(index) => setLightboxIndex(index)}
      />

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
