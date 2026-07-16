import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/posts";
import { SiteFooter, SiteHeader } from "./site-chrome";
import styles from "./site.module.css";

const notes = [
  ["07.15", "把首页的导航从六项减到三项，突然就能呼吸了。"],
  ["07.08", "读完《毫无意义的工作》，重新想了想效率这件事。"],
  ["06.21", "周末走了十二公里，没有耳机，城市的底噪很好听。"],
];

export default function Home() {
  const featuredPosts = getAllPosts().slice(0, 3);

  return (
    <div id="top" className={styles.siteShell}>
      <SiteHeader />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-title">
          <p className={`${styles.eyebrow} ${styles.enterOne}`}>个人博客 / 记录正在发生的事</p>
          <h1 id="hero-title" className={`${styles.heroTitle} ${styles.enterTwo}`}>
            <span lang="zh-CN">野路子</span>
            <span lang="zh-CN" className={styles.heroAccent}>手记</span>
          </h1>
          <div className={`${styles.heroFoot} ${styles.enterThree}`}>
            <p>关于设计、代码与普通生活。<br />不追热点，只记下亲自走过的路。</p>
            <a className={styles.roundLink} href="#featured" aria-label="向下查看精选文章">向下<br />阅读</a>
          </div>
          <div className={`${styles.depthStage} ${styles.enterThree}`} aria-hidden="true">
            <div className={styles.depthObject}>
              <span className={styles.depthFront}>OPEN<br />NOTEBOOK</span>
              <span className={styles.depthTop}>WILD NOTES</span>
              <span className={styles.depthSide}>2026</span>
            </div>
          </div>
        </section>

        <div className={styles.marquee} aria-label="博客主题">
          <div className={styles.marqueeTrack}>
            <span>写真经验</span><b>✦</b><span>保留好奇</span><b>✦</b><span>持续更新</span><b>✦</b>
            <span aria-hidden="true">写真经验</span><b aria-hidden="true">✦</b><span aria-hidden="true">保留好奇</span><b aria-hidden="true">✦</b><span aria-hidden="true">持续更新</span><b aria-hidden="true">✦</b>
          </div>
        </div>

        <section id="featured" className={styles.section} aria-labelledby="featured-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionNumber}>01 / ARTICLES</p>
            <h2 id="featured-title">最近写下的<br />三件事</h2>
            <Link className={styles.textLink} href="/articles">查看全部文章 →</Link>
          </div>
          <div className={styles.postList}>
            {featuredPosts.map((post, index) => (
              <article className={styles.postRow} key={post.slug}>
                <Link href={`/articles/${post.slug}`} className={styles.postLink}>
                  <span className={styles.postNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.postMeta}>{post.category}<br />{formatPostDate(post.date)}</span>
                  <span className={styles.postCopy}>
                    <strong>{post.title}</strong>
                    <small>{post.summary}</small>
                  </span>
                  <span className={styles.postArrow} aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.notesSection}`} aria-labelledby="notes-title">
          <div className={styles.sectionIntro}>
            <p className={styles.sectionNumber}>02 / SHORT NOTES</p>
            <h2 id="notes-title">日常切片</h2>
            <p className={styles.sectionDescription}>不够写成文章，但值得被记住的瞬间。</p>
          </div>
          <div className={styles.noteBoard}>
            {notes.map(([date, text], index) => (
              <article className={styles.note} key={date} style={{ "--note-index": index } as React.CSSProperties}>
                <time dateTime={`2026-${date.replace(".", "-")}`}>{date}</time>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.aboutTeaser} aria-labelledby="about-title">
          <p className={styles.sectionNumber}>03 / ABOUT</p>
          <h2 id="about-title">在输出答案之前，<br />先诚实地记录问题。</h2>
          <div>
            <p>这里是一份公开笔记，也是一场长期练习。希望某一篇文章，恰好能帮你少绕一点路。</p>
            <Link className={styles.solidLink} href="/about">认识这个博客 <span>→</span></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
