import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import { abs, ogImage, organizationLd, site, websiteLd } from "./site";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const TITLE = "Keystone — פיננסים · פנסיוני · פרישה · ביטוח";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: TITLE,
  description: site.description,
  applicationName: site.name,
  robots: site.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: abs("/"),
    title: TITLE,
    description: site.description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: site.description,
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd()) }}
        />
      </body>
    </html>
  );
}
