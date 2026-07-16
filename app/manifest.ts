import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: `${siteConfig.basePath}/`,
    display: "standalone",
    background_color: "#f7f1e5",
    theme_color: "#ef7d32",
    icons: [{ src: `${siteConfig.basePath}/favicon.svg`, sizes: "any", type: "image/svg+xml" }],
  };
}
