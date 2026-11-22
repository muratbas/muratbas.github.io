"use client";

import React from "react";

export type SectionKey = "projects" | "writing" | "visuals" | "about" | null;

interface RightNavProps {
  activeSection: SectionKey;
  onSelectSection: (section: SectionKey) => void;
  theme: "day" | "night";
}

const SECTIONS: { key: Exclude<SectionKey, null>; label: string }[] = [
  { key: "projects", label: "projects" },
  { key: "writing", label: "writing" },
  { key: "visuals", label: "visuals" },
  { key: "about", label: "about" },
];

export function RightNav({ activeSection, onSelectSection, theme }: RightNavProps) {
  const textColorClass = theme === "day" ? "text-[#121212]" : "text-[#F3F2EE]";

  return (
    <nav
      aria-label="Scene navigation"
      className={`fixed right-8 md:right-14 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 sm:gap-4 select-none ${textColorClass}`}
    >
      {SECTIONS.map(({ key, label }) => {
        const isActive = activeSection === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelectSection(isActive ? null : key)}
            className={`text-base sm:text-lg lowercase tracking-tight transition-all duration-200 cursor-pointer ${
              isActive
                ? "opacity-100 underline underline-offset-8 decoration-1 font-medium"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
