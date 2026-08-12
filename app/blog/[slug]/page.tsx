"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlugAsync } from "@/lib/blogStore";
import { BlogPost } from "@/lib/types/blog";

// Simple Markdown / HTML renderer helper for blog body content
function renderMarkdownContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let keyIndex = 0;

  lines.forEach((line) => {
    // Code block toggle
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={keyIndex++}
            className="my-6 p-4 bg-slate-900 text-slate-100 rounded-xl overflow-x-auto text-xs font-mono border border-slate-800"
          >
            <code>{codeBuffer.join("\n")}</code>
          </pre>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={keyIndex++} className="text-xl font-bold text-slate-900 mt-8 mb-4">
          {line.replace("### ", "")}
        </h3>
      );
      return;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={keyIndex++} className="text-2xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2">
          {line.replace("## ", "")}
        </h2>
      );
      return;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={keyIndex++}
          className="my-6 pl-4 border-l-4 border-[#209CEE] italic text-slate-700 bg-slate-50 py-3 pr-4 rounded-r-lg"
        >
          {line.replace("> ", "")}
        </blockquote>
      );
      return;
    }

    // Bullet items
    if (line.startsWith("- ") || line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
      elements.push(
        <li key={keyIndex++} className="ml-6 list-disc text-slate-700 my-1 leading-relaxed">
          {parseInlineFormatting(line.replace(/^(\d+\.|-)\s+/, ""))}
        </li>
      );
      return;
    }

    // Empty lines
    if (!line.trim()) {
      return;
    }

    // Regular paragraphs
    elements.push(
      <p key={keyIndex++} className="text-slate-700 my-4 text-base sm:text-lg leading-relaxed">
        {parseInlineFormatting(line)}
      </p>
    );
  });

  return elements;
}

// Parse inline Markdown links [text](url) and bold **text**
function parseInlineFormatting(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("[")) {
      const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#209CEE] font-medium hover:underline inline-items-center gap-0.5"
          >
            {linkMatch[1]}
          </a>
        );
      }
    } else if (token.startsWith("**")) {
      const boldText = token.slice(2, -2);
      parts.push(<strong key={match.index} className="font-semibold text-slate-900">{boldText}</strong>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export default function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const fetched = await getPostBySlugAsync(resolvedParams.slug);
        if (fetched) {
          setPost(fetched);
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
      } finally {
        setLoaded(true);
      }
    }
    loadPost();
  }, [resolvedParams.slug]);

  if (loaded && !post) {
    notFound();
  }

  if (!post) return null;

  return (
    <article className="max-w-4xl mx-auto px-6 sm:px-10 py-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#209CEE] transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Tüm Yazılara Dön
        </Link>
      </div>

      {/* Header Info */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-4 text-xs sm:text-sm text-slate-500 border-y border-slate-100 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden relative border border-slate-200">
              <Image src="/favicon.ico" alt="Murat Baş" fill className="object-contain" unoptimized />
            </div>
            <span className="font-semibold text-slate-900">Murat Baş</span>
          </div>
          <span>•</span>
          <span>{post.createdAt}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative w-full h-[280px] sm:h-[420px] rounded-3xl overflow-hidden mb-12 shadow-sm border border-slate-200/80">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      {/* Main Content Body */}
      <div className="max-w-3xl mx-auto prose prose-slate">
        {renderMarkdownContent(post.content)}
      </div>

      {/* Bottom Share / Footer */}
      <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Yazar:</span>
          <span className="text-xs font-bold text-slate-900">Murat Baş</span>
        </div>
        <Link
          href="/blog"
          className="text-xs font-semibold text-[#209CEE] hover:underline"
        >
          Diğer yazıları keşfedin &rarr;
        </Link>
      </div>
    </article>
  );
}
