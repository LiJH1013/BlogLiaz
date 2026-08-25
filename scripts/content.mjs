import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const allowedFields = new Set([
  "title",
  "date",
  "category",
  "summary",
  "tags",
  "readingMinutes",
  "featured",
  "published",
]);

function fail(file, message) {
  throw new Error(`${file}: ${message}`);
}

function stripQuotes(value) {
  const first = value[0];
  const last = value.at(-1);
  return value.length >= 2 && first === last && (first === '"' || first === "'")
    ? value.slice(1, -1)
    : value;
}

export function parseFrontmatter(source, file = "article.md") {
  const normalized = source.replace(/\r\n/g, "\n").trim();
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(normalized);
  if (!match) fail(file, "缺少完整的 frontmatter");

  const data = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim()) continue;
    const index = line.indexOf(":");
    if (index <= 0) fail(file, `无法解析 frontmatter 行：${line}`);
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    if (!allowedFields.has(key)) fail(file, `不支持 frontmatter 字段 ${key}`);
    if (Object.hasOwn(data, key)) fail(file, `frontmatter 字段 ${key} 重复`);
    data[key] = stripQuotes(value);
  }

  const body = match[2].trim();
  if (!body) fail(file, "正文不能为空");
  return { data, body };
}

function parseBoolean(value, field, file, fallback) {
  if (value === undefined) return fallback;
  if (value !== "true" && value !== "false") fail(file, `${field} 必须是 true 或 false`);
  return value === "true";
}

function parseTags(value, file) {
  if (!/^\[[\s\S]*\]$/.test(value ?? "")) fail(file, "tags 必须使用 [标签一、标签二] 格式");
  const tags = value.slice(1, -1).split(/[,、]/).map((tag) => tag.trim()).filter(Boolean);
  if (!tags.length) fail(file, "tags 至少包含一个标签");
  if (new Set(tags).size !== tags.length) fail(file, "tags 不能包含重复标签");
  return tags;
}

function isExactDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

export function validatePostSource({ file, source, categories }) {
  const { data, body } = parseFrontmatter(source, file);
  for (const field of ["title", "date", "category", "summary", "tags", "readingMinutes", "published"]) {
    if (!data[field]) fail(file, `缺少 ${field}`);
  }

  const slug = file.split("/").at(-1)?.replace(/\.md$/, "") ?? "";
  if (!/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(slug)) {
    fail(file, "文件名只能使用中文、英文字母、数字和连字符");
  }
  if (!isExactDate(data.date)) fail(file, "date 必须是有效的 YYYY-MM-DD 日期");
  if (!categories.includes(data.category)) fail(file, `category 必须是：${categories.join("、")}`);
  if (file.split("/")[0] !== data.category) fail(file, "category 必须与所在目录一致");
  if (!/^[1-9]\d*$/.test(data.readingMinutes)) fail(file, "readingMinutes 必须是正整数");

  return {
    file,
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    summary: data.summary,
    tags: parseTags(data.tags, file),
    readingMinutes: Number(data.readingMinutes),
    featured: parseBoolean(data.featured, "featured", file, false),
    published: parseBoolean(data.published, "published", file, true),
    body,
  };
}

async function findMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findMarkdownFiles(path);
    return entry.isFile() && entry.name.endsWith(".md") ? [path] : [];
  }));
  return files.flat();
}

export async function loadContent(root) {
  const topics = JSON.parse(await readFile(join(root, "config", "topics.json"), "utf8"));
  const aliases = JSON.parse(await readFile(join(root, "config", "legacy-slugs.json"), "utf8"));
  const categories = Object.keys(topics);
  const postsDirectory = join(root, "content", "posts");
  const files = (await findMarkdownFiles(postsDirectory)).sort();
  const posts = await Promise.all(files.map(async (path) => {
    const file = relative(postsDirectory, path).replaceAll("\\", "/");
    const source = await readFile(path, "utf8");
    return validatePostSource({ file, source, categories });
  }));

  const pathsBySlug = new Map();
  for (const post of posts) {
    const existing = pathsBySlug.get(post.slug);
    if (existing) fail(post.file, `slug 与 ${existing} 重复：${post.slug}`);
    pathsBySlug.set(post.slug, post.file);
  }

  for (const [legacySlug, canonicalSlug] of Object.entries(aliases)) {
    if (!/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(legacySlug)) fail("config/legacy-slugs.json", `旧 slug 无效：${legacySlug}`);
    if (pathsBySlug.has(legacySlug)) fail("config/legacy-slugs.json", `旧 slug 与当前文章冲突：${legacySlug}`);
    if (!pathsBySlug.has(canonicalSlug)) fail("config/legacy-slugs.json", `目标文章不存在：${canonicalSlug}`);
  }

  return { aliases, categories, posts };
}
