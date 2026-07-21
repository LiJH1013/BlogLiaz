---
title: Markdown 作为内容源，构建时应该检查什么
date: 2026-07-18
category: 前端
summary: BlogLiaz 在构建阶段生成文章索引，并提前拦住缺字段、日期和路径错误。
tags: [Markdown、内容系统、构建]
readingMinutes: 7
published: true
---

个人博客用 Markdown 写文章很方便，问题通常出在发布前后：标题漏了、日期格式写错、文件名带空格，或者分类拼成了一个页面不认识的新值。静态站点没有后台表单替作者检查，这些错误更适合在构建阶段直接报出来。

## Markdown 文件先生成代码索引

BlogLiaz 把正文放在 `content/posts`。构建前的脚本读取所有 `.md` 文件，生成 `content/posts.generated.ts`，应用再从这份模块中解析文章。

```js
const files = (await readdir(postsDirectory))
  .filter((file) => file.endsWith(".md"))
  .sort();

const posts = Object.fromEntries(
  await Promise.all(files.map(async (file) => [
    file,
    await readFile(join(postsDirectory, file), "utf8"),
  ])),
);
```

这种做法不需要运行时读取文件系统，静态导出、RSS、站点地图和文章页使用的是同一批内容。

## Frontmatter 需要最小约束

当前文章至少要有 `title`、`date`、`category` 和 `summary`。日期固定为 `YYYY-MM-DD`，分类只能是前端、爬虫、AI 或随笔。缺字段时直接抛错，比部署成功后出现空标题更容易定位。

文件名会成为 URL，所以只允许小写英文、数字和连字符。`my new post.md`、中文文件名或连续的特殊符号都会在构建时失败。标题仍然可以正常使用中文，路径则保持稳定和便于分享。

## 派生内容只生成一次

解析正文时，二级标题会得到连续 ID，并组成目录。Markdown 中的站内绝对路径也会补上 GitHub Pages 的 `/BlogLiaz` 前缀。文章 HTML、目录和基础路径在同一处生成，页面组件不需要各写一套规则。

发布日期决定排序，`published: false` 可以让文件留在内容目录里但不出现在公开列表。正式草稿仍建议放在单独的本地目录，避免误改字段后提前进入站点。

## 验证还可以继续补强

目前的解析器没有完整校验 `readingMinutes`。如果写成无法转换的文本，`Number()` 会得到 `NaN`。标签数量、摘要长度和重复 slug 也可以增加明确检查。

下一步更适合把 frontmatter 交给成熟解析器，再用 schema 统一验证。是否引入依赖要看内容规模。十几篇文章时，简单解析器容易理解；字段继续增加后，手写规则的边界会越来越多。

## 构建测试要覆盖最终页面

内容解析通过后，还要确认文章路由、RSS、站点地图和 GitHub Pages 基础路径。BlogLiaz 的测试会请求公开路由，也会检查导出目录里的关键文件。新增文章如果只在首页出现，却没有进入 RSS 或静态输出，测试应当能看见这种不一致。

Markdown 降低了写作门槛，构建校验负责守住发布边界。两者放在一起，新增文章只需要维护一个源文件，不必手动修改多份列表。
