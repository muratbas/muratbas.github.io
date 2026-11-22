# Active Tasks

## Current Session: Lynn Fisher (lynnandtonic.com v. XIX) Book Adaptation for Murat Baş

### Completed
- [x] Inspected `https://lynnandtonic.com/` (v. XIX — Paperback & Goth Book) using browser subagent:
  - Documented dual-theme system (Paperback `#e4e2d7` & Goth `#111111` / `#ff3b3b`).
  - Extracted 436px fixed-column book format, CSS radial-gradient dotted leader lines, Roman numeral chapter headers (`I`, `II`, `III`, `IV`), drop caps, and signature "Squash & Stretch" meta-responsive spring bounce physics.
- [x] Implemented global styles (`src/app/globals.css`) with:
  - Dual CSS variable system (`[data-theme="paperback"]` and `[data-theme="goth"]`).
  - Tactile paper & slate grain backgrounds.
  - Drop-cap styling for articles (`.drop-cap::first-letter`).
  - Exact `.toc-leader` radial-gradient dotted lines with `background-repeat: space`.
  - Inverted skip links, double box-shadow focus rings, and wavy hover underlines (`.hover-wavy`).
- [x] Created `useSquashStretch` hook recreating Lynn Fisher's signature window resize spring physics (`cubic-bezier(0.175, 0.885, 0.12, 1.775)`).
- [x] Built `TableOfContents` component replicating the book cover/index with dynamic dotted leaders, Roman numerals, and theme toggle.
- [x] Built Chapter pages tailored to Murat Baş's actual content:
  - **Chapter I: About** (`ChapterAbout.tsx`): Framed studio vista, drop-cap opening paragraph, bio narrative, core technologies, and 1-click email copy.
  - **Chapter II: Work** (`ChapterWork.tsx`): Single-column framed cards for Tubify, Samsunforum, Tarihi Çarşamba Pide, and Hotel Management System.
  - **Chapter III: Writing** (`ChapterWriting.tsx`): Essay directory and full inline reading view for "Mezuniyet ve Amerika".
  - **Chapter IV: Visuals** (`ChapterVisuals.tsx`): Framed plates with medium, client, and interactive lightbox modal.
  - **Book Footer** (`BookFooter.tsx`): Index of chapters, direct contacts, colophon, and quick Sun/Moon toggle.
- [x] Implemented React 19 / Next.js 16 compliant `useSyncExternalStore` architecture for URL hash navigation (`#about`, `#work`, `#writing`, `#visuals`) and zero-flicker theme persistence.
- [x] Executed Next.js security upgrade in separate Git worktree (`C:\Projeler\portfolyowebsite-upgrade`) on branch `next-security-upgrade`:
  - Upgraded Next.js from `16.4.1` to `16.4.6` and `eslint-config-next` to `16.4.6`.
  - Configured `experimental.agentUpgrade = "security"` in `next.config.ts`.
  - Verified `type-check`, `lint`, and `next build` with 0 errors.
  - Committed verified upgrade to Git and transmitted upgrade telemetry confirmation.

### Blockers / Known Issues
- None.

### Next Steps
- Main branch or worktree can be used or merged whenever ready (`git merge next-security-upgrade`).
