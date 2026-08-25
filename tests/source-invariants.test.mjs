import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { loadContent } from "../scripts/content.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const siteCss = await readFile(join(root, "app", "site.module.css"), "utf8");
const articleBrowserSource = await readFile(join(root, "app", "articles", "article-browser.tsx"), "utf8");
const helloSource = await readFile(join(root, "app", "hello", "hello-client.tsx"), "utf8");
const site = JSON.parse(await readFile(join(root, "config", "site.json"), "utf8"));
const topics = JSON.parse(await readFile(join(root, "config", "topics.json"), "utf8"));

function cssRule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = siteCss.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  assert.ok(match, `missing CSS rule: ${selector}`);
  return match[1];
}

test("keeps site and topic configuration internally consistent", async () => {
  assert.ok(site.url.endsWith(site.pagesBasePath));
  const definitions = Object.values(topics);
  assert.equal(new Set(definitions.map((topic) => topic.index)).size, definitions.length);
  assert.equal(new Set(definitions.map((topic) => topic.id)).size, definitions.length);
  for (const topic of definitions) {
    assert.ok(topic.description && topic.mark && topic.helloLabel);
  }
  const { posts } = await loadContent(root);
  assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length);
  assert.ok(posts.some((post) => post.published), "at least one article must be published");
  assert.match(helloSource, /helloTopics\.map/);
  assert.doesNotMatch(helloSource, /const topics = \[/);
});

test("keeps interactive article text out of transform layers", () => {
  assert.doesNotMatch(cssRule(".postLink:hover"), /perspective|rotate|scale|translate3d/);
  assert.doesNotMatch(cssRule(".topicButton"), /\btransform\s*:/);
  assert.doesNotMatch(cssRule(".featuredStory"), /\btransform\s*:/);
  assert.match(siteCss, /\.topicButton:hover::before/);
  assert.match(siteCss, /@keyframes scanBurst/);
  assert.match(siteCss, /@keyframes topicScan/);
  assert.match(siteCss, /\.articleBody pre\s*\{[^}]*overflow-x:\s*auto/);
});

test("keeps the archive scan effect clickable across the whole lead area", () => {
  assert.ok(articleBrowserSource.includes("triggerScan({ clientX: event.clientX, clientY: event.clientY })"));
  assert.ok(!articleBrowserSource.includes("triggerScan(event.currentTarget)"));
  assert.match(articleBrowserSource, /data-scan-surface="true"/);
  assert.match(articleBrowserSource, /onClick=\{handleLeadClick\}/);
  assert.match(articleBrowserSource, /closest\("a, button, input"\)/);
  assert.doesNotMatch(cssRule('.archiveLead[data-pointer-active="true"] .cursorInstrument'), /pointer-events:\s*auto/);
});
