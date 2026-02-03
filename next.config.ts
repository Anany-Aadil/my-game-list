import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://images.igdb.com/igdb/image/upload/**")],
  },
};

module.exports = nextConfig;

export default nextConfig;
