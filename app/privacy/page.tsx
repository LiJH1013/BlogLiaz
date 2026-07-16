import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "../site.module.css";

export const metadata: Metadata = { title: "隐私说明", description: "野路子手记的数据处理与隐私说明。", alternates: { canonical: `${siteConfig.url}/privacy` } };

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
          <p>GitHub Pages 和本站备用托管服务可能为了安全、运维和故障排查处理基础访问数据，例如请求时间、浏览器信息与 IP 地址。这些数据由托管服务按照各自政策处理，本站不另行用它们建立读者画像。</p>
          <h2>未来变更</h2>
          <p>如果以后增加访问统计、评论或订阅功能，会先更新此页面，说明收集内容、用途和退出方式。</p>
          <small>最后更新：2026.07.16</small>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
