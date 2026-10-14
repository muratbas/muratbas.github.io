"use client";

import React from "react";
import { Article } from "./writing.types";
import { ArrowLeftIcon } from "@/components/ui/Icons";

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
}

export function ArticleReader({ article, onBack }: ArticleReaderProps) {
  // Render markdown content using Newsreader font for all text
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${index}`}
              className="my-6 p-4 bg-neutral-900 text-neutral-100 rounded text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800"
            >
              <code>{codeBlockContent.join("\n")}</code>
            </pre>
          );
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      const trimmed = line.trim();
      if (!trimmed) {
        return;
      }

      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3
            key={`h3-${index}`}
            className="font-newsreader text-xl sm:text-2xl font-bold text-neutral-900 mt-8 mb-4 tracking-normal"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${index}`}
            className="font-newsreader text-2xl sm:text-3xl font-bold text-neutral-900 mt-10 mb-4 tracking-normal"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("- ")) {
        elements.push(
          <li key={`li-${index}`} className="font-newsreader ml-6 list-disc text-neutral-800 text-base sm:text-lg my-2 leading-relaxed">
            {trimmed.replace("- ", "")}
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        elements.push(
          <li key={`oli-${index}`} className="font-newsreader ml-6 list-decimal text-neutral-800 text-base sm:text-lg my-2 leading-relaxed">
            {trimmed.replace(/^\d+\.\s/, "")}
          </li>
        );
      } else {
        elements.push(
          <p
            key={`p-${index}`}
            className="font-newsreader text-base sm:text-lg text-neutral-800 leading-relaxed my-5"
          >
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <button
        type="button"
        onClick={onBack}
        className="font-newsreader inline-flex items-center space-x-2 text-sm text-neutral-500 hover:text-blue-600 transition-colors mb-10 cursor-pointer italic"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>Back to Essays</span>
      </button>

      {/* Date only, in Newsreader italic */}
      <div className="font-newsreader text-xs sm:text-sm text-neutral-400 mb-3 italic">
        {article.date}
      </div>

      {/* Title keeps the custom font */}
      <h1 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 mb-8 leading-tight">
        {article.title}
      </h1>

      <div className="w-full h-[1px] bg-neutral-200 mb-8" />

      {/* Article content in Newsreader font */}
      <div className="max-w-none">
        {renderContent(article.content)}
      </div>

      <div className="w-full h-[1px] bg-neutral-200 mt-12 mb-8" />

      <div className="font-newsreader flex justify-between items-center text-sm text-neutral-500">
        <span>Murat Baş // Writing</span>
        <button
          type="button"
          onClick={onBack}
          className="text-neutral-950 font-medium hover:text-blue-600 transition-colors cursor-pointer"
        >
          Return to top ↑
        </button>
      </div>
    </article>
  );
}
