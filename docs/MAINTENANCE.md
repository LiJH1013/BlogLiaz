# 野路子手记维护指南

这份文档留给站点维护者。博客唯一公开地址：

- GitHub Pages：<https://lijh1013.github.io/BlogLiaz/>

## 新增文章

在 `content/posts/<分类>/` 新建一个 `.md` 文件。可用分类以 `config/topics.json` 为准，分类目录必须与 frontmatter 中的 `category` 一致。文件名建议以中文为主，GitHub Pages、Markdown、AI、Python 等技术术语可以保留英文，比如 `我的第一篇文章.md` 或 `GitHub-Pages部署.md`。文件名会成为文章地址的一部分，只能使用中文、英文字母、数字和连字符。

```md
---
title: 我的第一篇文章
date: 2026-07-16
category: 随笔
summary: 用一句话介绍这篇文章，建议控制在 40 字以内。
tags: [生活、随笔]
readingMinutes: 5
published: true
---

这里开始写正文。
```

- `published: true` 表示公开。
- `published: false` 表示保留为草稿。
- `category` 必须来自 `config/topics.json`，并放入同名分类目录。
- `date` 必须是真实存在的 `YYYY-MM-DD` 日期。
- `readingMinutes` 必须是正整数，`tags` 至少包含一个且不能重复。
- 不支持未声明的 frontmatter 字段，字段拼写错误会直接让构建失败。
- 图片放在 `public/images/`，正文中使用 `/images/文件名.jpg`。

保存后，构建脚本会递归读取分类目录，首页、文章归档、RSS 和站点地图会自动更新。

历史文章改名时，要在 `config/legacy-slugs.json` 中保留旧路径，避免已有链接失效。生成脚本会检查映射目标是否真实存在。

文章数据会生成到 `.generated/posts.ts`。这个文件不需要提交，`dev`、`lint` 和 `build` 会自动重新生成。

## 本地预览

需要 Node.js 22.13 或更高版本。第一次使用时执行：

```bash
npm install
```

启动预览：

```bash
npm run dev
```

终端会显示本地地址，通常是 <http://localhost:3000>。结束预览时按 `Ctrl + C`。

## 发布前检查

```bash
npm run verify
```

统一检查包含 Markdown 元数据校验、ESLint、单元测试、GitHub Pages 静态构建和完整产物验证。产物验证会自动遍历全部公开文章，不需要手工维护文章数量或路径列表。

## 发布

提交并推送到 `main`：

```bash
git add -A
git commit -m "Add new blog post"
git push origin main
```

GitHub Actions 会运行同一套 `npm run verify`，成功后自动更新 GitHub Pages。

## 修改站点资料

- 网站名称、简介、GitHub 地址和 Pages 子路径：`config/site.json`
- 文章分类、编号、图标和访客页名称：`config/topics.json`
- 关于页：`app/about/page.tsx`
- 首页短句与日常切片：`app/page.tsx`
- 颜色和基础字体：`app/globals.css`
- 页面样式与 3D 效果：`app/site.module.css`
- 浏览器图标：`public/favicon.svg`
- 社交分享图：`public/og.png`

修改样式前先阅读 `DESIGN.md`，保持现有视觉风格。

## 常见问题

### 新文章没有出现

检查 `published` 是否为 `true`，日期和文章头部格式是否正确，然后重新构建。

### GitHub 已更新，Pages 没变化

打开仓库的 Actions 页面查看部署任务。首次使用 GitHub Pages 时，可能需要在仓库设置的 Pages 页面中把发布来源选为 GitHub Actions。

### 本地地址打不开

确认 `npm run dev` 仍在运行。如果 3000 端口被占用，请打开终端实际显示的地址。

## 日常维护

- 更新前先执行 `git pull`。
- 每次发布前运行完整检查。
- 文章图片压缩后再上传，单张建议小于 500 KB；纹理较多的社交分享图应控制在 2 MB 内。
- 不要提交密码、访问令牌或个人隐私信息。
- 每月检查一次首页、文章页、RSS 和手机排版。
