"use client";

import React from "react";
import { WORK_PROJECTS } from "./portfolio.data";
import { WorkProject } from "./portfolio.types";

interface WorkListProps {
  onSelectWork: (project: WorkProject) => void;
}

export function WorkList({ onSelectWork }: WorkListProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
      <div className="space-y-8 sm:space-y-10">
        {WORK_PROJECTS.map((project) => (
          <article key={project.id}>
            {/* Desktop & Tablet Row */}
            <div className="hidden sm:flex items-center justify-between gap-6">
              <div className="min-w-0 flex-1">
                <div>
                  <h2
                    onClick={() => onSelectWork(project)}
                    className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-950 hover:text-blue-600 transition-colors uppercase truncate cursor-pointer inline-block"
                  >
                    {project.title}
                  </h2>
                </div>
                <p className="text-xs md:text-sm text-neutral-500 line-clamp-1 mt-1 font-normal tracking-[-0.025em]">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-8 md:gap-12 shrink-0">
                <span className="text-xs text-neutral-500 tracking-tight">
                  {project.stack.slice(0, 2).join(" · ")}
                </span>
                <span className="text-xs text-neutral-400">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Mobile View */}
            <div className="sm:hidden space-y-1.5">
              <div className="flex items-baseline justify-between">
                <h2
                  onClick={() => onSelectWork(project)}
                  className="text-xl font-bold tracking-tight text-neutral-950 hover:text-blue-600 transition-colors uppercase cursor-pointer"
                >
                  {project.title}
                </h2>
                <span className="text-xs text-neutral-400">
                  {project.year}
                </span>
              </div>
              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed tracking-[-0.025em]">
                {project.description}
              </p>
              <p className="text-[11px] text-neutral-400">
                {project.stack.slice(0, 2).join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
