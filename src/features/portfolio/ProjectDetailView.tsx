"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WorkProject } from "./portfolio.types";
import { ArrowLeftIcon } from "@/components/ui/Icons";

interface ProjectDetailViewProps {
  project: WorkProject;
}

// Standardized brand colors and high-contrast styles for tech stack badges
const TECH_PILL_MAP: Record<string, string> = {
  // JavaScript & TypeScript
  javascript: "bg-[#F7DF1E] text-black border border-black/20 shadow-sm",
  js: "bg-[#F7DF1E] text-black border border-black/20 shadow-sm",
  typescript: "bg-[#3178C6] text-white border border-blue-700/40 shadow-sm",
  ts: "bg-[#3178C6] text-white border border-blue-700/40 shadow-sm",

  // 3D, Audio & Graphics
  threejs: "bg-[#E67E22] text-white border border-orange-600/30 shadow-sm",
  webaudio: "bg-[#8E44AD] text-white border border-purple-600/30 shadow-sm",
  webgl: "bg-[#990000] text-white border border-red-800/30 shadow-sm",
  glsl: "bg-[#8E44AD] text-white border border-purple-700/30 shadow-sm",
  ogljs: "bg-[#16A085] text-white border border-teal-700/30 shadow-sm",

  // Modern Frameworks & Libraries
  react: "bg-[#087EA4] text-white border border-cyan-500/30 shadow-sm",
  reactnative: "bg-[#087EA4] text-white border border-cyan-500/30 shadow-sm",
  nextjs: "bg-neutral-900 text-white border border-neutral-700 shadow-sm",
  nextjs15: "bg-neutral-900 text-white border border-neutral-700 shadow-sm",
  next: "bg-neutral-900 text-white border border-neutral-700 shadow-sm",
  vue: "bg-[#42B883] text-white border border-emerald-600/30 shadow-sm",
  vuejs: "bg-[#42B883] text-white border border-emerald-600/30 shadow-sm",
  svelte: "bg-[#FF3E00] text-white border border-red-600/30 shadow-sm",
  sveltekit: "bg-[#FF3E00] text-white border border-red-600/30 shadow-sm",

  // Backend, Network & Data
  nodejs: "bg-[#27AE60] text-white border border-green-700/30 shadow-sm",
  node: "bg-[#27AE60] text-white border border-green-700/30 shadow-sm",
  websockets: "bg-[#2980B9] text-white border border-blue-600/30 shadow-sm",
  websocket: "bg-[#2980B9] text-white border border-blue-600/30 shadow-sm",
  redis: "bg-[#DC382D] text-white border border-red-600/30 shadow-sm",
  postgresql: "bg-[#336791] text-white border border-blue-700/30 shadow-sm",
  postgres: "bg-[#336791] text-white border border-blue-700/30 shadow-sm",
  mongodb: "bg-[#47A248] text-white border border-green-700/30 shadow-sm",
  graphql: "bg-[#E10098] text-white border border-pink-600/30 shadow-sm",
  docker: "bg-[#2496ED] text-white border border-blue-600/30 shadow-sm",

  // Native, Systems & Languages
  rust: "bg-[#CE412B] text-white border border-red-700/30 shadow-sm",
  tauri: "bg-[#24C8DB] text-neutral-950 border border-cyan-500/40 shadow-sm",
  python: "bg-[#3776AB] text-white border border-blue-600/30 shadow-sm",
  go: "bg-[#00ADD8] text-white border border-cyan-600/30 shadow-sm",
  golang: "bg-[#00ADD8] text-white border border-cyan-600/30 shadow-sm",
  cpp: "bg-[#00599C] text-white border border-blue-700/30 shadow-sm",
  csharp: "bg-[#239120] text-white border border-green-700/30 shadow-sm",
  swift: "bg-[#F05138] text-white border border-orange-600/30 shadow-sm",
  kotlin: "bg-[#7F52FF] text-white border border-indigo-600/30 shadow-sm",

  // Markup & Styling
  tailwindcss: "bg-[#0284C7] text-white border border-sky-600/30 shadow-sm",
  tailwind: "bg-[#0284C7] text-white border border-sky-600/30 shadow-sm",
  html: "bg-[#E34F26] text-white border border-orange-600/30 shadow-sm",
  html5: "bg-[#E34F26] text-white border border-orange-600/30 shadow-sm",
  css: "bg-[#1572B6] text-white border border-blue-600/30 shadow-sm",
  css3: "bg-[#1572B6] text-white border border-blue-600/30 shadow-sm",
};

