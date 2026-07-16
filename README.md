# BlogLiaz

野路子手记，一个使用 vinext 构建的公开个人博客。内容以 Markdown 管理，发布到 OpenAI Sites，并同步到 GitHub。

- 线上地址：<https://wild-notes-2026.abc33094934.chatgpt.site>
- GitHub：<https://github.com/li-j-h/BlogLiaz>

## 一、新手最简单的更新方式

你可以直接在 Codex 中说：

> 帮我给 BlogLiaz 新增一篇文章，标题是……，正文是……。先本地预览，通过后提交到 GitHub 并发布公开版本。

Codex 会负责创建文章文件、检查格式、构建、提交和发布。发布前请确认标题、日期、摘要和正文内容。

## 二、自己新增一篇文章

### 1. 新建文件

进入 `content/posts/`，复制一篇已有文章并改名。推荐使用小写英文和连字符，例如：

```text
my-first-post.md
```

文件名会成为文章网址：

```text
/articles/my-first-post
```

### 2. 填写文章信息和正文

```md
---
title: 我的第一篇文章
date: 2026-07-16
category: 日常记录
summary: 用一句话介绍这篇文章，建议控制在 40 字以内。
tags: [生活, 随笔]
readingMinutes: 5
published: true
---

这里开始写正文。

## 二级标题

这是一个普通段落。

> 这是引用文字。
```

字段说明：

- `title`：文章标题
- `date`：发布日期，格式必须是 `年-月-日`
- `category`：文章分类
- `summary`：首页和归档页显示的摘要
- `tags`：搜索可识别的标签，用英文逗号分隔
- `readingMinutes`：预计阅读分钟数
- `published`：`true` 为公开，`false` 为草稿

保存后，文章会自动出现在首页、文章归档、RSS 和站点地图中，不需要手动修改页面代码。

## 三、本地预览

需要 Node.js 22.13 或更高版本。第一次使用时，在项目目录执行：

```bash
npm install
```

以后预览只需执行：

```bash
npm run dev
```

终端会显示本地地址，通常是 <http://localhost:3000>。浏览器打开它即可预览。修改文章并保存后，页面会自动刷新。

结束预览时，在终端按 `Ctrl + C`。

发布前再执行一次：

```bash
npm run build
```

看到 `Build complete` 说明构建通过。

## 四、提交到 GitHub

确认预览无误后执行：

```bash
git add -A
git commit -m "Add new blog post"
git push origin main
```

也可以让 Codex 帮你完成提交和推送。GitHub 是代码备份和版本记录，推送成功不等于线上网站已经更新。

## 五、发布到线上

当前网站由 OpenAI Sites 托管。最简单的发布方式是在 Codex 中说：

> 把 BlogLiaz 当前 main 分支构建并发布到原来的公开网站。

发布成功后，访问线上地址并强制刷新：

- Windows：`Ctrl + F5`
- macOS：`Command + Shift + R`

## 六、修改博客资料

- 网站名称、作者、简介、GitHub 地址：`lib/site.ts`
- 关于页内容：`app/about/page.tsx`
- 首页短句和日常切片：`app/page.tsx`
- 颜色和基础字体：`app/globals.css`
- 页面样式与 3D 效果：`app/site.module.css`
- 浏览器图标：`public/favicon.svg`
- 社交分享图：`public/og.png`

修改样式前建议先阅读 `DESIGN.md`，避免破坏现有视觉风格。

## 七、日常维护建议

- 每次更新前先执行 `git pull`，避免覆盖其他设备上的修改。
- 一篇文章对应一个 Markdown 文件，不要把多篇文章写进同一个文件。
- 图片放在 `public/images/`，文章中使用 `/images/文件名.jpg` 引用。
- 图片尽量压缩后再上传，单张建议小于 500 KB。
- 每次发布前运行 `npm run build`。
- 不要提交密码、访问令牌、身份证件或其他隐私信息。
- 至少每月打开一次线上首页、文章页和手机页面，确认链接与排版正常。

## 八、常见问题

### 新文章没有出现在首页

检查 `published` 是否为 `true`，日期和文件格式是否正确，然后重新运行 `npm run build` 并发布。

### GitHub 已更新，但网站没变化

GitHub 推送只更新代码仓库，还需要再通过 Codex 发布一个 Sites 新版本。

### 本地地址打不开

确认 `npm run dev` 仍在运行。如果 3000 端口被占用，终端通常会给出另一个端口地址，请打开终端实际显示的地址。

### 想先保存草稿

把文章头部的 `published` 改成 `false`。草稿仍保存在仓库中，但不会出现在公开页面。

## 九、常用命令速查

- `npm run dev`：本地预览
- `npm run build`：构建验证
- `npm run lint`：代码检查
- `git status`：查看修改状态
- `git pull`：获取远程更新
- `git push origin main`：推送到 GitHub
