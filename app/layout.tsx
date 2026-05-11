import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kaykov Media - Custom Signs That Bring Your Brand to Life",
  description:
    "Professional custom signage solutions including 3D signs, LED displays, storefront signs, and outdoor banners. Free consultation within 3 hours. 3-year warranty included.",
  keywords: "custom signs, LED signs, 3D signs, storefront signs, vinyl banners, business signs, signage company",
  authors: [{ name: "Kaykov Media" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "https://signscompanynewyork.com",
    title: "Kaykov Media - Custom Signs That Bring Your Brand to Life",
    description:
      "Professional custom signage solutions with 3-year warranty. Free consultation within 3 hours. We design, create, and install signs that get you noticed.",
    images: [
      {
        url: "https://signscompanynewyork.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Custom Signage Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaykov Media - Custom Signs That Bring Your Brand to Life",
    description:
      "Professional custom signage solutions with 3-year warranty. Free consultation within 3 hours.",
    images: [
      {
        url: "https://signscompanynewyork.com/og-image.jpg",
        alt: "Professional Custom Signage Solutions",
      },
    ],
  },
  other: {
    "theme-color": "#DC2626",
  },
}

const structuredDataBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Kaykov Media",
  image: "https://signscompanynewyork.com/og-image.jpg",
  "@id": "https://signscompanynewyork.com",
  url: "https://signscompanynewyork.com",
  telephone: "+1-718-478-4200",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "77-40 164th St",
    addressLocality: "Fresh Meadows",
    addressRegion: "NY",
    postalCode: "11366",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.7231743,
    longitude: -73.8050998,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.instagram.com/kaykovmedia/",
    "https://www.facebook.com/kaykovmedia",
    "https://www.youtube.com/@kaykovmedia",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataBusiness) }}
        />
      </head>
      <body>
        {/* Google Ads / GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17829037355"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17829037355');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
