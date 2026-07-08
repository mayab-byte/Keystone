import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/social";
import LeadForm from "../LeadForm";
import {
  brand,
  contact,
  GradientText,
  KeystoneFooter,
  KeystoneHeader,
} from "../shared";

export const metadata: Metadata = {
  title: "צור קשר — Keystone",
  description:
    "השאירו פרטים או פנו ישירות — שיחת היכרות ראשונה ללא עלות וללא התחייבות. Keystone · פיננסים, פנסיוני, פרישה וביטוח.",
  // Internal design preview for the client — keep out of search engines.
  robots: { index: false, follow: false },
};

export default function KeystoneContactPage() {
  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>
      <KeystoneHeader />
      <main id="main">
        <header className="bg-black py-14 text-white md:py-18">
          <div className="mx-auto max-w-3xl px-5">
            <p className="text-sm font-bold text-(--ks-green)">צור קשר</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              כמה מס אתם משלמים בלי לדעת?{" "}
              <GradientText>בואו נבדוק.</GradientText>
            </h1>
            <p className="mt-4 max-w-xl text-white/70">
              שיחת ההיכרות הראשונה היא עלינו — בלי עלות ובלי התחייבות. השאירו
              פרטים או פנו ישירות, ונחזור אליכם עוד היום.
            </p>
          </div>
        </header>

        <section className="mx-auto grid max-w-5xl items-start gap-12 px-5 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="text-xl font-bold">דרכי יצירת קשר</h2>
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-3 text-black/80 transition-colors hover:text-(--ks-teal-ink)"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15">
                  <Phone className="h-5 w-5" />
                </span>
                <span dir="ltr" className="font-semibold">
                  {contact.phone}
                </span>
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-black/80 transition-colors hover:text-(--ks-teal-ink)"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15">
                  <WhatsappIcon className="h-5 w-5" />
                </span>
                <span className="font-semibold">וואטסאפ ישיר</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-black/80 transition-colors hover:text-(--ks-teal-ink)"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="font-semibold">{contact.email}</span>
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-black/8 bg-ground p-7 shadow-soft md:p-8">
            <h2 className="text-xl font-bold">השאירו פרטים — נחזור עוד היום</h2>
            <div className="mt-5">
              <LeadForm whatsappNumber={contact.whatsappNumber} />
            </div>
          </div>
        </section>
      </main>
      <KeystoneFooter />
    </div>
  );
}
