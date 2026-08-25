import type { NextConfig } from "next";
import site from "./config/site.json";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages ? {
    output: "export" as const,
    basePath: site.pagesBasePath,
    assetPrefix: site.pagesBasePath,
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
