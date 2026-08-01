import type React from "react"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import "./globals.css"

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
        url: "/final-cta-consultation.png",
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
    images: ["/final-cta-consultation.png"],
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${merriweather.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
