import Link from "next/link";
import styles from "./site.module.css";
export default function NotFound() { return <main className={styles.notFound}><strong>404</strong><h1>这条路还没有内容</h1><p>可能是地址写错了，也可能这篇文章正在路上。</p><Link href="/">回到首页</Link></main>; }
