import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@schemavaults/ui", "@schemavaults/theme"],
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
