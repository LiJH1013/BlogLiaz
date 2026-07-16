import type { Metadata } from "next";
import { ArticleShell } from "../article-shell";
export const metadata: Metadata = { title: "把个人博客重新做轻的三个决定" };
export default function Page() { return <ArticleShell category="建站笔记" date="2026.07.12" title="把个人博客重新做轻的三个决定">
  <p>重新做博客时，我先删掉了需求清单。没有会员系统，没有复杂分类，也没有为了显得丰富而存在的组件。首页只回答三个问题：这里是谁、写什么、从哪里开始读。</p>
  <h2>一，先让发布足够简单</h2><p>如果写完一篇文章还要处理十几项配置，更新很快就会变成负担。文章使用固定格式，标题、日期和正文之外，只有真正需要时才增加额外信息。</p>
  <blockquote>博客最重要的功能不是展示，而是让下一次写作更容易发生。</blockquote>
  <h2>二，把速度当作设计的一部分</h2><p>少用大体积脚本，图片明确尺寸，动效只改变透明度和位移。页面更快，也让读者的注意力留在文字上。</p>
  <h2>三，允许它不完整</h2><p>关于页可以以后再补照片，文章分类也会随着内容成长。先把第一篇真实文章放上去，比准备一个看似完整但永远不更新的网站更有价值。</p>
</ArticleShell>; }
