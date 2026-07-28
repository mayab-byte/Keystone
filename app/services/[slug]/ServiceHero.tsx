"use client";

import { useEffect, useRef, useState } from "react";
import { BASE } from "../../shared";

/* Service hero: the service image reacts to the cursor by shifting in the
   OPPOSITE direction (a subtle counter-parallax). Disabled under
   prefers-reduced-motion, where the image stays static. */
export default function ServiceHero({
  image,
  title,
  tagline,
}: {
  image: string;
  title: string;
  tagline: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
    const dy = (e.clientY - r.top) / r.height - 0.5;
    const max = 30; // px of travel
    setOffset({ x: -dx * max * 2, y: -dy * max * 2 }); // opposite direction
  };

  return (
    <section
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="relative h-[44vh] min-h-[340px] overflow-hidden bg-[#061e13] md:h-[54vh]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}${image}`}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform: `scale(1.14) translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.25s ease-out",
          willChange: "transform",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(6,30,19,0.90) 0%, rgba(6,30,19,0.5) 45%, rgba(6,30,19,0.28) 100%)",
        }}
      />
      <div className="reveal-down relative mx-auto flex h-full max-w-5xl flex-col justify-end px-5 pb-10 text-white md:pb-12">
        <span
          aria-hidden
          className="h-1.5 w-14 rounded-full"
          style={{ backgroundImage: "var(--ks-grad)" }}
        />
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-white/90">{tagline}</p>
      </div>
    </section>
  );
}
