import { BASE, SectionHead } from "./shared";

/* "השותפים שלנו לדרך" — auto-scrolling strip of partner-institution logos.
   Add more logos to the array (5 at a time) as they arrive. */

const LOGOS = [
  { name: "אלטשולר שחם", src: "/logos/altshuler.jpg" },
  { name: "הפניקס", src: "/logos/phoenix.jpg" },
  { name: "מזרחי טפחות", src: "/logos/mizrahi.jpg" },
  { name: "קבוצת מגדל", src: "/logos/migdal.jpg" },
  { name: "אנליסט", src: "/logos/analyst.jpg" },
];

export default function ClientLogos() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <section className="border-y border-black/5 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <SectionHead
          eyebrow="השותפים שלנו לדרך"
          title="מלווים אתכם מול הגופים המובילים בשוק"
        />
      </div>
      <div
        className="marquee mt-10"
        dir="rtl"
        aria-label="גופים מובילים שאיתם אנחנו עובדים"
      >
        <div className="logos-track">
          {items.map((l, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              src={`${BASE}${l.src}`}
              alt={i < LOGOS.length ? l.name : ""}
              aria-hidden={i >= LOGOS.length}
              className="h-12 w-auto shrink-0 object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-14"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
