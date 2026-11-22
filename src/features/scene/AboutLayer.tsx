"use client";

import React, { useState } from "react";

interface AboutLayerProps {
  onBack: () => void;
  theme: "day" | "night";
}

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Rust",
  "Tauri",
  "Node.js",
  "PostgreSQL",
  "SQLite",
  "Firebase",
];

export function AboutLayer({ onBack, theme }: AboutLayerProps) {
  const [copied, setCopied] = useState(false);
  const email = "muratbas987@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      window.location.href = `mailto:${email}`;
    }
  };

  const textColorClass = theme === "day" ? "text-[#121212]" : "text-[#F3F2EE]";
  const subTextColorClass = theme === "day" ? "text-[#121212]/80" : "text-[#F3F2EE]/80";
  const pillBgClass = theme === "day" ? "bg-[#121212]/5 text-[#121212]/80" : "bg-[#F3F2EE]/10 text-[#F3F2EE]/80";

  return (
    <div className={`w-full max-w-2xl mx-auto py-8 sm:py-12 px-4 sm:px-6 ${textColorClass} animate-fadeIn`}>
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
          about
        </span>
      </div>

      <div className="flex flex-col gap-10">
        {/* Editorial Narrative */}
        <section className="space-y-5 text-lg sm:text-xl font-light leading-relaxed">
          <p>
            I am Murat Baş — a full-stack engineer and designer based in Samsun, Turkey,
            overlooking the Black Sea coast.
          </p>
          <p className={subTextColorClass}>
            I design and build quiet, focused digital instruments — from responsive web products
            to native desktop audio applications. My engineering philosophy prioritizes zero-bloat
            architecture, strict type safety, and typography that respects the reader&apos;s attention.
          </p>
          <p className={subTextColorClass}>
            When I am not designing software, I explore stipple print aesthetics, audio synthesis,
            and visual systems.
          </p>
        </section>

        {/* Technologies */}
        <section className="space-y-3 pt-4 border-t border-current/10">
          <h4 className="text-xs font-mono uppercase tracking-widest opacity-50">
            core technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className={`text-xs px-2.5 py-1 rounded-md font-mono ${pillBgClass}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Direct Contact & Links */}
        <section className="space-y-4 pt-4 border-t border-current/10">
          <h4 className="text-xs font-mono uppercase tracking-widest opacity-50">
            connect & contact
          </h4>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm">
            {/* Click to copy email */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 group cursor-pointer text-left"
              title="Click to copy email address"
            >
              <span className="underline underline-offset-4 font-mono font-medium opacity-90 group-hover:opacity-100">
                {email}
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded transition-all ${
                copied
                  ? "bg-emerald-600/20 text-emerald-500 opacity-100"
                  : "opacity-40 group-hover:opacity-80"
              }`}>
                {copied ? "copied! ✓" : "copy"}
              </span>
            </button>

            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="https://github.com/muratbas"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
              >
                github ↗
              </a>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 opacity-70 hover:opacity-100 transition-opacity"
              >
                resume/cv (pdf) ↗
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
