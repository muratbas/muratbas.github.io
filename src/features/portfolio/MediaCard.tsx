"use client";

import React from "react";
import Image from "next/image";
import { AspectRatioType } from "./portfolio.types";

interface MediaCardProps {
  id: string;
  title: string;
  aspectRatio: AspectRatioType;
  imageUrl: string;
  onClick: () => void;
  priority?: boolean;
}

const ASPECT_RATIO_CLASSES: Record<AspectRatioType, string> = {
  tall: "aspect-[5/8]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[16/10]",
  wide: "aspect-[16/9]",
};

export function MediaCard({
  title,
  aspectRatio,
  imageUrl,
  onClick,
  priority = false,
}: MediaCardProps) {
  const aspectClass = ASPECT_RATIO_CLASSES[aspectRatio] || "aspect-[4/5]";

  return (
    <div className="group w-full mb-8 sm:mb-10 break-inside-avoid">
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-sm"
        aria-label={title}
      >
        {/* Zero-border, zero-shadow image canvas without zoom scale */}
        <div className={`relative w-full overflow-hidden bg-white select-none ${aspectClass}`}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            draggable={false}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover object-center select-none pointer-events-none"
          />

          {/* Translucent white overlay on hover matching reference screenshot */}
          <div className="absolute inset-0 bg-white/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        </div>

        {/* Minimal centered caption with tight letter spacing */}
        <div className="mt-2.5 sm:mt-3 px-1 text-center">
          <p className="text-xs sm:text-[13px] font-medium tracking-[-0.025em] uppercase text-[#2d2a24] group-hover:text-blue-600 transition-colors duration-150 leading-snug">
            {title}
          </p>
        </div>
      </button>
    </div>
  );
}
