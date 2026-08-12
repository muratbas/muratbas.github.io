# Murat Baş - Design System & Development Guidelines

This document outlines the official design system, typography, color palette, and coding conventions for all Murat Baş web applications (including `muratbas.com`, `blog.muratbas.com`, and `lab.muratbas.com`).

---

## 🎨 Color Palette & Aesthetic

- **Background**: Pure white (`#ffffff`). Subtle gradient animated blobs are allowed for modern depth.
- **Accent Color**: Electric Blue (`#209CEE`). Used for active link hovers, highlights, and primary glows.
- **Primary Text**: Dark Slate / Onyx (`#191c1e` / `#0f172a`).
- **Pill Buttons**: Solid Black (`bg-black` / `#000000`) with smooth dark gray hover (`hover:bg-[#27272a]`), rounded pills (`rounded-full`).
- **Interactive Links Hover**: Scale animation (`hover:scale-105 transition-all duration-200`) and accent blue text (`#209CEE`).
- **Special Action Buttons (e.g., LAB)**: Liquid animated gradient (Black `#050505` to Accent Blue `#209CEE`) with subtle glowing shadow.

---

## 🔤 Typography & Turkish Extended Character Support

- **Primary Custom Font**: `AeonikTRIAL-Bold.otf` (located in `public/fonts/AeonikTRIAL-Bold.otf` via `next/font/local`).
- **Turkish Glyph Fallback**: `Roboto` with `latin-ext` subset loaded via `next/font/google`.
- **CSS Font Family Stack**:
  ```css
  font-family: var(--font-aeonik), var(--font-roboto), 'Roboto', sans-serif;
  ```
- **Font Weight**: Default body/navbar links use `font-weight: 500`.

---

## 🧩 UI Components & Layout Guidelines

1. **Header / Navbar**:
   - Full-width fixed header inspired by `btw.so` (`bg-white/90 backdrop-blur-md border-b border-slate-200/70`).
   - Left: Favicon icon logo (`/favicon.ico`).
   - Right: Nav links (`Work`, `Tech`, `About`, `Contact`) with `hover:text-[#209CEE]` and 2-3px scale animation (`hover:scale-105`).
   - Far Right Pill Buttons: `Blog` (`blog.muratbas.com`), `CV` (`/Murat_Bas_CV.pdf`), and `LAB` (`lab.muratbas.com`).

2. **Footer**:
   - Left: Favicon icon logo (`/favicon.ico`).
   - Center: High-quality SVG social icons (GitHub: `github.com/muratbas`, LinkedIn: `linkedin.com/in/muratbas1/`, Email: `muuratbas@gmail.com`). *Twitter icon is explicitly excluded*.
   - Right: `© 2026 Murat Baş. All rights reserved.`

3. **Global Image Rules**:
   - Images must not be draggable:
     ```css
     img { user-drag: none; -webkit-user-drag: none; user-select: none; }
     ```

4. **Contact Form**:
   - Clean title "Bana Ulaşın" (no extra sub-labels/badges).
   - No placeholder texts in inputs.
   - Text-only "Gönder" button (no icons). Direct `mailto:muuratbas@gmail.com` submission.
