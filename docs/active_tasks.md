# Active Tasks

## Current Session: Portfolio Redesign (muratbas.com)

### Completed
- [x] Upgraded `next` and `eslint-config-next` from `16.4.1` to `16.4.6`.
- [x] Configured typography in `src/app/layout.tsx` and `src/app/globals.css`:
  - `Momo Trust Display` for tab navigation buttons
  - `Newsreader` for writing essays
  - `Stack Sans Headline` for all other site copy
- [x] Built new minimalist editorial portfolio shell (`src/features/portfolio/PortfolioShell.tsx`) with:
  - Centered `logofinal.png` logo and `mt-6` 3-tab lowercase navigation (`projects`, `writing`, `about`) with no borders/boxes and hover scale.
  - Fixed, non-animated gradient backgrounds per tab (`bg-projects.jpg`, `bg-writing.jpg`, and static CSS aura for `about`).
  - `max-w-4xl mx-auto px-6 pb-20` content area with `fadeIn` transition.
- [x] Built `ProjectsTab.tsx`, `WritingTab.tsx` (removed `excerpt` from `Article` type and data), and `AboutTab.tsx` (updated email to `contact@muratbas.com` and moved CV button below contact text).
- [x] Removed `visuals` tab and cleaned up unused `src/features/book`, `src/features/scene`, and `src/components` directories.
- [x] Verified `npm run lint`, `npm run type-check`, and `npm run build` pass with 0 errors.

### Next Steps
- Refine the `projects` (`work`) tab design and content in the next phase.
