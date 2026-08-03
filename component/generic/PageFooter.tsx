import Link from "next/link"

export default function PageFooter() {
  return (
    <footer className="bg-[#171415] font-[family-name:var(--font-merriweather)] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-3 pt-3 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Infinity Aesthetics Clinic. All rights reserved.</p>
          <Link href="/generic/privacy-policy" className="text-white/60 hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/generic" className="text-white/60 hover:text-white">
            Home 
          </Link>
          <p>Hair restoration guidance should always begin with a qualified medical assessment.</p>
        </div>
      </div>
    </footer>
  )
}
