"use client";

import React, { useSyncExternalStore, useEffect } from "react";
import { useSquashStretch } from "./useSquashStretch";
import { TableOfContents } from "./TableOfContents";
import { ChapterAbout } from "./ChapterAbout";
import { ChapterWork } from "./ChapterWork";
import { ChapterWriting } from "./ChapterWriting";
import { ChapterVisuals } from "./ChapterVisuals";
import { BookFooter } from "./BookFooter";

type Chapter = "toc" | "about" | "work" | "writing" | "visuals";
type Theme = "paperback" | "goth";

// Theme external store subscribers
const themeListeners = new Set<() => void>();

function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    themeListeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "paperback";
  const saved = localStorage.getItem("lynn_theme");
  if (saved === "paperback" || saved === "goth") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "goth" : "paperback";
}

function getServerThemeSnapshot(): Theme {
  return "paperback";
}

// Chapter URL hash external store
function subscribeHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getHashSnapshot(): Chapter {
  if (typeof window === "undefined") return "toc";
  const hash = window.location.hash.replace("#", "") as Chapter;
  if (["about", "work", "writing", "visuals"].includes(hash)) return hash;
  return "toc";
}

function getServerHashSnapshot(): Chapter {
  return "toc";
}

export function BookExperience() {
  const chapter = useSyncExternalStore(subscribeHash, getHashSnapshot, getServerHashSnapshot);
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const { containerRef, isSettling } = useSquashStretch();

  // Sync html data-theme attribute whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSelectChapter = (newChapter: Chapter) => {
    if (newChapter === "toc") {
      window.history.pushState(null, "", window.location.pathname);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      window.location.hash = newChapter;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === "paperback" ? "goth" : "paperback";
    localStorage.setItem("lynn_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    themeListeners.forEach((l) => l());
  };

  return (
    <main className="w-full min-h-screen py-8 sm:py-16 px-4">
      <div
        ref={containerRef}
        className={`book-app max-w-[436px] w-full mx-auto ${
          isSettling ? "spring-settling" : ""
        }`}
      >
        {chapter === "toc" && (
          <TableOfContents
            onSelectChapter={handleSelectChapter}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />
        )}

        {chapter === "about" && (
          <>
            <ChapterAbout onBackToToc={() => handleSelectChapter("toc")} />
            <BookFooter
              currentChapter={chapter}
              onSelectChapter={handleSelectChapter}
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />
          </>
        )}

        {chapter === "work" && (
          <>
            <ChapterWork onBackToToc={() => handleSelectChapter("toc")} />
            <BookFooter
              currentChapter={chapter}
              onSelectChapter={handleSelectChapter}
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />
          </>
        )}

        {chapter === "writing" && (
          <>
            <ChapterWriting onBackToToc={() => handleSelectChapter("toc")} />
            <BookFooter
              currentChapter={chapter}
              onSelectChapter={handleSelectChapter}
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />
          </>
        )}

        {chapter === "visuals" && (
          <>
            <ChapterVisuals onBackToToc={() => handleSelectChapter("toc")} />
            <BookFooter
              currentChapter={chapter}
              onSelectChapter={handleSelectChapter}
              theme={theme}
              onToggleTheme={handleToggleTheme}
            />
          </>
        )}
      </div>
    </main>
  );
}
