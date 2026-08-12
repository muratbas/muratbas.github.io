"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getAllProjectsAsync } from "@/lib/projectStore";
import { ProjectItem } from "@/lib/types/project";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getAllProjectsAsync();
        setProjects(data);
      } catch (err) {
        console.error("Projects load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (!loading && projects.length === 0) {
    return null; // Hide section cleanly if no projects are published yet
  }

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="work" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#209CEE] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Selected Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md">
            A showcase of web applications, 2D game mechanics, and software experiments.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-slate-200/90 rounded-3xl overflow-hidden hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col shadow-xs"
            >
              {/* Project Image */}
              <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Project Content (NO TAGS) */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#209CEE] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Actions Bar */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                    >
                      GitHub &rarr;
                    </a>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">View Project</span>
                  )}
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#209CEE] hover:underline inline-flex items-center gap-1"
                    >
                      Live Demo &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Projects Button */}
        {projects.length > 3 && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-black hover:bg-[#27272a] text-white font-medium text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-sm inline-flex items-center gap-2"
            >
              <span>{showAll ? "Show Less" : "See All Projects"}</span>
              <span className="material-symbols-outlined text-sm">
                {showAll ? "expand_less" : "expand_more"}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
