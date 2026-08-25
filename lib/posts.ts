import { marked } from "marked";
import { generatedPosts } from "@/.generated/posts";
import legacySlugAliasesConfig from "@/config/legacy-slugs.json";
import { siteConfig } from "@/lib/site";
import { isPostCategory, type PostCategory } from "@/lib/topics";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: PostCategory;
  summary: string;
  tags: string[];
  readingMinutes: number;
  featured: boolean;
  published: boolean;
  body: string;
  html: string;
  tableOfContents: { id: string; title: string }[];
};

const legacySlugAliases: Record<string, string> = legacySlugAliasesConfig;

function createPost(source: (typeof generatedPosts)[number]): Post {
  if (!isPostCategory(source.category)) throw new Error(`${source.file} 的分类配置已失效`);
  const tableOfContents: { id: string; title: string }[] = [];
  const html = (marked.parse(source.body) as string).replace(/<h2>([\s\S]*?)<\/h2>/g, (heading, content) => {
    const title = content.replace(/<[^>]+>/g, "").trim();
    const id = `section-${tableOfContents.length + 1}`;
    tableOfContents.push({ id, title });
    return heading.replace("<h2>", `<h2 id="${id}">`);
  }).replace(/(href|src)="\/(?!\/)/g, `$1="${siteConfig.basePath}/`);

  return {
    slug: source.slug,
    title: source.title,
    date: source.date,
    category: source.category,
    summary: source.summary,
    tags: [...source.tags],
    readingMinutes: source.readingMinutes,
    featured: source.featured,
    published: source.published,
    body: source.body,
    html,
    tableOfContents,
  };
}

const posts = generatedPosts
  .map((source) => createPost(source))
  .filter((post) => post.published)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts() {
  return posts;
}

export function getPost(slug: string) {
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    // Keep the original value so malformed URLs simply miss the article lookup.
  }
  const canonicalSlug = legacySlugAliases[decodedSlug] ?? decodedSlug;
  return posts.find((post) => post.slug === canonicalSlug);
}

export function getAllPostSlugs() {
  const currentSlugs = new Set(posts.map((post) => post.slug));
  const legacySlugs = Object.entries(legacySlugAliases)
    .filter(([, canonicalSlug]) => currentSlugs.has(canonicalSlug))
    .map(([legacySlug]) => legacySlug);
  return [...currentSlugs, ...legacySlugs];
}

export function formatPostDate(date: string) {
  return date.replaceAll("-", ".");
}
