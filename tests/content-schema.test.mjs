import assert from "node:assert/strict";
import test from "node:test";
import { parseFrontmatter, validatePostSource } from "../scripts/content.mjs";

const categories = ["前端", "爬虫", "AI", "Python", "随笔"];
const validSource = `---
title: 测试文章
date: 2026-08-25
category: 前端
summary: 用来验证内容规则。
tags: [测试、构建]
readingMinutes: 3
featured: false
published: true
---

## 第一节

正文。`;

test("parses and normalizes valid post metadata", () => {
  const post = validatePostSource({ file: "前端/测试文章.md", source: validSource, categories });
  assert.equal(post.slug, "测试文章");
  assert.equal(post.readingMinutes, 3);
  assert.deepEqual(post.tags, ["测试", "构建"]);
  assert.equal(post.published, true);
});

test("rejects invalid dates, reading time, tags, categories and booleans", () => {
  const cases = [
    ["2026-02-30", "2026-08-25", /有效的 YYYY-MM-DD/],
    ["readingMinutes: 0", "readingMinutes: 3", /正整数/],
    ["tags: [测试、测试]", "tags: [测试、构建]", /重复标签/],
    ["category: AI", "category: 前端", /所在目录一致/],
    ["published: yes", "published: true", /true 或 false/],
  ];
  for (const [replacement, original, pattern] of cases) {
    assert.throws(
      () => validatePostSource({ file: "前端/测试文章.md", source: validSource.replace(original, replacement), categories }),
      pattern,
    );
  }
});

test("rejects unknown or duplicate frontmatter fields", () => {
  assert.throws(() => parseFrontmatter(validSource.replace("title: 测试文章", "titel: 测试文章")), /不支持.*titel/);
  assert.throws(() => parseFrontmatter(validSource.replace("title: 测试文章", "title: 测试文章\ntitle: 重复")), /字段 title 重复/);
});
