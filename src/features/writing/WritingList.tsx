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
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold tracking-[-0.02em] uppercase text-neutral-400">
          EDITORIAL ESSAYS & TECHNICAL NOTES
        </span>
      </div>

      <div className="divide-y divide-neutral-200/80">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            className="group py-8 sm:py-10 transition-colors cursor-pointer"
            onClick={() => setSelectedArticle(article)}
          >
            <div className="flex items-center space-x-3 text-xs tracking-[-0.02em] uppercase text-neutral-400 mb-2.5">
              <span>{article.date}</span>
              <span>—</span>
              <span>{article.readTime}</span>
              <span>—</span>
              <span className="text-neutral-700 font-medium">{article.category}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
              {article.title}
            </h2>

            <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed mb-4">
              {article.excerpt}
            </p>

            <span className="inline-flex items-center text-xs font-semibold tracking-tight uppercase text-neutral-950 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
              READ ESSAY →
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
