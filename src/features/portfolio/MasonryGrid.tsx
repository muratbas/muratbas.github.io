"use client";

import React, { useMemo } from "react";
import { MediaCard } from "./MediaCard";
import { WorkProject, VisualItem } from "./portfolio.types";

type PortfolioItem = (WorkProject | VisualItem) & {
  type: "work" | "visual";
};

interface MasonryGridProps {
  items: PortfolioItem[];
  onSelectWork: (project: WorkProject) => void;
  onSelectVisual: (visual: VisualItem) => void;
}

export function MasonryGrid({ items, onSelectWork, onSelectVisual }: MasonryGridProps) {
  // Partition items into 3 columns for desktop and 2 columns for tablet
  const columns3 = useMemo(() => {
    const cols: PortfolioItem[][] = [[], [], []];
    items.forEach((item, idx) => {
      cols[idx % 3].push(item);
    });
    return cols;
  }, [items]);

  const columns2 = useMemo(() => {
    const cols: PortfolioItem[][] = [[], []];
    items.forEach((item, idx) => {
      cols[idx % 2].push(item);
    });
    return cols;
  }, [items]);

  const renderCard = (item: PortfolioItem, priority = false) => {
    const handleClick = () => {
      if (item.type === "work") {
        onSelectWork(item as WorkProject);
      } else {
        onSelectVisual(item as VisualItem);
      }
    };

    return (
      <MediaCard
        key={item.id}
        id={item.id}
        title={item.title}
        subtitle={item.subtitle}
        aspectRatio={item.aspectRatio}
        imageUrl={item.imageUrl}
        onClick={handleClick}
        priority={priority}
      />
    );
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
      {/* Desktop 3-Column Layout (>= 1024px) */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-10">
        {columns3.map((col, colIdx) => (
          <div key={`col-3-${colIdx}`} className="flex flex-col">
            {col.map((item, itemIdx) => renderCard(item, itemIdx === 0))}
          </div>
        ))}
      </div>

      {/* Tablet 2-Column Layout (640px to 1023px) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:hidden gap-6 sm:gap-8">
        {columns2.map((col, colIdx) => (
          <div key={`col-2-${colIdx}`} className="flex flex-col">
            {col.map((item, itemIdx) => renderCard(item, itemIdx === 0))}
          </div>
        ))}
      </div>

      {/* Mobile 1-Column Layout (< 640px) */}
      <div className="flex flex-col sm:hidden">
        {items.map((item, idx) => renderCard(item, idx < 2))}
      </div>
    </section>
  );
}
