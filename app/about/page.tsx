import type { Metadata } from "next";
import Link from "next/link";
import {
  BASE,
  brand,
  KeystoneFooter,
  KeystoneHeader,
} from "../shared";
import { abs } from "../site";

export const metadata: Metadata = {
  title: "אודות — Keystone · שלומי אחלופי ושלומי פרידמן",
  description:
    "Keystone — סוכנות 360 של שלומי אחלופי ושלומי פרידמן. פיננסים, פנסיוני, פרישה וביטוח בליווי אישי, עם ניסיון מצטבר של 17 שנה.",
  alternates: { canonical: abs("/about") },
};

export default function KeystoneAboutPage() {
  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>
      <KeystoneHeader />
      <main id="main">
        <header className="bg-black py-14 text-white md:py-18">
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-sm font-bold text-(--ks-green)">קצת עלינו</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              שני שלומי. שתי מומחיות. דרך אחת.
            </h1>
          </div>
        </header>

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_1.05fr]">
            <figure>
              <div className="relative overflow-hidden rounded-3xl shadow-lift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}/founders.webp`}
                  alt="שלומי אחלופי ושלומי פרידמן — מייסדי Keystone"
                  className="h-auto w-full"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1.5"
                  style={{ backgroundImage: "var(--ks-grad)" }}
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-black/65">
                שלומי אחלופי ושלומי פרידמן — שתי מומחיות, תמונה אחת
              </figcaption>
            </figure>
            <p className="text-lg leading-relaxed text-black/70">
              Keystone היא סוכנות 360 שהקמנו יחד — שלומי אחלופי בצד הפיננסי
              ושלומי פרידמן בצד הביטוחי. עם ניסיון מצטבר של 17 שנה ומאות משפחות
              שאנחנו מלווים, אנחנו מאמינים בדבר אחד פשוט: להסתכל על התמונה
              המלאה של הכסף שלכם — ולהגיד לכם את האמת, במספרים.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            <article className="rounded-2xl border border-black/8 bg-white p-8 shadow-soft">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-black"
                style={{ backgroundImage: "var(--ks-grad)" }}
              >
                ש
              </span>
              <h2 className="mt-5 text-2xl font-bold">שלומי אחלופי</h2>
              <p className="mt-1 text-sm font-semibold text-(--ks-teal-ink)">
                שותף מייסד · פיננסים והשקעות
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-black/60">
                כלכלן בהשכלתו — תואר בכלכלה ומנהל עסקים. עשור בחטיבה לחיסכון ארוך
                טווח בכלל ביטוח, וכיום מנהל כ-150 מיליון ₪ עבור לקוחותיו. הסגנון:
                ישיר, מספרים קונקרטיים, בלי ז&apos;רגון.
              </p>
            </article>
            <article className="rounded-2xl border border-black/8 bg-white p-8 shadow-soft">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-black"
                style={{ backgroundImage: "var(--ks-grad)" }}
              >
                ש
              </span>
              <h2 className="mt-5 text-2xl font-bold">שלומי פרידמן</h2>
              <p className="mt-1 text-sm font-semibold text-(--ks-teal-ink)">
                שותף מייסד · ביטוח
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-black/60">
                מומחה לתכנון תיקי ביטוח — בריאות, חיים ואובדן כושר עבודה. דואג
                שהכיסוי שלכם יתאים בדיוק לחיים שלכם: בלי כפילויות מיותרות ובלי
                חורים שמתגלים ברגע הלא נכון.
              </p>
            </article>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-black shadow-lift transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: "var(--ks-grad)" }}
            >
              דברו איתנו
            </Link>
          </div>
        </section>
      </main>
      <KeystoneFooter />
    </div>
  );
}
