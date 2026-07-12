import { BASE, SectionHead } from "./shared";

/* "השותפים שלנו לדרך" — auto-scrolling strip of partner-institution logos.
   Add more logos to the array (5 at a time) as they arrive. */

const LOGOS = [
  { name: "אלטשולר שחם", src: "/logos/altshuler.jpg" },
  { name: "הפניקס", src: "/logos/phoenix.jpg" },
  { name: "מזרחי טפחות", src: "/logos/mizrahi.jpg" },
  { name: "קבוצת מגדל", src: "/logos/migdal.jpg" },
  { name: "אנליסט", src: "/logos/analyst.jpg" },
  { name: "הראל ביטוח ופיננסים", src: "/logos/harel.jpg" },
  { name: "מור בית השקעות", src: "/logos/more.jpg" },
  { name: "כלל", src: "/logos/clal.jpg" },
  { name: "מנורה מבטחים", src: "/logos/menora.jpg" },
  { name: "הכשרה חברה לביטוח", src: "/logos/hachshara.jpg" },
  { name: "מיטב בית השקעות", src: "/logos/meitav.jpg" },
];

export default function ClientLogos() {
  // Repeat the set enough times that a half-track (-50% loop point) is always
  // wider than the viewport — otherwise the strip appears to "start from the
  // middle" with empty gaps sweeping across. 4 copies → 2 copies per half.
  const items = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];
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
