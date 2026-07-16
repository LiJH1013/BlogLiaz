const isGitHubPages = process.env.GITHUB_PAGES === "true";

export const siteConfig = {
  name: "野路子手记",
  shortName: "野路子",
  author: "Liaz",
  description: "关于设计、代码与普通生活的个人博客。不追热点，只记下亲自走过的路。",
  url: isGitHubPages ? "https://li-j-h.github.io/BlogLiaz" : "https://wild-notes-2026.abc33094934.chatgpt.site",
  basePath: isGitHubPages ? "/BlogLiaz" : "",
  github: "https://github.com/li-j-h",
};
