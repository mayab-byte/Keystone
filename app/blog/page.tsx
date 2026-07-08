import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import {
  brand,
  GradientText,
  KeystoneFooter,
  KeystoneHeader,
} from "../shared";
import { articles } from "../articles";

export const metadata: Metadata = {
  title: "בלוג — Keystone · מדריכים על השקעות, מיסוי ותכנון פיננסי",
  description:
    "מדריכים קצרים וברורים על מיסוי השקעות, פוליסות חיסכון ותכנון פיננסי למשפחה — מאת שלומי אחלופי ושלומי פרידמן.",
  // Internal design preview for the client — keep out of search engines.
  robots: { index: false, follow: false },
};

const dateFmt = new Intl.DateTimeFormat("he-IL", { dateStyle: "long" });

export default function KeystoneBlogPage() {
  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>
      <KeystoneHeader />
      <main id="main">
        <section className="bg-black py-16 text-white md:py-20">
          <div className="mx-auto max-w-6xl px-5 text-center">
            <p className="text-sm font-bold text-(--ks-green)">הבלוג של Keystone</p>
            <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
              ידע ששווה <GradientText>כסף.</GradientText>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              תשובות ישירות לשאלות שמשקיעים באמת שואלים — מיסוי, פוליסות חיסכון
              ותכנון פיננסי למשפחה. בלי ז&apos;רגון, עם מספרים.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <ul className="grid gap-6 md:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-black/8 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                  <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-black/60">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays aria-hidden className="h-4 w-4" />
                      <time dateTime={a.datePublished}>
                        {dateFmt.format(new Date(a.datePublished))}
                      </time>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock aria-hidden className="h-4 w-4" />
                      {a.readingMinutes} דקות קריאה
                    </span>
                  </p>
                  <h2 className="mt-3 text-xl font-bold leading-snug">
                    <Link
                      href={`/blog/${a.slug}`}
                      className="hover:text-(--ks-teal-ink)"
                    >
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-black/70">
                    {a.excerpt}
                  </p>
                  <p className="mt-5">
                    <Link
                      href={`/blog/${a.slug}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-(--ks-teal-ink) underline-offset-4 hover:underline"
                    >
                      לקריאת המאמר
                      <ArrowLeft aria-hidden className="h-4 w-4" />
                    </Link>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <KeystoneFooter />
    </div>
  );
}
