"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChapterHeader } from "./ChapterHeader";

interface ChapterAboutProps {
  onBackToToc: () => void;
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
  "Electron",
];

export function ChapterAbout({ onBackToToc }: ChapterAboutProps) {
  const [copied, setCopied] = useState(false);
  const email = "muratbas987@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <article className="space-y-8">
      <ChapterHeader numeral="I" title="About" onBackToToc={onBackToToc} />

      {/* Author / Studio Plate Image in 1px border */}
      <div className="border border-current/30 p-1.5 bg-[var(--card-bg)] shadow-sm">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src="/images/visuals/bridge.webp"
            alt="Murat Baş workspace and vista"
            fill
            sizes="(max-width: 500px) 100vw, 436px"
            className="object-cover grayscale contrast-125"
            priority
          />
        </div>
        <div className="text-[11px] font-sans text-center mt-2 opacity-70 italic">
          Murat Baş — Studio &amp; Coastline Horizon
        </div>
      </div>

      {/* Editorial Narrative with Drop-Cap */}
      <div className="space-y-5 text-base sm:text-lg leading-relaxed font-serif">
        <p className="drop-cap">
          I am Murat Baş — a full-stack engineer and designer living in Samsun,
          Turkey, overlooking the Black Sea coast.
        </p>
        <p className="opacity-90">
          I design and build quiet, focused digital instruments — from high-performance
          web products to native desktop audio applications. My engineering philosophy
          prioritizes zero-bloat architecture, strict type safety, and typography that
          respects the reader&apos;s attention.
        </p>
        <p className="opacity-90">
          When I am away from software terminals, I explore analog synthesis, stipple
          print aesthetics, risograph art, and tactile physical systems.
        </p>
      </div>

      {/* Technical Specializations */}
      <div className="pt-6 border-t border-current/20 space-y-3">
        <h3 className="text-xs font-sans uppercase tracking-widest opacity-60">
          Tools &amp; Technologies
        </h3>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="text-xs font-sans px-2.5 py-1 border border-current/25 bg-[var(--card-bg)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Direct Inquiries & Links */}
      <div className="pt-6 border-t border-current/20 space-y-4">
        <h3 className="text-xs font-sans uppercase tracking-widest opacity-60">
          Direct Inquiries
        </h3>
        <p className="text-sm opacity-85">
          Available for select product engineering, technical design consulting,
          and bespoke digital builds.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm font-sans pt-1">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 cursor-pointer text-left group"
          >
            <span className="underline underline-offset-4 font-mono font-medium group-hover:text-[var(--accent-color)]">
              {email}
            </span>
            <span className="text-[11px] px-1.5 py-0.5 border border-current/20 uppercase">
              {copied ? "Copied ✓" : "Copy"}
            </span>
          </button>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://github.com/muratbas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4"
            >
              GitHub ↗
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4"
            >
              Resume (PDF) ↗
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
