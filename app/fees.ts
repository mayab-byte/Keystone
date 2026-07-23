/* Trading-fee comparison data for the "ידע מקצועי" section on /blog.
 *
 * IMPORTANT — verify before relying on these figures:
 * The numbers below were transcribed from a third-party comparison graphic and
 * are provided for illustration. Broker/bank fees change over time and vary by
 * track and channel. The licensed partners must review and update every value
 * here before it is presented to clients. Editing is intentionally trivial —
 * each row is one object; change a string and rebuild.
 *
 * Columns (RTL, right→left in the table): entity, domestic, abroad, minAbroad,
 * custody, notes.
 */

export type FeeRow = {
  /** גוף — broker / bank name */
  entity: string;
  /** קנייה/מכירה בארץ */
  domestic: string;
  /** קנייה/מכירה בחו"ל */
  abroad: string;
  /** מינימום חו"ל */
  minAbroad: string;
  /** דמי משמרת / ניהול */
  custody: string;
  /** המרת מט"ח / הערות */
  notes: string;
};

export const feeColumns = {
  entity: "גוף",
  domestic: "קנייה/מכירה בארץ",
  abroad: "קנייה/מכירה בחו\"ל",
  minAbroad: "מינימום חו\"ל",
  custody: "דמי משמרת / ניהול",
  notes: "המרת מט\"ח / הערות",
} as const;

/** בתי השקעות ופלטפורמות מסחר */
export const brokerFees: FeeRow[] = [
  {
    entity: "אלטשולר שחם Trade",
    domestic: "0.07%",
    abroad: "0.01$ למניה",
    minAbroad: "6$–7.5$",
    custody: "6.00% מהתמורה; 0.50% מהתמורה בקרנות פנסיה",
    notes: "מרווח ההמרה מגיע עד 0.7%",
  },
  {
    entity: "פסגות",
    domestic: "0.06% משווי העסקה",
    abroad: "0.1% משווי העסקה",
    minAbroad: "6$",
    custody: "0 ₪",
    notes: "1.5 אגורות לכל דולר / שקל",
  },
  {
    entity: "אקסלנס טרייד",
    domestic: "0.07%",
    abroad: "0.03$ למניה",
    minAbroad: "8$",
    custody: "כ-15 ₪ לחודש",
    notes: "בדרך כלל קבועה ועומדת על 2 אגורות",
  },
  {
    entity: "מיטב טרייד",
    domestic: "0.07%",
    abroad: "0.01$ למניה",
    minAbroad: "7.5$",
    custody: "0 ₪",
    notes: "לא נגבית עמלה",
  },
  {
    entity: "IBI",
    domestic: "0.08%",
    abroad: "ארה\"ב: 2 סנט למניה; 14$ סיף",
    minAbroad: "לרוב: 10$",
    custody: "—",
    notes: "המרה עד 15,000 ₪: 0.7%; מעל 15,000 ₪: 0.5%",
  },
  {
    entity: "Blink",
    domestic: "0.07% מסכום הפעולה",
    abroad: "10 פעולות / עד 1,000 מניות בחודש הראשון חינם, לאחר מכן 1 סנט למניה",
    minAbroad: "1.5$",
    custody: "0 ₪",
    notes: "0 ₪ עמלת המרה; מרווח 2 אג' בהמרה",
  },
  {
    entity: "ONE ZERO",
    domestic: "0.1% מסכום העסקה, מינימום 2$",
    abroad: "—",
    minAbroad: "—",
    custody: "תלוי במסלול",
    notes: "0 ₪ עמלת המרה באשראי ברכישות חו\"ל",
  },
];

/** עמלות בנקים */
export const bankFees: FeeRow[] = [
  {
    entity: "הבינלאומי",
    domestic: "0.1%–0.175%, מינימום 10 ₪ לעסקה",
    abroad: "0.30%",
    minAbroad: "18$",
    custody: "עד 0.1365% לרבעון (כ-0.546% בשנה)",
    notes: "3% מסכום העסקה",
  },
  {
    entity: "דיסקונט",
    domestic: "0.54%, בתוספת עמלת מינימום 35 ₪",
    abroad: "0.3% עד 0.5%",
    minAbroad: "23.5$ בערוץ ישיר / 25$",
    custody: "0.20%–0.25% מהתיק לרבעון",
    notes: "0.19%, עם עמלת מינימום כ-7.1$",
  },
  {
    entity: "בנק ירושלים",
    domestic: "0.50%",
    abroad: "1.00 סנט (0.01 דולר) למניה",
    minAbroad: "5$",
    custody: "0.1%–0.2% שנתי משווי התיק",
    notes: "1.2%; בחו\"ל בכרטיס אשראי 2.8%–3.0%",
  },
  {
    entity: "מרכנתיל",
    domestic: "0.12%–0.30% מסכום עסקה, מינימום 10 ₪",
    abroad: "0.35%, בנוסף לרוב עמלת סוכן 1.25 סנט",
    minAbroad: "3$–6$",
    custody: "בארץ 0.2% לרבעון; חו\"ל 0.25% לרבעון",
    notes: "0.38% (מינימום 13.6$, מקסימום 2,150$ לפעולה)",
  },
  {
    entity: "לאומי",
    domestic: "0.650%, מינימום 27 ₪",
    abroad: "0.90%",
    minAbroad: "25$",
    custody: "בארץ 0.15%; חו\"ל 0.20% לרבעון",
    notes: "0.2%–0.44% מסכום ההמרה (מינימום 7.20$ עד 14.40$)",
  },
  {
    entity: "מזרחי טפחות",
    domestic: "0.64% בסניף/פקיד; 0.23% בערוץ ישיר",
    abroad: "0.64%–0.89% משווי הפעולה",
    minAbroad: "50 ₪ או 75$ (הגבוה מביניהם)",
    custody: "0.18%–0.20% לרבעון (כ-0.6%–0.8% בשנה)",
    notes: "0.19% מסכום העסקה, עם עמלת מינימום",
  },
  {
    entity: "בנק יהב",
    domestic: "0.24%",
    abroad: "2.20%–2.50% מסכום העסקה",
    minAbroad: "20$–22$ לפעולה",
    custody: "0.14% לרבעון בארץ; 0.15% לרבעון לני\"ע זרים",
    notes: "0.175% מסכום העמלה בערוצים דיגיטליים, מינימום 6.75$",
  },
  {
    entity: "בנק הפועלים",
    domestic: "0.40% מסכום עסקה, מינימום 26 ₪ לפעולה",
    abroad: "0.4% עד 0.9% משווי עסקה",
    minAbroad: "20$–25$ לפעולה",
    custody: "בארץ 0.15%–0.25%; חו\"ל 0.5% לרבעון",
    notes: "0.17% (מינימום 5.70$, מקסימום 2,300$)",
  },
  {
    entity: "מסד",
    domestic: "0.30% עד 0.44%",
    abroad: "0.17%–0.62% מסך העסקה, לפי גודל תיק ההשקעות",
    minAbroad: "—",
    custody: "0.3%–0.6% משווי התיק",
    notes: "0.18%",
  },
];
