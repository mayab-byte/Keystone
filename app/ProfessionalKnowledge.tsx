import { Coins, Wallet, Globe, ArrowRightLeft } from "lucide-react";
import { SectionHead } from "./shared";
import { brokerFees, bankFees, feeColumns, type FeeRow } from "./fees";

/* "ידע מקצועי" — the professional-knowledge block on the /blog page:
   a short explainer of the fee types investors overlook, followed by two
   comparison tables (trading platforms + banks). Data lives in ./fees.ts.
   Server component (no interactivity) — the tables scroll horizontally on
   narrow screens so the full six columns stay readable on mobile. */

const missed = [
  { Icon: Coins, label: "עמלת קנייה ומכירה בארץ" },
  { Icon: Wallet, label: "דמי משמרת / דמי ניהול" },
  { Icon: Globe, label: "עמלת קנייה ומכירה בחו\"ל" },
  { Icon: ArrowRightLeft, label: "המרת מט\"ח והוצאות צד ג'" },
];

const cols = ["entity", "domestic", "abroad", "minAbroad", "custody", "notes"] as const;

function FeeTable({ title, rows }: { title: string; rows: FeeRow[] }) {
  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold text-(--ks-green) sm:text-xl">{title}</h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-white/12 shadow-lift">
        <table className="w-full min-w-[860px] border-collapse text-right text-[13px] sm:text-sm">
          <thead>
            <tr className="bg-white/[0.09]">
              {cols.map((c) => (
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
            {rows.map((r, i) => (
              <tr key={r.entity} className={i % 2 ? "bg-white/[0.03]" : ""}>
                {cols.map((c) => (
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
      <p className="mt-2 text-xs text-white/45 md:hidden">
        אפשר לגלול את הטבלה הצידה לצפייה בכל העמודות ←
      </p>
    </div>
  );
}

export default function ProfessionalKnowledge() {
  return (
    <section
      id="knowledge"
      className="scroll-mt-16 text-white"
      style={{ backgroundColor: "#0b2b31" }}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <SectionHead
          eyebrow="ידע מקצועי"
          title="עמלות מסחר — מה שחשוב לבדוק לפני שפותחים חשבון"
          dark
        />

        {/* What investors miss */}
        <div className="mt-10 rounded-3xl border border-white/12 bg-white/5 p-7 md:p-10">
          <h3 className="text-2xl font-bold sm:text-3xl">מה המשקיעים מפספסים?</h3>
          <p className="mt-3 max-w-2xl text-white/75">
            עמלת קנייה/מכירה היא רק חלק מהסיפור. לפני שפותחים חשבון מסחר צריך
            לבדוק את התמונה המלאה:
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {missed.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/12"
                  style={{ backgroundColor: "rgba(126,217,87,0.10)" }}
                >
                  <Icon aria-hidden className="h-7 w-7 text-(--ks-green)" />
                </span>
                <p className="mt-3 text-sm font-semibold leading-snug text-white/90">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison tables */}
        <FeeTable title="בתי השקעות ופלטפורמות מסחר" rows={brokerFees} />
        <FeeTable title="בנקים" rows={bankFees} />

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-white/45">
          הנתונים מוצגים לצורך מידע כללי בלבד ואינם מהווים המלצה, ייעוץ או שיווק
          השקעות. עמלות משתנות מעת לעת, נבדלות בין מסלולים וערוצים, ועשויות
          להשתנות בהתאם למשא ומתן מול הגוף המנהל. יש לבדוק את התנאים המעודכנים
          מול כל גוף לפני קבלת החלטה.
        </p>
      </div>
    </section>
  );
}
