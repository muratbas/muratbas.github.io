import { MetadataRoute } from "next";
import { getStoredPosts } from "@/lib/blogStore";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://muratbas.com";

  // Dynamic blog routes
  const posts = getStoredPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
