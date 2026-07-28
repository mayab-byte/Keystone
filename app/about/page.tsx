import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Handshake, ShieldCheck } from "lucide-react";
import {
  BASE,
  brand,
  KeystoneFooter,
  KeystoneHeader,
  SectionHead,
} from "../shared";
import { abs } from "../site";
import ClientLogos from "../ClientLogos";

export const metadata: Metadata = {
  title: "אודות · Keystone · שלומי אחלופי ושלומי פרידמן",
  description:
    "הסיפור של Keystone · סוכנות 360 של שלומי אחלופי ושלומי פרידמן. פיננסים, פנסיוני, פרישה וביטוח תחת קורת גג אחת, בליווי אישי ועם ניסיון מצטבר של 17 שנה.",
  alternates: { canonical: abs("/about") },
};

const principles = [
  {
    Icon: ShieldCheck,
    title: "שקיפות מלאה",
    text: "כל המלצה מגיעה עם חישוב, לא עם הבטחה. אתם תמיד יודעים מה, למה, וכמה זה שווה לכם, בשקלים ולא בסיסמאות.",
  },
  {
    Icon: Calculator,
    title: "מספרים, לא ז׳רגון",
    text: "אנחנו לא מוכרים תשואות מדומיינות. מציגים לכם את המצב האמיתי ואת האלטרנטיבות באופן ברור, ומשאירים לכם את ההחלטה.",
  },
  {
    Icon: Handshake,
    title: "ליווי אישי לאורך שנים",
    text: "אתם מדברים איתנו, לא עם מוקד. הלקוחות שלנו נשארים כי יש להם מי שמסתכל על הכסף שלהם כל השנה, לא רק בפגישה הראשונה.",
  },
];

const founders = [
  {
    name: "שלומי אחלופי",
    role: "שותף מייסד · פיננסים והשקעות",
    img: "/founder-achlufi.jpg",
    bio: "כלכלן בהשכלתו, תואר בכלכלה ובמנהל עסקים. בעל ניסיון בניהול השקעות בחברת ביטוח מובילה, שם ליווה תיקי השקעות של אלפי חוסכים, וכיום מנהל כ-150 מיליון ₪ עבור לקוחות Keystone. מאמין שכל שקל צריך לעבוד חכם, ושכל החלטה פיננסית מתחילה בשאלה אחת: כמה מס אני משלם על זה? הסגנון שלו, ישיר, מבוסס נתונים, בלי ז׳רגון.",
  },
  {
    name: "שלומי פרידמן",
    role: "שותף מייסד · ביטוח",
    img: "/founder-fridman.jpg",
    bio: "מומחה לתכנון תיקי ביטוח עם שנים של ניסיון בבריאות, חיים ואובדן כושר עבודה. ליווה מאות משפחות בבניית מעטפת ביטוחית מדויקת, בלי כפילויות שמנפחות את הפרמיה, ובלי חורים שמתגלים ברגע הכי לא נכון. מאמין שביטוח טוב הוא שקט נפשי, לא עוד הוצאה חודשית שאף אחד לא מבין למה הוא משלם עליה.",
  },
];

export default function KeystoneAboutPage() {
  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>
      <KeystoneHeader />
      <main id="main">
        <header className="bg-[#000000] py-14 text-white md:py-18">
          <div className="reveal-down mx-auto max-w-3xl px-5">
            <p className="text-sm font-bold text-(--ks-green)">קצת עלינו</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              שני שלומי. אסטרטגיה חזקה. דרך אחת.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              סוכנות 360 שמחברת בין העולם הפיננסי לעולם הביטוח, כדי שתראו את
              התמונה המלאה של הכסף שלכם במקום אחד.
            </p>
          </div>
        </header>

        {/* ── Our story ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-5 py-16 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr]">
            <figure>
              <div className="relative overflow-hidden rounded-3xl shadow-lift">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}/founders.webp`}
                  alt="שלומי אחלופי ושלומי פרידמן, מייסדי Keystone"
                  className="h-auto w-full"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1.5"
                  style={{ backgroundImage: "var(--ks-grad)" }}
                />
              </div>
            </figure>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">הסיפור שלנו</h2>
              <p className="mt-4 leading-relaxed text-black/70">
                Keystone נולדה מתוך תסכול פשוט: ראינו יותר מדי משפחות שמשלמות מס
                מיותר, מחזיקות בביטוחים כפולים, ומקבלות המלצות שמתאימות למי
                שממליץ, לא להן. שני שלומי, כל אחד מהתחום שלו, החליטו לעשות את זה
                אחרת.
              </p>
              <p className="mt-4 leading-relaxed text-black/70">
                אחרי שנים בתעשייה, אחד בעולם הפיננסי והשני בעולם הביטוח, הבנו
                שהערך האמיתי נמצא דווקא בחיבור בין השניים. לקוח לא צריך יועץ
                פיננסי וסוכן ביטוח שלא מדברים זה עם זה; הוא צריך תמונה אחת שלמה.
                זו בדיוק סוכנות 360 שבנינו, 17 שנות ניסיון מצטבר, ומאות משפחות
                שאנחנו מלווים לאורך זמן.
              </p>
            </div>
          </div>
        </section>

        {/* ── Principles ────────────────────────────────────────────────── */}
        <section className="border-y border-black/5 bg-ground py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <SectionHead
              eyebrow="העקרונות שלנו"
              title="מה שמנחה אותנו בכל החלטה"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {principles.map(({ Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-black/8 bg-white p-7 shadow-soft"
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

        {/* ── Founders ──────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-5 py-16 md:py-20">
          <SectionHead eyebrow="שני שלומי" title="מי עומד מאחורי Keystone" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {founders.map((f) => (
              <article
                key={f.name}
                className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#000000]/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${BASE}${f.img}`}
                    alt={f.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-bold">{f.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-(--ks-teal-ink)">
                    {f.role}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-black/65">
                    {f.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Clients / institutions ───────────────────────────────────── */}
        <ClientLogos />

        {/* ── Closing + CTA ─────────────────────────────────────────────── */}
        <section className="bg-[#000000] py-16 text-white md:py-20">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              הכל מתחבר, תחת קורת גג אחת
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/75">
              פיננסים וביטוח, ראייה אחת שלמה על התמונה שלכם. בואו נתחיל בשיחת
              היכרות ללא עלות, ונראה לכם בדיוק איפה אתם עומדים ומה אפשר לשפר.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-black shadow-lift transition-transform hover:-translate-y-0.5"
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
