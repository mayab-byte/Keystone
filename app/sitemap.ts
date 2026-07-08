import type { MetadataRoute } from "next";
import { abs } from "./site";
import { articles } from "./articles";
import { services } from "./services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/blog", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
    { path: "/accessibility", priority: 0.3 },
  ];

  const items: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: abs(r.path),
    changeFrequency: "monthly",
    priority: r.priority,
  }));

  for (const s of services) {
    items.push({
      url: abs(`/services/${s.slug}`),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const a of articles) {
    items.push({
      url: abs(`/blog/${a.slug}`),
      lastModified: a.dateModified,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  return items;
}
