---
title: 交互很多时，怎样让文字继续保持清晰
date: 2026-07-19
category: 前端
summary: 动态效果留给光斑、纸块和箭头，正文卡片保持稳定，同时补上减少动态的访问路径。
tags: [CSS、动效、无障碍]
readingMinutes: 7
published: true
---

悬浮卡片常用 `scale()`、`rotate()` 和 `translate3d()` 制造立体感。文字也在卡片里时，浏览器可能把整层先栅格化再变换，细笔画在部分缩放比例和设备像素密度下会变软。页面越依赖大标题和高对比字体，这种变化越明显。

BlogLiaz 后来的规则很简单：正文和标题保持在稳定平面，动态交给装饰层。

## 文字卡片不整体变换

文章列表悬浮时改变背景色和左侧强调线，卡片本身不旋转，也不缩放：

```css
.postLink:hover {
  transform: none;
  background: color-mix(in oklab, var(--accent) 14%, transparent);
  box-shadow: inset 5px 0 0 var(--accent);
}

.postLink:hover .postArrow {
  transform: rotate(45deg);
}
```

箭头旋转能说明这一行可以进入，文字仍由浏览器按原来的像素位置绘制。分类卡片也采用同一思路，扫描光带和圆形光斑移动，按钮里的文字不跟着倾斜。

## 鼠标位置可以驱动装饰层

静止文字不等于页面没有互动。容器收到 `pointermove` 后，可以把鼠标相对位置写进 CSS 变量，让伪元素、阴影或纸块跟随移动。

```ts
const bounds = target.getBoundingClientRect();
const x = (event.clientX - bounds.left) / bounds.width;
const y = (event.clientY - bounds.top) / bounds.height;

target.style.setProperty("--spot-x", `${x * 100}%`);
target.style.setProperty("--spot-y", `${y * 100}%`);
```

更新频率高时，可以用 `requestAnimationFrame` 合并同一帧里的多次事件。装饰层还要设置 `pointer-events: none`，避免光斑挡住链接或造成部分区域点不到。

## 反馈要说明操作结果

动效除了好看，还要帮助操作。悬浮时的强调线告诉读者当前行，按钮按下时的短暂缩放说明点击已经接收，扫描动画则需要配合文字状态。单独播放一个复杂动画，却没有改变焦点、结果或状态，读者仍然不知道发生了什么。

触摸设备没有悬浮状态，关键入口不能只靠鼠标经过后才出现。链接文字、按钮形状和焦点样式应在静止时也能识别。

## 减少动态是一条完整分支

系统开启“减少动态”后，页面可以通过 `prefers-reduced-motion` 停止循环动画和大范围位移，同时保留颜色、边框和文字状态：

```css
@media (prefers-reduced-motion: reduce) {
  .floatingPaper,
  .scanSweep {
    animation: none;
    transform: none;
    transition: none;
  }
}
```

JavaScript 触发滚动时也应读取同一偏好，把平滑滚动切换为即时定位。这样减少的是持续运动，不是把所有反馈一起关掉。

## 3D 适合留在装饰对象上

首页纸块、几何图形和阴影可以继续使用透视与旋转，因为它们本来就是视觉对象。文章标题、摘要、筛选按钮和正文承担阅读任务，位置稳定会更舒服。动态层与内容层分开后，交互仍然明显，文字也不会因为悬浮而忽然变糊。
