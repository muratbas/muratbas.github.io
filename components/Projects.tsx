"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getAllProjectsAsync } from "@/lib/projectStore";
import { ProjectItem } from "@/lib/types/project";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const isTr = language === "tr";

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
    return null;
  }

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="work" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isTr ? "Öne Çıkan Projeler" : "Featured Projects"}
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => {
            const targetUrl = project.url || project.liveUrl || project.githubUrl;

            return (
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

                {/* Project Content */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#209CEE] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Single Main Action Bar */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    {targetUrl && targetUrl !== "#" ? (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#209CEE] hover:underline inline-flex items-center gap-1.5"
                      >
                        {isTr ? "Projeyi İncele" : "View Project"}
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 inline-flex items-center gap-1">
                        {isTr ? "Projeyi İncele" : "View Project"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See All Projects Button */}
        {projects.length > 3 && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-black hover:bg-[#27272a] text-white font-medium text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-sm inline-flex items-center gap-2"
            >
              <span>
                {showAll
                  ? isTr
                    ? "Daha Az Göster"
                    : "Show Less"
                  : isTr
                  ? "Tüm Projeleri Gör"
                  : "See All Projects"}
              </span>
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
