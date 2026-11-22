"use client";

import React from "react";

interface TableOfContentsProps {
  onSelectChapter: (chapter: "about" | "work" | "writing" | "visuals") => void;
  theme: "paperback" | "goth";
  onToggleTheme: () => void;
}

export function TableOfContents({
  onSelectChapter,
  theme,
  onToggleTheme,
}: TableOfContentsProps) {
  return (
    <div className="flex flex-col min-h-[85vh] justify-between py-10 sm:py-16">
      {/* Book Title & Frontispiece */}
      <header className="text-center space-y-3 pt-6">
        <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-wider uppercase text-[var(--text-color)]">
          Murat Baş
        </h1>
        <h2 className="text-lg sm:text-xl font-serif italic opacity-85">
          Full-stack Engineer &amp; Designer
        </h2>
        <p className="text-xs font-sans uppercase tracking-widest opacity-60">
          Samsun, Turkey • Black Sea
        </p>

        <div className="w-16 h-[1px] bg-current opacity-30 mx-auto mt-6" />
      </header>

      {/* Table of Contents Spread with Dotted Leaders */}
      <nav className="my-12" aria-label="Table of Contents">
        <div className="text-center text-xs font-sans uppercase tracking-widest opacity-50 mb-6">
          — Table of Contents —
        </div>

        <ol className="space-y-4 font-serif text-lg sm:text-xl">
          <li>
            <button
              type="button"
              onClick={() => onSelectChapter("about")}
              className="w-full flex items-baseline gap-2 group cursor-pointer text-left text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
            >
              <span className="font-semibold tracking-wide">ABOUT</span>
              <span className="toc-leader" />
              <span className="font-serif font-semibold">I</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              onClick={() => onSelectChapter("work")}
              className="w-full flex items-baseline gap-2 group cursor-pointer text-left text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
            >
              <span className="font-semibold tracking-wide">WORK</span>
              <span className="toc-leader" />
              <span className="font-serif font-semibold">II</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              onClick={() => onSelectChapter("writing")}
              className="w-full flex items-baseline gap-2 group cursor-pointer text-left text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
            >
              <span className="font-semibold tracking-wide">WRITING</span>
              <span className="toc-leader" />
              <span className="font-serif font-semibold">III</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              onClick={() => onSelectChapter("visuals")}
              className="w-full flex items-baseline gap-2 group cursor-pointer text-left text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
            >
              <span className="font-semibold tracking-wide">VISUALS</span>
              <span className="toc-leader" />
              <span className="font-serif font-semibold">IV</span>
            </button>
          </li>

          <li>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-baseline gap-2 group cursor-pointer text-left text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors"
            >
              <span className="font-semibold tracking-wide">RESUME (PDF)</span>
              <span className="toc-leader" />
              <span className="font-serif font-semibold">V</span>
            </a>
          </li>
        </ol>
      </nav>

      {/* Book Footnote / Colophon */}
      <footer className="pt-6 border-t border-current/20 flex items-center justify-between text-xs opacity-80">
        <div className="flex items-center gap-3">
          <span className="hover-wavy cursor-default font-serif font-medium">
            v. MMXXVI
          </span>
          <span className="opacity-40">•</span>
          <a
            href="https://github.com/muratbas"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 font-sans"
          >
            GitHub ↗
          </a>
        </div>

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
      </footer>
    </div>
  );
}
