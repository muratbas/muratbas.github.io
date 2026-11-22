"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChapterHeader } from "./ChapterHeader";
import { ARTICLES } from "../writing/writing.data";

interface ChapterWritingProps {
  onBackToToc: () => void;
}

export function ChapterWriting({ onBackToToc }: ChapterWritingProps) {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);

  const activeArticle = ARTICLES.find((a) => a.id === activeArticleId);

  if (activeArticle) {
    const paragraphs = activeArticle.content
      .trim()
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    return (
      <article className="space-y-6">
        <header className="mb-8 relative">
          <div className="flex items-center justify-between pb-6 text-xs font-sans tracking-widest uppercase opacity-75">
            <button
              type="button"
              onClick={() => setActiveArticleId(null)}
              className="cursor-pointer hover:underline underline-offset-4 flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Back to Writing</span>
            </button>
            <span className="opacity-60">{activeArticle.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-wide text-[var(--text-color)] text-center">
            {activeArticle.title}
          </h1>
          <div className="w-16 h-[1px] bg-current opacity-30 mx-auto mt-4" />
        </header>

        {activeArticle.headerImage && (
          <div className="border border-current/30 p-1.5 bg-[var(--card-bg)] shadow-sm my-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={activeArticle.headerImage}
                alt={activeArticle.title}
                fill
                sizes="(max-width: 500px) 100vw, 436px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="space-y-5 text-base sm:text-lg leading-relaxed font-serif">
          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={idx === 0 ? "drop-cap" : "opacity-90"}
            >
              {p}
            </p>
          ))}
        </div>

        <div className="pt-8 border-t border-current/20 text-center">
          <button
            type="button"
            onClick={() => setActiveArticleId(null)}
            className="cursor-pointer text-xs font-sans uppercase tracking-widest underline underline-offset-4 hover:text-[var(--accent-color)]"
          >
            ← Back to all essays
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="space-y-10">
      <ChapterHeader numeral="III" title="Writing" onBackToToc={onBackToToc} />

      <p className="text-base font-serif italic text-center opacity-80 pb-2">
        Essays, personal notes, and observations on work, geography, and transitions.
      </p>

      <div className="space-y-8 divide-y divide-current/15">
        {ARTICLES.map((article) => (
          <div key={article.id} className="pt-6 first:pt-0 space-y-2">
            <div className="text-xs font-sans uppercase tracking-widest opacity-60">
              {article.date}
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold">
              <button
                type="button"
                onClick={() => setActiveArticleId(article.id)}
                className="cursor-pointer text-left hover:text-[var(--accent-color)] hover:underline underline-offset-4 transition-colors"
              >
                {article.title}
              </button>
            </h2>

            <p className="text-sm sm:text-base opacity-85 leading-relaxed font-serif">
              {article.excerpt}
            </p>

            <button
              type="button"
              onClick={() => setActiveArticleId(article.id)}
              className="inline-flex items-center gap-1 text-xs font-sans uppercase tracking-wider font-semibold hover:underline underline-offset-4 pt-1 hover:text-[var(--accent-color)]"
            >
              <span>Read essay</span>
              <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}
