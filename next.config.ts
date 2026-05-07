import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Allow the embed page to be iframed from the main Kaykov site
        source: "/embed",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM http://localhost:8080",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' http://localhost:8080 https://kaykovmedia.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
