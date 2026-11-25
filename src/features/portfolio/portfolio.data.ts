import { WorkProject } from "./portfolio.types";

export const WORK_PROJECTS: WorkProject[] = [
  {
    title: "Tubify",
    imageUrl: "/images/work/tubify-banner.png",
    description: "Native music app",
    longDescription: [
      "A distraction-free native desktop music player interfacing with YouTube Music API with seamless audio streaming and zero advertisement latency.",
      "Features background audio playback, local offline caching, and responsive GPU audio visualizer waveforms built with high performance and minimal memory footprint.",
      {
        type: "image",
        url: "/images/work/anamenu.png",
        caption: "Home Page",
      },
      "The home view brings together a persistent library sidebar with custom playlist ordering, quick-access cards for Library, Browse, and Downloads, and horizontal shelves for recently played tracks and personalized mixes.",
      {
        type: "image",
        url: "/images/work/lyrics.png",
        caption: "Lyrics",
      },
      "A focused, real-time synced lyrics mode highlights the active line with a red accent indicator while softly dimming surrounding verses alongside the track's cover art.",
      {
        type: "image",
        url: "/images/work/artistpage.png",
        caption: "Artist Page",
      },
      "Artist pages pair verified profiles, subscriber counts, and top tracks with a clean chronological discography grid sorted by release year.",
      {
        type: "image",
        url: "/images/work/album.png",
        caption: "Album Page",
      },
      "Each album view presents hi-res artwork, the full tracklist, and metadata including label, release date, and duration, with integrated play queues that preserve listening order."
    ],
    stack: ["Rust", "TypeScript", "Tauri"],
    githubUrl: "https://github.com/muratbas/tubify",
    year: "2026",
    media: [
      {
        url: "/images/work/tubify-banner.png",
        caption: "Tubify Logo",
      },
    ],
  },
  {
    title: "Omu Forum",
    imageUrl: "/images/work/omuforum.png",
    description: "University discussion platform",
    longDescription: [
      "A modern community forum built for the Ondokuz Mayıs University community and Samsun developers, featuring focused discussion channels, markdown editor, and fast server-side rendering.",
    ],
    stack: ["Next.js", "TypeScript", "Firebase"],
    liveUrl: "https://omu.muratbas.com",
    year: "2025",
    media: [
      {
        url: "/images/work/omuforum.png",
        caption: "Forum Discussions",
      },
    ],
  },
];
