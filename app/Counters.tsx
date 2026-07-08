"use client";

import { useEffect, useRef, useState } from "react";

export type CounterItem = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function CountUp({ value, prefix = "", suffix = "" }: Omit<CounterItem, "label">) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        if (reduceMotion) {
          setDisplay(value);
          return;
        }

        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setDisplay(Math.round(easeOutCubic(t) * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} dir="ltr">
      {prefix}
      {display.toLocaleString("he-IL")}
      {suffix}
    </span>
  );
}

export default function Counters({ items }: { items: CounterItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      {items.map(({ value, prefix, suffix, label }) => (
        <div key={label} className="text-center">
          <p className="text-5xl font-bold tabular-nums sm:text-6xl">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--ks-grad)" }}
            >
              <CountUp value={value} prefix={prefix} suffix={suffix} />
            </span>
          </p>
          <p className="mt-2 text-sm font-medium text-white/70">{label}</p>
        </div>
      ))}
    </div>
  );
}
