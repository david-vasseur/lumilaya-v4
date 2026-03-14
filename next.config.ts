import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  cacheHandler: "filesystem",
};

export default nextConfig;
