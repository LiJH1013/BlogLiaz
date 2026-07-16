# BlogLiaz

野路子手记，一个使用 vinext 构建的公开个人博客。内容以 Markdown 管理，发布到 OpenAI Sites，也可同步到 GitHub。

## 本地运行

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

## 持续更新文章

1. 在 `content/posts/` 新建一个 `.md` 文件。
2. 按照 `content/ADDING_POSTS.md` 填写标题、日期、摘要和正文。
3. 本地运行 `npm run dev` 预览。
4. 提交并推送代码，再发布新版本。

文章会自动出现在首页、文章归档、RSS 和站点地图中，不需要手动修改页面代码。

## 常用命令

- `npm run dev`：本地预览
- `npm run build`：构建验证
- `npm test`：构建并运行基础测试
- `npm run lint`：代码检查
