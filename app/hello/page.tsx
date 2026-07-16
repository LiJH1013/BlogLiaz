import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { HelloClient } from "./hello-client";
import styles from "./hello.module.css";

export const metadata: Metadata = {
  title: "访客登记处",
  description: "和 LIAZ 打个招呼，生成一张只保存在当前页面的访客签。",
  alternates: { canonical: `${siteConfig.url}/hello` },
};

export default function HelloPage() {
  return (
    <div id="top" className={styles.helloShell}>
      <SiteHeader />
      <main id="main-content" className={styles.helloMain}>
        <div className={styles.helloHeading}>
          <p>HELLO LIAZ / 访客登记处</p>
          <h1>来都来了，<br /><span>留张访客签。</span></h1>
          <div>
            <strong>不用登录，也不会上传。</strong>
            <span>这些内容只用于当前页面的互动，刷新后就会消失。</span>
          </div>
        </div>
        <HelloClient />
      </main>
      <SiteFooter />
    </div>
  );
}
