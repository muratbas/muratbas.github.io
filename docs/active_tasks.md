# Active Tasks

## Current Session: Kate Dehler Style Personal Portfolio Build

### Completed
- [x] Replace header logo with uploaded `logo.png` and enlarge display size ([`Logo.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/navigation/Logo.tsx))
- [x] Enlarge nav tabs, set default opacity to 100%, and apply blue hover (`hover:text-blue-600`) across all links ([`NavMenu.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/navigation/NavMenu.tsx))
- [x] Remove scale/zoom effect on card hover and add translucent white overlay ([`MediaCard.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/MediaCard.tsx))
- [x] Update footer copyright to `👾 Copyright Murat Baş 2026` and use social media logo icons ([`Footer.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/navigation/Footer.tsx))
- [x] Replace About section with centered statement and bold mailto link ([`AboutView.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/about/AboutView.tsx))
- [x] Configure global blue link hover in [`globals.css`](file:///c:/Projeler/portfolyowebsite/src/app/globals.css)
- [x] Integrate user's uploaded `Basteleur-Bold.otf` font via `next/font/local` in [`layout.tsx`](file:///c:/Projeler/portfolyowebsite/src/app/layout.tsx)
- [x] Change Contact tab to underlined `CV` tab with strictly normal font weight (`font-normal`, not bold), opening `/cv.pdf` in a new tab ([`NavMenu.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/navigation/NavMenu.tsx))
- [x] Implement forked sub-tabs (`ART` / `PHOTOS`) anchored directly underneath the `VISUALS` tab (matching user screenshot) with URL-synced filtering ([`NavMenu.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/navigation/NavMenu.tsx), [`page.tsx`](file:///c:/Projeler/portfolyowebsite/src/app/page.tsx))
- [x] Clicking `VISUALS` displays all items; clicking `ART` or `PHOTOS` isolates each category; clicking active sub-tab toggles back to all
- [x] Categorize visual items into `art` and `photos` in [`portfolio.data.ts`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/portfolio.data.ts)
- [x] Remove `context`, `role`, and `engineering Architecture` sections from Work modal ([`WorkDrawer.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/WorkDrawer.tsx), [`portfolio.types.ts`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/portfolio.types.ts), [`portfolio.data.ts`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/portfolio.data.ts))
- [x] Rename `Technologies & Infrastructure` header to `Tech stack` ([`WorkDrawer.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/WorkDrawer.tsx))
- [x] Set `VIEW LIVE PROJECT` button hover to sleek dark neutral (`hover:bg-neutral-800 hover:text-white`), keeping it dark and preventing blue color glitch ([`WorkDrawer.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/WorkDrawer.tsx))
- [x] Remove `subtitle` completely from portfolio data, interfaces, cards, and lightbox ([`portfolio.data.ts`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/portfolio.data.ts), [`portfolio.types.ts`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/portfolio.types.ts), [`MediaCard.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/MediaCard.tsx), [`MasonryGrid.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/MasonryGrid.tsx), [`Lightbox.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/Lightbox.tsx))
- [x] Clean up unused code and assets: removed redundant `src/features/contact/`, unused `src/lib/`, unused icons in [`Icons.tsx`](file:///c:/Projeler/portfolyowebsite/src/components/ui/Icons.tsx), duplicate `public/fonts/`, and default starter SVGs in `public/`
- [x] Remove `readTime` completely from [`writing.types.ts`](file:///c:/Projeler/portfolyowebsite/src/features/writing/writing.types.ts) and [`writing.data.ts`](file:///c:/Projeler/portfolyowebsite/src/features/writing/writing.data.ts)
- [x] Add optional essay banner image (`headerImage`) support directly above the title in [`ArticleReader.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/writing/ArticleReader.tsx) (matching GameInformer editorial style)
- [x] Remove `category` property completely from [`writing.types.ts`](file:///c:/Projeler/portfolyowebsite/src/features/writing/writing.types.ts) and [`writing.data.ts`](file:///c:/Projeler/portfolyowebsite/src/features/writing/writing.data.ts)
- [x] Configure Work tab to enforce fixed square (`aspect-square`) cards across all projects ([`page.tsx`](file:///c:/Projeler/portfolyowebsite/src/app/page.tsx), [`MasonryGrid.tsx`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/MasonryGrid.tsx), [`portfolio.data.ts`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/portfolio.data.ts), [`portfolio.types.ts`](file:///c:/Projeler/portfolyowebsite/src/features/portfolio/portfolio.types.ts))
- [x] Configure user's custom `favicon.ico` in [`src/app/favicon.ico`](file:///c:/Projeler/portfolyowebsite/src/app/favicon.ico), [`public/favicon.ico`](file:///c:/Projeler/portfolyowebsite/public/favicon.ico), and [`layout.tsx`](file:///c:/Projeler/portfolyowebsite/src/app/layout.tsx)
- [x] Verify build, types, and linter (`npm run lint` and `npm run type-check` both passing with 0 errors, 0 warnings)

### Blockers / Known Issues
- None.

### Next Steps
- Await next feature or feedback from user.
