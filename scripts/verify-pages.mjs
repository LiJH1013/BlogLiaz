import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadContent } from "./content.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, "out");
const site = JSON.parse(await readFile(join(root, "config", "site.json"), "utf8"));
const { aliases, posts } = await loadContent(root);
const publishedPosts = posts.filter((post) => post.published);
const publishedSlugs = new Set(publishedPosts.map((post) => post.slug));
const publishedAliases = Object.entries(aliases).filter(([, target]) => publishedSlugs.has(target));

const required = [
  "index.html",
  "404.html",
  "articles/index.html",
  "resources/index.html",
  "about/index.html",
  "hello/index.html",
  "privacy/index.html",
  "rss.xml",
  "sitemap.xml",
  "robots.txt",
  "manifest.webmanifest",
  "favicon.svg",
  "og.png",
  ...publishedPosts.map((post) => `articles/${post.slug}/index.html`),
  ...publishedAliases.map(([slug]) => `articles/${slug}/index.html`),
];

await Promise.all(required.map((file) => access(join(out, file))));
for (const unused of ["file.svg", "globe.svg", "window.svg"]) {
  await assert.rejects(access(join(out, unused)), undefined, `${unused} should not be published`);
}

const [home, about, hello, resources, notFound, rss, sitemap, manifest, og] = await Promise.all([
  readFile(join(out, "index.html"), "utf8"),
  readFile(join(out, "about", "index.html"), "utf8"),
  readFile(join(out, "hello", "index.html"), "utf8"),
  readFile(join(out, "resources", "index.html"), "utf8"),
  readFile(join(out, "404.html"), "utf8"),
  readFile(join(out, "rss.xml"), "utf8"),
  readFile(join(out, "sitemap.xml"), "utf8"),
  readFile(join(out, "manifest.webmanifest"), "utf8"),
  readFile(join(out, "og.png")),
]);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

assert.match(home, new RegExp(`${escapeRegExp(site.pagesBasePath)}/_next/`));
assert.match(home, new RegExp(`canonical" href="${escapeRegExp(site.url)}/?"`));
assert.match(home, new RegExp(`rel="icon" href="${escapeRegExp(site.pagesBasePath)}/favicon\\.svg"`));
assert.match(home, /property="og:image"/);
assert.match(home, /twitter:image/);
assert.match(about, /作者 \/ LIAZ/);
assert.doesNotMatch(about, /TO BE CONTINUED|暂时用一张字卡/);
assert.match(hello, /HELLO LIAZ \/ 访客登记处/);
assert.match(hello, /<span aria-hidden="true">Py<\/span>Python/);
assert.match(notFound, /这条路还没有内容/);
assert.match(manifest, new RegExp(`${escapeRegExp(site.pagesBasePath)}/favicon\\.svg`));

assert.equal(og.readUInt32BE(16), 1200, "og.png width");
assert.equal(og.readUInt32BE(20), 630, "og.png height");
assert.ok(og.byteLength < 1_800_000, `og.png should stay below 1.8 MB, received ${og.byteLength}`);

const resourceRows = [...resources.matchAll(/data-category="([^"]+)"/g)].map((match) => match[1]);
assert.ok(resourceRows.length > 0, "resource rows should be rendered");
assert.match(resources, new RegExp(`<strong>${String(resourceRows.length).padStart(2, "0")}<\\/strong><span>已收录<\\/span>`));
for (const category of new Set(resourceRows)) {
  const count = resourceRows.filter((value) => value === category).length;
  assert.match(resources, new RegExp(`<strong>${String(count).padStart(2, "0")}<\\/strong><span>${escapeRegExp(category)}<\\/span>`));
}

for (const post of publishedPosts) {
  const article = await readFile(join(out, "articles", post.slug, "index.html"), "utf8");
  const articleUrl = `${site.url}/articles/${post.slug}`;
  const encodedArticleUrl = `${site.url}/articles/${encodeURIComponent(post.slug)}`;
  assert.ok(article.includes(`canonical" href="${encodedArticleUrl}/"`), `${post.file}: canonical URL`);
  assert.match(article, /application\/ld\+json/, post.file);
  assert.match(article, /property="og:image"/, post.file);
  assert.ok(sitemap.includes(articleUrl) || sitemap.includes(encodedArticleUrl), `${post.file}: sitemap URL`);
  assert.ok(rss.includes(articleUrl) || rss.includes(encodedArticleUrl), `${post.file}: RSS URL`);
}

assert.match(rss, /<lastBuildDate>/);
assert.match(rss, /atom:link/);
assert.match(sitemap, new RegExp(`${escapeRegExp(site.url)}/resources`));
console.log(`Verified ${required.length} files, ${publishedPosts.length} articles and ${resourceRows.length} resources for ${site.pagesBasePath}.`);
