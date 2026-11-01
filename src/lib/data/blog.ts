import { BLOG_POSTS } from "@/data/blog-posts";
import { BlogPost } from "@/types/blog";

export { BLOG_POSTS };

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const norm = slug.toLowerCase().trim();
  return BLOG_POSTS.find((p) => p.slug.toLowerCase() === norm);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.featured);
}

export function getRecentBlogPosts(limit: number = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, limit);
}

export function getRelatedBlogPosts(currentSlug: string, limit: number = 2): BlogPost[] {
  const norm = currentSlug.toLowerCase().trim();
  return getAllBlogPosts()
    .filter((p) => p.slug.toLowerCase() !== norm)
    .slice(0, limit);
}
