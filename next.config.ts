import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://i.pravatar.cc/300")],
  },
};

export default nextConfig;
