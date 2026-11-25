"use client";

import React, { useState } from "react";
import { ProjectsTab } from "./ProjectsTab";
import { WritingTab } from "./WritingTab";
import { AboutTab } from "./AboutTab";

type TabKey = "projects" | "writing" | "about";

const TABS: { key: TabKey; label: string }[] = [
  { key: "projects", label: "projects" },
  { key: "writing", label: "writing" },
  { key: "about", label: "about" },
];

const TAB_BACKGROUNDS: Record<TabKey, React.CSSProperties> = {
  projects: {
    backgroundColor: "#FAFAFA",
    backgroundImage:
      "radial-gradient(circle at 12% 85%, rgba(255, 184, 153, 0.55) 0%, transparent 45%), radial-gradient(circle at 88% 82%, rgba(167, 199, 255, 0.6) 0%, transparent 48%), radial-gradient(circle at 52% 18%, rgba(226, 212, 255, 0.55) 0%, transparent 50%)",
  },
  writing: {
    backgroundImage: "url('/images/gradients/bg-writing.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  about: {
    backgroundImage: "url('/images/gradients/bg-projects.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
};

export function PortfolioShell() {
  const [activeTab, setActiveTab] = useState<TabKey>("projects");
  const [resetKey, setResetKey] = useState(0);

  const handleGoHome = () => {
    setActiveTab("projects");
    setResetKey((k) => k + 1);
  };

  const handleSelectTab = (key: TabKey) => {
    setActiveTab(key);
    setResetKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen relative text-[#0A0A0A]">
      {/* Fixed per-tab gradient background (no animation) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none"
        style={TAB_BACKGROUNDS[activeTab]}
      />

      {/* Top Focus Block: Custom Logo & Centered Navigation */}
      <header className="pt-14 sm:pt-20 pb-10 sm:pb-12 px-6 flex flex-col items-center">
        <button
          type="button"
          onClick={handleGoHome}
          aria-label="Murat Baş — Home"
          className="cursor-pointer border-0 bg-transparent p-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logofinal.png"
            alt="murat bas"
            className="h-14 sm:h-16 w-auto object-contain mix-blend-multiply select-none"
          />
        </button>

        <nav
          aria-label="Primary navigation"
          className="mt-6 flex items-center justify-center gap-6 md:gap-9"
        >
          {TABS.map(({ key, label }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectTab(key)}
                aria-current={isActive ? "page" : undefined}
                className={`font-display lowercase text-base sm:text-lg tracking-normal border-0 bg-transparent p-0 cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "text-[#0A0A0A] opacity-100"
                    : "text-[#0A0A0A] opacity-45 hover:opacity-85 hover:scale-105"
                }`}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Area */}
      <main
        key={`${activeTab}-${resetKey}`}
        className={`pb-20 animate-fadeIn ${
          activeTab === "projects" ? "w-full" : "max-w-4xl mx-auto px-6"
        }`}
      >
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "writing" && <WritingTab />}
        {activeTab === "about" && <AboutTab />}
      </main>
    </div>
  );
}
