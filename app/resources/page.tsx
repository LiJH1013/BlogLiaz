import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { resources } from "@/lib/resources";
import { SiteFooter, SiteHeader } from "../site-chrome";
import siteStyles from "../site.module.css";
import { ResourceExplorer } from "./resources-client";

export const metadata: Metadata = {
  title: "资源",
  description: "Liaz 整理的前端、爬虫、AI 与工程工具资源索引。",
  alternates: { canonical: `${siteConfig.url}/resources` },
};

export default function ResourcesPage() {
  return (
    <div id="top" className={siteStyles.siteShell}>
      <SiteHeader />
      <main id="main-content">
        <ResourceExplorer resources={resources} />
      </main>
      <SiteFooter />
    </div>
  );
}
