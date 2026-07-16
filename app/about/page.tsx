import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "../site.module.css";

export const metadata: Metadata = { title: "关于", description: "关于野路子手记和作者 Liaz。" };

export default function AboutPage() {
  return (
    <div id="top" className={styles.siteShell}>
      <SiteHeader />
      <main id="main-content" className={styles.pageMain}>
        <p className={styles.pageKicker}>ABOUT / 关于这里</p>
        <h1 className={styles.pageTitle}>你好，<br />欢迎来坐。</h1>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutPortrait} aria-label="作者形象字卡">
            <span>PORTRAIT<br />TO BE CONTINUED</span>
            <b>你<br />好</b>
            <small>暂时用一张字卡，等一张真正喜欢的照片。</small>
          </div>
          <div className={styles.aboutCopy}>
            <h2>一个持续搭建中的个人视角。</h2>
            <p>我在这里记录设计、代码和生活中那些值得多想一步的事。文章不保证给出标准答案，但会尽量交代真实过程、踩过的坑，以及最后为什么做出某个选择。</p>
            <p>你可以把这里当作一份公开笔记。如果某篇文字刚好对你有帮助，欢迎在 GitHub 上找到我。</p>
            <hr />
            <p><strong>联系</strong><br /><a href={siteConfig.github} target="_blank" rel="noreferrer">github.com/li-j-h ↗</a></p>
            <p><strong>隐私说明</strong><br />本站当前不设置账户、不收集个人资料，也不使用广告追踪。详细内容请查看<a href="/privacy">隐私页</a>。</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
