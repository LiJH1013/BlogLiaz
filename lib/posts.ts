import { marked } from "marked";
import { rawPosts } from "@/content/posts.generated";
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

const legacySlugAliases: Record<string, string> = {
  "crawler-http-semantics": "采集器与HTTP语义",
  "deploy-static-site": "从零部署静态网站",
  "eduagent-multi-agent-engineering": "EduAgent多Agent工程",
  "github-pages-basepath": "GitHub-Pages子路径",
  "local-bookmarks-boundaries": "本地收藏的边界",
  "make-blog-light": "轻量个人博客",
  "motion-with-clear-text": "动效与清晰文字",
  "reliable-web-collector": "可靠网页采集",
  "small-evals-before-prompt-tuning": "提示词调整前的小型评测",
  "static-blog-search": "静态博客搜索",
  "structured-ai-output": "大模型结构化输出",
  "url-backed-filters": "URL筛选状态",
  "validate-markdown-at-build": "Markdown构建校验",
  "weekly-notes": "每周笔记整理",
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
  return value.replace(/^\[|\]$/g, "").split(/[,、]/).map((tag) => tag.trim()).filter(Boolean);
}

function createPost(path: string, source: string): Post {
  const { data, body } = parseFrontmatter(source);
  const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
  for (const field of ["title", "date", "category", "summary"] as const) {
    if (!data[field]) throw new Error(`${path} 缺少 ${field}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(`${data.date}T00:00:00Z`))) {
    throw new Error(`${path} 的 date 必须使用 YYYY-MM-DD 格式`);
  }
  if (!/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(slug)) {
    throw new Error(`${path} 的文件名只能使用中文、英文字母、数字和连字符`);
  }
  if (!isPostCategory(data.category)) {
    throw new Error(`${path} 的 category 必须是：前端、爬虫、AI、Python、随笔`);
  }
  const tableOfContents: { id: string; title: string }[] = [];
  const html = (marked.parse(body) as string).replace(/<h2>([\s\S]*?)<\/h2>/g, (heading, content) => {
    const title = content.replace(/<[^>]+>/g, "").trim();
    const id = `section-${tableOfContents.length + 1}`;
    tableOfContents.push({ id, title });
    return heading.replace("<h2>", `<h2 id="${id}">`);
  }).replace(/(href|src)="\/(?!\/)/g, `$1="${siteConfig.basePath}/`);

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    summary: data.summary,
    tags: parseTags(data.tags),
    readingMinutes: Number(data.readingMinutes || 4),
    featured: data.featured === "true",
    published: data.published !== "false",
    body,
    html,
    tableOfContents,
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
