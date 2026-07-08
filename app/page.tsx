import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLeft,
  BadgePercent,
  Calculator,
  ChartLine,
  Handshake,
  Mail,
  Phone,
  PiggyBank,
  Quote,
  ShieldCheck,
  Sunset,
  Users,
} from "lucide-react";
import { WhatsappIcon } from "@/components/icons/social";
import Counters from "./Counters";
import ScrollHero from "./ScrollHero";
import LeadForm from "./LeadForm";
import { articles } from "./articles";
import {
  BASE,
  brand,
  contact,
  GradientText,
  KeystoneFooter,
  KeystoneHeader,
  SectionHead,
} from "./shared";

export const metadata: Metadata = {
  title: "Keystone — שלומי אחלופי ושלומי פרידמן · פיננסים · פנסיוני · פרישה · ביטוח",
  description:
    "Keystone — סוכנות 360 של שלומי אחלופי ושלומי פרידמן. תכנון השקעות חכם מס, פנסיוני, פרישה וביטוח בליווי אישי.",
  // Internal design preview for the client — keep out of search engines.
  robots: { index: false, follow: false },
};

const services = [
  {
    Icon: ChartLine,
    title: "השקעות חכמות מס",
    text: "בניית תיק השקעות בפוליסות חיסכון ומוצרים מנוהלים — מעבר בין מסלולי השקעה בלי אירוע מס בדרך, כך שהרווח ממשיך לעבוד בשבילכם.",
  },
  {
    Icon: PiggyBank,
    title: "תכנון פנסיוני",
    text: "מיפוי וייעול החיסכון הפנסיוני: השוואת מסלולים ודמי ניהול, איחוד קופות והתאמת התיק לשלב שלכם בחיים.",
  },
  {
    Icon: ShieldCheck,
    title: "ביטוח",
    text: "התאמת תיק הביטוח בדיוק לצרכים — בריאות, חיים ואובדן כושר עבודה. בלי כפילויות, בלי חורים בכיסוי.",
  },
  {
    Icon: Sunset,
    title: "תכנון פרישה",
    text: "מיצוי זכויות והטבות מס, תכנון תזרים לפנסיה ומעבר רגוע ובטוח לפרק הבא של החיים.",
  },
];

const reasons = [
  {
    Icon: Calculator,
    title: "שואלים קודם על המס",
    text: "כולם מציעים לכם 'השקעה טובה יותר'. אנחנו שואלים שאלה אחרת: כמה מס אתם משלמים על מה שיש לכם עכשיו?",
  },
  {
    Icon: BadgePercent,
    title: "מספרים, לא ז'רגון",
    text: "כל המלצה מגיעה עם חישוב קונקרטי: מה, למה, וכמה זה שווה לכם — בשקלים, לא בסיסמאות.",
  },
  {
    Icon: Users,
    title: "שתי מומחיות, תמונה אחת",
    text: "פיננסים וביטוח תחת קורת גג אחת. מסתכלים על התמונה המלאה — ואומרים לכם את האמת.",
  },
  {
    Icon: Handshake,
    title: "ליווי אישי לאורך שנים",
    text: "אתם מדברים איתנו, לא עם מוקד. הלקוחות שלנו נשארים — כי יש להם מי שמסתכל על הכסף שלהם כל השנה.",
  },
];

const stats = [
  { value: 150, prefix: "₪", suffix: "M+", label: "נכסים בניהול" },
  { value: 300, suffix: "+", label: "לקוחות מלווים" },
  { value: 17, label: "שנות ניסיון מצטבר" },
  { value: 360, suffix: "°", label: "ראייה פיננסית אחת" },
];

const testimonials = [
  {
    quote:
      "הגעתי עם 1.1 מיליון שקל. היום התיק שלי עומד על 1.5 מיליון — ואני ישן בשקט.",
    name: "דוד",
    detail: "לקוח מלווה",
  },
  {
    quote:
      "התחלתי עם חצי מיליון. אחרי שלוש וחצי שנים התיק הגיע ל-1.2 מיליון, ומשכתי כ-200 אלף שקל לעזור לבן שלי לקנות דירה.",
    name: "לקוח מלווה",
    detail: "תכנון השקעות בין-דורי",
  },
  {
    quote:
      "התיק שלי — 950 אלף שקל — עבר לפוליסות חיסכון. את החיסכון בעמלות ובמס הרגשתי כבר בשנה הראשונה.",
    name: "לקוחה מלווה",
    detail: "מעבר מתיק מיועץ בבנק",
  },
];

