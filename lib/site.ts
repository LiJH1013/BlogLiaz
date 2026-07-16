const isGitHubPages = process.env.GITHUB_PAGES === "true";

export const siteConfig = {
  name: "野路子手记",
  shortName: "野路子",
  author: "Liaz",
  description: "记录设计、代码与普通生活的个人博客。文章尽量写清过程、依据和适用范围。",
  url: isGitHubPages ? "https://li-j-h.github.io/BlogLiaz" : "https://wild-notes-2026.abc33094934.chatgpt.site",
  basePath: isGitHubPages ? "/BlogLiaz" : "",
  github: "https://github.com/li-j-h",
  repository: "https://github.com/li-j-h/BlogLiaz",
  lastUpdated: "2026-07-16",
};
