import type React from "react"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Hair Transplant & Hair Restoration | Infinity Aesthetics Clinic",
    template: "%s | Infinity Aesthetics Clinic",
  },
  description:
    "Doctor-led hair loss diagnosis, personalised FUE hair transplant planning, advanced hair regrowth treatments, and long-term restoration care.",
  keywords: [
    "Infinity Aesthetics Clinic",
    "Dr Narendra Nikumbh",
    "hair transplant",
    "FUE hair transplant",
    "Sapphire FUE",
    "Bio FUE",
    "hair restoration",
    "hair loss treatment",
    "hair regrowth treatment",
    "receding hairline treatment",
    "hair thinning treatment",
    "natural hairline design",
    "donor area assessment",
    "hair transplant consultation",
    "dermatologist hair specialist",
  ],
  applicationName: "Infinity Aesthetics Clinic",
  authors: [{ name: "Infinity Aesthetics Clinic" }],
  creator: "Infinity Aesthetics Clinic",
  publisher: "Infinity Aesthetics Clinic",
  category: "Hair Restoration Clinic",
  generator: "Next.js",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Infinity Aesthetics Clinic",
    title: "Hair Transplant & Hair Restoration | Infinity Aesthetics Clinic",
    description:
      "Start with an accurate hair loss diagnosis and receive personalised, doctor-led guidance for hair preservation, regrowth, or FUE hair transplantation.",
    images: [
      {
        url: "https://res.cloudinary.com/muif2bou/image/upload/v1790064530/final-cta-consultation.png",
        width: 1792,
        height: 896,
        alt: "Doctor-led hair restoration consultation at Infinity Aesthetics Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Transplant & Hair Restoration | Infinity Aesthetics Clinic",
    description:
      "Personalised hair loss diagnosis, advanced FUE techniques, natural hairline planning, and long-term restoration care.",
    images: ["https://res.cloudinary.com/muif2bou/image/upload/v1790064530/final-cta-consultation.png"],
  },
  icons: {
    icon: [{ url: "https://res.cloudinary.com/muif2bou/image/upload/v1790070372/infinit-logo.png", type: "image/png" }],
    apple: [{ url: "https://res.cloudinary.com/muif2bou/image/upload/v1790070372/infinit-logo.png", type: "image/png" }],
    shortcut: "https://res.cloudinary.com/muif2bou/image/upload/v1790070372/infinit-logo.png",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${merriweather.variable} ${inter.variable} h-full antialiased`}>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NMJKBZM8');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="flex min-h-full flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NMJKBZM8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}