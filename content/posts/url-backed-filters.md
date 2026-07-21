---
title: 筛选状态写进 URL，文章列表才方便分享和返回
date: 2026-07-21
category: 前端
summary: 以 BlogLiaz 的文章归档为例，拆开分类、标签和关键词怎样与地址栏保持同步。
tags: [URL、搜索、React]
readingMinutes: 6
published: true
---

文章列表加上搜索和分类后，很容易出现一种别扭的状态：页面看起来已经筛好了，复制链接给别人，打开后却又回到全部文章。返回上一页时，刚才选过的条件也可能消失。

BlogLiaz 的归档页把关键词、分类和标签放进查询参数。一个筛选结果可以长成这样：

```text
/articles?q=部署&category=前端&tag=GitHub%20Pages
```

## 地址栏承担可分享状态

查询参数适合保存会改变页面内容、又不涉及隐私的状态。关键词用 `q`，分类用 `category`，标签用 `tag`。链接被复制、收藏或刷新后，浏览器仍能还原同一批结果。

输入框是否聚焦、扫描动画是否播放，这类短暂交互不需要写进 URL。把所有界面状态都塞进去，会让地址变长，也会增加同步代码。

## 读取时要过滤无效值

页面加载后可以用 `URLSearchParams` 读取条件。分类不能直接相信地址栏传来的字符串，BlogLiaz 会确认它属于已有的四个方向，未知值退回“全部”。

```ts
const params = new URLSearchParams(window.location.search);
const nextCategory = params.get("category");

setCategory(
  nextCategory && topicOrder.includes(nextCategory as PostCategory)
    ? nextCategory
    : "全部",
);
```

关键词和标签同样需要默认值。这样手动修改地址、打开旧链接或遇到拼写错误时，页面仍能正常工作。

## 更新 URL 不必触发整页跳转

筛选发生在浏览器里，`history.replaceState()` 可以只修改当前地址，不重新加载页面。空条件应从参数中删除，避免出现 `?q=&category=全部` 这样的冗余链接。

```ts
if (query) params.set("q", query);
else params.delete("q");

history.replaceState(null, "", `${location.pathname}?${params}`);
```

这里使用 `replaceState`，连续输入不会为每个字增加一条历史记录。如果产品希望“切换分类”可以逐步后退，也可以只对分类使用 `pushState`，对搜索输入继续使用 `replaceState`。

## 返回路径也要恢复界面

浏览器触发 `popstate` 时，需要重新读取查询参数并更新 React 状态。只在首次加载时读取一次，返回旧地址后会出现“地址已经变了，界面没有变”的错位。

BlogLiaz 把读取逻辑收进 `restoreFilters()`，挂到 `popstate`，卸载组件时再移除监听。筛选逻辑仍只保留一份，地址栏负责记录，React 状态负责渲染。

## 哪些状态不该进入 URL

收藏内容适合放在本地存储，登录信息应交给安全的会话机制，未提交的长文本也不适合不断写入地址栏。URL 更适合公开、短小、可以复现页面结果的条件。

文章数量增加后，这种做法还能直接支持“分享某个专题”“保留一次搜索”和“从文章返回原筛选结果”，不需要为静态博客增加数据库。
