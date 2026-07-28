import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  BadgePercent,
  Calculator,
  Handshake,
  Mail,
  Phone,
  Quote,
  Users,
} from "lucide-react";
import { WhatsappIcon } from "@/components/icons/social";
import Counters from "./Counters";
import ScrollHero from "./ScrollHero";
import ServicesScroller from "./ServicesScroller";
import LeadForm from "./LeadForm";
import Marquee from "./Marquee";
import ClientLogos from "./ClientLogos";
import FeesTeaser from "./FeesTeaser";
import { articles } from "./articles";
import { services } from "./services";
import { abs } from "./site";
import {
  BASE,
  brand,
  contact,
  partners,
  GradientText,
  KeystoneFooter,
  KeystoneHeader,
  SectionHead,
} from "./shared";

export const metadata: Metadata = {
  title: "Keystone · שלומי אחלופי ושלומי פרידמן · פיננסים · פנסיוני · פרישה · ביטוח",
  description:
    "Keystone · סוכנות 360 של שלומי אחלופי ושלומי פרידמן. תכנון השקעות חכם מס, פנסיוני, פרישה וביטוח בליווי אישי.",
  alternates: { canonical: abs("/") },
};

const reasons = [
  {
    Icon: Calculator,
    title: "שואלים קודם על המס",
    text: "כולם מציעים לכם 'השקעה טובה יותר'. אנחנו שואלים שאלה אחרת: כמה מס אתם משלמים על מה שיש לכם עכשיו?",
  },
  {
    Icon: BadgePercent,
    title: "מספרים, לא ז'רגון",
    text: "כל המלצה מגיעה עם חישוב קונקרטי: מה, למה, וכמה זה שווה לכם, בשקלים, לא בסיסמאות.",
  },
  {
    Icon: Users,
    title: "שתי מומחיות, תמונה אחת",
    text: "פיננסים וביטוח תחת קורת גג אחת. מסתכלים על התמונה המלאה, ואומרים לכם את האמת.",
  },
  {
    Icon: Handshake,
    title: "ליווי אישי לאורך שנים",
    text: "אתם מדברים איתנו, לא עם מוקד. הלקוחות שלנו נשארים, כי יש להם מי שמסתכל על הכסף שלהם כל השנה.",
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
      "הגעתי עם 1.1 מיליון שקל. היום התיק שלי עומד על 1.5 מיליון, ואני ישן בשקט.",
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
      "התיק שלי, 950 אלף שקל, עבר לפוליסות חיסכון. את החיסכון בעמלות ובמס הרגשתי כבר בשנה הראשונה.",
    name: "לקוחה מלווה",
    detail: "מעבר מתיק מיועץ בבנק",
  },
  {
    quote:
      "עברתי לא מעט סוכני ביטוח לאורך השנים, אבל מהרגע שהגעתי אליכם הבנתי שיש פה משהו אחר. קיבלתי יחס אישי, סבלנות והסברים בגובה העיניים, בלי לחץ ובלי לנסות למכור לי דברים שלא באמת הייתי צריך. עשיתם לי סדר בכל הביטוחים, מצאתם כיסויים כפולים, דאגתם שאהיה מוגן בצורה הנכונה וגם חסכתם לי כסף. הכי חשוב מבחינתי זה לדעת שיש לי למי לפנות ושיש מי שדואג לי גם אחרי שהפוליסה נסגרת. ממליץ מכל הלב לכל מי שמחפש אנשי מקצוע אמינים, שירותיים וזמינים. תודה על הליווי והאכפתיות.",
    name: "רון",
    detail: "ביקורת תיק ביטוח",
  },
  {
    quote:
      "עשיתם לי סדר בכל הביטוחים, מצאתם כיסויים כפולים, דאגתם שאהיה מוגן בצורה הנכונה וגם חסכתם לי כסף. הכי חשוב מבחינתי זה לדעת שיש לי למי לפנות ושיש מי שדואג לי גם אחרי שהפוליסה נסגרת. ממליץ מכל הלב לכל מי שמחפש אנשי מקצוע אמינים, שירותיים וזמינים. תודה על הליווי והאכפתיות.",
    name: "עופר",
    detail: "לקוח מלווה · ביטוח",
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
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 md:py-24"
      >
        <SectionHead eyebrow="קצת עלינו" title="שני שלומי. אסטרטגיה חזקה. דרך אחת." />
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-black/70">
          Keystone היא סוכנות 360 שהקמנו יחד, שלומי אחלופי בצד הפיננסי
          ושלומי פרידמן בצד הביטוחי. עם ניסיון מצטבר של 17 שנה ומאות משפחות
          שאנחנו מלווים, אנחנו מאמינים בדבר אחד פשוט: להסתכל על התמונה
          המלאה של הכסף שלכם, ולהגיד לכם את האמת, במספרים.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Right side (RTL): שלומי פרידמן — ביטוח */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/founder-fridman.jpg`}
            alt="שלומי פרידמן"
            className="h-80 w-full rounded-2xl object-cover object-top shadow-soft"
          />
          <article className="flex h-80 flex-col justify-center rounded-2xl border border-black/8 bg-white p-7 shadow-soft">
            <Quote aria-hidden className="h-6 w-6 -scale-x-100 text-(--ks-teal)" />
            <p className="mt-3 text-[15px] leading-relaxed text-black/75">
              התפקיד שלי הוא לוודא שאין לכם חורים בכיסוי, ושאתם לא משלמים
              כפול על שום דבר.
            </p>
            <div className="mt-5 border-t border-black/5 pt-4">
              <p className="text-xl font-bold md:text-base">שלומי פרידמן</p>
              <p className="text-sm font-semibold text-(--ks-teal-ink)">
                שותף מייסד · ביטוח
              </p>
            </div>
          </article>

          {/* Left side (RTL): שלומי אחלופי — פיננסים והשקעות */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${BASE}/founder-achlufi.jpg`}
            alt="שלומי אחלופי"
            className="h-80 w-full rounded-2xl object-cover object-top shadow-soft"
          />
          <article className="flex h-80 flex-col justify-center rounded-2xl border border-black/8 bg-white p-7 shadow-soft">
            <Quote aria-hidden className="h-6 w-6 -scale-x-100 text-(--ks-teal)" />
            <p className="mt-3 text-[15px] leading-relaxed text-black/75">
              אנחנו שואלים קודם כמה מס אתם משלמים על מה שיש לכם עכשיו, ואז
              בונים את התיק סביב התשובה.
            </p>
            <div className="mt-5 border-t border-black/5 pt-4">
              <p className="text-xl font-bold md:text-base">שלומי אחלופי</p>
              <p className="text-sm font-semibold text-(--ks-teal-ink)">
                שותף מייסד · פיננסים והשקעות
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────── */}
      <section id="services" className="scroll-mt-16 border-t border-black/5 bg-ground pt-20 md:pt-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            eyebrow="השירותים שלנו"
            title="ארבעה תחומים. תמונה אחת שלמה."
          />
          <p className="mt-4 text-center text-[15px] text-black/55">
            גללו למטה, כל שירות מופיע במלואו, ואז ממשיכים באתר
          </p>
        </div>
        <div className="mt-10">
          <ServicesScroller services={services} />
        </div>
      </section>

      {/* ── Why us ─────────────────────────────────────────────────────── */}
      <section className="bg-[#000000] py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead eyebrow="למה לבחור בנו" title="מה הבנק לא מספר לכם" dark />

          {/* The core example from the strategy brief */}
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
            <p className="text-lg leading-relaxed text-white/85">
              תיק של מיליון ₪ עשה 10%, <strong>100,000 ₪ רווח</strong>. הבנק
              המליץ &quot;לעבור לשוק הישראלי&quot;, ובדרך שילמתם 25% מס רווח
              הון: <strong className="text-(--ks-green)">25,000 ₪</strong>.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              בפוליסת חיסכון? אותו מעבר בדיוק בין מסלולים,{" "}
              <strong>בלי אירוע מס בדרך</strong>. זו לא תשואה טובה יותר. זה אותו
              כסף, שממשיך לעבוד בשבילכם.
            </p>
            <p className="mt-5 text-sm text-white/65">
              * בפוליסת חיסכון המס משולם במועד המשיכה, דחיית מס אפקטיבית במעבר
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
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#000000]/10"
        />
        <div className="mx-auto max-w-6xl px-5">
          <Counters items={stats} />
        </div>
      </section>

      {/* ── Testimonials — split: photo (right) + quotes (left) ────────── */}
      <section id="testimonials" className="overflow-hidden bg-ground">
        <div className="grid md:grid-cols-2">
          {/* Photo — right side in RTL (top on mobile) */}
          <div className="relative min-h-[300px] md:order-1 md:min-h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/testimonials-bg.jpg`}
              alt="משפחה נהנית יחד, לקוחות Keystone"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          {/* Quotes — left side in RTL */}
          <div className="px-6 py-16 md:order-2 md:px-12 md:py-20">
            <div className="reveal">
              <p className="text-sm font-bold text-(--ks-teal-ink)">המלצות</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                הלקוחות שלנו מספרים
              </h2>
            </div>
            <div className="mt-8 space-y-6">
              {testimonials.map(({ quote, name, detail }) => (
                <figure
                  key={name + detail}
                  className="border-t border-black/10 pt-6 first:border-t-0 first:pt-0"
                >
                  <Quote
                    aria-hidden
                    className="h-6 w-6 -scale-x-100 text-(--ks-teal)"
                  />
                  <blockquote className="mt-3 text-[15px] leading-relaxed text-black/80">
                    {quote}
                  </blockquote>
                  <figcaption className="mt-3">
                    <p className="font-bold">{name}</p>
                    <p className="text-sm text-black/60">{detail}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Clients / institutions ────────────────────────────────────── */}
      <ClientLogos />

      {/* ── Blog ───────────────────────────────────────────────────────── */}
      <section className="border-t border-black/5 bg-ground py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead eyebrow="הכתבות שלנו" title="ידע ששווה כסף" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {articles.map((a) => (
              <article
                key={a.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}${a.image}`}
                  alt=""
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-7">
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
                </div>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border-2 border-black px-7 py-3 font-semibold transition-colors hover:bg-[#000000] hover:text-white"
            >
              לכל המאמרים
              <ArrowLeft aria-hidden className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* ── Fees teaser → full table on the ידע מקצועי page ──────────────── */}
      <FeesTeaser />

      <Marquee />

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative scroll-mt-20 overflow-hidden bg-[#000000] py-20 text-white md:py-24"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1"
          style={{ backgroundImage: "var(--ks-grad)" }}
        />
        {/* Brand K watermark behind the form */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}/keystone-mark.png`}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-20 left-[-4rem] w-[38rem] max-w-[75%] opacity-[0.4]"
        />
        <div className="relative mx-auto grid max-w-5xl items-start gap-12 px-5 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              כמה מס אתם משלמים בלי לדעת?{" "}
              <GradientText>בואו נבדוק.</GradientText>
            </h2>
            <p className="mt-4 max-w-xl text-white/65">
              שיחת ההיכרות הראשונה היא עלינו, בלי עלות ובלי התחייבות. השאירו
              פרטים או פנו ישירות, ונחזור אליכם עוד היום.
            </p>
            <div className="mt-8 space-y-7">
              {partners.map((p) => (
                <div key={p.name}>
                  <p className="font-bold">{p.name}</p>
                  <p className="text-sm font-semibold text-(--ks-green)">{p.role}</p>
                  <div className="mt-3 space-y-2.5">
                    <a
                      href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}
                      className="flex items-center gap-3 text-white/80 transition-colors hover:text-(--ks-green)"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span dir="ltr" className="font-semibold">{p.phone}</span>
                    </a>
                    <a
                      href={p.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white/80 transition-colors hover:text-(--ks-green)"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                        <WhatsappIcon className="h-4 w-4" />
                      </span>
                      <span className="font-semibold">וואטסאפ ישיר</span>
                    </a>
                    <a
                      href={`mailto:${p.email}`}
                      className="flex items-center gap-3 text-white/80 transition-colors hover:text-(--ks-green)"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                        <Mail className="h-4 w-4" />
                      </span>
                      <span dir="ltr" className="font-semibold">{p.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8">
            <h3 className="text-xl font-bold">השאירו פרטים, נחזור עוד היום</h3>
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
