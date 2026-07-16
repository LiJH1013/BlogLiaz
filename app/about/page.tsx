import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "../site.module.css";

export const metadata: Metadata = { title: "关于" };

export default function AboutPage() {
  return <div className={styles.siteShell}>
    <SiteHeader />
    <main id="main-content" className={styles.pageMain}>
      <p className={styles.pageKicker}>ABOUT / 关于这里</p>
      <h1 className={styles.pageTitle}>你好，<br />欢迎来坐。</h1>
      <div className={styles.aboutGrid}>
        <div className={styles.aboutPortrait} aria-label="作者照片预留位置">
          <span>PHOTO<br />GOES HERE</span>
          <b>你<br />好</b>
          <small>替换为你的照片或喜欢的作品</small>
        </div>
        <div className={styles.aboutCopy}>
          <h2>一个持续搭建中的个人角落。</h2>
          <p>我在这里记录设计、代码和生活中那些值得多想一步的事。文章不保证给出标准答案，但会尽量交代真实过程、踩过的坑，以及最后为什么做出某个选择。</p>
          <p>你可以把这里当作一份公开笔记。如果某篇文字刚好对你有帮助，欢迎写信告诉我。</p>
          <hr />
          <p><strong>联系</strong><br /><a href="mailto:hello@example.com">hello@example.com</a></p>
          <p><strong>隐私说明</strong><br />本站当前不设置账户、不收集个人资料，也不使用广告追踪。以后如接入访问统计，会在这里明确说明。</p>
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>;
}
