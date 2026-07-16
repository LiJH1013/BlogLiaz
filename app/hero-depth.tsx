"use client";

import Link from "next/link";
import type { CSSProperties, PointerEvent } from "react";
import styles from "./site.module.css";

type TiltStyle = CSSProperties & {
  "--pointer-x": string;
  "--pointer-y": string;
  "--pointer-shift-x": string;
  "--pointer-shift-y": string;
};

export function HeroDepth() {
  function updateTilt(event: PointerEvent<HTMLAnchorElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${(x * 15).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--pointer-y", `${(y * -13).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--pointer-shift-x", `${(x * 10).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--pointer-shift-y", `${(y * 8).toFixed(2)}px`);
  }

  function resetTilt(event: PointerEvent<HTMLAnchorElement>) {
    event.currentTarget.style.setProperty("--pointer-x", "0deg");
    event.currentTarget.style.setProperty("--pointer-y", "0deg");
    event.currentTarget.style.setProperty("--pointer-shift-x", "0px");
    event.currentTarget.style.setProperty("--pointer-shift-y", "0px");
  }

  return (
    <Link
      href="/articles"
      className={styles.depthStage}
      aria-label="进入文章归档页"
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
      style={{
        "--pointer-x": "0deg",
        "--pointer-y": "0deg",
        "--pointer-shift-x": "0px",
        "--pointer-shift-y": "0px",
      } as TiltStyle}
    >
      <div className={styles.depthObject} aria-hidden="true">
        <span className={styles.depthFront}>OPEN<br />NOTEBOOK</span>
        <span className={styles.depthTop}>WILD NOTES</span>
        <span className={styles.depthSide}>2026</span>
      </div>
      <span className={styles.depthAction} aria-hidden="true">
        进入文章 <b>↗</b>
      </span>
    </Link>
  );
}
