---
name: keystone-site
description: >-
  Edit-verify-deploy loop for the Keystone financial-agency website — a Hebrew
  (RTL) Next.js static-export site that publishes to GitHub Pages. Use this
  whenever the user asks to change, fix, add, redesign, or tweak ANYTHING on the
  Keystone site (a section, text, image, color, animation, the services
  carousel, the logos strip, the hero, the footer, contact form, blog, etc.),
  or asks to "deploy", "push it live", "update the site", or check why a change
  isn't showing. The user works in Hebrew and expects Hebrew replies. This skill
  encodes the exact build → screenshot-verify (desktop AND mobile) → commit →
  push → poll-deploy → confirm-live loop that keeps https://mayab-byte.github.io/Keystone/
  correct on every change.
---

# Keystone site — edit, verify, and deploy

Keystone (כיסטון) is a one-page + sub-pages marketing site for a financial &
insurance advisory agency (partners שלומי אחלופי ושלומי פרידמן). It is a
Next.js 16 App Router project with **static export** (`output: "export"`),
Tailwind CSS v4, TypeScript, and full RTL Hebrew. It deploys to **GitHub Pages**
via GitHub Actions — there is no server, no Railway/Vercel.

- Repo on disk: `/home/user/Keystone`
- GitHub repo: `mayab-byte/Keystone`
- Live URL: `https://mayab-byte.github.io/Keystone/`
- Deploy: `.github/workflows/deploy.yml`, triggered by a push to the repo's
  **default branch** only.

## The golden rule: reply in Hebrew

The user communicates in Hebrew and is not a developer — she does not want
terminal jargon. Every reply to her is in **Hebrew**, warm and concise. State
what changed, that it was verified, and give the live URL. Do the technical
work silently; report the outcome plainly. Never claim something is live before
the deploy actually succeeds (see step 5).

## The core loop

Every request follows the same six steps. Do not skip verification or deploy
confirmation — the whole value here is that "done" means *actually live and
correct*, on desktop and mobile.

### 1. Make a focused edit

- Find the relevant file (most UI lives in `app/`). Read before editing.
- Make the smallest change that satisfies the request. When the user says
  "only this, don't touch anything else" (רק את זה, אל תיגע בשום דבר אחר) —
  honor it literally; change exactly the named thing.
- **Always adapt the change for mobile too.** The user repeatedly says
  "אל תשכח את גרסת המובייל". Desktop-only fixes are incomplete.
- Respect RTL: think right-to-left for order, mirroring, and which side text
  aligns to. Icons that imply direction (arrows) usually point *left* for
  "forward" in Hebrew.
- Keep AA contrast (light text needs a dark enough background).

Key project facts and gotchas are in `references/project-map.md` — read it when
you need to locate a component or you hit one of the classic traps
(basePath/assets, static-export metadata routes, animation classes, brand
tokens). Read it early on any non-trivial change.

### 2. Build

```bash
cd /home/user/Keystone && NEXT_PUBLIC_BASE_PATH=/Keystone npm run build
```

`NEXT_PUBLIC_BASE_PATH=/Keystone` is required — the site is hosted under the
`/Keystone/` sub-path on GitHub Pages, and this drives both Next's `basePath`
and the `BASE` prefix used for images. A build that succeeds prints the route
list; a failure prints the error — fix it before going further.

### 3. Screenshot-verify (desktop AND mobile)

Seeing the change is what catches the "looks right in code, wrong on screen"
bugs. Serve the built output and screenshot it:

```bash
bash /home/user/Keystone/.claude/skills/keystone-site/scripts/serve.sh
# then, for each spot you changed:
node /home/user/Keystone/.claude/skills/keystone-site/scripts/shot.mjs \
  --url "http://localhost:3400/Keystone/" \
  --out /tmp/shot-desktop.png --width 1440 --height 820 \
  --selector "#services"           # optional: scroll this into view first
node /home/user/Keystone/.claude/skills/keystone-site/scripts/shot.mjs \
  --url "http://localhost:3400/Keystone/" \
  --out /tmp/shot-mobile.png --width 390 --height 844 --mobile
```

Then `Read` the PNGs and confirm the change looks right at **both** sizes. If
it's off, go back to step 1 — don't deploy something you haven't seen.
`scripts/shot.mjs --help` lists all flags (page-bottom, full-page, wait, etc.).

### 4. Commit and push to the deploy branch

Deploy only happens from the repo's **default branch**, which is also the
working branch. Confirm it, then commit and push:

```bash
cd /home/user/Keystone
git add -A
git commit -m "<clear, descriptive message>"
git push -u origin "$(git branch --show-current)"
```

On network errors, retry with backoff (2s, 4s, 8s, 16s). Never push to a
different branch without permission. Do NOT put model names/IDs in commit
messages. Do NOT open a pull request unless the user asks.

### 5. Poll the deploy until it's live

A push kicks off the Actions workflow; it takes ~1 minute. Confirm real success
and that the *live* commit matches what you pushed — do not report "live" on
faith:

```bash
bash /home/user/Keystone/.claude/skills/keystone-site/scripts/poll-deploy.sh
```

It waits for the latest `deploy.yml` run to reach `completed / success`, then
prints the live commit sha from the deployments API. Verify that sha equals your
`git rev-parse --short HEAD`. If the run fails, read the failure and fix it
rather than reporting success.

### 6. Report in Hebrew

Tell her, in Hebrew: what you changed, that you verified it (desktop + mobile),
and the live URL `https://mayab-byte.github.io/Keystone/`. End with the live sha
only if useful. Keep it short and friendly.

## Working with images the user pastes

Images pasted into chat are **not files on disk** — they live in the session
transcript as base64. To use one as a real asset, extract it from the transcript
JSONL and save it into `public/`. See `references/project-map.md` for the
extraction recipe. Then reference it with the `BASE` prefix (next/image does not
auto-prefix the basePath — this is the single most common asset bug).

## Design changes: mock first when the change is large

For a big redesign (new layout, new component style), it's cheaper to build a
quick standalone HTML mock, screenshot it, and send it for approval **before**
wiring it into React and running a full deploy — the user explicitly likes this
option for large changes. For small tweaks, just go through the loop directly.

## Custom domain (when asked)

The site is under `/Keystone/` because GitHub Pages serves it from the repo
sub-path. Moving to a real domain means: client buys the domain, sets DNS
(A records to GitHub's IPs + a `www` CNAME to `mayab-byte.github.io`), adds the
domain in repo Settings → Pages, and then the code must drop the `/Keystone`
basePath and add a `CNAME` file. See `references/project-map.md` for specifics.
