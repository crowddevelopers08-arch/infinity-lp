import type { Metadata } from "next"
import Script from "next/script"
import ScanThankYouContent from "@/component/scan/thank-you/ScanThankYouContent"
import ScanThankYouFooter from "@/component/scan/thank-you/ScanThankYouFooter"
import ScanThankYouHeader from "@/component/scan/thank-you/ScanThankYouHeader"

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your scalp assessment request has been received by Infinity Aesthetics Clinic.",
  robots: { index: false, follow: false },
}

export default function ScanThankYouPage() {
  return (
    <>
      {/* Google Ads Conversion Tracking — same conversion action as the main thank-you page.
          Only GTM is loaded site-wide (no global gtag), so use the standard gtag shim that queues into dataLayer. */}
      <Script id="google-ads-conversion">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
          window.gtag('event', 'conversion', {'send_to': 'AW-18361909357/RqLsCP6HouQcEO2A0rNE'});
        `}
      </Script>

      <main className="flex min-h-screen flex-col bg-[#fffafa] font-[family-name:var(--font-merriweather)] text-[#231f20]">
        <ScanThankYouHeader />
        <div className="flex-1">
          <ScanThankYouContent />
        </div>
        <ScanThankYouFooter />
      </main>
    </>
  )
}
