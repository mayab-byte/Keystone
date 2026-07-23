/* Central site config for SEO. On the production domain, build with
   NEXT_PUBLIC_SITE_URL=https://your-domain and NEXT_PUBLIC_INDEXABLE=true
   (and drop NEXT_PUBLIC_BASE_PATH). The github.io preview stays out of search
   by default so placeholder content is never indexed. */

// Contact details. Kept here (plain data, no JSX) so metadata routes
// (sitemap/robots) can import it without pulling in React components.
// Re-exported from ./shared for the UI.
//
// Two partners, each with their own line. `contact` is the primary entry used
// for JSON-LD and the lead form; `partners` drives the contact sections that
// list both people.
export const partners = [
  {
    name: "שלומי אחלופי",
    role: "פיננסים והשקעות",
    phone: "050-233-4100",
    whatsappNumber: "972502334100",
    whatsapp: "https://wa.me/972502334100",
    email: "shlomiac.ins@gmail.com",
  },
  {
    name: "שלומי פרידמן",
    role: "ביטוח",
    phone: "054-574-3132",
    whatsappNumber: "972545743132",
    whatsapp: "https://wa.me/972545743132",
    email: "shlomo9879@gmail.com",
  },
];

export const contact = {
  phone: partners[0].phone,
  whatsappNumber: partners[0].whatsappNumber,
  whatsapp: partners[0].whatsapp,
  email: partners[0].email,
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
