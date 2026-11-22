"use client";

import React from "react";

interface ChapterHeaderProps {
  numeral: string;
  title: string;
  onBackToToc: () => void;
}

export function ChapterHeader({ numeral, title, onBackToToc }: ChapterHeaderProps) {
  return (
    <header className="mb-10 text-center relative">
      {/* Top back to contents link */}
      <div className="flex items-center justify-between pb-6 text-xs font-sans tracking-widest uppercase opacity-75">
        <button
          type="button"
          onClick={onBackToToc}
          className="cursor-pointer hover:underline underline-offset-4 flex items-center gap-1.5"
        >
          <span>←</span>
          <span>Contents</span>
        </button>
        <a
          href="#book-nav"
          className="hover:underline underline-offset-4 opacity-60 hover:opacity-100"
        >
          Jump to nav ↓
        </a>
      </div>

      {/* Roman Numeral and Title */}
      <div className="space-y-1">
        <div className="font-serif text-sm tracking-widest opacity-60 uppercase font-semibold">
          Chapter {numeral}
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black uppercase tracking-wider text-[var(--text-color)]">
          {title}
        </h1>
      </div>

      <div className="w-16 h-[1px] bg-current opacity-30 mx-auto mt-6" />
    </header>
  );
}
