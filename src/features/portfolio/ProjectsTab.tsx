"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WORK_PROJECTS } from "./portfolio.data";

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 fill-current inline-block"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 inline-block"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

async function handleDownloadClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  downloadUrl: string
) {
  const match = downloadUrl.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/releases\/latest\/?$/
  );
  if (!match) return;

  e.preventDefault();
  const [, owner, repo] = match;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`
    );
    if (!res.ok) throw new Error("GitHub API error");
    const data: {
      assets?: { name: string; browser_download_url: string }[];
    } = await res.json();

    const preferredAsset =
      data.assets?.find((a) => a.name.endsWith(".exe")) ?? data.assets?.[0];

    if (preferredAsset?.browser_download_url) {
      window.location.href = preferredAsset.browser_download_url;
      return;
    }
  } catch {
    // Fallback to opening the latest release page
  }

  window.open(downloadUrl, "_blank", "noopener,noreferrer");
}

export function ProjectsTab() {
  const railRef = useRef<HTMLDivElement>(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string | null>(null);

  const selectedProject = WORK_PROJECTS.find((p) => p.title === selectedProjectTitle);

  useEffect(() => {
    if (selectedProject) return;

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
  }, [selectedProject]);

  if (selectedProject) {
    const mediaList =
      selectedProject.media && selectedProject.media.length > 0
        ? selectedProject.media
        : [
            {
              url: selectedProject.imageUrl,
              caption: selectedProject.title,
            },
          ];

    return (
      <article
        key={selectedProject.title}
        className="max-w-2xl mx-auto px-6 space-y-7 animate-fadeIn"
      >
        <div className="flex items-center text-xs uppercase tracking-widest text-[#0A0A0A]/65">
          <button
            type="button"
            onClick={() => setSelectedProjectTitle(null)}
            className="cursor-pointer hover:text-[#0A0A0A] transition-colors flex items-center gap-1.5 lowercase"
          >
            <span>←</span>
            <span>back</span>
          </button>
        </div>

        <header className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-4xl font-sans font-semibold tracking-tight text-[#0A0A0A]">
              {selectedProject.title}
            </h1>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-black/[0.06] text-[#0A0A0A]/75">
              {selectedProject.year}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <p className="text-base sm:text-lg text-[#0A0A0A]/80 leading-relaxed">
              {selectedProject.description}
            </p>
            {selectedProject.stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {selectedProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-black/[0.06] text-[#0A0A0A]/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {(selectedProject.liveUrl ||
            selectedProject.githubUrl ||
            selectedProject.downloadUrl) && (
            <div className="flex flex-wrap items-center gap-5 pt-1 text-base font-semibold">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A0A0A] hover:opacity-70 transition-opacity lowercase"
                >
                  live ↗
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#0A0A0A] hover:opacity-70 transition-opacity lowercase"
                >
                  <span>source code</span>
                  <GitHubIcon />
                </a>
              )}
              {selectedProject.downloadUrl && (
                <a
                  href={selectedProject.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) =>
                    handleDownloadClick(e, selectedProject.downloadUrl!)
                  }
                  className="inline-flex items-center gap-1.5 text-[#0A0A0A] hover:opacity-70 transition-opacity lowercase"
                >
                  <span>download</span>
                  <DownloadIcon />
                </a>
              )}
            </div>
          )}
        </header>

        <div className="space-y-6">
          {mediaList.map((item, idx) => (
            <figure key={idx} className="space-y-2">
              <div className="relative aspect-[16/10] w-full overflow-hidden border-[3px] border-[#0A0A0A] bg-black/[0.04]">
                <Image
                  src={item.url}
                  alt={item.caption ?? selectedProject.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>
              {item.caption && (
                <figcaption className="text-xs text-[#0A0A0A]/55">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {selectedProject.longDescription && selectedProject.longDescription.length > 0 && (
          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#0A0A0A]/85">
            {selectedProject.longDescription.map((block, idx) =>
              typeof block === "string" ? (
                <p key={idx}>{block}</p>
              ) : (
                <figure key={idx} className="space-y-2">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-[3px] border-[#0A0A0A] bg-black/[0.04]">
                    <Image
                      src={block.url}
                      alt={block.caption ?? selectedProject.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 672px"
                      className="object-cover"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="text-xs text-[#0A0A0A]/55">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              )
            )}
          </div>
        )}
      </article>
    );
  }

  return (
    <section key="projects-list" className="w-full pt-6 sm:pt-10 animate-fadeIn">
      <div
        ref={railRef}
        className="w-full flex flex-row gap-8 overflow-x-auto pb-4 pl-6 lg:pl-[max(1.5rem,calc((100vw-56rem)/2+1.5rem))] pr-6 sm:pr-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {WORK_PROJECTS.map((project, idx) => (
          <article
            key={project.title}
            className="shrink-0 w-[82vw] sm:w-[400px]"
          >
            <button
              type="button"
              onClick={() => setSelectedProjectTitle(project.title)}
              aria-label={`Open ${project.title} details`}
              className="group block relative aspect-[16/10] w-full overflow-hidden rounded-2xl border-[3px] border-[#0A0A0A] bg-black/[0.04] mb-1.5 cursor-pointer text-left p-0"
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                unoptimized
                loading={idx === 0 ? "eager" : undefined}
                sizes="(max-width: 640px) 82vw, 400px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>

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
