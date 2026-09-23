"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { track } from "../track"
import { IMAGES, PHONE_DISPLAY, PHONE_TEL, SCAN_NAV } from "./scanData"

const ANNOUNCEMENTS = ["Expert Guidance", "Personalized Recommendations", "Advanced Hair Restoration Options"]
const ANNOUNCEMENTS_SET = Array.from({ length: 4 }, () => ANNOUNCEMENTS).flat()

export default function ScanHeader() {
  const [active, setActive] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const sections = SCAN_NAV.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="relative z-50 border-b border-[#eadfe0] bg-[#fff5f5] px-3 pb-2 sm:px-5">
      <div className="relative -mx-3 mb-2 w-[calc(100%+1.5rem)] overflow-hidden bg-[#231f20] sm:-mx-5 sm:w-[calc(100%+2.5rem)]">
        <div className="overflow-hidden py-1.5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="header-marquee gap-8">
            {[...ANNOUNCEMENTS_SET, ...ANNOUNCEMENTS_SET].map((announcement, index) => (
              <span
                key={index}
                aria-hidden={index >= ANNOUNCEMENTS_SET.length}
                className="flex flex-none items-center gap-8 whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-wide text-white/90"
              >
                {announcement}
                <span aria-hidden className="text-[#f52227]">
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-4 pl-4 pr-2 sm:h-16 sm:pl-5 sm:pr-2.5">
        <a href="/scan" aria-label="Go to top" className="flex flex-none items-center">
          <Image
            src={IMAGES.logo}
            alt="Infinity Aesthetics and Clinic"
            width={500}
            height={250}
            priority
            className="h-auto w-28 sm:w-36"
          />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full border border-[#eadfe0] bg-white p-1 shadow-[0_4px_14px_-6px_rgba(35,31,32,0.15)] lg:flex">
          {SCAN_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-all duration-200 ${
                active === item.id
                  ? "bg-[#fff0f0] text-[#f52227]"
                  : "text-[#62595c] hover:text-[#f52227]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-2 sm:gap-3">
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => track("call_click", { branch: "Infinity Clinic", page: "scan" })}
            className="hidden text-[0.85rem] font-semibold text-[#231f20] transition-colors hover:text-[#f52227] sm:inline-block"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href="#scan"
            className="btn-wave inline-flex items-center justify-center rounded-full bg-[#f52227] px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#cf1c20] sm:px-6 sm:text-[0.88rem]"
          >
            <span className="relative z-10 sm:hidden">Scan</span>
            <span className="relative z-10 hidden sm:inline">Scan My Scalp</span>
          </a>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-full border border-[#eadfe0] bg-white text-[#231f20] lg:hidden"
          >
            <span aria-hidden className="text-xl leading-none">
              {mobileOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`mx-auto mt-2 w-full max-w-[1180px] overflow-hidden rounded-3xl border bg-white/95 shadow-lg backdrop-blur transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-96 border-[#eadfe0] opacity-100" : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-1 p-3">
          {SCAN_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                active === item.id ? "bg-[#f52227] text-white" : "text-[#62595c] hover:bg-[#f8f2f2] hover:text-[#f52227]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
