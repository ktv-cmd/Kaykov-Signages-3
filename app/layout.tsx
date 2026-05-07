import type { Metadata } from "next"
import "./globals.css"
import Providers from "./providers"

export const metadata: Metadata = {
  title: "Kaykov Media — Custom Signs That Bring Your Brand to Life",
  description:
    "Indoor & outdoor signs designed, built, and installed to elevate your brand. See your sign on your storefront before we even build it with our AI mockup generator.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
