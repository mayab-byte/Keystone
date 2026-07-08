import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import {
  brand,
  GradientText,
  KeystoneFooter,
  KeystoneHeader,
} from "../../shared";
import { articles, author, disclaimer, getArticle } from "../../articles";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Keystone`,
    description: article.excerpt,
    // Internal design preview for the client — keep out of search engines.
    robots: { index: false, follow: false },
  };
}

const dateFmt = new Intl.DateTimeFormat("he-IL", { dateStyle: "long" });

export default async function KeystoneArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>
      <KeystoneHeader />
      <main id="main">
        {/* ── Article header ─────────────────────────────────────────── */}
        <header className="bg-black py-14 text-white md:py-18">
          <div className="mx-auto max-w-3xl px-5">
            <nav aria-label="פירורי לחם" className="text-sm">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-white/75 hover:text-(--ks-green)"
              >
                <ArrowRight aria-hidden className="h-4 w-4" />
                חזרה לבלוג
              </Link>
            </nav>
            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-white/70">
              <span>{author.name}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden className="h-4 w-4" />
                פורסם{" "}
                <time dateTime={article.datePublished}>
                  {dateFmt.format(new Date(article.datePublished))}
                </time>
              </span>
              <span>
                עודכן{" "}
                <time dateTime={article.dateModified}>
                  {dateFmt.format(new Date(article.dateModified))}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden className="h-4 w-4" />
                {article.readingMinutes} דקות קריאה
              </span>
            </p>
          </div>
        </header>

        <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
          {/* Direct answer first — the reader gets the value in the first
              100 words, before any background */}
          <p className="text-lg font-medium leading-relaxed">
            {article.directAnswer}
          </p>

          {/* TL;DR block */}
          <aside
            aria-label="תקציר המאמר"
            className="mt-8 rounded-2xl border border-black/8 bg-ground p-6"
          >
            <h2 className="text-base font-bold">בקצרה</h2>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-black/75">
              {article.tldr.map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundImage: "var(--ks-grad)" }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </aside>

          {/* Content sections */}
          {article.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-2xl font-bold">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-black/80">
                  {p}
                </p>
              ))}
              {s.steps && (
                <ol className="mt-4 space-y-3">
                  {s.steps.map((step, i) => (
                    <li key={step} className="flex gap-3 leading-relaxed text-black/80">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-black"
                        style={{ backgroundImage: "var(--ks-grad)" }}
                      >
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              {s.facts && (
                <ul className="mt-4 space-y-2.5 rounded-2xl border border-black/8 bg-ground p-6 text-[15px] leading-relaxed text-black/80">
                  {s.facts.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span
                        aria-hidden
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundImage: "var(--ks-grad)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {s.table && (
                <div className="mt-4 overflow-x-auto rounded-2xl border border-black/8">
                  <table className="w-full min-w-[560px] border-collapse text-right text-[15px]">
                    <caption className="sr-only">{s.table.caption}</caption>
                    <thead>
                      <tr className="bg-black text-white">
                        {s.table.headers.map((h) => (
                          <th key={h} scope="col" className="px-4 py-3 font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row) => (
                        <tr key={row[0]} className="even:bg-ground">
                          <th scope="row" className="px-4 py-3 font-semibold">
                            {row[0]}
                          </th>
                          {row.slice(1).map((cell) => (
                            <td key={cell} className="px-4 py-3 text-black/80">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold">שאלות נפוצות</h2>
            <dl className="mt-5 space-y-5">
              {article.faq.map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-black/8 p-5">
                  <dt className="font-bold">{q}</dt>
                  <dd className="mt-2 leading-relaxed text-black/75">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Author bio */}
          <section
            aria-label="על הכותב"
            className="mt-12 flex items-start gap-4 rounded-2xl border border-black/8 bg-ground p-6"
          >
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-black"
              style={{ backgroundImage: "var(--ks-grad)" }}
            >
              ש
            </span>
            <div>
              <p className="font-bold">{author.name}</p>
              <p className="text-sm font-semibold text-(--ks-teal-ink)">
                {author.role}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-black/70">
                {author.bio}
              </p>
            </div>
          </section>

          <p className="mt-8 text-sm leading-relaxed text-black/60">
            {disclaimer}
          </p>
        </article>

        {/* CTA band */}
        <section className="bg-black py-14 text-white">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              רוצים לדעת כמה זה שווה <GradientText>אצלכם?</GradientText>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              שיחת בדיקה ראשונה ללא עלות וללא התחייבות — עוברים על המספרים
              שלכם ומראים את האלטרנטיבות.
            </p>
            <Link
              href="/#contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-black shadow-lift transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: "var(--ks-grad)" }}
            >
              לתיאום שיחת בדיקה
            </Link>
          </div>
        </section>
      </main>
      <KeystoneFooter />
    </div>
  );
}
