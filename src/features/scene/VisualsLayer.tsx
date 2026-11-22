"use client";

import React, { useState, useMemo } from "react";
import { VISUAL_ITEMS } from "@/features/portfolio/portfolio.data";
import { VisualItem } from "@/features/portfolio/portfolio.types";
import { DitherMediaCard } from "@/components/DitherMediaCard";

interface VisualsLayerProps {
  onBack: () => void;
  theme: "day" | "night";
}

export function VisualsLayer({ onBack, theme }: VisualsLayerProps) {
  const [filter, setFilter] = useState<"all" | "art" | "photos">("all");
  const [activeItem, setActiveItem] = useState<VisualItem | null>(null);

  const filteredItems = useMemo(() => {
    if (filter === "all") return VISUAL_ITEMS;
    return VISUAL_ITEMS.filter((item) => item.category === filter);
  }, [filter]);

  const textColorClass = theme === "day" ? "text-[#121212]" : "text-[#F3F2EE]";
  const subTextColorClass = theme === "day" ? "text-[#121212]/60" : "text-[#F3F2EE]/60";

  return (
    <div className={`w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 sm:px-6 ${textColorClass}`}>
      {/* Top action header */}
      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <button
          type="button"
          onClick={onBack}
          className="text-sm sm:text-base opacity-70 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1.5"
        >
          <span>←</span>
          <span>back</span>
        </button>

        {/* Category Filters */}
        <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider">
          {(["all", "art", "photos"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`cursor-pointer transition-opacity ${
                filter === cat
                  ? "opacity-100 underline underline-offset-4 font-semibold"
                  : "opacity-40 hover:opacity-80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Visuals Masonry/Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 cursor-pointer group"
            onClick={() => setActiveItem(item)}
          >
            <DitherMediaCard
              src={item.imageUrl}
              alt={item.title}
              aspectClassName={
                item.aspectRatio === "tall"
                  ? "aspect-[3/4]"
                  : item.aspectRatio === "square"
                  ? "aspect-square"
                  : item.aspectRatio === "wide"
                  ? "aspect-[16/9]"
                  : "aspect-[4/3]"
              }
              theme={theme}
            />

            <div className="flex items-baseline justify-between mt-1">
              <h4 className="text-xs uppercase font-mono tracking-wider truncate">
                {item.title}
              </h4>
              <span className={`text-[11px] font-mono ${subTextColorClass}`}>
                {item.year}
              </span>
            </div>
            {item.medium && (
              <p className={`text-[11px] line-clamp-1 ${subTextColorClass}`}>
                {item.medium}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Full-view Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md bg-black/75 animate-fadeIn cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`max-w-3xl w-full max-h-[90vh] flex flex-col gap-4 p-4 sm:p-6 rounded-2xl ${
              theme === "day" ? "bg-[#F3F2EE] text-[#121212]" : "bg-[#121212] text-[#F3F2EE]"
            } shadow-2xl border border-current/10 cursor-default overflow-y-auto`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-current/10">
              <span className="text-xs font-mono uppercase tracking-widest opacity-60">
                {activeItem.category} {"//"} {activeItem.year}
              </span>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="text-xs uppercase font-mono tracking-wider opacity-60 hover:opacity-100 cursor-pointer"
              >
                [close ✕]
              </button>
            </div>

            <div className="w-full flex items-center justify-center bg-black/5 rounded-xl overflow-hidden py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1 pt-1">
              <h3 className="text-base sm:text-lg font-mono uppercase font-medium">
                {activeItem.title}
              </h3>
              <p className="text-xs opacity-70">
                {activeItem.medium} {activeItem.client ? `— for ${activeItem.client}` : ""}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
