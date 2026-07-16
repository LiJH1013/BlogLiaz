import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, "out");
const required = [
  "index.html",
  "articles/index.html",
  "articles/weekly-notes/index.html",
  "about/index.html",
  "privacy/index.html",
  "rss.xml",
  "sitemap.xml",
  "robots.txt",
  "manifest.webmanifest",
];

await Promise.all(required.map((file) => access(join(out, file))));
const home = await readFile(join(out, "index.html"), "utf8");
const rss = await readFile(join(out, "rss.xml"), "utf8");
const sitemap = await readFile(join(out, "sitemap.xml"), "utf8");

assert.match(home, /\/BlogLiaz\/_next\//);
assert.match(home, /\/BlogLiaz\/articles/);
assert.match(rss, /https:\/\/li-j-h\.github\.io\/BlogLiaz\/articles\//);
assert.match(sitemap, /https:\/\/li-j-h\.github\.io\/BlogLiaz\/articles\//);
console.log(`Verified ${required.length} GitHub Pages files with the /BlogLiaz base path.`);
