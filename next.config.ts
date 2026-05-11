import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mov)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
        publicPath: "/_next/",
      },
    })
    return config
  },
}

export default nextConfig
