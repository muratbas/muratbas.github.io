"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WORK_PROJECTS } from "./portfolio.data";
import { WorkProject } from "./portfolio.types";

interface WorkListProps {
  onSelectWork?: (project: WorkProject) => void;
}

export function WorkList({ onSelectWork }: WorkListProps) {
  const router = useRouter();

  const handleSelect = (project: WorkProject) => {
    if (onSelectWork) {
      onSelectWork(project);
    }
    router.push(`/project/${project.id}`);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 animate-fadeIn">
      {/* 3-Column Responsive Grid with enlarged cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {WORK_PROJECTS.map((project, index) => (
          <article
            key={project.id}
            onClick={() => handleSelect(project)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(project);
              }
            }}
            tabIndex={0}
            role="button"
            className="group cursor-pointer flex flex-col text-left focus:outline-none p-2 sm:p-2.5 rounded-[22px] hover:bg-[#ECE4D9] transition-colors duration-200"
            aria-label={`View details for ${project.title}`}
          >
            {/* Card Thumbnail Container with Zoom on Hover */}
            <div className="relative w-full aspect-[16/9] rounded-xl sm:rounded-[16px] overflow-hidden bg-[#e9e2d7]/50 border border-neutral-300/40 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                priority={index < 3}
              />
            </div>

            {/* Typography Below Card - Using Urbanist font strictly for project cards with bold title */}
            <div className="mt-2.5 sm:mt-3 px-1 pb-1 font-urbanist">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2d2a24] tracking-tight leading-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-[#2d2a24]/80 font-medium leading-normal mt-1.5 sm:mt-2 tracking-normal line-clamp-2">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
