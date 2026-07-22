# Keystone project map & gotchas

Read this to locate a component quickly and to avoid the traps that have bitten
this project before. It complements SKILL.md — the loop lives there; the
specifics live here.

## Table of contents
- Stack & config
- Where things live (component map)
- The classic traps (READ before debugging)
- Brand tokens
- Animation / motion classes
- Extracting pasted images from the transcript
- Custom domain steps

## Stack & config
- Next.js 16 App Router, `output: "export"` → fully static site in `out/`.
- Tailwind CSS v4 (`@import "tailwindcss"` + `@theme` in `app/globals.css`).
- TypeScript. RTL Hebrew: `dir="rtl"`, font Assistant.
- `next.config` uses `NEXT_PUBLIC_BASE_PATH` → `basePath` = `/Keystone` on Pages.
- Deploy: `.github/workflows/deploy.yml` — builds with `NEXT_PUBLIC_BASE_PATH=/Keystone`,
  uploads `out/`, deploys to Pages. Triggers on push to the default branch only
  (the github-pages environment gates non-default branches).

## Where things live (component map)
Most UI is in `app/`:
- `app/page.tsx` — home page. Sections: hero (`<ScrollHero/>`), About
  (`#about`, founder photos + quote cards), Services (`#services`,
  `<ServicesScroller/>`), "why us", Testimonials (`#testimonials`), blog teaser,
  `<Marquee/>`, `<ClientLogos/>`, Contact (`#contact`, with K watermark + form).
- `app/ScrollHero.tsx` — scroll-driven multi-stage hero (welcome → quote →
  headline → promise → CTA). Uses `logo-full.png`.
- `app/ServicesScroller.tsx` — services gallery. Desktop: pinned, scroll scrubs
  horizontally; each service is a centred 3:2 card (images are 1152×768 = 3:2,
  so a 3:2 card shows them uncropped). Mobile: vertical stack. Do NOT change the
  scroll mechanism unless asked.
- `app/ClientLogos.tsx` — "השותפים שלנו לדרך" auto-scrolling partner-logo strip.
  Logos in `public/logos/*.jpg`. Marquee spacing is per-logo `mx-*` (not track
  `gap`) so the -50% loop seam is gap-free; items are duplicated 4× so a
  half-track always exceeds the viewport.
- `app/Marquee.tsx` — keyword marquee (serif words + gradient "K" separators).
- `app/Counters.tsx` — animated stat counters.
- `app/shared.tsx` — `KeystoneHeader`, `KeystoneFooter`, `Wordmark`,
  `GradientText`, `SectionHead`, `BASE`, `brand`; re-exports `contact` from
  `site.ts`. `ServicesNav.tsx` is the header services dropdown.
- `app/site.ts` — SEO config (`site.url`, `site.indexable`), JSON-LD builders,
  and `contact` details. Plain module (no React) so metadata routes can import it.
- `app/services.ts`, `app/articles.ts` — content data for service & blog pages.
- `app/about/`, `app/blog/`, `app/services/[slug]/`, `app/contact/`,
  `app/privacy/`, `app/accessibility/` — sub-pages.
- `app/globals.css` — theme tokens + all custom animation classes.
- `public/` — images: `logo-full.png`, `keystone-mark.png` (K watermark), `og.jpg`,
  `founder-achlufi.jpg`, `founder-fridman.jpg`, `founders.webp`,
  `services/*.jpg`, `logos/*.jpg`.

## The classic traps (READ before debugging)
1. **Assets 404 / wrong path.** `next/image` and raw `<img>` do NOT auto-prefix
   the basePath under static export. Always build asset URLs as
   `` `${BASE}/whatever.png` `` (BASE from `shared.tsx`). A missing image is
   almost always a missing `${BASE}`.
2. **Metadata routes fail to build.** `app/sitemap.ts` and `app/robots.ts` need
   `export const dynamic = "force-static"` under `output: "export"`. Do not let
   them import React components — keep shared data (like `contact`) in the plain
   `site.ts` module.
3. **PageTransition/scroll.** The route-enter animation is opacity-only on
   purpose — a transform on an ancestor breaks `position: sticky` (used by the
   pinned services scroller). Don't add transforms to page-level wrappers.
4. **Reveal vs hover.** `.reveal` scroll-in animation conflicts with
   hover-transform cards; apply reveal to non-hover containers only.
5. **RTL.** Order/margins mirror. "Forward" arrows point left. Test right-aligned
   text. Titles that pair the brand with a label use a middot separator
   ("אודות · Keystone"), and body copy uses commas — there are deliberately no
   em dashes (—) anywhere in the visible copy.
6. **Mobile.** Every change needs a mobile pass; the desktop pinned scroller
   becomes a vertical stack, the split testimonials stack, etc.

## Brand tokens (from globals.css)
- `--ks-teal #0097b2`, `--ks-teal-ink #007487` (darker teal for small text on
  white — keeps AA contrast), `--ks-green #7ed957`.
- `--ks-grad linear-gradient(120deg,#0097b2,#7ed957)` — the signature gradient.
- `--ks-ease cubic-bezier(0.2,0.7,0.2,1)`.

## Animation / motion classes (globals.css)
- `.reveal` — IntersectionObserver scroll reveal.
- `.reveal-down` — mount entrance.
- `.page-enter` — opacity-only route fade (`ksPageEnter`).
- `.marquee` / `.marquee-track` / `.logos-track` — infinite translateX 0→-50%
  loops with duplicated items; the logos strip uses per-item margins so the seam
  is gap-free. `prefers-reduced-motion` neutralises animations.
- `.svc-*` — services card scrim/number/accent.

## Extracting pasted images from the transcript
Images the user pastes are base64 in the session transcript JSONL, not files.
To save one as a real asset:
1. Find the transcript at
   `/root/.claude/projects/-home-user-Keystone/<session-id>.jsonl`.
2. Parse the JSONL, find the image content block(s) (`type: "image"`, with
   `source.data` base64), decode, and write to `public/<name>.<ext>`.
   A small Python script (`scratchpad/extract.py`) has been used for this —
   read the newest image blocks, `base64.b64decode`, write bytes.
3. Reference it in code as `` `${BASE}/<name>.<ext>` ``.
When the user says "you replaced the wrong file" / names a specific file
(e.g. "the file is called keystone"), match the exact filename she means.

## Custom domain steps (when asked)
1. Client buys the domain (any registrar; `.co.il` needs an Israeli registrar).
2. DNS at the registrar:
   - Apex `A` records → `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`.
   - `www` `CNAME` → `mayab-byte.github.io`.
3. GitHub → Settings → Pages → Custom domain → enter it → enable Enforce HTTPS.
4. Code change: the site currently assumes the `/Keystone` sub-path. On a real
   apex domain the site is at root, so **drop the basePath** (build without
   `NEXT_PUBLIC_BASE_PATH`, or set it empty) and add a `public/CNAME` file (or
   `out/CNAME`) containing the domain. Re-verify assets after removing basePath.
5. DNS propagation: minutes to ~48h. The domain always stays the client's.
