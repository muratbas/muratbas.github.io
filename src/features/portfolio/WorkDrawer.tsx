"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { WorkProject } from "./portfolio.types";
import { CloseIcon, ExternalLinkIcon, GithubIcon } from "@/components/ui/Icons";

interface WorkDrawerProps {
  project: WorkProject | null;
  onClose: () => void;
}

export function WorkDrawer({ project, onClose }: WorkDrawerProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-50 flex justify-end animate-fadeIn"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 w-full max-w-xl md:max-w-2xl bg-[#fdfdfc] text-neutral-900 h-full shadow-2xl overflow-y-auto flex flex-col justify-between">
        <div className="p-6 sm:p-10">
          {/* Top Header & Close button */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200/80">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[-0.02em] uppercase text-neutral-500">
                CASE STUDY // {project.year}
              </span>
              <h2
                id="drawer-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mt-1 uppercase"
              >
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 -mr-2 text-neutral-500 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Large Hero Image */}
          <div className="relative w-full aspect-[16/10] my-8 overflow-hidden bg-neutral-100 border border-neutral-200/60">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 650px"
              priority
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-[-0.02em] text-neutral-400 mb-2">
              Overview
            </h3>
            <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-700">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-[-0.02em] text-neutral-400 mb-3">
              Tech stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium tracking-tight uppercase bg-neutral-100 text-neutral-800 border border-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons Bottom Bar */}
        <div className="sticky bottom-0 p-6 sm:p-8 bg-[#fdfdfc]/95 backdrop-blur-sm border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 bg-neutral-950 text-white text-xs font-semibold tracking-tight uppercase hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <span>VIEW LIVE PROJECT</span>
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 bg-white text-neutral-900 border border-neutral-300 text-xs font-semibold tracking-tight uppercase hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB REPO</span>
            </a>
          )}
        </div>
      </aside>
    </div>
  );
}
