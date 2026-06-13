// Deploy static export `out/` to Azure Storage Static Website + purge Cloudflare cache.
//
// Required env (set in CI):
//   AZURE_STORAGE_ACCOUNT     storage account name (e.g. weavejamtools)
//   AZURE_STORAGE_KEY         account key OR rely on Azure CLI / managed identity
//   CF_API_TOKEN              Cloudflare token with "Zone:Cache Purge"
//   CF_ZONE_ID                Cloudflare zone id for weavejam.com
//
// The storage account must already have static website hosting enabled and a
// custom-domain CNAME `tools` pointed at the storage web endpoint (or via CF).

import { BlobServiceClient, type BlockBlobUploadOptions } from "@azure/storage-blob";
import { lookup as mimeLookup } from "mime-types";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "out");
const ACCOUNT = required("AZURE_STORAGE_ACCOUNT");
const KEY = required("AZURE_STORAGE_KEY");
const CONTAINER = "$web";
const CONCURRENCY = Number(process.env.UPLOAD_CONCURRENCY ?? 16);

function required(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env: ${name}`);
    process.exit(1);
  }
  return v;
}

async function* walk(dir: string): AsyncGenerator<string> {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function cacheControlFor(rel: string): string {
  if (rel.startsWith("_next/static/")) return "public, max-age=31536000, immutable";
  if (/\.(css|js|woff2?|png|jpg|jpeg|svg|webp|ico)$/i.test(rel)) {
    return "public, max-age=86400";
  }
  return "public, max-age=300, must-revalidate"; // HTML
}

async function uploadAll() {
  const svc = BlobServiceClient.fromConnectionString(
    `DefaultEndpointsProtocol=https;AccountName=${ACCOUNT};AccountKey=${KEY};EndpointSuffix=core.windows.net`,
  );
  const container = svc.getContainerClient(CONTAINER);

  const files: string[] = [];
  for await (const f of walk(ROOT)) files.push(f);
  console.log(`Uploading ${files.length} files to ${ACCOUNT}/${CONTAINER}`);

  let i = 0;
  const t0 = Date.now();
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (i < files.length) {
        const idx = i++;
        const abs = files[idx];
        const rel = path.relative(ROOT, abs).replaceAll("\\", "/");
        const blob = container.getBlockBlobClient(rel);
        const body = await fs.readFile(abs);
        const opts: BlockBlobUploadOptions = {
          blobHTTPHeaders: {
            blobContentType: (mimeLookup(rel) || "application/octet-stream").toString(),
            blobCacheControl: cacheControlFor(rel),
          },
        };
        await blob.uploadData(body, opts);
        if ((idx + 1) % 200 === 0) console.log(`  ${idx + 1}/${files.length}`);
      }
    }),
  );
  console.log(`done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

async function purgeCloudflare() {
  const token = process.env.CF_API_TOKEN;
  const zone = process.env.CF_ZONE_ID;
  if (!token || !zone) {
    console.warn("CF_API_TOKEN/CF_ZONE_ID not set — skipping CF cache purge.");
    return;
  }
  const r = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ purge_everything: true }),
    },
  );
  if (!r.ok) {
    console.error("CF purge failed:", r.status, await r.text());
    process.exit(1);
  }
  console.log("Cloudflare cache purged.");
}

await uploadAll();
await purgeCloudflare();
