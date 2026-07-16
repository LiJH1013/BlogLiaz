"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "../site.module.css";

type BrowserPost = { slug: string; title: string; date: string; category: string; summary: string; tags: string[] };

export function ArticleBrowser({ posts }: { posts: BrowserPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const categories = ["全部", ...Array.from(new Set(posts.map((post) => post.category)))];
  const filtered = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("zh-CN");
    return posts.filter((post) => {
      const inCategory = category === "全部" || post.category === category;
      const haystack = [post.title, post.summary, post.category, ...post.tags].join(" ").toLocaleLowerCase("zh-CN");
      return inCategory && (!keyword || haystack.includes(keyword));
    });
  }, [category, posts, query]);

  return (
    <section className={styles.archive} aria-label="文章筛选与列表">
      <div className={styles.filterBar}>
        <label className={styles.searchField}>
          <span>搜索</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="标题、摘要或标签" type="search" />
        </label>
        <div className={styles.filterGroup} aria-label="按分类筛选">
          {categories.map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <p className={styles.resultCount} aria-live="polite">{String(filtered.length).padStart(2, "0")} 篇文章</p>
      </div>

      {filtered.length ? (
        <div className={`${styles.postList} ${styles.articleGrid}`}>
          {filtered.map((post, index) => (
            <article className={styles.postRow} key={post.slug}>
              <Link href={`/articles/${post.slug}`} className={styles.postLink}>
                <span className={styles.postNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.postMeta}>{post.category}<br />{post.date.replaceAll("-", ".")}</span>
                <span className={styles.postCopy}><strong>{post.title}</strong><small>{post.summary}</small></span>
                <span className={styles.postArrow} aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}><strong>没有找到文章</strong><p>换一个关键词，或选择“全部”分类再试试。</p></div>
      )}
    </section>
  );
}
