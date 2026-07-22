#!/usr/bin/env node
// Screenshot helper for verifying Keystone changes with the pre-installed
// Playwright/Chromium in this environment. Import path and browser location are
// environment-specific (see below) — this wrapper hides those details so every
// verification step is a one-liner.
//
// Usage:
//   node shot.mjs --url <url> --out <file.png> [options]
// Options:
//   --width N         viewport width  (default 1440)
//   --height N        viewport height (default 820)
//   --mobile          emulate a mobile device (touch, isMobile)
//   --selector CSS    scroll this element into view before shooting
//   --bottom          scroll to the bottom of the page first
//   --full            capture the full scrollable page
//   --wait MS         extra wait after load (default 700; animations/marquees)
//   --help
//
// Notes:
// - Chromium ships under /opt/pw-browsers; do NOT run `playwright install`.
// - Playwright is CommonJS here, so import the default and destructure:
//     import pw from '.../playwright/index.js'; const { chromium } = pw;

const args = process.argv.slice(2);
function flag(name) { return args.includes(`--${name}`); }
function opt(name, def) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
}

if (flag("help") || !opt("url", "") || !opt("out", "")) {
  console.log("Usage: node shot.mjs --url <url> --out <file.png> [--width N] [--height N] [--mobile] [--selector CSS] [--bottom] [--full] [--wait MS]");
  process.exit(flag("help") ? 0 : 1);
}

const url = opt("url");
const out = opt("out");
const width = parseInt(opt("width", "1440"), 10);
const height = parseInt(opt("height", "820"), 10);
const mobile = flag("mobile");
const selector = opt("selector", "");
const bottom = flag("bottom");
const full = flag("full");
const wait = parseInt(opt("wait", "700"), 10);

const CHROME = process.env.PW_CHROME
  || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const PW = process.env.PW_MODULE
  || "/opt/node22/lib/node_modules/playwright/index.js";

const pw = (await import(PW)).default;
const { chromium } = pw;

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({
  viewport: { width, height },
  ...(mobile ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
});
await page.goto(url, { waitUntil: "networkidle" });

if (selector) {
  const y = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    return el.getBoundingClientRect().top + window.scrollY;
  }, selector);
  if (y !== null) await page.evaluate((yy) => window.scrollTo(0, yy - 40), y);
} else if (bottom) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

await page.waitForTimeout(wait);
await page.screenshot({ path: out, fullPage: full });
await browser.close();
console.log(`saved ${out} (${mobile ? "mobile " : ""}${width}x${height})`);
