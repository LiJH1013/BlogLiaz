import site from "@/config/site.json";

export const siteConfig = {
  ...site,
  basePath: process.env.GITHUB_PAGES === "true" ? site.pagesBasePath : "",
};
