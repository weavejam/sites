// Concurrent scraper for tooldone.com English pages.
// Reads urls-en.txt, downloads each to html/{category}/{slug}.html.
// Skips files already present. Logs failures to failures.log.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URLS = path.join(__dirname, "urls-en.txt");
const OUT = path.join(__dirname, "html");
const FAIL_LOG = path.join(__dirname, "failures.log");
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 20);
const TIMEOUT_MS = 30_000;

fs.mkdirSync(OUT, { recursive: true });

const urls = fs.readFileSync(URLS, "utf8")
  .split(/\r?\n/)
  .map((s) => s.trim())
  .filter(Boolean);

function urlToPath(u) {
  const url = new URL(u);
  const parts = url.pathname.replace(/^\/+|\/+$/g, "").split("/");
  const dir = parts.length > 1 ? parts.slice(0, -1).join("/") : "_root";
  const file = (parts[parts.length - 1] || "index") + ".html";
  return path.join(OUT, dir, file);
}

async function fetchWithRetry(url, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const r = await fetch(url, {
        headers: { "user-agent": "Mozilla/5.0 (compatible; weavejam-scraper/1.0)" },
        signal: ctrl.signal,
      });
      clearTimeout(t);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.text();
    } catch (e) {
      clearTimeout(t);
      if (i === attempts - 1) throw e;
      await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
}

let done = 0, skipped = 0, failed = 0;
const failures = [];

async function worker(queue) {
  while (queue.length) {
    const url = queue.shift();
    if (!url) break;
    const out = urlToPath(url);
    if (fs.existsSync(out)) { skipped++; done++; continue; }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    try {
      const html = await fetchWithRetry(url);
      fs.writeFileSync(out, html, "utf8");
    } catch (e) {
      failed++;
      failures.push(`${url}\t${e.message}`);
    }
    done++;
    if (done % 50 === 0) {
      process.stdout.write(`progress ${done}/${urls.length} (skipped ${skipped}, failed ${failed})\n`);
    }
  }
}

const queue = urls.slice();
const total = urls.length;
console.log(`Scraping ${total} URLs with concurrency=${CONCURRENCY}`);
const t0 = Date.now();
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));
const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`done ${done}/${total} in ${elapsed}s (skipped ${skipped}, failed ${failed})`);
if (failures.length) fs.writeFileSync(FAIL_LOG, failures.join("\n"), "utf8");
