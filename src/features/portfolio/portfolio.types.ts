export interface ProjectMedia {
  url: string;
  caption?: string;
}

export type ContentBlock =
  | string
  | {
      type: "image";
      url: string;
      caption?: string;
    };

export interface WorkProject {
  title: string;
  imageUrl: string;
  description: string;
  longDescription?: ContentBlock[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
  year: string;
  media?: ProjectMedia[];
}
