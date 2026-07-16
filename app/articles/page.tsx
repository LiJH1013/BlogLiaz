import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { ArticleBrowser } from "./article-browser";
import styles from "../site.module.css";

export const metadata: Metadata = { title: "全部文章", description: "野路子手记的全部文章与写作归档。" };

export default function ArticlesPage() {
  const posts = getAllPosts().map(({ slug, title, date, category, summary, tags }) => ({ slug, title, date, category, summary, tags }));
  return (
    <div id="top" className={styles.siteShell}>
      <SiteHeader />
      <main id="main-content" className={styles.pageMain}>
        <p className={styles.pageKicker}>ARCHIVE / 文章归档</p>
        <h1 className={styles.pageTitle}>所有<br />文章</h1>
        <ArticleBrowser posts={posts} />
      </main>
      <SiteFooter />
    </div>
  );
}
