export type AspectRatioType = "tall" | "portrait" | "square" | "landscape" | "wide";

export interface WorkProject {
  id: string;
  title: string;
  subtitle: string;
  aspectRatio: AspectRatioType;
  imageUrl: string;
  description: string;
  architecture: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  role: string;
}

export interface VisualItem {
  id: string;
  title: string;
  subtitle: string;
  aspectRatio: AspectRatioType;
  imageUrl: string;
  year: string;
  medium: string;
  client?: string;
}
