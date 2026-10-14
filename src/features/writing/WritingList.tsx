"use client";

import React, { useState } from "react";
import { ARTICLES } from "./writing.data";
import { Article } from "./writing.types";
import { ArticleReader } from "./ArticleReader";

export function WritingList() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (selectedArticle) {
    return (
      <ArticleReader
        article={selectedArticle}
        onBack={() => setSelectedArticle(null)}
      />
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="divide-y divide-neutral-200/80">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            className="py-8 sm:py-10"
          >
            {/* Date in Newsreader font */}
            <div className="font-newsreader text-xs sm:text-sm text-neutral-400 mb-2 tracking-normal italic">
              {article.date}
            </div>

            {/* Main Title - keeps custom font, turns blue on hover */}
            <div>
              <h2
                onClick={() => setSelectedArticle(article)}
                className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-neutral-950 hover:text-blue-600 transition-colors mb-3 leading-snug cursor-pointer inline-block"
              >
                {article.title}
              </h2>
            </div>

            {/* Excerpt in Newsreader font */}
            <p className="font-newsreader text-base sm:text-lg text-neutral-800 leading-relaxed">
              {article.excerpt}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
