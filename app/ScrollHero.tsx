"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarCheck, ChevronDown } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/social";
import { BASE, contact, Dot, enSerif, GradientText } from "./shared";

/* Scroll-driven hero: the intro video is pre-split into webp frames
   (public/hero). The section pins for ~4 viewport heights;
   scrolling scrubs the frames on a canvas while the hero copy reveals in
   five stages. Under prefers-reduced-motion the section renders unpinned
   with a single frame and all copy visible. */

const FRAME_COUNT = 61;
const frameSrc = (i: number) =>
  `${BASE}/hero/frame-${String(i + 1).padStart(3, "0")}.webp`;

/* Each stage fades/rises in, holds, then fades out (except the last, which
   holds to the end). Windows are fractions of the pinned scroll progress. */
const STAGES = [
  // Stage 1 (welcome) starts fully visible at the top — no scroll needed.
  { in: [-0.06, 0.0], out: [0.16, 0.22] },
  { in: [0.2, 0.26], out: [0.34, 0.4] },
  { in: [0.38, 0.44], out: [0.52, 0.58] },
  { in: [0.56, 0.62], out: [0.7, 0.76] },
  { in: [0.74, 0.84], out: null },
] as const;

const ramp = (p: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));

function stageStyle(p: number, i: number): React.CSSProperties {
  const s = STAGES[i];
  const fadeIn = ramp(p, s.in[0], s.in[1]);
  const fadeOut = s.out ? 1 - ramp(p, s.out[0], s.out[1]) : 1;
  const opacity = Math.min(fadeIn, fadeOut);
  return {
    opacity,
    transform: `translateY(${(1 - fadeIn) * 28 - (1 - fadeOut) * 20}px)`,
    pointerEvents: opacity > 0.5 ? "auto" : "none",
  };
}

export default function ScrollHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const frameRef = useRef(-1);
  const [progress, setProgress] = useState(0.02);
  const [reducedMotion, setReducedMotion] = useState(false);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // cover-fit the frame into the canvas
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    frameRef.current = index;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // Synchronize once with the OS-level motion preference
      requestAnimationFrame(() => setReducedMotion(true));
      return;
    }

    // Preload all frames; redraw when the current one arrives
    imagesRef.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (i === frameRef.current || frameRef.current === -1) drawFrame(i);
      };
      return img;
    });

    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
      drawFrame(Math.round(p * (FRAME_COUNT - 1)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const sizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      drawFrame(Math.max(frameRef.current, 0));
    };

    sizeCanvas();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sizeCanvas);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sizeCanvas);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [drawFrame]);

  const p = reducedMotion ? 1 : progress;
  // With reduced motion, every stage renders fully visible, stacked
  const style = (i: number): React.CSSProperties =>
    reducedMotion ? {} : stageStyle(p, i);

  const stageCls =
    "absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 text-center" +
    " mx-auto max-w-3xl";

  return (
    <section
      id="top"
      ref={wrapRef}
      className={reducedMotion ? "relative" : "relative h-[500vh]"}
    >
      <div
        className={
          "overflow-hidden bg-[#061e13] text-white " +
          (reducedMotion
            ? "relative min-h-screen"
            : "sticky top-16 h-[calc(100vh-4rem)]")
        }
      >
        {/* Video frames — decorative backdrop */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameSrc(reducedMotion ? 40 : 0)}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        {!reducedMotion && (
          <canvas
            ref={canvasRef}
            aria-hidden
            className="absolute inset-0 h-full w-full"
          />
        )}
        {/* Legibility scrim */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[#061e13]/45"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(6,30,19,0.25) 0%, rgba(6,30,19,0.7) 100%)",
          }}
        />

        {/* Stage container — with reduced motion, stages stack in flow */}
        <div
          className={
            reducedMotion
              ? "relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-10 px-5 py-20 text-center"
              : "relative h-full"
          }
        >
          {/* 1 — welcome */}
          <div className={reducedMotion ? "" : stageCls} style={style(0)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE}/logo-full.png`}
              alt="Keystone"
              className="mx-auto h-36 w-auto drop-shadow-[0_4px_24px_rgba(6,30,19,0.45)] sm:h-48"
            />
            <p className="mt-5 text-white/80">
              פיננסים · פנסיוני · פרישה · ביטוח
            </p>
          </div>

          {/* 2 — quote */}
          <div className={reducedMotion ? "" : stageCls} style={style(1)}>
            <p
              dir="ltr"
              className="text-2xl italic leading-snug text-white sm:text-3xl"
              style={{ fontFamily: enSerif }}
            >
              “Price is what you pay.
              <br />
              Value is what you get.”
            </p>
            <p className="mt-3 text-sm text-white/75" dir="ltr">
              Warren Buffett
            </p>
          </div>

          {/* 3 — headline */}
          <div className={reducedMotion ? "" : stageCls} style={style(2)}>
            <h1 className="text-5xl font-bold leading-[1.12] sm:text-6xl md:text-7xl">
              אותה השקעה.
              <br />
              <GradientText>פחות מס.</GradientText>
            </h1>
          </div>

          {/* 4 — the promise */}
          <div className={reducedMotion ? "" : stageCls} style={style(3)}>
            <p className="mx-auto max-w-xl text-xl leading-relaxed text-white/90 sm:text-2xl">
              רוב המשקיעים בישראל משלמים כל שנה מס שהם לא חייבים לשלם, ואף
              אחד לא סיפר להם. אנחנו מראים לכם בדיוק כמה זה עולה לכם, ומה
              עושים עם זה.
            </p>
          </div>

          {/* 5 — CTA (holds to the end) */}
          <div className={reducedMotion ? "" : stageCls} style={style(4)}>
            <h2 className="text-3xl font-bold sm:text-4xl">
              בואו נבדוק <GradientText>כמה זה עולה לכם.</GradientText>
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-bold text-black shadow-lift transition-transform hover:-translate-y-0.5"
                style={{ backgroundImage: "var(--ks-grad)" }}
              >
                <CalendarCheck className="h-5 w-5" />
                לבדיקת המס שלכם, ללא עלות
              </a>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#061e13]/40 px-7 py-3.5 font-semibold text-white transition-colors hover:border-(--ks-green) hover:text-(--ks-green)"
              >
                <WhatsappIcon className="h-5 w-5" />
                דברו איתנו בוואטסאפ
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/85">
              <li className="flex items-center gap-2">
                <Dot /> 17 שנות ניסיון
              </li>
              <li className="flex items-center gap-2">
                <Dot /> ₪150M+ בניהול
              </li>
              <li className="flex items-center gap-2">
                <Dot /> 300+ לקוחות מלווים
              </li>
            </ul>
          </div>

          {/* Scroll hint — visible at the start only */}
          {!reducedMotion && (
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-sm text-white/75"
              style={{ opacity: Math.max(0, 1 - p * 8) }}
            >
              גללו למטה
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
