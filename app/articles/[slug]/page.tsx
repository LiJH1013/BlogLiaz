import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getAllPosts, getPost } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { SiteFooter, SiteHeader } from "../../site-chrome";
import { ShareActions } from "../share-actions";
import styles from "../../site.module.css";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/articles/${post.slug}` },
    openGraph: { title: post.title, description: post.summary, type: "article", publishedTime: post.date, url: `${siteConfig.url}/articles/${post.slug}` },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getAllPosts();
  const post = getPost(slug);
  if (!post) notFound();
  const index = posts.findIndex((item) => item.slug === slug);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index < posts.length - 1 ? posts[index + 1] : undefined;

  return (
    <div id="top" className={styles.siteShell}>
      <SiteHeader />
      <main id="main-content" className={styles.pageMain}>
        <article className={styles.article}>
          <Link className={styles.articleBack} href="/articles">← 返回全部文章</Link>
          <header className={styles.articleHeader}>
            <p className={styles.pageKicker}>{post.category}</p>
            <h1>{post.title}</h1>
            <div className={styles.articleMeta}>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span>约 {post.readingMinutes} 分钟阅读</span>
            </div>
            <div className={styles.articleTools}>
              <div className={styles.tagList}>{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
              <ShareActions />
            </div>
          </header>
          <div className={styles.articleBody} dangerouslySetInnerHTML={{ __html: post.html }} />
          <nav className={styles.articlePager} aria-label="上一篇和下一篇">
            {newer ? <Link href={`/articles/${newer.slug}`}><small>较新一篇</small><strong>{newer.title}</strong></Link> : <span />}
            {older ? <Link href={`/articles/${older.slug}`}><small>较早一篇</small><strong>{older.title}</strong></Link> : <span />}
          </nav>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
