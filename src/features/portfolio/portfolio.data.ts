import { WorkProject } from "./portfolio.types";

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "tubify",
    title: "Tubify",
    imageUrl: "/images/work/tubify-banner.png",
    description: "Native music app",
    longDescription: [
      "A distraction-free native desktop music player interfacing with YouTube Music API with seamless audio streaming and zero advertisement latency.",
      "Features background audio playback, local offline caching, and responsive GPU audio visualizer waveforms built with high performance and minimal memory footprint."
    ],
    stack: ["Rust", "TypeScript", "Tauri", "Tailwind CSS"],
    githubUrl: "https://github.com/muratbas/tubify",
    year: "2026",
    theme: {
      bg: "#0d1117",
      sheetBg: "#161b22",
      accent: "#e43232",
      text: "#F3F2EE",
    },
    media: [
      {
        url: "/images/work/tubify-banner.png",
        caption: "Audio Player & Queue",
        type: "image",
      }
    ],
  },
  {
    id: "samsunforum",
    title: "Omu Forum",
    imageUrl: "/images/work/omuforum.png",
    description: "University discussion platform",
    longDescription: [
      "A modern community forum built for the Ondokuz Mayıs University community and Samsun developers, featuring focused discussion channels, markdown editor, and fast server-side rendering."
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "https://omu.muratbas.com",
    year: "2025",
    theme: {
      bg: "#F9FBFE",
      sheetBg: "#E9EDF6",
      accent: "#2563eb",
      text: "#0D1B3A",
    },
    media: [
      {
        url: "/images/work/omuforum.png",
        caption: "Forum Discussions",
        type: "image",
      }
    ],
  }
];
