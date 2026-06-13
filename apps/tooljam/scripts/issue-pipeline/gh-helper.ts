// gh CLI wrapper with automatic curl+token fallback when the gh binary
// hits transient TLS handshake timeouts (which happens regularly with the
// Windows-based gh build going through corporate networks).
//
// Use `ghExec(args)` for fire-and-forget operations (issue edit, comment
// add) and `ghJsonArray<T>(args)` / `ghJsonObject<T>(args)` when you need a
// parsed response.

import { execSync, spawnSync } from "node:child_process";

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 4000;

function isTlsFlake(stderr: string): boolean {
  return /TLS handshake timeout|i\/o timeout|connection reset|EOF/.test(stderr);
}

function getToken(): string {
  return execSync("gh auth token", { encoding: "utf8" }).trim();
}

function curlGet(urlPath: string): string {
  const token = getToken();
  const url = urlPath.startsWith("http")
    ? urlPath
    : `https://api.github.com${urlPath.startsWith("/") ? "" : "/"}${urlPath}`;
  const r = spawnSync(
    "curl.exe",
    [
      "-sSL",
      "-H", `Authorization: Bearer ${token}`,
      "-H", "Accept: application/vnd.github+json",
      "-H", "X-GitHub-Api-Version: 2022-11-28",
      url,
    ],
    { encoding: "utf8" },
  );
  if (r.status !== 0) throw new Error(`curl ${url} exited ${r.status}: ${r.stderr}`);
  return r.stdout;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Run `gh <args>` and return stdout. Retries on TLS-flake errors. */
export async function ghExec(args: string[], opts: { cwd?: string } = {}): Promise<string> {
  let lastErr: Error | null = null;
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    const r = spawnSync("gh", args, { encoding: "utf8", cwd: opts.cwd });
    if (r.status === 0) return r.stdout;
    const stderr = (r.stderr ?? "").toString();
    lastErr = new Error(`gh ${args.join(" ")} exited ${r.status}: ${stderr}`);
    if (!isTlsFlake(stderr) || i === MAX_ATTEMPTS) break;
    console.warn(`  gh TLS flake (attempt ${i}/${MAX_ATTEMPTS}); retrying in ${RETRY_DELAY_MS}ms`);
    await sleep(RETRY_DELAY_MS);
  }
  throw lastErr!;
}

/** GET a GitHub REST endpoint. Tries `gh api` first, falls back to curl+token on TLS flake. */
export async function ghApiGet<T = unknown>(apiPath: string): Promise<T> {
  let lastErr: Error | null = null;
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    const r = spawnSync("gh", ["api", apiPath], { encoding: "utf8" });
    if (r.status === 0) return JSON.parse(r.stdout) as T;
    const stderr = (r.stderr ?? "").toString();
    lastErr = new Error(`gh api ${apiPath} exited ${r.status}: ${stderr}`);
    if (isTlsFlake(stderr)) {
      console.warn(`  gh api TLS flake (attempt ${i}/${MAX_ATTEMPTS}); falling back to curl`);
      try { return JSON.parse(curlGet(`/repos/${apiPath.replace(/^\/?(repos\/)?/, "")}`)) as T; }
      catch (e) {
        if (i === MAX_ATTEMPTS) throw e;
        await sleep(RETRY_DELAY_MS);
        continue;
      }
    }
    break;
  }
  throw lastErr!;
}
