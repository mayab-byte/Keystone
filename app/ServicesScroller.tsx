"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BASE } from "./shared";
import type { Service } from "./services";

/* Scroll-driven services gallery.
   Desktop: the section pins and each service fills the screen; scrolling the
   page down scrubs horizontally through the services, and once the last one is
   reached the page scroll continues naturally (native scroll — no wheel
   hijacking). Mobile / reduced-motion: a plain vertical stack, one card each. */
export default function ServicesScroller({ services }: { services: Service[] }) {
  const count = services.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Decide mode after mount (needs window). SSR renders the stack.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setPinned(wide.matches && !reduce.matches);
    decide();
    wide.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const sticky = track.parentElement as HTMLElement;
      const scrollable = wrap.offsetHeight - sticky.offsetHeight;
      const rect = wrap.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollable)));
      track.style.transform = `translateX(-${p * (count - 1) * 100}vw)`;
      setActive(Math.round(p * (count - 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pinned, count]);

  // ── Stack (mobile / reduced-motion) ──────────────────────────────────────
  if (!pinned) {
    return (
      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-6 px-5 pb-4">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group relative block min-h-[360px] overflow-hidden rounded-3xl text-white shadow-lift"
            aria-label={s.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}${s.image}`}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="svc-scrim" aria-hidden />
            <span className="svc-num">
              <span>{s.num}</span>
            </span>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/90">
                {s.short}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 font-bold">
                קראו עוד
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                  <ArrowLeft aria-hidden className="h-4 w-4" />
                </span>
              </span>
            </div>
            <span className="svc-accent" aria-hidden />
          </Link>
        ))}
      </div>
    );
  }

  // ── Pinned scroll-driven gallery (desktop) ───────────────────────────────
  return (
    <div ref={wrapRef} style={{ height: `${count * 85}vh` }} className="relative bg-[#061e13]">
      <div className="sticky top-16 h-[calc(100vh-4rem)] w-screen overflow-hidden bg-[#061e13]">
        <div ref={trackRef} dir="ltr" className="flex h-full will-change-transform">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              dir="rtl"
              aria-label={s.title}
              className="group flex h-full w-screen flex-none items-center justify-center px-[1vw]"
            >
              {/* 3:2 card — matches the images' native ratio, so the full photo
                  shows with no cropping, and the surrounding black gives clear
                  separation between one service and the next. */}
              <div className="relative aspect-[3/2] max-h-[90vh] w-[min(97vw,142vh)] flex-none items-end overflow-hidden rounded-[2rem] text-white shadow-2xl ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${BASE}${s.image}`}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,30,19,0.92) 0%, rgba(6,30,19,0.5) 45%, rgba(6,30,19,0.12) 100%)",
                  }}
                />
                <span className="svc-num" style={{ top: 24 }}>
                  <span>{s.num}</span>
                </span>
                <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-10">
                  <span
                    aria-hidden
                    className="block h-1.5 w-14 rounded-full"
                    style={{ backgroundImage: "var(--ks-grad)" }}
                  />
                  <h3 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
                    {s.short}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-3 text-lg font-bold">
                    קראו עוד
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-all group-hover:-translate-x-1 group-hover:[background-image:var(--ks-grad)] group-hover:text-black">
                      <ArrowLeft aria-hidden className="h-5 w-5" />
                    </span>
                  </span>
                </div>
                <span className="svc-accent" aria-hidden />
              </div>
            </Link>
          ))}
        </div>

        {/* Progress dots */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex justify-center gap-2.5"
        >
          {services.map((s, i) => (
            <span
              key={s.slug}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 28 : 8,
                background:
                  i === active
                    ? "var(--ks-grad)"
                    : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
