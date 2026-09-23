import Link from "next/link"

export default function ScanThankYouFooter() {
  return (
    <footer className="relative bg-[#171415] text-white">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#f52227] via-[#ef565a] to-[#231f20]" />
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 M/S INFINITY MEDISURGE &amp; AESTHETICS LLP. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/scan" className="text-white/60 hover:text-white">
            Scalp Scan
          </Link>
          <Link href="/privacy-policy" className="text-white/60 hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
