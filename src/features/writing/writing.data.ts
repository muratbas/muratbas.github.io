import { Article } from "./writing.types";

export const ARTICLES: Article[] = [
  {
    id: "anti-fragile-frontend",
    title: "The Architecture of Anti-Fragile Interfaces",
    date: "OCTOBER 2025",
    readTime: "6 MIN READ",
    category: "ENGINEERING",
    excerpt:
      "Why modern web applications collapse under the weight of speculative state machines, and how adopting local-first primitives and zero-redundancy thinking restores resilience.",
    content: `
Modern frontend development suffers from a chronic affliction: the compulsion to build abstractions before understanding the concrete problem. We wrap simple DOM operations in three layers of custom hooks, lift local UI state into distributed stores, and introduce complex caching tiers for data that changes once a week.

### The Ponytail Philosophy

In physical engineering, a clean ponytail pulls everything back and leaves no loose strands to get caught in machinery. The same philosophy governs anti-fragile software:

1. **Zero Redundancy:** Write the absolute minimum code required to achieve the user outcome.
2. **Fail Fast and Explicitly:** Never mask asynchronous failures behind empty catch blocks or ambiguous fallback states.
3. **Single Source of Truth:** Never duplicate derived state. Compute it synchronously during render.

When you strip away speculative layers, your bundle size shrinks, your cognitive overhead drops to near zero, and your application becomes genuinely pleasant to maintain.
    `,
  },
  {
    id: "kate-dehler-typography",
    title: "Psychedelia and Restraint: The Visual Rhythm of Kate Dehler",
    date: "JULY 2025",
    readTime: "5 MIN READ",
    category: "DESIGN CRITIQUE",
    excerpt:
      "Deconstructing why organic 1970s lettering and hyper-vibrant color palettes look infinitely more sophisticated when framed by stark, borderless masonry grids.",
    content: `
Open Kate Dehler's portfolio and you are immediately struck by a paradox: the artwork is violently expressive, saturated with neon pinks, cadmium yellows, and psychedelic swirls reminiscent of Peter Max and Heinz Edelmann. Yet the website itself feels as serene and quiet as a Swiss museum.

### The Secret of Borderless Framing

Many designers make the mistake of boxing their content. They wrap images in rounded cards, add drop shadows, border strokes, and background fills. This creates visual clutter that suffocates the artwork.

Kate Dehler's layout does the exact opposite:

- **Zero Container Styling:** There is no border, no background box, and no shadow. The artwork meets the canvas directly.
- **The Micro-Caption:** Below each piece sits a single line of text. Tiny, uppercase, widely tracked (\`tracking-[0.16em]\`), centered. It acts not as a label, but as an architectural anchor.
- **Generous Interstitial Space:** The generous white space between columns allows the saturated hues of adjacent illustrations to vibrate without clashing.

This is the hallmark of great visual direction: let the content supply the emotional energy, while the interface provides pure, invisible clarity.
    `,
  },
  {
    id: "sub-millisecond-masonry",
    title: "Sub-Millisecond Dynamic Masonry Without Layout Shifts",
    date: "MARCH 2025",
    readTime: "7 MIN READ",
    category: "PERFORMANCE",
    excerpt:
      "A deep dive into why CSS multi-column layouts fail on chronological feeds, and how ordered column-bucket partitioning achieves instant 120 FPS responsive layouts.",
    content: `
For years, web developers faced a dilemma when building Pinterest-style masonry feeds: either rely on heavy JavaScript libraries (like Masonry.js or Isotope) that force expensive browser reflows, or use CSS \`column-count\`.

### Why CSS Column-Count Breaks Feeds

CSS \`column-count\` fills columns vertically: column 1 receives items 1 through 5, column 2 receives items 6 through 10, and column 3 receives items 11 through 15.

This completely destroys chronological continuity. A visitor scanning left-to-right sees a 2026 project, a 2024 project, and a 2022 project sitting side-by-side.

### The Ordered Partitioning Pattern

By partitioning items into column arrays during render:

\`\`\`typescript
const columns = items.reduce((acc, item, index) => {
  acc[index % numColumns].push(item);
  return acc;
}, Array.from({ length: numColumns }, () => []));
\`\`\`

We achieve:
- **Left-to-Right Natural Flow:** Card 1 in Col 1, Card 2 in Col 2, Card 3 in Col 3.
- **Zero Layout Shifts:** Each card specifies its aspect ratio upfront, reserving exact vertical height before the image payload arrives.
- **Pure CSS Execution:** No runtime measuring of DOM heights. Zero layout jank.
    `,
  },
  {
    id: "taste-vs-slop",
    title: "Against Aesthetic Uniformity: Escaping the Corporate AI Template",
    date: "JANUARY 2025",
    readTime: "4 MIN READ",
    category: "ESSAY",
    excerpt:
      "How to build digital spaces that feel handcrafted, intentional, and unmistakably human in an era of generic design systems.",
    content: `
Look at ten software landing pages built in the past year, and you will notice an eerie sameness: the same dark purple radial gradients, the same glowing border cards, the same generic geometric sans-serif, and the same floating bento boxes.

Design is not a checklist of popular tokens. It is an act of point of view.

When you study historic print, vintage record sleeves, and bespoke posters, you notice quirks: asymmetric balance, warm paper tones, chunky retro display lettering, and micro-typographic details.

Infusing your personal digital space with these idiosyncratic choices is the only antidote to aesthetic homogenization.
    `,
  },
];
