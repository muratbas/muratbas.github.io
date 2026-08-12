export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}
