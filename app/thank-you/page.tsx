import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import {
  BASE,
  brand,
  GradientText,
  KeystoneFooter,
  KeystoneHeader,
} from "../shared";

export const metadata: Metadata = {
  title: "תודה · Keystone",
  description: "קיבלנו את הפרטים שלך.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div dir="rtl" lang="he" className="ks-scope bg-white text-black" style={brand}>
      <KeystoneHeader />
      <main id="main">
        <section className="bg-black text-white">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center md:py-28">
            {/* Both partners together */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/founders.webp`}
              alt="שלומי אחלופי ושלומי פרידמן, מייסדי Keystone"
              className="h-44 w-44 rounded-full object-cover object-top shadow-lift ring-4 ring-white/10 sm:h-52 sm:w-52"
            />
            <h1 className="mt-8 text-3xl font-bold sm:text-4xl">
              תודה רבה! <GradientText>קיבלנו את הפרטים שלך בהצלחה</GradientText>
            </h1>
            <p className="mt-4 max-w-xl text-white/70">
              ניצור איתך קשר בהקדם. בינתיים, אתם מוזמנים להמשיך לגלוש באתר.
            </p>
            <Link
              href="/"
              className="mt-9 inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold text-black shadow-lift transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: "var(--ks-grad)" }}
            >
              בחזרה לאתר
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <KeystoneFooter />
    </div>
  );
}
