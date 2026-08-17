export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}
