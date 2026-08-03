import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

if (process.env.GITHUB_PAGES === "true") {
  nextConfig.output = "export";
  nextConfig.basePath = "/mycogen-admin-ui";
  nextConfig.images = { unoptimized: true };
}

export default nextConfig;
