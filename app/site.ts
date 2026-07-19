/* Central site config for SEO. On the production domain, build with
   NEXT_PUBLIC_SITE_URL=https://your-domain and NEXT_PUBLIC_INDEXABLE=true
   (and drop NEXT_PUBLIC_BASE_PATH). The github.io preview stays out of search
   by default so placeholder content is never indexed. */

// Placeholder contact details — swap for the client's real ones before launch.
// Kept here (plain data, no JSX) so metadata routes (sitemap/robots) can import
// it without pulling in React components. Re-exported from ./shared for the UI.
export const contact = {
  phone: "050-000-0000",
  whatsappNumber: "972500000000",
  whatsapp: "https://wa.me/972500000000",
  email: "office@keystone-fin.co.il",
};

const RAW_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mayab-byte.github.io/Keystone";

export const site = {
  url: RAW_URL.replace(/\/$/, ""),
  name: "Keystone",
  description:
    "Keystone · סוכנות 360 של שלומי אחלופי ושלומי פרידמן. תכנון השקעות חכם-מס, פנסיוני, פרישה וביטוח בליווי אישי.",
  locale: "he_IL",
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
};

/** Absolute URL for a route path (path should start with "/"). */
export const abs = (path = "/") =>
  `${site.url}${path === "/" ? "/" : path.replace(/\/?$/, "/")}`;

export const ogImage = `${site.url}/og.jpg`;

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: site.name,
  url: abs("/"),
  logo: `${site.url}/logo-full.png`,
  image: ogImage,
  description: site.description,
  telephone: contact.phone,
  email: contact.email,
  areaServed: "IL",
  availableLanguage: "he",
  founder: [
    { "@type": "Person", name: "שלומי אחלופי" },
    { "@type": "Person", name: "שלומי פרידמן" },
  ],
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: abs("/"),
  inLanguage: "he",
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const faqLd = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const articleLd = (a: {
  title: string;
  excerpt: string;
  image: string;
  datePublished: string;
  dateModified: string;
  slug: string;
  authorName: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.excerpt,
  image: `${site.url}${a.image}`,
  datePublished: a.datePublished,
  dateModified: a.dateModified,
  author: { "@type": "Person", name: a.authorName },
  publisher: {
    "@type": "Organization",
    name: site.name,
    logo: { "@type": "ImageObject", url: `${site.url}/logo-full.png` },
  },
  mainEntityOfPage: abs(`/blog/${a.slug}`),
  inLanguage: "he",
});

export const serviceLd = (s: {
  title: string;
  short: string;
  slug: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: s.title,
  name: s.title,
  description: s.short,
  provider: { "@type": "FinancialService", name: site.name, url: abs("/") },
  areaServed: "IL",
  url: abs(`/services/${s.slug}`),
  inLanguage: "he",
});
