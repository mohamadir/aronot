import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "aronot";

const nextConfig: NextConfig = {
  // Static export + base path only during `next build` (GitHub Pages)
  // In dev these are omitted so `next dev` works normally at localhost:3000
  ...(isProd && {
    output: "export",
    trailingSlash: true,
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