export default function KeystonePage() {
  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>

      <KeystoneHeader />

      <main id="main">
      <ScrollHero />

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-24"
      >
        <SectionHead eyebrow="קצת עלינו" title="שני שלומי. שתי מומחיות. דרך אחת." />
        <div className="mx-auto mt-12 grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_1.05fr]">
          <figure>
            <div className="relative overflow-hidden rounded-3xl shadow-lift">
              <Image
                src={`${BASE}/founders.webp`}
                alt="שלומי אחלופי ושלומי פרידמן — מייסדי Keystone"
                width={2000}
                height={1418}
                sizes="(min-width: 768px) 30rem, 90vw"
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
            <h3 className="mt-5 text-2xl font-bold">שלומי אחלופי</h3>
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
            <h3 className="mt-5 text-2xl font-bold">שלומי פרידמן</h3>
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
      </section>

      {/* ── Services ───────────────────────────────────────────────────── */}
      <section
        id="services"
        className="scroll-mt-20 border-y border-black/5 bg-ground py-20 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            eyebrow="השירותים שלנו"
            title="ארבעה תחומים. תמונה אחת שלמה."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ Icon, title, text }) => (
              <article
                key={title}
                className="group rounded-2xl border border-black/8 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-white"
                  style={{ backgroundImage: "var(--ks-grad)" }}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-black/60">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ─────────────────────────────────────────────────────── */}
      <section className="bg-black py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead eyebrow="למה לבחור בנו" title="מה הבנק לא מספר לכם" dark />

          {/* The core example from the strategy brief */}
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="text-lg leading-relaxed text-white/85">
              תיק של מיליון ₪ עשה 10% — <strong>100,000 ₪ רווח</strong>. הבנק
              המליץ &quot;לעבור לשוק הישראלי&quot;, ובדרך שילמתם 25% מס רווח
              הון: <strong className="text-(--ks-green)">25,000 ₪</strong>.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              בפוליסת חיסכון? אותו מעבר בדיוק בין מסלולים —{" "}
              <strong>בלי אירוע מס בדרך</strong>. זו לא תשואה טובה יותר. זה אותו
              כסף, שממשיך לעבוד בשבילכם.
            </p>
            <p className="mt-5 text-sm text-white/65">
              * בפוליסת חיסכון המס משולם במועד המשיכה — דחיית מס אפקטיבית במעבר
              בין מסלולים, לא פטור ממס.
            </p>
            {/* Mid-page CTA — right after the core value argument */}
            <div className="mt-7 border-t border-white/10 pt-6 text-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-black shadow-lift transition-transform hover:-translate-y-0.5"
                style={{ backgroundImage: "var(--ks-grad)" }}
              >
                <Calculator className="h-5 w-5" />
                כמה זה עולה לכם? בואו נחשב יחד
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ Icon, title, text }) => (
              <div key={title}>
                <Icon className="h-7 w-7 text-(--ks-green)" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Numbers ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black py-16 text-white md:py-20">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10"
        />
        <div className="mx-auto max-w-6xl px-5">
          <Counters items={stats} />
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <SectionHead eyebrow="המלצות" title="הלקוחות שלנו מספרים" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map(({ quote, name, detail }) => (
            <figure
              key={name + detail}
              className="flex flex-col rounded-2xl border border-black/8 bg-white p-7 shadow-soft"
            >
              <Quote
                aria-hidden
                className="h-7 w-7 -scale-x-100 text-(--ks-teal)"
              />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-black/75">
                {quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-black/5 pt-4">
                <p className="font-bold">{name}</p>
                <p className="text-sm text-black/65">{detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Blog ───────────────────────────────────────────────────────── */}
      <section className="border-t border-black/5 bg-ground py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead eyebrow="הבלוג שלנו" title="ידע ששווה כסף" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {articles.map((a) => (
              <article
                key={a.slug}
                className="flex flex-col rounded-2xl border border-black/8 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <p className="text-sm text-black/60">
                  <time dateTime={a.datePublished}>
                    {new Intl.DateTimeFormat("he-IL", { dateStyle: "long" }).format(
                      new Date(a.datePublished),
                    )}
                  </time>
                  {" · "}
                  {a.readingMinutes} דקות קריאה
                </p>
                <h3 className="mt-3 text-lg font-bold leading-snug">
                  <Link
                    href={`/blog/${a.slug}`}
                    className="hover:text-(--ks-teal-ink)"
                  >
                    {a.title}
                  </Link>
                </h3>
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
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border-2 border-black px-7 py-3 font-semibold transition-colors hover:bg-black hover:text-white"
            >
              לכל המאמרים בבלוג
              <ArrowLeft aria-hidden className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative scroll-mt-20 overflow-hidden bg-black py-20 text-white md:py-24"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1"
          style={{ backgroundImage: "var(--ks-grad)" }}
        />
        <div className="relative mx-auto grid max-w-5xl items-start gap-12 px-5 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              כמה מס אתם משלמים בלי לדעת?{" "}
              <GradientText>בואו נבדוק.</GradientText>
            </h2>
            <p className="mt-4 max-w-xl text-white/65">
              שיחת ההיכרות הראשונה היא עלינו — בלי עלות ובלי התחייבות. השאירו
              פרטים או פנו ישירות, ונחזור אליכם עוד היום.
            </p>
            <div className="mt-8 space-y-3">
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-(--ks-green)"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20">
                  <Phone className="h-5 w-5" />
                </span>
                <span dir="ltr" className="font-semibold">
                  {contact.phone}
                </span>
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-(--ks-green)"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20">
                  <WhatsappIcon className="h-5 w-5" />
                </span>
                <span className="font-semibold">וואטסאפ ישיר</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-white/80 transition-colors hover:text-(--ks-green)"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="font-semibold">{contact.email}</span>
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8">
            <h3 className="text-xl font-bold">השאירו פרטים — נחזור עוד היום</h3>
            <div className="mt-5">
              <LeadForm whatsappNumber={contact.whatsappNumber} />
            </div>
          </div>
        </div>
      </section>

      </main>

      <KeystoneFooter />
    </div>
  );
}
