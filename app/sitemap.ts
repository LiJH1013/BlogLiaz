import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = ["", "/articles", "/about", "/privacy"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(siteConfig.lastUpdated),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
  return [...staticPages, ...getAllPosts().map((post) => ({ url: `${siteConfig.url}/articles/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.8 }))];
}