function getTechPillClass(tech: string): string {
  const key = tech.toLowerCase().replace(/[\s\-_.]/g, "");
  // Standard brand color if recognized; if unknown or white, always enforce a visible border so visibility is never broken
  return TECH_PILL_MAP[key] || "bg-white text-neutral-900 border border-neutral-300 shadow-sm";
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const exitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle browser Back/Forward Cache (bfcache) restoration & timer cleanup
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsExiting(false);
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
    };
  }, []);

  // Fallback theme colors if not explicitly specified
  const theme = {
    bg: project.theme?.bg || "#1e2d42",
    sheetBg: project.theme?.sheetBg || "#283b54",
    accent: project.theme?.accent || "#0091ff",
    accentHover: project.theme?.accentHover,
    text: project.theme?.text || "#ffffff",
    selectionBg: project.theme?.selectionBg,
    selectionText: project.theme?.selectionText,
  };

  const handleBack = () => {
    if (isExiting) return;
    setIsExiting(true);
    exitTimeoutRef.current = setTimeout(() => {
      router.push("/");
    }, 220);
  };

  // Media list: uses project.media if available, else falls back to hero imageUrl
  const mediaItems =
    project.media && project.media.length > 0
      ? project.media
      : [{ url: project.imageUrl, caption: project.title, type: "image" as const }];

  const selectionBg = theme.selectionBg || theme.accent || "#0091ff";
  const selectionText = theme.selectionText || "#ffffff";

  // Check background lightness to adapt subtle borders and secondary button colors
  const isLightBg = (() => {
    const hex = theme.bg.replace("#", "");
    if (hex.length < 6) return false;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 155;
  })();

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
      className={`project-detail-scope min-h-screen font-urbanist ${
        isExiting ? "animate-project-exit" : "animate-project-enter"
      }`}
    >
      {/* Dynamic text selection color & interactive button hover styles */}
      <style>{`
        .project-detail-scope ::selection,
        .project-detail-scope *::selection {
          background-color: ${selectionBg} !important;
          color: ${selectionText} !important;
        }

        /* LIVE VIEW: fixed white text, background color changes on hover */
        .project-detail-scope .btn-live-view {
          background-color: ${theme.accent} !important;
          color: #ffffff !important;
          transition: background-color 0.2s ease, filter 0.2s ease, transform 0.15s ease !important;
        }
        .project-detail-scope .btn-live-view:hover {
          background-color: ${theme.accentHover || theme.accent} !important;
          color: #ffffff !important;
          ${theme.accentHover ? "" : "filter: brightness(1.2);"}
        }

        /* SOURCE CODE: adapts cleanly to both dark and light backgrounds */
        .project-detail-scope .btn-source-code {
          background-color: ${isLightBg ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.1)"} !important;
          color: ${isLightBg ? theme.text : "#ffffff"} !important;
          border: 1px solid ${isLightBg ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.2)"} !important;
          transition: background-color 0.2s ease, transform 0.15s ease !important;
        }
        .project-detail-scope .btn-source-code:hover {
          background-color: ${isLightBg ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.25)"} !important;
          color: ${isLightBg ? theme.text : "#ffffff"} !important;
        }

        /* Back circular button: fixed white icon, background color changes on hover */
        .project-detail-scope .btn-back {
          background-color: ${theme.accent} !important;
          color: #ffffff !important;
          transition: background-color 0.2s ease, filter 0.2s ease, transform 0.15s ease !important;
        }
        .project-detail-scope .btn-back:hover {
          background-color: ${theme.accentHover || theme.accent} !important;
          color: #ffffff !important;
          ${theme.accentHover ? "" : "filter: brightness(1.2);"}
        }
      `}</style>

      {/* Top Bar: Circular Back Arrow Button positioned at the left */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8 pb-2">
        <button
          type="button"
          onClick={handleBack}
          className="btn-back w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Back to projects"
        >
          <ArrowLeftIcon className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Hero Section - Wide layout with left elements on the left and narrative on the right */}
      <header className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-2 sm:pt-4 pb-10 sm:pb-14">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16">
          {/* Left Column: Title, Tech Stack Badges & Action Buttons */}
          <div className="flex flex-col items-start max-w-xl">
            <h1
              style={{ color: theme.text }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-5 leading-tight animate-title-enter"
            >
              {project.title}
            </h1>

            {/* Tech Stack Pills with standardized colors & borders */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-tight ${getTechPillClass(tech)}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons: LIVE VIEW & SOURCE CODE */}
            <div className="flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-live-view px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-tight shadow-md active:scale-95 cursor-pointer"
                >
                  LIVE VIEW
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-source-code px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-tight active:scale-95 cursor-pointer"
                >
                  SOURCE CODE
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Narrative Multi-paragraph Overview */}
          <div
            style={{ color: theme.text }}
            className="w-full lg:max-w-lg text-sm sm:text-[15px] md:text-base opacity-85 leading-relaxed font-normal space-y-3 pt-1 lg:pt-3"
          >
            {project.longDescription && project.longDescription.length > 0 ? (
              project.longDescription.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
              <p>{project.description}</p>
            )}
          </div>
        </div>
      </header>

      {/* Main Curved Media Sheet Container */}
      <section
        style={{
          backgroundColor: theme.sheetBg,
          "--sheet-bg": theme.sheetBg,
        } as React.CSSProperties}
        className="w-full rounded-t-[32px] sm:rounded-t-[44px] pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-8 shadow-2xl"
      >
        <div className="w-full max-w-[900px] mx-auto flex flex-col gap-10 sm:gap-14">
          {mediaItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                animationDelay: `${0.2 + idx * 0.15}s`,
              }}
              className="relative w-full max-w-[900px] aspect-[900/506] rounded-2xl sm:rounded-[24px] overflow-hidden bg-black/10 shadow-2xl border border-white/5 animate-media-card select-none"
            >
              {item.type === "video" ? (
                <video
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  draggable={false}
                  className="w-full h-full object-cover block select-none pointer-events-none"
                />
              ) : (
                <Image
                  src={item.url}
                  alt={item.caption || `${project.title} screenshot ${idx + 1}`}
                  fill
                  draggable={false}
                  sizes="(max-width: 900px) 100vw, 900px"
                  className="object-cover block select-none pointer-events-none"
                  priority={idx === 0}
                />
              )}

              {/* Inverted fillet corner cutout caption tab matching reference screenshots */}
              {item.caption && (
                <div className="media-caption-tab">
                  <span
                    style={{ color: theme.text }}
                    className="font-urbanist font-bold text-xs sm:text-sm tracking-tight select-none whitespace-nowrap"
                  >
                    {item.caption}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
