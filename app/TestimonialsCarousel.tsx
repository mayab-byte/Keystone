"use client";

import { useEffect, useRef } from "react";
import { Quote, ChevronUp, ChevronDown } from "lucide-react";

/* Vertical testimonials carousel: gentle auto-scroll (top→bottom) the visitor
   can also drive manually — by scrolling/swiping inside the box or with the
   large up/down arrows. Any interaction (or hover) pauses the auto-motion for a
   few seconds, then it resumes. Three identical copies are rendered and the
   scroll position is kept in the middle copy (with wide margins), so scrolling
   wraps seamlessly in both directions and never hits a hard end. Auto-motion is
   off under prefers-reduced-motion; manual scroll and the arrows still work. */

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
    let raf = 0;
    let last = 0;
    let started = false;

    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      const unit = el.scrollHeight / 3; // one copy (three are rendered)
      if (unit > 0) {
        if (!started) {
          el.scrollTop = unit; // start in the middle copy
          started = true;
        }
        // keep the position within the middle copy, wrapping by a whole copy
        if (el.scrollTop > unit * 2.2) el.scrollTop -= unit;
        else if (el.scrollTop < unit * 0.8) el.scrollTop += unit;
      }
      const auto =
        !reduce && !hovering.current && ts >= pausedUntil.current;
      if (auto && last) el.scrollTop += (SPEED * (ts - last)) / 1000;
      last = ts;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const hold = () => {
    pausedUntil.current = performance.now() + 3000;
  };
  const nudge = (dir: 1 | -1) => {
    hold();
    ref.current?.scrollBy({ top: dir * 230, behavior: "smooth" });
  };

  const rows = [...items, ...items, ...items];

  return (
    <div className="mt-6">
      <div
        ref={ref}
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => (hovering.current = false)}
        onWheel={hold}
        onTouchStart={hold}
        onPointerDown={hold}
        className="vscroll h-[320px] overscroll-contain md:h-[380px]"
        aria-label="המלצות לקוחות — ניתן לגלול"
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

      {/* Big, clear manual controls — desktop and mobile */}
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="ההמלצה הקודמת"
          className="flex h-12 w-12 items-center justify-center rounded-full text-black shadow-lift transition-transform hover:-translate-y-0.5"
          style={{ backgroundImage: "var(--ks-grad)" }}
        >
          <ChevronUp className="h-6 w-6" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="ההמלצה הבאה"
          className="flex h-12 w-12 items-center justify-center rounded-full text-black shadow-lift transition-transform hover:-translate-y-0.5"
          style={{ backgroundImage: "var(--ks-grad)" }}
        >
          <ChevronDown className="h-6 w-6" strokeWidth={2.5} />
        </button>
        <span className="text-sm text-black/50">גלול בין ההמלצות</span>
      </div>
    </div>
  );
}
