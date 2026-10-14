"use client";

import React from "react";

export type TabKey = "work" | "visuals" | "writing" | "about";
export type VisualFilter = "all" | "art" | "photos";

interface NavMenuProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  visualFilter?: VisualFilter;
  onVisualFilterChange?: (filter: VisualFilter) => void;
}

const NAV_ITEMS: { key: TabKey; label: string }[] = [
  { key: "work", label: "WORK" },
  { key: "visuals", label: "VISUALS" },
  { key: "writing", label: "WRITING" },
  { key: "about", label: "ABOUT" },
];

export function NavMenu({
  activeTab,
  onTabChange,
  visualFilter = "all",
  onVisualFilterChange,
}: NavMenuProps) {
  return (
    <div className="flex flex-col items-center my-6 sm:my-8">
      {/* Primary Navigation Menu */}
      <nav className="flex items-center justify-center flex-wrap gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onTabChange(item.key)}
              className={`py-1 text-sm sm:text-base md:text-[17px] tracking-[-0.02em] uppercase transition-colors duration-150 cursor-pointer select-none opacity-100 ${
                isActive
                  ? "text-neutral-950 font-bold hover:text-blue-600"
                  : "text-neutral-900 font-normal hover:text-blue-600"
              }`}
            >
              {item.label}
            </button>
          );
        })}

        {/* CV Tab Link - Underlined, strictly NOT bold (font-normal) */}
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="py-1 text-sm sm:text-base md:text-[17px] tracking-[-0.02em] uppercase font-normal text-neutral-900 underline underline-offset-4 decoration-1 hover:text-blue-600 transition-colors cursor-pointer select-none opacity-100"
        >
          CV
        </a>
      </nav>

      {/* Visuals Sub-fork (ART / PHOTOS) */}
      {activeTab === "visuals" && (
        <div className="flex items-center justify-center space-x-6 sm:space-x-8 mt-3.5 animate-fadeIn select-none">
          <button
            type="button"
            onClick={() =>
              onVisualFilterChange?.(visualFilter === "art" ? "all" : "art")
            }
            className={`py-0.5 text-xs sm:text-sm tracking-[-0.02em] uppercase transition-colors cursor-pointer ${
              visualFilter === "art"
                ? "font-bold text-neutral-950 underline underline-offset-4 decoration-1 hover:text-blue-600"
                : "font-normal text-neutral-500 hover:text-blue-600"
            }`}
          >
            ART
          </button>
          <span className="text-neutral-300 text-xs select-none">/</span>
          <button
            type="button"
            onClick={() =>
              onVisualFilterChange?.(visualFilter === "photos" ? "all" : "photos")
            }
            className={`py-0.5 text-xs sm:text-sm tracking-[-0.02em] uppercase transition-colors cursor-pointer ${
              visualFilter === "photos"
                ? "font-bold text-neutral-950 underline underline-offset-4 decoration-1 hover:text-blue-600"
                : "font-normal text-neutral-500 hover:text-blue-600"
            }`}
          >
            PHOTOS
          </button>
        </div>
      )}
    </div>
  );
}
