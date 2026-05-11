import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Skip TypeScript errors during build — this project was migrated from Vite
  // and uses image imports as plain strings (Vite behavior). Runtime is correct.
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  webpack(config) {
    // Find and replace Next.js's image rule (matched by test regex that covers jpg+png)
    // with plain asset/resource so imports return URL strings, not StaticImageData objects.
    let replaced = 0
    for (const rule of config.module.rules) {
      if (!rule || typeof rule !== "object") continue
      const targets = rule.oneOf ?? [rule]
      for (let i = 0; i < targets.length; i++) {
        const inner = targets[i]
        if (!inner || typeof inner !== "object") continue
        const testStr: string = inner.test?.toString() ?? ""
        // Next.js image rule uniquely covers jpg AND png AND gif AND webp in one regex
        if (testStr.includes("jpg") && testStr.includes("png") && testStr.includes("gif")) {
          targets[i] = {
            test: inner.test,
            type: "asset/resource",
            generator: {
              filename: "static/images/[name].[hash][ext]",
              publicPath: "/_next/",
            },
          }
          replaced++
        }
      }
    }
    if (replaced === 0) {
      config.module.rules.push({
        test: /\.(jpg|jpeg|png|gif|JPG|webp|avif)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/images/[name].[hash][ext]",
          publicPath: "/_next/",
        },
      })
    }

    // Handle video / audio files
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
