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
    <div
      className={`flex flex-col items-center mt-6 sm:mt-8 transition-[margin] duration-150 ${
        activeTab === "visuals" ? "mb-12 sm:mb-14" : "mb-6 sm:mb-8"
      }`}
    >
      {/* Primary Navigation Menu */}
      <nav className="flex items-center justify-center flex-wrap gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key;

          if (item.key === "visuals") {
            return (
              <div key={item.key} className="relative inline-flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => onTabChange("visuals")}
                  className={`py-1 text-sm sm:text-base md:text-[17px] tracking-[-0.02em] uppercase transition-colors duration-150 cursor-pointer select-none opacity-100 ${
                    isActive
                      ? "text-[#2d2a24] font-bold hover:text-blue-600"
                      : "text-[#2d2a24] font-normal hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </button>

                {/* Sub-fork directly under VISUALS: ART on left, PHOTOS on right */}
                {activeTab === "visuals" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 sm:pt-1.5 flex items-center justify-center gap-3.5 sm:gap-4 whitespace-nowrap animate-fadeIn select-none">
                    <button
                      type="button"
                      onClick={() =>
                        onVisualFilterChange?.(visualFilter === "art" ? "all" : "art")
                      }
                      className={`py-0.5 text-xs sm:text-[13px] md:text-sm tracking-[-0.02em] uppercase transition-colors cursor-pointer ${
                        visualFilter === "art"
                          ? "font-bold text-[#2d2a24] underline underline-offset-4 decoration-1 hover:text-blue-600"
                          : "font-normal text-[#2d2a24]/60 hover:text-blue-600"
                      }`}
                    >
                      ART
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onVisualFilterChange?.(visualFilter === "photos" ? "all" : "photos")
                      }
                      className={`py-0.5 text-xs sm:text-[13px] md:text-sm tracking-[-0.02em] uppercase transition-colors cursor-pointer ${
                        visualFilter === "photos"
                          ? "font-bold text-[#2d2a24] underline underline-offset-4 decoration-1 hover:text-blue-600"
                          : "font-normal text-[#2d2a24]/60 hover:text-blue-600"
                      }`}
                    >
                      PHOTOS
                    </button>
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onTabChange(item.key)}
              className={`py-1 text-sm sm:text-base md:text-[17px] tracking-[-0.02em] uppercase transition-colors duration-150 cursor-pointer select-none opacity-100 ${
                isActive
                  ? "text-[#2d2a24] font-bold hover:text-blue-600"
                  : "text-[#2d2a24] font-normal hover:text-blue-600"
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
          className="py-1 text-sm sm:text-base md:text-[17px] tracking-[-0.02em] uppercase font-normal text-[#2d2a24] underline underline-offset-4 decoration-1 hover:text-blue-600 transition-colors cursor-pointer select-none opacity-100"
        >
          CV
        </a>
      </nav>
    </div>
  );
}
