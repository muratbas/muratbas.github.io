"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { VisualItem } from "./portfolio.types";
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/Icons";

interface LightboxProps {
  items: VisualItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(items.length - 1);
    }
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-white select-none"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-5 sm:px-10 z-10">
        <span className="text-xs font-medium tracking-tight text-neutral-400 uppercase">
          {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={onClose}
          className="p-2 -mr-2 text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
          aria-label="Close lightbox"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Center Image Container with Side Controls */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-20 p-3 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/10 cursor-pointer"
          aria-label="Previous artwork"
        >
          <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Center Artwork */}
        <div className="relative max-h-[75vh] max-w-[90vw] w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
            <Image
              src={currentItem.imageUrl}
              alt={currentItem.title}
              width={1000}
              height={1000}
              priority
              className="max-h-[75vh] max-w-full w-auto h-auto object-contain shadow-2xl"
            />
          </div>
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-20 p-3 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/10 cursor-pointer"
          aria-label="Next artwork"
        >
          <ArrowRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      {/* Bottom Minimalist Caption Bar */}
      <div className="px-6 py-6 sm:px-10 text-center z-10 border-t border-neutral-900 bg-black/60 backdrop-blur-xs">
        <h3 className="text-xs sm:text-sm font-semibold tracking-[-0.02em] uppercase text-neutral-100">
          {currentItem.title}
        </h3>
        <p className="mt-1 text-xs tracking-[-0.02em] uppercase text-neutral-400">
          {currentItem.subtitle} {currentItem.client && `• ${currentItem.client}`} • {currentItem.medium} ({currentItem.year})
        </p>
      </div>
    </div>
  );
}
