"use client";

import React from "react";

export type TabKey = "work" | "visuals" | "writing" | "about";

interface NavMenuProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const NAV_ITEMS: { key: TabKey; label: string }[] = [
  { key: "work", label: "WORK" },
  { key: "visuals", label: "VISUALS" },
  { key: "writing", label: "WRITING" },
  { key: "about", label: "ABOUT" },
];

export function NavMenu({ activeTab, onTabChange }: NavMenuProps) {
  return (
    <nav className="flex items-center justify-center flex-wrap gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-2 my-6 sm:my-8">
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
                : "text-neutral-900 font-medium hover:text-blue-600"
            }`}
          >
            {item.label}
          </button>
        );
      })}

      {/* CV Tab Link - Underlined & Opens PDF in New Tab */}
      <a
        href="/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="py-1 text-sm sm:text-base md:text-[17px] tracking-[-0.02em] uppercase font-bold text-neutral-950 underline underline-offset-4 decoration-1 hover:text-blue-600 transition-colors cursor-pointer select-none opacity-100"
      >
        CV
      </a>
    </nav>
  );
}
