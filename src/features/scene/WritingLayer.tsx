"use client";

import React, { useState } from "react";
import { ARTICLES } from "@/features/writing/writing.data";
import { DitherMediaCard } from "@/components/DitherMediaCard";

interface WritingLayerProps {
  onBack: () => void;
  theme: "day" | "night";
}

export function WritingLayer({ onBack, theme }: WritingLayerProps) {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle = ARTICLES.find((a) => a.id === selectedArticleId);

  const textColorClass = theme === "day" ? "text-[#121212]" : "text-[#F3F2EE]";
  const subTextColorClass = theme === "day" ? "text-[#121212]/70" : "text-[#F3F2EE]/70";

  return (
    <div className={`w-full max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6 ${textColorClass}`}>
      {selectedArticle ? (
        /* Reading View */
        <article className="flex flex-col gap-6 animate-fadeIn">
          {/* Top navigation within writing */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => setSelectedArticleId(null)}
              className="text-sm sm:text-base opacity-70 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1.5"
            >
              <span>←</span>
              <span>back to writing</span>
            </button>
            <span className="text-xs uppercase tracking-widest opacity-40 font-mono">
              essay
            </span>
          </div>

          {/* Optional header image with DitherMediaCard */}
          {selectedArticle.headerImage && (
            <div className="my-2">
              <DitherMediaCard
                src={selectedArticle.headerImage}
                alt={selectedArticle.title}
                aspectClassName="aspect-[21/9]"
                theme={theme}
              />
            </div>
          )}

          {/* Article Header */}
          <header className="space-y-2 border-b border-current/10 pb-6">
            <p className="text-xs font-mono opacity-50 uppercase tracking-widest">
              {selectedArticle.date}
            </p>
            <h1 className="text-2xl sm:text-4xl font-serif font-normal tracking-tight">
              {selectedArticle.title}
            </h1>
          </header>

          {/* Article Content */}
          <div className="prose prose-neutral max-w-none space-y-5 text-base sm:text-lg leading-relaxed font-sans font-light opacity-90">
            {selectedArticle.content
              .trim()
              .split("\n\n")
              .map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph.trim()}
                </p>
              ))}
          </div>
        </article>
      ) : (
        /* List View */
        <div className="flex flex-col gap-8 animate-fadeIn">
          {/* Top action header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={onBack}
              className="text-sm sm:text-base opacity-70 hover:opacity-100 transition-opacity cursor-pointer flex items-center gap-1.5"
            >
              <span>←</span>
              <span>back</span>
            </button>
            <span className="text-xs uppercase tracking-widest opacity-40 font-mono">
              writing & reflections
            </span>
          </div>

          <div className="flex flex-col divide-y divide-current/10">
            {ARTICLES.map((article) => (
              <button
                key={article.id}
                type="button"
                onClick={() => setSelectedArticleId(article.id)}
                className="py-6 sm:py-8 flex flex-col items-start gap-2 text-left group cursor-pointer transition-opacity hover:opacity-80"
              >
                <span className="text-xs font-mono opacity-50 uppercase tracking-wider">
                  {article.date}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-normal tracking-tight group-hover:underline underline-offset-4 decoration-1">
                  {article.title}
                </h3>
                <p className={`text-sm sm:text-base line-clamp-2 ${subTextColorClass}`}>
                  {article.excerpt}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
