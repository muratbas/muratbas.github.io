"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WorkProject } from "./portfolio.types";
import { ArrowLeftIcon } from "@/components/ui/Icons";

interface ProjectDetailViewProps {
  project: WorkProject;
}

// Colors for tech stack badges matching the reference screenshot design
const TECH_PILL_COLORS: Record<string, string> = {
  "Three.js": "bg-[#e67e22] text-white",
  "Node.js": "bg-[#27ae60] text-white",
  "WebSockets": "bg-[#2980b9] text-white",
  "Redis": "bg-[#c0392b] text-white",
  "Rust": "bg-[#d35400] text-white",
  "WebAudio": "bg-[#8e44ad] text-white",
  "Tauri": "bg-[#16a085] text-white",
  "Tailwind CSS": "bg-[#0284c7] text-white",
  "Next.js": "bg-[#111827] text-white",
  "Next.js 15": "bg-[#111827] text-white",
  "TypeScript": "bg-[#2563eb] text-white",
  "JavaScript": "bg-[#f1c40f] text-neutral-900",
  "HTML": "bg-[#e67e22] text-white",
  "CSS": "bg-[#2980b9] text-white",
  "GLSL": "bg-[#8e44ad] text-white",
  "OGL.js": "bg-[#16a085] text-white",
};

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  // Fallback theme colors if not explicitly specified
  const theme = project.theme || {
    bg: "#1e2d42",
    sheetBg: "#283b54",
    accent: "#0091ff",
    text: "#ffffff",
  };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push("/");
    }, 240);
  };

  // Media list: uses project.media if available, else falls back to hero imageUrl
  const mediaItems =
    project.media && project.media.length > 0
      ? project.media
      : [{ url: project.imageUrl, caption: project.title, type: "image" as const }];

  const selectionBg = theme.selectionBg || theme.accent || "#0091ff";
  const selectionText = theme.selectionText || "#ffffff";

  return (
    <div
      style={{ backgroundColor: theme.bg }}
      className={`project-detail-scope min-h-screen text-white font-urbanist transition-all duration-300 ${
        isExiting ? "animate-project-exit" : "animate-project-enter"
      }`}
    >
      {/* Dynamic text selection color scoped to project page */}
      <style>{`
        .project-detail-scope ::selection,
        .project-detail-scope *::selection {
          background-color: ${selectionBg} !important;
          color: ${selectionText} !important;
        }
      `}</style>

      {/* Top Left: Circular Back Arrow Button positioned at the very top-left */}
      <div className="w-full px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8 pb-3">
        <button
          type="button"
          onClick={handleBack}
          style={{ backgroundColor: theme.accent }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          aria-label="Back to projects"
        >
          <ArrowLeftIcon className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Hero Section - Left elements shifted a notch to the left */}
      <header className="w-full px-6 sm:px-10 lg:px-16 pt-4 sm:pt-6 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Title, Tech Stack Badges & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 sm:mb-5 animate-title-enter">
              {project.title}
            </h1>

            {/* Tech Stack Pills with vibrant colors */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-tight ${
                    TECH_PILL_COLORS[tech] || "bg-white/20 text-white"
                  }`}
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
                  style={{ backgroundColor: theme.accent }}
                  className="px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-tight text-white shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                >
                  LIVE VIEW
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-tight text-white/95 bg-white/10 hover:bg-white/20 border border-white/20 active:scale-95 transition-all cursor-pointer"
                >
                  SOURCE CODE
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Narrative Multi-paragraph Overview */}
          <div className="lg:col-span-5 text-sm sm:text-[15px] md:text-base text-white/80 leading-relaxed font-normal space-y-3 pt-2">
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
              className="relative w-full max-w-[900px] aspect-[900/506] rounded-2xl sm:rounded-[24px] overflow-hidden bg-black/10 shadow-2xl border border-white/5 animate-media-card"
            >
              {item.type === "video" ? (
                <video
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover block"
                />
              ) : (
                <Image
                  src={item.url}
                  alt={item.caption || `${project.title} screenshot ${idx + 1}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                  className="object-cover block"
                  priority={idx === 0}
                />
              )}

              {/* Inverted fillet corner cutout caption tab matching reference screenshots */}
              {item.caption && (
                <div className="media-caption-tab">
                  <span className="font-urbanist font-bold text-xs sm:text-sm text-white tracking-tight select-none whitespace-nowrap">
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
