import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keystone — פיננסים · פנסיוני · פרישה · ביטוח",
  description:
    "Keystone — סוכנות 360 של שלומי אחלופי ושלומי פרידמן. תכנון השקעות חכם מס, פנסיוני, פרישה וביטוח בליווי אישי.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
