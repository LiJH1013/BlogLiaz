import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "../site.module.css";

export const metadata: Metadata = { title: "隐私说明" };

export default function PrivacyPage() {
  return (
    <div id="top" className={styles.siteShell}>
      <SiteHeader />
      <main id="main-content" className={`${styles.pageMain} ${styles.policyPage}`}>
        <p className={styles.pageKicker}>PRIVACY / 隐私说明</p>
        <h1>保持简单，<br />也保持透明。</h1>
        <div className={styles.policyCopy}>
          <p>野路子手记目前是公开阅读的个人博客，不要求注册或登录。</p>
          <h2>不会主动收集什么</h2>
          <p>本站不设置评论账户，不收集姓名、邮箱等个人资料，也没有接入广告追踪或营销像素。</p>
          <h2>基础托管日志</h2>
          <p>网站托管服务可能为了安全和稳定性记录基础访问日志，例如请求时间、浏览器类型与网络地址。本站作者不使用这些信息建立个人画像。</p>
          <h2>未来变更</h2>
          <p>如果以后增加访问统计、评论或订阅，会先更新此页面并清楚说明用途。</p>
          <small>最后更新：2026.07.16</small>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
