"use client";

import React from "react";
import { WORK_PROJECTS } from "@/features/portfolio/portfolio.data";
import { DitherMediaCard } from "@/components/DitherMediaCard";

interface ProjectsLayerProps {
  onBack: () => void;
  theme: "day" | "night";
}

export function ProjectsLayer({ onBack, theme }: ProjectsLayerProps) {
  const textColorClass = theme === "day" ? "text-[#121212]" : "text-[#F3F2EE]";
  const subTextColorClass = theme === "day" ? "text-[#121212]/70" : "text-[#F3F2EE]/70";
  const pillBgClass = theme === "day" ? "bg-[#121212]/5 text-[#121212]/80" : "bg-[#F3F2EE]/10 text-[#F3F2EE]/80";

  return (
    <div className={`w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 ${textColorClass}`}>
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
        <span className="text-xs uppercase tracking-widest opacity-40 font-mono">
          featured projects
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {WORK_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-3 group"
          >
            {/* Dither Media Card */}
            <DitherMediaCard
              src={project.imageUrl}
              alt={project.title}
              aspectClassName="aspect-[16/10]"
              theme={theme}
            />

            {/* Content Details */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg sm:text-xl font-medium tracking-tight">
                  {project.title}
                </h3>
                <span className="text-xs font-mono opacity-50">
                  {project.year}
                </span>
              </div>

              <p className={`text-sm leading-relaxed ${subTextColorClass}`}>
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className={`text-[11px] px-2 py-0.5 rounded-md font-mono ${pillBgClass}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex items-center gap-4 mt-3 text-xs">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 opacity-75 hover:opacity-100 transition-opacity"
                    >
                      live preview ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 opacity-75 hover:opacity-100 transition-opacity"
                    >
                      source code ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
