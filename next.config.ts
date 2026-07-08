import type { NextConfig } from "next";

// Static export for GitHub Pages. When hosting under a sub-directory
// (e.g. https://<user>.github.io/Keystone), set NEXT_PUBLIC_BASE_PATH=/Keystone
// at build time so routes and assets resolve correctly. Empty in local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
