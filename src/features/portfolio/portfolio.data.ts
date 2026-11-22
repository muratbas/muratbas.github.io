import { WorkProject, VisualItem } from "./portfolio.types";

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "tubify",
    title: "Tubify",
    imageUrl: "/images/work/banner-tubify.png",
    description: "Distraction-free desktop music streaming client",
    longDescription: [
      "A distraction-free native desktop music player interfacing with YouTube Music API with seamless audio streaming and zero advertisement latency.",
      "Features background audio playback, local offline caching, and responsive GPU audio visualizer waveforms built with high performance and minimal memory footprint."
    ],
    stack: ["Rust", "TypeScript", "Tauri", "Tailwind CSS"],
    liveUrl: "https://tubify.muratbas.com",
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
        url: "/images/work/banner-tubify.png",
        caption: "Audio Player & Queue",
        type: "image",
      }
    ],
  },
  {
    id: "samsunforum",
    title: "Samsunforum",
    imageUrl: "/images/work/omuforum.png",
    description: "University & city community discussion platform",
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
  },
  {
    id: "carsamba-pide",
    title: "Tarihi Çarşamba Pide",
    imageUrl: "/images/work/pide.png",
    description: "Heritage bakery digital showcase & ordering experience",
    longDescription: [
      "A clean digital presence for a historic regional bakery, featuring product menus, reservation flow, and heritage storytelling."
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://carsambapide.muratbas.com",
    year: "2024",
    theme: {
      bg: "#FAF6F0",
      sheetBg: "#F0E8DD",
      accent: "#b45309",
      text: "#292524",
    },
    media: [
      {
        url: "/images/work/pide.png",
        caption: "Bakery Menu & Presentation",
        type: "image",
      }
    ],
  },
  {
    id: "hotel-management",
    title: "Hotel Management System",
    imageUrl: "/images/work/timeisup.png",
    description: "Desktop room occupancy, booking & billing workflow tool",
    longDescription: [
      "An offline-first desktop management suite for independent hotels, streamlining room allocations, guest registration, and rapid accounting."
    ],
    stack: ["TypeScript", "React", "Electron", "SQLite"],
    year: "2024",
    theme: {
      bg: "#18181b",
      sheetBg: "#27272a",
      accent: "#10b981",
      text: "#fafafa",
    },
    media: [
      {
        url: "/images/work/timeisup.png",
        caption: "Occupancy Calendar & Billing",
        type: "image",
      }
    ],
  }
];

export const VISUAL_ITEMS: VisualItem[] = [
  {
    id: "future-of-finance",
    title: "THE FUTURE OF FINANCE",
    aspectRatio: "tall",
    imageUrl: "/images/visuals/future-of-finance.svg",
    year: "2025",
    medium: "Digital Vector, Stipple Grain & Acrylic",
    category: "art",
    client: "Bloomberg Markets Magazine",
  },
  {
    id: "midnight-psychedelic",
    title: "MIDNIGHT PSYCHEDELIA",
    aspectRatio: "landscape",
    imageUrl: "/images/visuals/midnight-psychedelic.svg",
    year: "2024",
    medium: "Screenprint & Risograph",
    category: "art",
    client: "MIT Technology Review",
  },
  {
    id: "austin-city-limits",
    title: "AUSTIN SOUND FESTIVAL",
    aspectRatio: "tall",
    imageUrl: "/images/visuals/austin-city-limits.svg",
    year: "2025",
    medium: "Silkscreen Print on Archival Paper",
    category: "art",
    client: "Austin City Music Festival",
  },
  {
    id: "put-on-earth",
    title: "PUT ON EARTH FOR SOUND",
    aspectRatio: "square",
    imageUrl: "/images/visuals/put-on-earth.svg",
    year: "2024",
    medium: "Mixed Media & Halftone Screenprint",
    category: "photos",
    client: "MonoNeon & Ghostly Intl",
  },
  {
    id: "fungi-comm",
    title: "HOW DO FUNGI COMMUNICATE?",
    aspectRatio: "tall",
    imageUrl: "/images/visuals/fungi-comm.svg",
    year: "2024",
    medium: "Digital Lithography & Texture",
    category: "art",
    client: "Wired Magazine",
  },
  {
    id: "analog-synthesis",
    title: "ANALOG SYNTHESIS ARCHWAYS",
    aspectRatio: "portrait",
    imageUrl: "/images/visuals/analog-synthesis.svg",
    year: "2024",
    medium: "Vector Illustration & Analog Noise",
    category: "photos",
    client: "Moog Sound Studio",
  },
  {
    id: "spring-tour-poster",
    title: "SPRING TOUR 2025",
    aspectRatio: "portrait",
    imageUrl: "/images/visuals/spring-tour-poster.svg",
    year: "2025",
    medium: "Concert Poster Art & Type Layout",
    category: "art",
    client: "GuruGuru Brain Records",
  },
  {
    id: "mental-health",
    title: "AWARENESS IN BLOOM",
    aspectRatio: "wide",
    imageUrl: "/images/visuals/mental-health.svg",
    year: "2024",
    medium: "Digital Painting & Airbrush Grain",
    category: "photos",
    client: "One Medical Health",
  },
  {
    id: "world-possibilities",
    title: "WORLD OF POSSIBILITIES",
    aspectRatio: "landscape",
    imageUrl: "/images/visuals/world-possibilities.svg",
    year: "2024",
    medium: "Editorial Illustration",
    category: "art",
    client: "Dell Technologies",
  },
  {
    id: "expensive-restaurants",
    title: "EXPENSIVE APPETITES",
    aspectRatio: "portrait",
    imageUrl: "/images/visuals/expensive-restaurants.svg",
    year: "2023",
    medium: "Collage & Color Separation",
    category: "photos",
    client: "New York Magazine",
  },
  {
    id: "writing-checks",
    title: "THE POETICS OF PAPER",
    aspectRatio: "landscape",
    imageUrl: "/images/visuals/writing-checks.svg",
    year: "2023",
    medium: "Editorial Ink & Digital Halftone",
    category: "art",
    client: "The New York Times Book Review",
  },
  {
    id: "bluebells-morning",
    title: "BLUEBELLS IN SPRING",
    aspectRatio: "square",
    imageUrl: "/images/visuals/bluebells-morning.svg",
    year: "2023",
    medium: "Botanical Psychedelia",
    category: "photos",
    client: "Birdy Records",
  },
];
