"use client";

import { useState } from "react";
import styles from "../site.module.css";

export function ShareActions() {
  const [copied, setCopied] = useState(false);
  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }
  return <button className={styles.copyButton} type="button" onClick={copyLink} aria-live="polite">{copied ? "已复制链接" : "复制文章链接"}</button>;
}
