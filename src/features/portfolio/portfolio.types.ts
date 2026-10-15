export type AspectRatioType = "tall" | "portrait" | "square" | "landscape" | "wide";

export interface WorkProject {
  id: string;
  title: string;
  aspectRatio?: AspectRatioType;
  imageUrl: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
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
