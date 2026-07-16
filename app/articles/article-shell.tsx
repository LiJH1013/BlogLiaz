import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "../site.module.css";

export function ArticleShell({ category, date, title, children }: { category: string; date: string; title: string; children: React.ReactNode }) {
  return <div className={styles.siteShell}>
    <SiteHeader />
    <main id="main-content" className={styles.pageMain}>
      <article className={styles.article}>
        <Link className={styles.articleBack} href="/articles">← 返回全部文章</Link>
        <header className={styles.articleHeader}>
          <p className={styles.pageKicker}>{category}</p>
          <h1>{title}</h1>
          <div className={styles.articleMeta}><time>{date}</time><span>约 4 分钟阅读</span></div>
        </header>
        <div className={styles.articleBody}>{children}</div>
      </article>
    </main>
    <SiteFooter />
  </div>;
}
