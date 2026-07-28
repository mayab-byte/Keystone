"use client";

import { useEffect, useRef } from "react";
import { Quote, ChevronUp, ChevronDown } from "lucide-react";

/* Vertical testimonials carousel: gentle auto-scroll (top→bottom) that the
   visitor can also drive manually — by scrolling/swiping inside the box or with
   the up/down arrows. Any manual interaction (or hover) pauses the auto-motion
   briefly, then it resumes. The list holds two identical copies so the scroll
   wraps seamlessly in both directions. Auto-motion is disabled under
   prefers-reduced-motion; manual scrolling and the arrows still work. */

type Testimonial = { quote: string; name: string; detail: string };

export default function TestimonialsCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const pausedUntil = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPEED = 26; // px / second
    el.scrollTop = 1; // avoid the initial wrap-up firing on 0
    let raf = 0;
    let last = 0;

    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      const half = el.scrollHeight / 2;
      if (half > 0) {
        // seamless wrap in both directions (both halves are identical)
        if (el.scrollTop >= half) el.scrollTop -= half;
        else if (el.scrollTop <= 0) el.scrollTop += half;
      }
      const auto = !reduce && !hovering.current && ts >= pausedUntil.current;
      if (auto && last) el.scrollTop += (SPEED * (ts - last)) / 1000;
      last = ts;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const holdAuto = () => {
    pausedUntil.current = performance.now() + 2500;
  };
  const nudge = (dir: 1 | -1) => {
    holdAuto();
    ref.current?.scrollBy({ top: dir * 200, behavior: "smooth" });
  };

  const rows = [...items, ...items];

  return (
    <div className="mt-6">
      <div
        ref={ref}
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => (hovering.current = false)}
        onWheel={holdAuto}
        onTouchStart={holdAuto}
        onPointerDown={holdAuto}
        className="vscroll h-[340px] md:h-[400px] overscroll-contain"
        aria-label="המלצות לקוחות"
        tabIndex={0}
      >
        {rows.map((t, i) => (
          <figure
            key={i}
            aria-hidden={i >= items.length}
            className="border-t border-black/10 pb-6 pt-6"
          >
            <Quote aria-hidden className="h-6 w-6 -scale-x-100 text-(--ks-teal)" />
            <blockquote className="mt-3 text-[15px] leading-relaxed text-black/80">
              {t.quote}
            </blockquote>
            <figcaption className="mt-3">
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-black/60">{t.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Manual controls — desktop and mobile */}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="המלצה קודמת"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors hover:border-(--ks-teal) hover:text-(--ks-teal-ink)"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="המלצה הבאה"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black/70 transition-colors hover:border-(--ks-teal) hover:text-(--ks-teal-ink)"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
