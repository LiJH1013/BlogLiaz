"use client";

import type { CSSProperties, PointerEvent } from "react";
import styles from "./site.module.css";

type TiltStyle = CSSProperties & { "--pointer-x": string; "--pointer-y": string };

export function HeroDepth() {
  function updateTilt(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--pointer-x", `${(x * 8).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--pointer-y", `${(y * -7).toFixed(2)}deg`);
  }

  function resetTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--pointer-x", "0deg");
    event.currentTarget.style.setProperty("--pointer-y", "0deg");
  }

  return (
    <div
      className={styles.depthStage}
      aria-hidden="true"
      onPointerMove={updateTilt}
      onPointerLeave={resetTilt}
      style={{ "--pointer-x": "0deg", "--pointer-y": "0deg" } as TiltStyle}
    >
      <div className={styles.depthObject}>
        <span className={styles.depthFront}>OPEN<br />NOTEBOOK</span>
        <span className={styles.depthTop}>WILD NOTES</span>
        <span className={styles.depthSide}>2026</span>
      </div>
    </div>
  );
}
