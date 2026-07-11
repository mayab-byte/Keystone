import { SectionHead } from "./shared";

/* "הלקוחות שלנו" — auto-scrolling strip of the institutions we work with.
   Placeholder wordmarks in grayscale; swap each <span> for a real logo <img>
   (grayscale, ~h-8) when the brand assets are available. */

const COMPANIES = [
  "כלל ביטוח",
  "מגדל",
  "הראל",
  "מנורה מבטחים",
  "הפניקס",
  "מיטב",
  "אלטשולר שחם",
  "ילין לפידות",
  "מור",
  "פסגות",
];

export default function ClientLogos() {
  const items = [...COMPANIES, ...COMPANIES];
  return (
    <section className="border-y border-black/5 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <SectionHead
          eyebrow="הלקוחות שלנו"
          title="מלווים אתכם מול הגופים המובילים בשוק"
        />
      </div>
      <div className="marquee mt-10" dir="rtl" aria-label="גופים מובילים שאיתם אנחנו עובדים">
        <div className="logos-track">
          {items.map((c, i) => (
            <span key={i} className="logo-chip" aria-hidden={i >= COMPANIES.length}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
