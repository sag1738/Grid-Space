import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during deployment
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during deployment
  },
};

export default nextConfig;
