import type { Metadata } from "next";
import { ArticleShell } from "../article-shell";
export const metadata: Metadata = { title: "从零开始部署一个静态网站" };
export default function Page() { return <ArticleShell category="前端实践" date="2026.06.09" title="从零开始部署一个静态网站">
  <p>第一次发布网站，不需要先理解服务器的全部知识。你真正要准备的是可以构建的项目、公开托管位置，以及一个愿意长期维护的网址。</p>
  <h2>先获得一个公开地址</h2><p>静态托管平台可以直接连接代码仓库，每次更新后自动发布。平台提供的临时域名已经足够让任何人访问。</p>
  <h2>再绑定自己的域名</h2><p>域名不是网站上线的前提，却能建立长期识别。绑定时主要处理 DNS 记录，HTTPS 通常由托管平台自动完成。</p>
  <h2>最后帮助搜索引擎发现</h2><p>准备站点地图、清晰标题和描述，再提交到站长工具。发布只是开始，持续更新和来自其他网站的链接，才会逐渐带来读者。</p>
</ArticleShell>; }
