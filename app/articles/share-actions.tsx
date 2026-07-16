"use client";

import { useState } from "react";
import styles from "../site.module.css";

export function ShareActions() {
  const [copied, setCopied] = useState(false);

  async function shareLink() {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: document.title, url: window.location.href });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("复制下面的文章地址", window.location.href);
    }
  }
  return <button className={styles.copyButton} type="button" onClick={shareLink} aria-live="polite">{copied ? "链接已复制" : "分享文章"}</button>;
}
