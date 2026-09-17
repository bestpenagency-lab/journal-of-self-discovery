import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mindshiftlabconsulting.com",
      },
    ],
  },
};

export default nextConfig;
