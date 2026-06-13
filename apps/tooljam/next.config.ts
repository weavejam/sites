import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Static export hosted on Azure Storage Static Website fronted by Cloudflare CDN.
  // 28k+ HTML files → exceeds Cloudflare Pages 20k file limit, so we host on Azure.
};

export default withNextIntl(nextConfig);
