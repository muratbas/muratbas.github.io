export type AspectRatioType = "tall" | "portrait" | "square" | "landscape" | "wide";

export interface ProjectMedia {
  type?: "image" | "video";
  url: string;
  caption?: string;
  aspectRatio?: string;
}

export interface ProjectTheme {
  bg: string;
  sheetBg: string;
  accent: string;
  accentHover?: string;
  text?: string;
  selectionBg?: string;
  selectionText?: string;
}

export interface WorkProject {
  id: string;
  title: string;
  aspectRatio?: AspectRatioType;
  imageUrl: string;
  description: string;
  longDescription?: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  media?: ProjectMedia[];
  theme?: ProjectTheme;
}

export interface VisualItem {
  id: string;
  title: string;
  aspectRatio: AspectRatioType;
  imageUrl: string;
  year: string;
  medium: string;
  category: "art" | "photos";
  client?: string;
}
