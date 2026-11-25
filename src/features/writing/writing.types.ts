import type { ContentBlock } from "../portfolio/portfolio.types";

export interface Article {
  id: string;
  title: string;
  date: string;
  content?: string;
  blocks?: ContentBlock[];
  headerImage?: string;
}
