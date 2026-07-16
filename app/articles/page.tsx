import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "../site.module.css";
import Link from "next/link";

export const metadata: Metadata = { title: "全部文章" };
const posts = [
  ["01", "建站笔记 / 2026.07.12", "把个人博客重新做轻的三个决定", "/articles/make-blog-light"],
  ["02", "信息整理 / 2026.06.28", "我怎样整理一周里真正有用的信息", "/articles/weekly-notes"],
  ["03", "前端实践 / 2026.06.09", "从零开始部署一个静态网站", "/articles/deploy-static-site"],
];

export default function ArticlesPage() {
  return <div className={styles.siteShell}>
    <SiteHeader />
    <main id="main-content" className={styles.pageMain}>
      <p className={styles.pageKicker}>ARCHIVE / 文章归档</p>
      <h1 className={styles.pageTitle}>所有<br />文章</h1>
      <div className={`${styles.postList} ${styles.articleGrid}`}>
        {posts.map(([number, meta, title, href]) => <article className={styles.postRow} key={number}>
          <Link href={href} className={styles.postLink}>
            <span className={styles.postNumber}>{number}</span>
            <span className={styles.postMeta}>{meta}</span>
            <span className={styles.postCopy}><strong>{title}</strong></span>
            <span className={styles.postArrow} aria-hidden="true">↗</span>
          </Link>
        </article>)}
      </div>
    </main>
    <SiteFooter />
  </div>;
}
