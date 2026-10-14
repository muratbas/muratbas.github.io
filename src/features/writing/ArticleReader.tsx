"use client";

import React from "react";
import { Article } from "./writing.types";
import { ArrowLeftIcon } from "@/components/ui/Icons";

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
}

export function ArticleReader({ article, onBack }: ArticleReaderProps) {
  // Simple clean markdown parser for headings, lists, bold, and code blocks
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
            className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 mt-8 mb-4 uppercase"
          >
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${index}`}
            className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mt-10 mb-4 uppercase"
          >
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("- ")) {
        elements.push(
          <li key={`li-${index}`} className="ml-5 list-disc text-neutral-700 text-sm sm:text-base my-1.5 leading-relaxed">
            {trimmed.replace("- ", "")}
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        elements.push(
          <li key={`oli-${index}`} className="ml-5 list-decimal text-neutral-700 text-sm sm:text-base my-1.5 leading-relaxed">
            {trimmed.replace(/^\d+\.\s/, "")}
          </li>
        );
      } else {
        elements.push(
          <p
            key={`p-${index}`}
            className="text-sm sm:text-base text-neutral-700 leading-relaxed my-4"
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
        className="inline-flex items-center space-x-2 text-xs font-semibold tracking-[-0.02em] uppercase text-neutral-500 hover:text-blue-600 transition-colors mb-10 cursor-pointer"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>BACK TO ESSAYS</span>
      </button>

      <div className="flex items-center space-x-3 text-xs tracking-[-0.02em] uppercase text-neutral-400 mb-4">
        <span>{article.date}</span>
        <span>•</span>
        <span>{article.readTime}</span>
        <span>•</span>
        <span className="text-neutral-900 font-semibold">{article.category}</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 mb-8 leading-tight">
        {article.title}
      </h1>

      <div className="w-full h-[1px] bg-neutral-200 mb-8" />

      <div className="prose prose-neutral max-w-none text-neutral-800">
        {renderContent(article.content)}
      </div>

      <div className="w-full h-[1px] bg-neutral-200 mt-12 mb-8" />

      <div className="flex justify-between items-center text-xs tracking-[-0.02em] uppercase text-neutral-500">
        <span>MURAT BAŞ // WRITING</span>
        <button
          type="button"
          onClick={onBack}
          className="text-neutral-950 font-semibold hover:text-blue-600 transition-colors cursor-pointer"
        >
          RETURN TO TOP ↑
        </button>
      </div>
    </article>
  );
}
