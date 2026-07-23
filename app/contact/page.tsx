import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/social";
import LeadForm from "../LeadForm";
import {
  brand,
  contact,
  partners,
  GradientText,
  KeystoneFooter,
  KeystoneHeader,
} from "../shared";
import { abs } from "../site";

export const metadata: Metadata = {
  title: "צור קשר · Keystone",
  description:
    "השאירו פרטים או פנו ישירות, שיחת היכרות ראשונה ללא עלות וללא התחייבות. Keystone · פיננסים, פנסיוני, פרישה וביטוח.",
  alternates: { canonical: abs("/contact") },
};

export default function KeystoneContactPage() {
  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>
      <KeystoneHeader />
      <main id="main">
        <header className="bg-black py-14 text-white md:py-18">
          <div className="reveal-down mx-auto max-w-3xl px-5">
            <p className="text-sm font-bold text-(--ks-green)">צור קשר</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              כמה מס אתם משלמים בלי לדעת?{" "}
              <GradientText>בואו נבדוק.</GradientText>
            </h1>
            <p className="mt-4 max-w-xl text-white/70">
              שיחת ההיכרות הראשונה היא עלינו, בלי עלות ובלי התחייבות. השאירו
              פרטים או פנו ישירות, ונחזור אליכם עוד היום.
            </p>
          </div>
        </header>

        <section className="mx-auto grid max-w-5xl items-start gap-12 px-5 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="text-xl font-bold">דרכי יצירת קשר</h2>
            <div className="mt-6 space-y-7">
              {partners.map((p) => (
                <div key={p.name}>
                  <p className="font-bold">{p.name}</p>
                  <p className="text-sm font-semibold text-(--ks-teal-ink)">{p.role}</p>
                  <div className="mt-3 space-y-2.5">
                    <a
                      href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}
                      className="flex items-center gap-3 text-black/80 transition-colors hover:text-(--ks-teal-ink)"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span dir="ltr" className="font-semibold">{p.phone}</span>
                    </a>
                    <a
                      href={p.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-black/80 transition-colors hover:text-(--ks-teal-ink)"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15">
                        <WhatsappIcon className="h-4 w-4" />
                      </span>
                      <span className="font-semibold">וואטסאפ ישיר</span>
                    </a>
                    <a
                      href={`mailto:${p.email}`}
                      className="flex items-center gap-3 text-black/80 transition-colors hover:text-(--ks-teal-ink)"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15">
                        <Mail className="h-4 w-4" />
                      </span>
                      <span dir="ltr" className="font-semibold">{p.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-black/8 bg-ground p-7 shadow-soft md:p-8">
            <h2 className="text-xl font-bold">השאירו פרטים, נחזור עוד היום</h2>
            <div className="mt-5">
              <LeadForm whatsappNumber={contact.whatsappNumber} tone="light" />
            </div>
          </div>
        </section>
      </main>
      <KeystoneFooter />
    </div>
  );
}
