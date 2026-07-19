import type { Metadata } from "next";
import { brand, contact, KeystoneFooter, KeystoneHeader } from "../shared";

export const metadata: Metadata = {
  title: "מדיניות פרטיות · Keystone",
  description: "מדיניות הגנת הפרטיות של אתר Keystone.",
};

// Placeholder legal entity details — swap for the client's real ones
// (registered company name + ח.פ.) before launch.
const COMPANY = "Keystone סוכנות לביטוח (שם רשמי וח.פ. יושלמו)";
const LAST_UPDATED = "7 ביולי 2026";

const sections: { heading: string; paragraphs: string[]; list?: string[] }[] = [
  {
    heading: "1. כללי",
    paragraphs: [
      `מדיניות פרטיות זו מסבירה איזה מידע נאסף על ידי ${COMPANY} ("החברה", "אנחנו") במסגרת השימוש באתר זה, כיצד הוא נשמר ולאילו מטרות הוא משמש. השימוש באתר מהווה הסכמה למדיניות זו. המדיניות מנוסחת בלשון זכר מטעמי נוחות בלבד ופונה לכל המגדרים.`,
    ],
  },
  {
    heading: "2. איזה מידע אנחנו אוספים",
    paragraphs: [
      "אנחנו אוספים מידע שנמסר על ידכם באופן יזום בלבד, וכן מידע טכני בסיסי הנאסף אוטומטית:",
    ],
    list: [
      "פרטים שמסרתם בטופס יצירת הקשר: שם מלא, מספר טלפון וכתובת דואר אלקטרוני.",
      "תוכן הודעות שבחרתם לשלוח אלינו (לרבות בוואטסאפ).",
      "מידע טכני אנונימי על השימוש באתר (סוג דפדפן, עמודים שנצפו) לצורך תפעול ושיפור האתר.",
    ],
  },
  {
    heading: "3. למה משמש המידע",
    paragraphs: ["המידע שנמסר משמש למטרות הבאות בלבד:"],
    list: [
      "יצירת קשר חוזר ומענה לפנייתכם.",
      "משלוח דיוור מקצועי ושיווקי, רק אם נתתם לכך הסכמה מפורשת בטופס, ובכפוף לזכותכם להסיר את עצמכם בכל עת.",
      "תפעול, אבטחה ושיפור של האתר והשירות.",
    ],
  },
  {
    heading: "4. מסירת מידע לצדדים שלישיים",
    paragraphs: [
      "אנחנו לא מוכרים ולא משכירים את המידע האישי שלכם. מידע יימסר לצדדים שלישיים רק במקרים הבאים: לספקי שירות הפועלים מטעמנו לצורך תפעול האתר והדיוור (בכפוף להתחייבות לסודיות), כאשר קיימת חובה על פי דין, או במסגרת הליך משפטי המחייב זאת.",
    ],
  },
  {
    heading: "5. עוגיות (Cookies)",
    paragraphs: [
      "האתר עשוי לעשות שימוש בעוגיות ובטכנולוגיות דומות לצורך תפעולו התקין, שמירת העדפות ומדידת שימוש. ניתן לחסום או למחוק עוגיות דרך הגדרות הדפדפן; חסימה עלולה לפגוע בחוויית השימוש בחלק מהתכנים.",
    ],
  },
  {
    heading: "6. אבטחת מידע",
    paragraphs: [
      "אנחנו מיישמים אמצעי אבטחה מקובלים לשמירה על המידע, בהתאם להוראות חוק הגנת הפרטיות, התשמ\"א-1981 ותקנות הגנת הפרטיות (אבטחת מידע), התשע\"ז-2017. עם זאת, אין באפשרותנו להבטיח חסינות מוחלטת מפני חדירות בלתי מורשות.",
    ],
  },
  {
    heading: "7. זכויותיכם",
    paragraphs: [
      "על פי חוק הגנת הפרטיות, אתם זכאים לעיין במידע שנשמר עליכם, לבקש לתקנו או למחקו, ולבקש הסרה מרשימת הדיוור בכל עת. להפעלת זכויותיכם ניתן לפנות אלינו בפרטים שבסעיף 9, ואנחנו נטפל בפנייה בהקדם ובהתאם לדין.",
    ],
  },
  {
    heading: "8. דיוור שיווקי",
    paragraphs: [
      "משלוח דיוור שיווקי נעשה בהתאם לסעיף 30א לחוק התקשורת (בזק ושידורים), התשמ\"ב-1982, ורק לאחר קבלת הסכמה מפורשת. בכל הודעת דיוור תופיע אפשרות הסרה פשוטה ומיידית, וניתן גם לפנות אלינו ישירות לצורך הסרה.",
    ],
  },
  {
    heading: "9. יצירת קשר בנושא פרטיות",
    paragraphs: [
      `לכל שאלה או בקשה בנושא פרטיות ומידע אישי ניתן לפנות אלינו בדוא"ל ${contact.email} או בטלפון ${contact.phone}.`,
      `עדכון אחרון: ${LAST_UPDATED}. אנחנו רשאים לעדכן מדיניות זו מעת לעת; הנוסח המחייב הוא הנוסח המפורסם באתר במועד השימוש.`,
    ],
  },
];

export default function KeystonePrivacyPage() {
  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>
      <KeystoneHeader />
      <main id="main">
        <header className="bg-black py-14 text-white">
          <div className="reveal-down mx-auto max-w-3xl px-5">
            <h1 className="text-3xl font-bold sm:text-4xl">מדיניות פרטיות</h1>
            <p className="mt-3 text-white/70">עדכון אחרון: {LAST_UPDATED}</p>
          </div>
        </header>
        <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
          {sections.map((s) => (
            <section key={s.heading} className="mt-8 first:mt-0">
              <h2 className="text-xl font-bold">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-black/80">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-3 list-disc space-y-2 pr-6 leading-relaxed text-black/80 marker:text-(--ks-teal-ink)">
                  {s.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </main>
      <KeystoneFooter />
    </div>
  );
}
