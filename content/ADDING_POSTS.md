# 新增文章

在 `content/posts/` 中复制任意一篇 `.md` 文件并改名，文件名会成为文章地址。

```md
---
title: 文章标题
date: 2026-07-16
category: 分类名
summary: 一句话摘要
tags: [标签一, 标签二]
readingMinutes: 5
published: true
---

正文从这里开始。
```

支持二级标题、段落、引用、链接、列表和行内代码。将 `published` 改为 `false` 可暂时隐藏草稿。
