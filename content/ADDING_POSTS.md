# 新增文章

在 `content/posts/<分类>/` 中复制任意一篇 `.md` 文件并改名。分类目录只能使用 `前端`、`爬虫`、`AI` 或 `随笔`，并且要与文章 frontmatter 中的 `category` 一致。文件名会成为文章地址，建议以中文为主，技术术语可以保留英文，不要使用空格或标点。

```md
---
title: 文章标题
date: 2026-07-16
category: 前端
summary: 一句话摘要
tags: [标签一、标签二]
readingMinutes: 5
published: true
---

正文从这里开始。
```

构建脚本会递归扫描所有分类目录，并自动检查 `category`。支持二级标题、段落、引用、链接、列表和行内代码。二级标题会自动进入文章目录。将 `published` 改为 `false` 可暂时隐藏草稿。
