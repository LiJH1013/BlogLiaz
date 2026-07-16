import Link from "next/link";
import { siteConfig } from "@/lib/site";
import styles from "./site.module.css";

export function SiteHeader() {
  return (
    <>
      <a className={styles.skipLink} href="#main-content">跳到正文</a>
      <div className={styles.scrollProgress} aria-hidden="true" />
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="野路子手记首页">
          <span>野</span><span>路</span><span>子</span>
        </Link>
        <nav className={styles.nav} aria-label="主导航">
          <Link href="/articles">文章</Link>
          <Link href="/about">关于</Link>
          <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <span className={styles.headerMark}>✦</span>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>野路子手记</p>
        <small>KEEP CURIOUS, KEEP NOTES.</small>
      </div>
      <nav aria-label="页脚导航">
        <Link href="/articles">全部文章</Link>
        <Link href="/about">关于</Link>
        <Link href="/privacy">隐私</Link>
        <a href="/rss.xml">RSS</a>
        <a href="#top">回到顶部 ↑</a>
      </nav>
      <p className={styles.copyright}>© 2026 / MADE WITH CURIOSITY</p>
    </footer>
  );
}
