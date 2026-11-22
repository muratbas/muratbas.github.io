"use client";

import React, { useState } from "react";

interface BookFooterProps {
  currentChapter: "toc" | "about" | "work" | "writing" | "visuals";
  onSelectChapter: (chapter: "toc" | "about" | "work" | "writing" | "visuals") => void;
  theme: "paperback" | "goth";
  onToggleTheme: () => void;
}

export function BookFooter({
  currentChapter,
  onSelectChapter,
  theme,
  onToggleTheme,
}: BookFooterProps) {
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
    <footer id="book-nav" className="mt-16 pt-10 border-t border-current/20 font-serif text-sm">
      {/* Chapter index links */}
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest opacity-60 mb-3 font-sans">
          Index of Chapters
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-base">
          <button
            type="button"
            onClick={() => onSelectChapter("toc")}
            className={`cursor-pointer hover:underline underline-offset-4 ${
              currentChapter === "toc" ? "font-bold text-[var(--accent-color)]" : ""
            }`}
          >
            Contents
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onSelectChapter("about")}
            className={`cursor-pointer hover:underline underline-offset-4 ${
              currentChapter === "about" ? "font-bold text-[var(--accent-color)]" : ""
            }`}
          >
            I. About
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onSelectChapter("work")}
            className={`cursor-pointer hover:underline underline-offset-4 ${
              currentChapter === "work" ? "font-bold text-[var(--accent-color)]" : ""
            }`}
          >
            II. Work
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onSelectChapter("writing")}
            className={`cursor-pointer hover:underline underline-offset-4 ${
              currentChapter === "writing" ? "font-bold text-[var(--accent-color)]" : ""
            }`}
          >
            III. Writing
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onSelectChapter("visuals")}
            className={`cursor-pointer hover:underline underline-offset-4 ${
              currentChapter === "visuals" ? "font-bold text-[var(--accent-color)]" : ""
            }`}
          >
            IV. Visuals
          </button>
        </div>
      </div>

      {/* Direct contact & links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-current/15 text-xs font-sans tracking-wide">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="cursor-pointer underline underline-offset-4 hover:text-[var(--accent-color)] transition-colors"
            title="Click to copy email address"
          >
            {email}
          </button>
          {copied && (
            <span className="text-[10px] font-mono text-[var(--accent-color)] uppercase">
              (copied ✓)
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
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

      {/* Colophon & Theme Switcher */}
      <div className="mt-8 flex items-center justify-between opacity-80 text-xs">
        <div>
          <span>Typeset in Newsreader. </span>
          <span className="hover-wavy inline-block cursor-default font-semibold">
            v. MMXXVI (2026)
          </span>
        </div>

        {/* Lynn Fisher style sun/moon toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="cursor-pointer p-2 rounded border border-current/20 hover:border-current/60 transition-colors flex items-center gap-1.5"
          title={theme === "paperback" ? "Switch to Goth Mode (Dark)" : "Switch to Paperback Mode (Light)"}
          aria-label="Toggle book color scheme"
        >
          {theme === "paperback" ? (
            <>
              <span className="text-sm">☾</span>
              <span className="font-sans text-[11px] uppercase tracking-wider">Goth</span>
            </>
          ) : (
            <>
              <span className="text-sm">☼</span>
              <span className="font-sans text-[11px] uppercase tracking-wider">Paper</span>
            </>
          )}
        </button>
      </div>
    </footer>
  );
}
