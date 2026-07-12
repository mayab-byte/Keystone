"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { services } from "./services";

/* Header "שירותים" item: clicking the word toggles a dropdown of the service
   pages. Closes on outside-click, Escape, or choosing an item. */
export default function ServicesNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1 hover:text-(--ks-green)"
      >
        שירותים
        <ChevronDown
          aria-hidden
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute start-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-2 shadow-lift backdrop-blur"
        >
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              {s.title}
            </Link>
          ))}
          <Link
            href="/#services"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-xl border-t border-white/10 px-4 py-2.5 text-sm font-semibold text-(--ks-green) transition-colors hover:bg-white/10"
          >
            כל השירותים
          </Link>
        </div>
      )}
    </div>
  );
}
