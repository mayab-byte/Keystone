"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/social";

/* Lead form per the client's spec: full name, phone, email, privacy-policy
   consent and a submit button — all fields required and marked as such.
   Fields are fully opaque (no translucency) for AA readability. No backend
   yet — submit opens WhatsApp with a prefilled message; swap for a real
   endpoint + CRM at build stage (see docs/keystone-build-checklist.md). */

function RequiredMark() {
  return (
    <span className="font-bold text-(--ks-green)" aria-hidden>
      {" "}
      *
    </span>
  );
}

export default function LeadForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `היי, אני ${name.trim()} ואשמח לבדיקת מס ללא עלות.`,
      `טלפון לחזרה: ${phone.trim()}`,
      `אימייל: ${email.trim()}`,
      "אישרתי את מדיניות הפרטיות ואת קבלת הדיוור.",
    ];
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Opaque field styling — solid white background, dark text
  const fieldCls =
    "w-full rounded-xl border border-black/25 bg-white px-4 py-3 text-[#181822] placeholder:text-black/55 focus:border-(--ks-teal)";

  return (
    <form onSubmit={submit} className="space-y-4 text-right" noValidate={false}>
      <p className="text-sm text-white/80">
        כל השדות המסומנים ב-<span className="font-bold text-(--ks-green)">*</span>{" "}
        הם שדות חובה.
      </p>
      <div>
        <label htmlFor="lead-name" className="mb-1.5 block text-sm font-semibold text-white">
          שם מלא
          <RequiredMark />
          <span className="sr-only">(שדה חובה)</span>
        </label>
        <input
          id="lead-name"
          type="text"
          required
          aria-required="true"
          autoComplete="name"
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="שם פרטי ושם משפחה"
          className={fieldCls}
        />
      </div>
      <div>
        <label htmlFor="lead-phone" className="mb-1.5 block text-sm font-semibold text-white">
          טלפון
          <RequiredMark />
          <span className="sr-only">(שדה חובה)</span>
        </label>
        <input
          id="lead-phone"
          type="tel"
          required
          aria-required="true"
          autoComplete="tel"
          inputMode="tel"
          dir="ltr"
          minLength={9}
          maxLength={13}
          pattern="0\d{1,2}-?\d{7}"
          title="מספר טלפון ישראלי תקין, לדוגמה: 050-1234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="050-1234567"
          className={`${fieldCls} text-right`}
        />
        <p id="lead-phone-hint" className="mt-1.5 text-xs text-white/70">
          9 עד 10 ספרות, לדוגמה: 050-1234567
        </p>
      </div>
      <div>
        <label htmlFor="lead-email" className="mb-1.5 block text-sm font-semibold text-white">
          אימייל
          <RequiredMark />
          <span className="sr-only">(שדה חובה)</span>
        </label>
        <input
          id="lead-email"
          type="email"
          required
          aria-required="true"
          autoComplete="email"
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className={`${fieldCls} text-right`}
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="lead-consent"
          type="checkbox"
          required
          aria-required="true"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-black/25 accent-(--ks-teal)"
        />
        <label htmlFor="lead-consent" className="cursor-pointer text-sm leading-relaxed text-white/90">
          אני מאשר/ת קבלת דיוור בהתאם ל
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-(--ks-green) underline underline-offset-2"
          >
            מדיניות הגנת הפרטיות
          </a>
          <RequiredMark />
          <span className="sr-only">(שדה חובה)</span>
        </label>
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 font-bold text-black shadow-lift transition-transform hover:-translate-y-0.5"
        style={{ backgroundImage: "var(--ks-grad)" }}
      >
        <WhatsappIcon className="h-5 w-5" />
        שליחה
        <ArrowLeft aria-hidden className="h-4 w-4" />
      </button>
      <p className="text-center text-xs text-white/70">
        ההודעה נפתחת בוואטסאפ — בלי ספאם, בלי התחייבות.
      </p>
    </form>
  );
}
