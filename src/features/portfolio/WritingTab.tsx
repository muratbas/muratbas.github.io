"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ARTICLES } from "../writing/writing.data";

export function WritingTab() {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const activeArticle = ARTICLES.find((a) => a.id === activeArticleId);

  if (activeArticle) {
    const paragraphs = activeArticle.content
      .trim()
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    return (
      <article className="max-w-2xl mx-auto space-y-7 animate-fadeIn">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#0A0A0A]/65">
          <button
            type="button"
            onClick={() => setActiveArticleId(null)}
            className="cursor-pointer hover:text-[#0A0A0A] transition-colors flex items-center gap-1.5 lowercase"
          >
            <span>←</span>
            <span>back</span>
          </button>
          <span>{activeArticle.date}</span>
        </div>

        <header className="space-y-4 text-center pt-2">
          <h1 className="text-2xl sm:text-4xl font-sans font-semibold tracking-tight text-[#0A0A0A]">
            {activeArticle.title}
          </h1>
        </header>

        {activeArticle.headerImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={activeArticle.headerImage}
              alt={activeArticle.title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-5 text-base sm:text-lg leading-relaxed font-serif text-[#0A0A0A]/90">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="pt-8 text-center">
          <button
            type="button"
            onClick={() => setActiveArticleId(null)}
            className="cursor-pointer text-xs lowercase tracking-widest text-[#0A0A0A]/70 hover:text-[#0A0A0A] underline underline-offset-4 transition-colors"
          >
            ← back
          </button>
        </div>
      </article>
    );
  }

  return (
    <section className="max-w-2xl mx-auto">
      <div className="divide-y divide-black/[0.08]">
        {ARTICLES.map((article) => (
          <button
            key={article.id}
            type="button"
            onClick={() => setActiveArticleId(article.id)}
            className="w-full py-6 sm:py-7 flex flex-col items-start gap-1.5 text-left group cursor-pointer"
          >
            <span className="text-xs uppercase tracking-widest text-[#0A0A0A]/55">
              {article.date}
            </span>
            <h2 className="text-xl sm:text-2xl font-sans font-medium text-[#0A0A0A] group-hover:underline underline-offset-4 decoration-1">
              {article.title}
            </h2>
          </button>
        ))}
      </div>
    </section>
  );
}
