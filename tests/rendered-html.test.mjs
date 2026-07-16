import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL(`../dist/server/index.js?test=${Date.now()}`, import.meta.url);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };

async function request(path) {
  return worker.fetch(new Request(`http://localhost${path}`), env, context);
}

test("renders the public blog routes", async () => {
  const routes = ["/", "/articles", "/articles/weekly-notes", "/about", "/privacy"];
  for (const route of routes) {
    const response = await request(route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html/i, route);
    assert.match(await response.text(), /野路子/, route);
  }
});

test("publishes discovery files", async () => {
  const expected = [
    ["/rss.xml", "application/rss+xml", /<rss/],
    ["/sitemap.xml", "application/xml", /<urlset/],
    ["/robots.txt", "text/plain", /Sitemap:/],
    ["/manifest.webmanifest", "application/manifest+json", /野路子手记/],
  ];
  for (const [route, contentType, pattern] of expected) {
    const response = await request(route);
    assert.equal(response.status, 200, route);
    assert.ok((response.headers.get("content-type") ?? "").startsWith(contentType), route);
    assert.match(await response.text(), pattern, route);
  }
});
