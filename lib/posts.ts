import { marked } from "marked";
import { rawPosts } from "@/content/posts.generated";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  tags: string[];
  readingMinutes: number;
  published: boolean;
  body: string;
  html: string;
};

function parseFrontmatter(source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source.trim());
  if (!match) throw new Error("文章缺少 frontmatter");

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index === -1) continue;
    data[line.slice(0, index).trim()] = line.slice(index + 1).trim().replace(/^['\"]|['\"]$/g, "");
  }
  return { data, body: match[2].trim() };
}

function parseTags(value = "") {
  return value.replace(/^\[|\]$/g, "").split(",").map((tag) => tag.trim()).filter(Boolean);
}

function createPost(path: string, source: string): Post {
  const { data, body } = parseFrontmatter(source);
  const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    summary: data.summary,
    tags: parseTags(data.tags),
    readingMinutes: Number(data.readingMinutes || 4),
    published: data.published !== "false",
    body,
    html: marked.parse(body) as string,
  };
}

const posts = Object.entries(rawPosts)
  .map(([file, source]) => createPost(file, source))
  .filter((post) => post.published)
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllPosts() {
  return posts;
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return date.replaceAll("-", ".");
}
