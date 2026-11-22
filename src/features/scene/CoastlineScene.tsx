"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { StatusBar } from "./StatusBar";
import { RightNav, SectionKey } from "./RightNav";
import { ProjectsLayer } from "./ProjectsLayer";
import { WritingLayer } from "./WritingLayer";
import { VisualsLayer } from "./VisualsLayer";
import { AboutLayer } from "./AboutLayer";

interface SamsunData {
  isDay: boolean;
  condition: "clear" | "rainy" | "snowy";
  videoFile: string;
  statusText: string;
  theme: "day" | "night";
}

function getInitialDayNight(): { isDay: boolean; videoFile: string; theme: "day" | "night" } {
  // Test override: default to morning-clear & day theme
  return {
    isDay: true,
    videoFile: "/videos/morning-clear.webm",
    theme: "day",
  };
}

export function CoastlineScene() {
  const [activeSection, setActiveSection] = useState<SectionKey>(null);

  // Weather and theme state
  const initial = getInitialDayNight();
  const [videoFile, setVideoFile] = useState<string>(initial.videoFile);
  const [weatherCondition, setWeatherCondition] = useState<string>("clear");
  const [theme, setTheme] = useState<"day" | "night">(initial.theme);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch weather data from /api/samsun
  useEffect(() => {
    let isCancelled = false;

    async function fetchWeather() {
      try {
        const res = await fetch("/api/samsun");
        if (!res.ok) return;
        const data: SamsunData = await res.json();
        if (isCancelled) return;

        if (data.videoFile) setVideoFile(data.videoFile);
        if (data.statusText) setWeatherCondition(data.statusText);
        if (data.theme) setTheme(data.theme);
      } catch {
        // Fallback already active
      }
    }

    fetchWeather();
    // Poll every 15 minutes to keep aligned with API cache
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Update document root data-theme attribute
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Handle ESC key to reset activeSection to null
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveSection(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Ensure video plays continuously
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay policy rejections if muted
      });
    }
  }, [videoFile]);

  const handleBack = useCallback(() => {
    setActiveSection(null);
  }, []);

  const bgColorClass = theme === "day" ? "bg-[#F3F2EE]" : "bg-[#121212]";

  return (
    <div
      data-theme={theme}
      className={`relative h-dvh w-screen overflow-hidden ${bgColorClass} select-none transition-colors duration-700`}
    >
      {/* 1. Background Video Layer */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ease-out ${
          activeSection !== null ? "opacity-25" : "opacity-100"
        }`}
      >
        <video
          ref={videoRef}
          key={videoFile}
          src={videoFile}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Sol Alt Durum Satırı (Bottom-Left Status) */}
      <StatusBar
        weatherCondition={weatherCondition}
        theme={theme}
      />

      {/* 3. Sağ Kenar Navigasyonu (Right Edge Navigation) */}
      <RightNav
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
        theme={theme}
      />

      {/* 4. Active In-Page Content Layer (Opens on top without changing URL) */}
      {activeSection !== null && (
        <div
          role="region"
          aria-label={activeSection}
          onClick={handleBack}
          className="fixed inset-0 z-20 overflow-y-auto cursor-pointer animate-fadeIn"
        >
          {/* Backdrop click dismisses, clicking inside stops propagation */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="min-h-full w-full flex items-start justify-center cursor-default pt-6 sm:pt-10 pb-28 md:pb-20"
          >
            {activeSection === "projects" && (
              <ProjectsLayer onBack={handleBack} theme={theme} />
            )}
            {activeSection === "writing" && (
              <WritingLayer onBack={handleBack} theme={theme} />
            )}
            {activeSection === "visuals" && (
              <VisualsLayer onBack={handleBack} theme={theme} />
            )}
            {activeSection === "about" && (
              <AboutLayer onBack={handleBack} theme={theme} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
