import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  brand,
  contact,
  KeystoneFooter,
  KeystoneHeader,
} from "../../shared";
import LeadForm from "../../LeadForm";
import { disclaimer } from "../../articles";
import { getService, services } from "../../services";
import { abs, breadcrumbLd, faqLd, serviceLd, site } from "../../site";
import ServiceHero from "./ServiceHero";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} — Keystone`,
    description: service.short,
    alternates: { canonical: abs(`/services/${slug}`) },
    openGraph: {
      type: "website",
      title: `${service.title} — Keystone`,
      description: service.short,
      url: abs(`/services/${slug}`),
      images: [`${site.url}${service.image}`],
    },
  };
}

export default async function KeystoneServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== slug);

  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceLd({ title: service.title, short: service.short, slug }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(service.faq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "בית", path: "/" },
              { name: "שירותים", path: "/#services" },
              { name: service.title, path: `/services/${slug}` },
            ]),
          ),
        }}
      />
      <KeystoneHeader />
      <main id="main">
        <ServiceHero
          image={service.image}
          title={service.title}
          tagline={service.tagline}
        />

        <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
          <nav aria-label="פירורי לחם" className="text-sm">
            <Link
              href="/#services"
              className="inline-flex items-center gap-1.5 text-(--ks-teal-ink) hover:underline"
            >
              <ArrowRight aria-hidden className="h-4 w-4" />
              כל השירותים
            </Link>
          </nav>

          <p className="mt-5 text-lg font-medium leading-relaxed">
            {service.intro}
          </p>

          {service.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-2xl font-bold">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="mt-4 leading-relaxed text-black/80"
                >
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-4 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed text-black/80">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-black"
                        style={{ backgroundImage: "var(--ks-grad)" }}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">שאלות נפוצות</h2>
            <dl className="mt-5 space-y-5">
              {service.faq.map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-black/8 p-5">
                  <dt className="font-bold">{q}</dt>
                  <dd className="mt-2 leading-relaxed text-black/75">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="mt-8 text-sm leading-relaxed text-black/60">
            {disclaimer}
          </p>
        </article>

        {/* Compact, full-width contact form */}
        <section className="border-t border-black/5 bg-ground py-14 md:py-16">
          <div className="mx-auto max-w-5xl px-5">
            <div className="text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                רוצים לדבר על {service.title}?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-black/65">
                השאירו פרטים ונחזור אליכם עוד היום — שיחת היכרות ראשונה ללא
                עלות וללא התחייבות.
              </p>
            </div>
            <div className="mt-8">
              <LeadForm
                whatsappNumber={contact.whatsappNumber}
                tone="light"
                layout="row"
              />
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="mx-auto max-w-5xl px-5 py-14">
          <h2 className="text-center text-sm font-bold text-(--ks-teal-ink)">
            עוד תחומים שאנחנו מלווים
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 font-semibold transition-colors hover:border-(--ks-teal) hover:text-(--ks-teal-ink)"
              >
                {o.title}
                <ArrowLeft aria-hidden className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </section>
      </main>
      <KeystoneFooter />
    </div>
  );
}
