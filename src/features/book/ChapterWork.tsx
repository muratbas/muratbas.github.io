"use client";

import React from "react";
import Image from "next/image";
import { ChapterHeader } from "./ChapterHeader";
import { WORK_PROJECTS } from "../portfolio/portfolio.data";

interface ChapterWorkProps {
  onBackToToc: () => void;
}

export function ChapterWork({ onBackToToc }: ChapterWorkProps) {
  return (
    <article className="space-y-12">
      <ChapterHeader numeral="II" title="Work" onBackToToc={onBackToToc} />

      <p className="text-base font-serif italic text-center opacity-80 pb-2">
        A selection of digital tools, native desktop software, and web platforms.
      </p>

      <div className="space-y-14">
        {WORK_PROJECTS.map((project) => (
          <section
            key={project.id}
            className="group space-y-3"
          >
            {/* Framed Screenshot with 1px border like Lynn's paperback work cards */}
            <div className="border border-current/30 p-1.5 bg-[var(--card-bg)] shadow-sm transition-transform duration-200 group-hover:scale-[1.01]">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 500px) 100vw, 436px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Title & Domain/Link Bar */}
            <div className="flex items-baseline justify-between gap-3 pt-1 border-b border-current/20 pb-1.5 font-serif">
              <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wide">
                {project.title}
              </h2>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-sans tracking-wide underline underline-offset-4 hover:text-[var(--accent-color)]"
                >
                  {project.liveUrl.replace(/^https?:\/\//, "")} ↗
                </a>
              ) : (
                <span className="text-xs font-sans opacity-60">
                  {project.year}
                </span>
              )}
            </div>

            {/* Description & Tech Stack */}
            <p className="text-sm sm:text-base leading-relaxed opacity-90 font-serif">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs font-sans opacity-75">
              {project.stack.map((tech, i) => (
                <span key={tech}>
                  {tech}
                  {i < project.stack.length - 1 && <span className="opacity-40 ml-1.5">•</span>}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
