"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChapterHeader } from "./ChapterHeader";
import { VISUAL_ITEMS } from "../portfolio/portfolio.data";
import { VisualItem } from "../portfolio/portfolio.types";

interface ChapterVisualsProps {
  onBackToToc: () => void;
}

export function ChapterVisuals({ onBackToToc }: ChapterVisualsProps) {
  const [selectedItem, setSelectedItem] = useState<VisualItem | null>(null);

  return (
    <article className="space-y-12">
      <ChapterHeader numeral="IV" title="Visuals" onBackToToc={onBackToToc} />

      <p className="text-base font-serif italic text-center opacity-80 pb-2">
        Art direction, poster design, stipple screenprints, and digital lithography plates.
      </p>

      <div className="space-y-12">
        {VISUAL_ITEMS.map((item) => (
          <section
            key={item.id}
            className="group space-y-2.5"
          >
            {/* Framed Artwork Plate */}
            <button
              type="button"
              onClick={() => setSelectedItem(item)}
              className="w-full text-left cursor-zoom-in border border-current/30 p-1.5 bg-[var(--card-bg)] shadow-sm transition-transform duration-200 group-hover:scale-[1.01]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 500px) 100vw, 436px"
                  className="object-contain p-2"
                />
              </div>
            </button>

            {/* Plate Caption Bar */}
            <div className="flex items-baseline justify-between gap-2 border-b border-current/20 pb-1 text-sm font-serif">
              <h2 className="font-bold uppercase tracking-wide">
                {item.title}
              </h2>
              <span className="text-xs font-sans opacity-60">
                {item.year}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-sans opacity-75">
              <span>{item.medium}</span>
              {item.client && <span className="italic">{item.client}</span>}
            </div>
          </section>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] bg-[var(--bg-color)] text-[var(--text-color)] border border-current p-3 sm:p-6 shadow-2xl flex flex-col gap-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-current/20 pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg uppercase">
                  {selectedItem.title}
                </h3>
                <p className="text-xs font-sans opacity-70">
                  {selectedItem.medium} {selectedItem.client ? `• ${selectedItem.client}` : ""} ({selectedItem.year})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="cursor-pointer text-xs font-sans uppercase tracking-widest px-2 py-1 border border-current/30 hover:border-current"
              >
                Close ✕
              </button>
            </div>

            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-black/5 border border-current/20 overflow-hidden">
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
