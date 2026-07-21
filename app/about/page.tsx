import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "../site.module.css";

export const metadata: Metadata = { title: "关于", description: "关于野路子手记和作者 Liaz。", alternates: { canonical: `${siteConfig.url}/about` } };

export default function AboutPage() {
  return (
    <div id="top" className={styles.siteShell}>
      <SiteHeader />
      <main id="main-content" className={styles.pageMain}>
        <section className={styles.aboutHero} aria-labelledby="about-title">
          <div>
            <p className={styles.pageKicker}>ABOUT / 关于这里</p>
            <h1 id="about-title" className={styles.pageTitle}>你好，<br />欢迎来坐。</h1>
          </div>
          <figure className={styles.aboutReader} data-about-reader role="img" aria-label="LIAZ 坐在桌前，一边喝茶一边看书的线稿插画">
            <svg viewBox="0 0 360 260" aria-hidden="true">
              <g className={styles.readerBackdrop}>
                <circle className={styles.readerBackdropFill} cx="235" cy="120" r="88" />
                <circle className={styles.readerOrbit} cx="235" cy="120" r="72" />
                <circle className={styles.readerOrbit} cx="235" cy="120" r="56" />
                <path className={styles.readerGround} d="M28 228H332" />
              </g>

              <g className={styles.readerChair}>
                <path d="M264 119h44v91M264 134h31v75" />
                <path d="M274 208l-12 21M299 208l14 21" />
              </g>

              <g className={styles.readerPerson}>
                <path className={styles.readerBody} d="M229 100c27 0 46 19 48 52l2 37h-76l4-51c2-23 8-38 22-38z" />
                <g className={styles.readerHead}>
                  <path className={styles.readerFace} d="M214 51c8-15 31-18 45-6 12 10 13 31 1 43-9 9-27 11-39 2-12-9-14-25-7-39z" />
                  <path className={styles.readerHair} d="M211 61c2-22 24-34 43-24 11 6 17 17 16 29-8-1-15-5-21-12-9 8-21 12-38 12z" />
                  <path d="M222 70h7M242 68h7M230 84c5 3 10 2 14-1" />
                </g>
                <path d="M218 116c-14 10-22 22-29 38l-24-10" />
                <path d="M253 117c-8-13-19-20-34-27" />
                <path d="M253 188c8 13 15 26 20 41M218 188l-2 41" />
              </g>

              <g className={styles.readerCup}>
                <path d="M188 86h28v24c0 8-6 14-14 14s-14-6-14-14z" />
                <path d="M216 94h7c12 0 12 18 0 18h-7" />
                <path d="M190 88h24" />
              </g>
              <g className={styles.readerSteam}>
                <path d="M195 76c-8-8 8-13 0-22" />
                <path d="M207 75c8-9-7-13 1-25" />
              </g>

              <g className={styles.readerTable}>
                <path className={styles.readerTableTop} d="M36 151h177v14H36z" />
                <path d="M52 165l-8 66M194 165l8 66" />
                <path d="M45 209h155" />
              </g>
              <g className={styles.readerBook}>
                <path d="M66 145c20-11 39-10 57 1v-31c-18-8-37-8-57 2z" />
                <path d="M123 146c19-11 38-10 57 0v-30c-20-9-39-9-57-1z" />
                <path d="M123 115v31" />
                <path className={styles.readerPage} d="M135 119c11-5 22-5 34 0" />
              </g>
            </svg>
            <figcaption>LIAZ / TEA, READ, REPEAT</figcaption>
          </figure>
        </section>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutPortrait} aria-label="野路子手记识别字卡">
            <span>WILD NOTES<br />SINCE 2026</span>
            <b>你<br />好</b>
            <span className={styles.aboutAuthor}>作者 / LIAZ</span>
            <small>DESIGN / CODE / DAILY LIFE</small>
          </div>
          <div className={styles.aboutCopy}>
            <h2>一份持续更新的公开笔记。</h2>
            <p>野路子手记记录设计、代码和普通生活。这里不把个人做法写成标准答案；每篇文章会尽量说明过程、依据、限制，以及仍未解决的问题。</p>
            <p>目前的文章和网站源码都公开在 GitHub。如果发现错字、失效链接或技术问题，可以在仓库中提交 Issue。</p>
            <hr />
            <p><strong>项目仓库</strong><br /><a href={siteConfig.repository} target="_blank" rel="noreferrer" aria-label="打开 BlogLiaz 的 GitHub 仓库（新窗口）">github.com/LiJH1013/BlogLiaz ↗</a></p>
            <p><strong>隐私说明</strong><br />本站当前不设置账户、不主动收集个人资料，也不使用广告追踪。详细内容请查看<Link href="/privacy">隐私页</Link>。</p>
            <Link className={styles.solidLink} href="/hello">去访客登记处 <span>→</span></Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
