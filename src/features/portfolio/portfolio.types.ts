export interface ProjectMedia {
  type?: "image" | "video";
  url: string;
  caption?: string;
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
