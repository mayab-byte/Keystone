import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionHead } from "./shared";
import { bankFees, feeColumns } from "./fees";

/* Home-page teaser for the bank-fees comparison. Shows only the first few rows
   of a few columns with a fade at the bottom, then a button through to the full
   table in the "ידע מקצועי" section on /blog. Intentionally NOT the full table. */

const PREVIEW_COLS = ["entity", "domestic", "abroad"] as const;
const PREVIEW_ROWS = bankFees.slice(0, 4);

export default function FeesTeaser() {
  return (
    <section className="text-white" style={{ backgroundColor: "#0b2b31" }}>
      <div className="mx-auto max-w-4xl px-5 py-20 md:py-24">
        <SectionHead
          eyebrow="ידע מקצועי"
          title="כמה באמת עולות לכם העמלות?"
          dark
        />
        <p className="mx-auto mt-4 max-w-2xl text-center text-white/70">
          ריכזנו במקום אחד את עמלות המסחר של הבנקים ובתי ההשקעות המובילים. הצצה:
        </p>

        {/* Preview: first rows of a few columns, faded at the bottom */}
        <div className="relative mt-10">
          <div className="overflow-hidden rounded-2xl border border-white/12 shadow-lift">
            <table className="w-full border-collapse text-right text-[13px] sm:text-sm">
              <thead>
                <tr className="bg-white/[0.09]">
                  {PREVIEW_COLS.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      className="border-b border-white/12 px-4 py-3.5 font-bold text-white"
                    >
                      {feeColumns[c]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PREVIEW_ROWS.map((r, i) => (
                  <tr key={r.entity} className={i % 2 ? "bg-white/[0.03]" : ""}>
                    {PREVIEW_COLS.map((c) => (
                      <td
                        key={c}
                        className={
                          "border-b border-white/8 px-4 py-3.5 align-top leading-relaxed " +
                          (c === "entity"
                            ? "font-bold text-(--ks-green) whitespace-nowrap"
                            : "text-white/80")
                        }
                      >
                        {r[c]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Fade hinting there's more */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-2xl"
            style={{
              background: "linear-gradient(to bottom, rgba(11,43,49,0) 0%, #0b2b31 92%)",
            }}
          />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog#knowledge"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-black shadow-lift transition-transform hover:-translate-y-0.5"
            style={{ backgroundImage: "var(--ks-grad)" }}
          >
            לצפייה בטבלה המלאה
            <ArrowLeft aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
