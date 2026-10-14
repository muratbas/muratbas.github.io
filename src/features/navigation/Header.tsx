"use client";

import React from "react";
import { Logo } from "./Logo";
import { NavMenu, TabKey, VisualFilter } from "./NavMenu";

interface HeaderProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  visualFilter?: VisualFilter;
  onVisualFilterChange?: (filter: VisualFilter) => void;
}

export function Header({
  activeTab,
  onTabChange,
  visualFilter,
  onVisualFilterChange,
}: HeaderProps) {
  return (
    <header className="w-full pt-10 sm:pt-14 pb-8 sm:pb-12 px-4 flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={() => onTabChange("work")}
        className="cursor-pointer focus:outline-none"
        aria-label="Home - murat baş"
      >
        <Logo />
      </button>

      <NavMenu
        activeTab={activeTab}
        onTabChange={onTabChange}
        visualFilter={visualFilter}
        onVisualFilterChange={onVisualFilterChange}
      />
    </header>
  );
}
