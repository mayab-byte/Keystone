"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Reveals elements marked `.reveal` as they scroll into view (adds
   `.is-visible`). Re-scans on every route change so client-side navigation
   between pages keeps working. Under prefers-reduced-motion everything is
   shown immediately. A <noscript> fallback (in the layout) shows content when
   JS is unavailable. */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"),
    );
    if (!els.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
