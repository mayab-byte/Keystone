import Link from "next/link";
import type { CSSProperties } from "react";
import { Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/social";
import { contact } from "./site";
import ServicesNav from "./ServicesNav";

/* Keystone brand palette (from the client's brand book):
   gray #d9d9d9 · black #000000 · purple #5e17eb · teal #0097b2 ·
   green #7ed957 · signature gradient teal→green.
   --ks-teal-ink is a darkened teal for small text on white — the brand teal
   only reaches ~4:1 contrast, below the AA 4.5:1 floor for body-size text. */
export const brand = {
  "--ks-teal": "#0097b2",
  "--ks-teal-ink": "#007487",
  "--ks-green": "#7ed957",
  "--ks-purple": "#5e17eb",
  "--ks-gray": "#d9d9d9",
  "--ks-grad": "linear-gradient(120deg, #0097b2 0%, #7ed957 100%)",
} as CSSProperties;

/* Typography per the client's request:
   Hebrew — Assistant (loaded app-wide as --font-assistant);
   English — Times New Roman MT with system fallbacks. */
export const enSerif =
  '"Times New Roman MT", "Times New Roman MT Std", "Times New Roman", Times, serif';

// Contact details live in ./site (plain data) so metadata routes can use them.
export { contact };

// Base path for hosting under a sub-directory (e.g. GitHub Pages "/Keystone").
// Empty in local dev; set via NEXT_PUBLIC_BASE_PATH at build time.
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{ backgroundImage: "var(--ks-grad)" }}
    >
      {children}
    </span>
  );
}

export function Wordmark({ className = "h-10" }: { className?: string }) {
  return (
    // Full brand logo (symbol + wordmark + tagline, white text on dark).
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${BASE}/logo-full.png`} alt="Keystone" className={`w-auto ${className}`} />
  );
}

export function SectionHead({
  eyebrow,
  title,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="reveal text-center">
      <p
        className="text-sm font-bold"
        style={{ color: dark ? "var(--ks-green)" : "var(--ks-teal-ink)" }}
      >
        {eyebrow}
      </p>
      <h2 className={`mt-2 text-3xl font-bold sm:text-4xl ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
    </div>
  );
}

export function Dot() {
  return (
    <span
      aria-hidden
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ backgroundImage: "var(--ks-grad)" }}
    />
  );
}

export function KeystoneHeader() {
  return (
    <>
      {/* Focus indicator that clears 3:1 against both the white and black
          sections of the page (the app-global indigo fails on black). */}
      <style>{`
        .ks-scope :where(a, button, input, select, textarea, [tabindex]):focus-visible {
          outline: 2px solid var(--ks-teal);
          outline-offset: 2px;
        }
      `}</style>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:right-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-black focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
      >
        דילוג לתוכן הראשי
      </a>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black text-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" aria-label="Keystone · לעמוד הבית">
            <Wordmark className="h-11" />
          </Link>
          <nav
            aria-label="ניווט ראשי"
            className="hidden items-center gap-7 text-sm font-medium md:flex"
          >
            <Link href="/about" className="hover:text-(--ks-green)">
              אודות
            </Link>
            <ServicesNav />
            <Link href="/blog" className="hover:text-(--ks-green)">
              ידע מקצועי
            </Link>
            <Link href="/contact" className="hover:text-(--ks-green)">
              צור קשר
            </Link>
          </nav>
          <Link
            href="/contact"
            className="rounded-full px-5 py-2.5 text-sm font-bold text-black shadow-soft transition-transform hover:-translate-y-0.5"
            style={{ backgroundImage: "var(--ks-grad)" }}
          >
            לתיאום שיחה
          </Link>
        </div>
      </header>
    </>
  );
}

export function KeystoneFooter() {
  return (
    <>
      <footer className="border-t border-white/10 bg-black pb-10 pt-8 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center">
          <Wordmark className="h-20" />
          <nav aria-label="קישורי ניווט" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/about" className="text-white/75 underline-offset-4 hover:text-white hover:underline">
              אודות
            </Link>
            <Link href="/contact" className="text-white/75 underline-offset-4 hover:text-white hover:underline">
              צור קשר
            </Link>
            <Link href="/blog" className="text-white/75 underline-offset-4 hover:text-white hover:underline">
              ידע מקצועי
            </Link>
            <Link href="/privacy" className="text-white/75 underline-offset-4 hover:text-white hover:underline">
              מדיניות פרטיות
            </Link>
            <Link href="/accessibility" className="text-white/75 underline-offset-4 hover:text-white hover:underline">
              הצהרת נגישות
            </Link>
          </nav>
          <p className="max-w-2xl text-xs leading-relaxed text-white/65">
            האמור באתר אינו מהווה ייעוץ ו/או שיווק פנסיוני, ייעוץ מס, המלצה או
            חוות דעת, ואינו מחליף התאמה אישית לצרכי הלקוח.
            <br />
            הטבות המס המתוארות הינן דחיית מס בהתאם להוראות הדין, ואינן פטור ממס.
          </p>
          <p className="text-xs text-white/65">
            © Keystone · עוצב ופותח על ידי BMF Studio
          </p>
        </div>
        {/* Spacer so the sticky mobile bar never covers footer content */}
        <div aria-hidden className="h-20 md:hidden" />
      </footer>

      {/* Sticky mobile CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur md:hidden">
        <div className="flex gap-3">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full py-3 font-bold text-black"
            style={{ backgroundImage: "var(--ks-grad)" }}
          >
            <WhatsappIcon className="h-5 w-5" />
            וואטסאפ
          </a>
          <a
            href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/30 py-3 font-semibold text-white"
          >
            <Phone className="h-5 w-5" />
            התקשרו
          </a>
        </div>
      </div>
    </>
  );
}
