import type { NextConfig } from "next";

// Static export so we can host on Cloudflare Pages (drop this if you need
// SSR / API routes — then switch to @cloudflare/next-on-pages instead).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
