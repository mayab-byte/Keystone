# Keystone — אתר תדמית

אתר One-Page בעברית (RTL) לסוכנות הפיננסים והביטוח Keystone — שלומי אחלופי ושלומי פרידמן.
עוצב ופותח על ידי BMF Studio.

## מה יש כאן

- **עמוד בית** עם הירו נשלט-גלילה (פריימים של וידאו + חשיפת טקסט בחמישה שלבים), אודות, שירותים, למה לבחור בנו, מספרים רצים, המלצות, בלוג ויצירת קשר
- **בלוג** + שלושה מאמרים במבנה GSO (`/blog`)
- **מדיניות פרטיות** (`/privacy`) ו**הצהרת נגישות** (`/accessibility`)
- נגישות לפי תקן AA (ת"י 5568) — ניגודיות, מקלדת, skip-link, prefers-reduced-motion
- טופס לידים (שם, טלפון, אימייל, הסכמת דיוור) שנפתח לוואטסאפ — ללא backend בשלב זה

## הרצה

```bash
npm install
npm run dev
```

ואז לפתוח http://localhost:3000

## לפני עלייה לאוויר

ראו `docs/build-checklist.md` — החלפת פרטי קשר placeholder, הסרת noindex,
robots/sitemap/schema ל-GSO, backend לטופס, והשלמות נגישות.

## טכנולוגיות

Next.js (App Router) · Tailwind CSS v4 · TypeScript · פונטים: Assistant (עברית), Times New Roman MT (אנגלית)
