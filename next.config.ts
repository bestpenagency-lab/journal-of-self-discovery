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
  async headers() {
    return [
      {
        source: "/:file(.*\\.(?:mp4|jpg|jpeg|png|webp|avif|svg|woff2))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/journal-of-self-discovery.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Journal-of-Self-Discovery.pdf"',
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
