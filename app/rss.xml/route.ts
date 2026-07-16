import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[char] ?? char));
}

export function GET() {
  const posts = getAllPosts();
  const items = posts.map((post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteConfig.url}/articles/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/articles/${post.slug}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00+08:00`).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.url}</link>
      <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
      <description>${siteConfig.description}</description>
      <language>zh-CN</language>
      <lastBuildDate>${new Date(`${posts[0]?.date ?? siteConfig.lastUpdated}T00:00:00+08:00`).toUTCString()}</lastBuildDate>${items}
    </channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
