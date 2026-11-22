"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Recreates Lynn Fisher's famous "Squash & Stretch" meta-responsive window bounce:
 * - Actively scales the book container horizontally during live window resizing.
 * - Springs back with an elastic cubic-bezier bounce when the user lets go of the window edge.
 */
export function useSquashStretch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevWidthRef = useRef<number>(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [isSettling, setIsSettling] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    prevWidthRef.current = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const el = containerRef.current;
      if (!el || currentWidth < 500) {
        if (el) el.style.transform = "scale(1, 1)";
        return;
      }

      const delta = currentWidth - prevWidthRef.current;
      const appWidth = 436;
      // Calculate scale relative to width velocity
      const scaleX = Math.max(0.65, Math.min(1.4, (delta / appWidth) + 1));

      setIsSettling(false);
      el.style.transform = `scale(${scaleX}, 1)`;

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Settle spring back
      debounceTimerRef.current = setTimeout(() => {
        setIsSettling(true);
        if (containerRef.current) {
          containerRef.current.style.transform = "scale(1, 1)";
        }
        prevWidthRef.current = window.innerWidth;
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  return { containerRef, isSettling };
}
