import type { MetadataRoute } from "next";
import { site } from "./site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // On the preview (indexable=false) block all crawling so placeholder
  // content never gets indexed. On production, allow and point to the sitemap.
  if (!site.indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
