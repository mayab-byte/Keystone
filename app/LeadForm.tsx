"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/* Lead form per the client's spec: full name, phone, email, privacy-policy
   consent and a submit button — all fields required and marked as such.
   Fields are fully opaque (no translucency) for AA readability.

   On submit the visitor lands on the /thank-you confirmation page. If a form
   endpoint is configured (NEXT_PUBLIC_FORM_ENDPOINT — e.g. a Formspree URL) the
   details are POSTed there first so the partners actually receive the lead;
   without it the form only shows the thank-you page (no delivery yet).
   WhatsApp is intentionally NOT wired here — it lives as its own contact link.

   `tone` adapts the label/helper colours to the surrounding background so
   text always clears AA contrast: "dark" for dark sections, "light" for
   light/cream sections. `layout="row"` spreads the fields across the width
   on desktop (used on the service pages). */

export default function LeadForm({
  tone = "dark",
  layout = "stack",
}: {
  /** Kept for backward compatibility with existing call sites; unused now. */
  whatsappNumber?: string;
  tone?: "dark" | "light";
  layout?: "stack" | "row";
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            consent,
          }),
        });
      } catch {
        /* Ignore network errors so the visitor still gets the confirmation. */
      }
    }
    router.push("/thank-you");
  };

  const dark = tone === "dark";
  // Colours chosen to clear AA contrast on each background.
  const labelCls = dark ? "text-white" : "text-[#181822]";
  const helpCls = dark ? "text-white/70" : "text-black/60";
  const noteCls = dark ? "text-white/70" : "text-black/55";
  const consentCls = dark ? "text-white/90" : "text-black/75";
  const linkCls = dark ? "text-(--ks-green)" : "text-(--ks-teal-ink)";
  const reqCls = dark ? "text-(--ks-green)" : "text-(--ks-teal-ink)";

  const Req = () => (
    <span className={`font-bold ${reqCls}`} aria-hidden>
      {" "}
      *
    </span>
  );

  const fieldCls =
    "w-full rounded-xl border border-black/25 bg-white px-4 py-3 text-[#181822] placeholder:text-black/55 focus:border-(--ks-teal)";

  const row = layout === "row";

  return (
    <form onSubmit={submit} className="text-right" noValidate={false}>
      <p className={`text-sm ${noteCls}`}>
        כל השדות המסומנים ב-<span className={`font-bold ${reqCls}`}>*</span>{" "}
        הם שדות חובה.
      </p>

      <div className={row ? "mt-4 grid gap-4 md:grid-cols-3" : "mt-4 space-y-4"}>
        <div>
          <label htmlFor="lead-name" className={`mb-1.5 block text-sm font-semibold ${labelCls}`}>
            שם מלא
            <Req />
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
          <label htmlFor="lead-phone" className={`mb-1.5 block text-sm font-semibold ${labelCls}`}>
            טלפון
            <Req />
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
          {!row && (
            <p className={`mt-1.5 text-xs ${helpCls}`}>
              9 עד 10 ספרות, לדוגמה: 050-1234567
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lead-email" className={`mb-1.5 block text-sm font-semibold ${labelCls}`}>
            אימייל
            <Req />
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
      </div>

      <div
        className={
          row
            ? "mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            : "mt-4 flex items-start gap-3"
        }
      >
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
          <label htmlFor="lead-consent" className={`cursor-pointer text-sm leading-relaxed ${consentCls}`}>
            אני מאשר/ת קבלת דיוור בהתאם ל
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold underline underline-offset-2 ${linkCls}`}
            >
              מדיניות הגנת הפרטיות
            </a>
            <Req />
            <span className="sr-only">(שדה חובה)</span>
          </label>
        </div>
        <button
          type="submit"
          className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-bold text-black shadow-lift transition-transform hover:-translate-y-0.5 ${
            row ? "w-full md:w-auto" : "w-full"
          }`}
          style={{ backgroundImage: "var(--ks-grad)" }}
        >
          שליחה
          <ArrowLeft aria-hidden className="h-4 w-4" />
        </button>
      </div>

      <p className={`mt-4 text-center text-xs ${noteCls}`}>
        לא שולחים ספאם. נחזור אליכם בהקדם.
      </p>
    </form>
  );
}
