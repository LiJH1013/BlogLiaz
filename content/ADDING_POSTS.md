# 新增文章

在 `content/posts/<分类>/` 中复制任意一篇 `.md` 文件并改名。可用分类以 `config/topics.json` 为准，分类目录必须与文章 frontmatter 中的 `category` 一致。文件名会成为文章地址，建议以中文为主，技术术语可以保留英文，只能使用中文、英文字母、数字和连字符。

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

构建脚本会递归扫描所有分类目录，并检查必填字段、日期、分类、文件名、阅读时间、标签和发布状态。支持二级标题、段落、引用、链接、列表和行内代码。二级标题会自动进入文章目录。将 `published` 改为 `false` 可暂时隐藏草稿。

新增分类时只需要编辑 `config/topics.json` 并建立同名目录，归档页和访客页会自动读取新配置。历史文章改名时，在 `config/legacy-slugs.json` 中增加旧路径到新文件名的映射。
