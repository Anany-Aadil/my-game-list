import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://images.igdb.com/igdb/image/upload/**"),
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://media.rawg.io/media/games/**"),
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

export default nextConfig;
