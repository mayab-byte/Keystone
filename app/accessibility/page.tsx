import type { Metadata } from "next";
import { brand, contact, KeystoneFooter, KeystoneHeader } from "../shared";

export const metadata: Metadata = {
  title: "הצהרת נגישות · Keystone",
  description: "הצהרת הנגישות של אתר Keystone לפי תקן ישראלי 5568 ברמה AA.",
};

const LAST_UPDATED = "7 ביולי 2026";

export default function KeystoneAccessibilityPage() {
  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>
      <KeystoneHeader />
      <main id="main">
        <header className="bg-black py-14 text-white">
          <div className="reveal-down mx-auto max-w-3xl px-5">
            <h1 className="text-3xl font-bold sm:text-4xl">הצהרת נגישות</h1>
            <p className="mt-3 text-white/70">עדכון אחרון: {LAST_UPDATED}</p>
          </div>
        </header>

        <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
          <section>
            <h2 className="text-xl font-bold">מחויבות לנגישות</h2>
            <p className="mt-3 leading-relaxed text-black/80">
              אנחנו ב-Keystone רואים חשיבות רבה במתן שירות שוויוני ונגיש לכלל
              הציבור, לרבות אנשים עם מוגבלות. אתר זה נבנה מתוך מטרה לעמוד
              בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות
              לשירות), התשע&quot;ג-2013, ובתקן הישראלי ת&quot;י 5568 המבוסס על הנחיות
              WCAG 2.0 ברמה AA.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold">התאמות הנגישות באתר</h2>
            <ul className="mt-3 list-disc space-y-2 pr-6 leading-relaxed text-black/80 marker:text-(--ks-teal-ink)">
              <li>ניגודיות צבעים העומדת ביחס הנדרש (AA) בין טקסט לרקע בכל רחבי האתר.</li>
              <li>ניווט מלא באמצעות מקלדת, כולל סימון פוקוס גלוי וקישור &quot;דילוג לתוכן הראשי&quot;.</li>
              <li>מבנה כותרות היררכי ותגיות סמנטיות התומכות בקוראי מסך.</li>
              <li>טקסט חלופי (alt) לתמונות בעלות משמעות, וסימון רכיבים דקורטיביים כמוסתרים מקוראי מסך.</li>
              <li>טפסים עם תוויות ברורות, סימון שדות חובה והנחיות שגיאה מובנות.</li>
              <li>תמיכה בהעדפת &quot;הפחתת תנועה&quot;, אנימציות מבוטלות עבור משתמשים שביקשו זאת במערכת ההפעלה.</li>
              <li>תצוגה רספונסיבית מלאה והתאמה להגדלת טקסט עד 200% ללא אובדן תוכן.</li>
              <li>אזורי לחיצה בגודל מספק במובייל (44 פיקסלים לפחות).</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold">חריגות ידועות</h2>
            <p className="mt-3 leading-relaxed text-black/80">
              אנחנו פועלים לכך שכלל רכיבי האתר יהיו נגישים. אם נתקלתם ברכיב
              שאינו נגיש או בקושי כלשהו בשימוש באתר, נשמח שתיידעו אותנו ונפעל
              לתקן את הנדרש בהקדם האפשרי.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold">רכז הנגישות</h2>
            <p className="mt-3 leading-relaxed text-black/80">
              {/* Placeholder — fill in the appointed accessibility
                  coordinator's real details before launch. */}
              לפניות בנושא נגישות ניתן לפנות לרכז הנגישות שלנו (שם רכז הנגישות
              יושלם): בטלפון {contact.phone} או בדוא&quot;ל {contact.email}.
              אנא ציינו בפנייה את העמוד ואת הבעיה שנתקלתם בה, ואנחנו נחזור
              אליכם בהקדם.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold">תוקף ההצהרה</h2>
            <p className="mt-3 leading-relaxed text-black/80">
              הצהרה זו עודכנה לאחרונה בתאריך {LAST_UPDATED}, והיא נבדקת
              ומתעדכנת באופן שוטף ולפחות אחת לשנה.
            </p>
          </section>
        </article>
      </main>
      <KeystoneFooter />
    </div>
  );
}
