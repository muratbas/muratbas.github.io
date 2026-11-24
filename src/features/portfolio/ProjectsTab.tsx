"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { WORK_PROJECTS } from "./portfolio.data";

export function ProjectsTab() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const rail = railRef.current;
      if (!rail) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        rail.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="w-full pt-6 sm:pt-10">
      <div
        ref={railRef}
        className="w-full flex flex-row gap-8 overflow-x-auto pb-4 pl-6 lg:pl-[max(1.5rem,calc((100vw-56rem)/2+1.5rem))] pr-6 sm:pr-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {WORK_PROJECTS.map((project) => (
          <article
            key={project.id}
            className="group shrink-0 w-[82vw] sm:w-[400px]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border-[3px] border-[#0A0A0A] bg-black/[0.04] mb-1.5">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 82vw, 400px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            <h2 className="text-xl sm:text-[22px] font-medium tracking-tight text-[#0A0A0A]">
              {project.title}
            </h2>

            <p className="mt-0.5 text-base leading-snug text-[#0A0A0A]/75">
              {project.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
