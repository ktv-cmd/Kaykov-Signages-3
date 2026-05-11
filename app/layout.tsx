import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kaykov Media — Custom Signage NYC",
  description: "Professional storefront signs, channel letters, awnings and more.",
  icons: { icon: "/favicon.ico" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
