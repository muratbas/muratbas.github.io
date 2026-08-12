export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  readingTime: string;
  isPublished: boolean;
  featured?: boolean;
}
