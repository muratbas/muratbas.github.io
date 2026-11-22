"use client";

import React, { useRef, useEffect, useState } from "react";

interface DitherMediaCardProps {
  src: string;
  alt: string;
  aspectClassName?: string;
  theme?: "day" | "night";
  className?: string;
  onClick?: () => void;
  priority?: boolean;
}

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function DitherMediaCard({
  src,
  alt,
  aspectClassName = "aspect-[16/10]",
  theme = "night",
  className = "",
  onClick,
}: DitherMediaCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInCenter, setIsInCenter] = useState(false);
  const [isDitherReady, setIsDitherReady] = useState(false);

  // Mobile IntersectionObserver for center focus color reveal
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInCenter(entry.isIntersecting);
      },
      {
        rootMargin: "-25% 0px -25% 0px",
        threshold: 0.3,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Generate 2-color Bayer dither overlay on canvas
  useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (isCancelled || !canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Sample down to stipple resolution for authentic Bayer grain
      const targetWidth = Math.min(320, img.naturalWidth || 320);
      const ratio = img.naturalHeight / (img.naturalWidth || 1);
      const targetHeight = Math.max(1, Math.round(targetWidth * (ratio || 0.625)));

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      try {
        const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const data = imgData.data;

        // Palette definition: #121212 (dark) and #F3F2EE (light)
        const darkR = 18, darkG = 18, darkB = 18;
        const lightR = 243, lightG = 242, lightB = 238;

        for (let y = 0; y < targetHeight; y++) {
          for (let x = 0; x < targetWidth; x++) {
            const idx = (y * targetWidth + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // Perceived luminance
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            const bayerVal = BAYER_4X4[y % 4][x % 4];
            // Bayer threshold offset: maps 0..15 to roughly -50..+50
            const thresholdOffset = (bayerVal / 16 - 0.5) * 80;

            const isLight = gray + thresholdOffset > 128;

            if (isLight) {
              data[idx] = lightR;
              data[idx + 1] = lightG;
              data[idx + 2] = lightB;
            } else {
              data[idx] = darkR;
              data[idx + 1] = darkG;
              data[idx + 2] = darkB;
            }
            data[idx + 3] = 255;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setIsDitherReady(true);
      } catch {
        // In case of CORS or canvas security restrictions, fallback CSS handles it
        setIsDitherReady(false);
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [src, theme]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl select-none ${aspectClassName} ${className}`}
    >
      {/* 1. Underlying vivid full-color image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />

      {/* 2. Top dithered layer: canvas Bayer dither */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300 ease-out ${
          isDitherReady ? "block" : "hidden"
        } ${
          isInCenter
            ? "opacity-0"
            : "opacity-100 group-hover:opacity-0"
        }`}
      />

      {/* 3. Fallback CSS monochrome dither overlay when canvas is loading or blocked */}
      {!isDitherReady && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full pointer-events-none backdrop-grayscale backdrop-contrast-150 transition-opacity duration-300 ease-out ${
            isInCenter
              ? "opacity-0"
              : "opacity-100 group-hover:opacity-0"
          }`}
          style={{
            backgroundColor: theme === "day" ? "rgba(243, 242, 238, 0.35)" : "rgba(18, 18, 18, 0.4)",
            backgroundImage: `radial-gradient(${theme === "day" ? "#121212" : "#F3F2EE"} 0.75px, transparent 0.75px)`,
            backgroundSize: "3px 3px",
          }}
        />
      )}
    </div>
  );
}
