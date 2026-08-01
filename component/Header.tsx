"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { track } from "./track"

const NAV = [
  { label: "Process", href: "#process", id: "process" },
  { label: "Hair Analysis", href: "#hair", id: "hair" },
  { label: "Conditions", href: "#conditions", id: "conditions" },
  { label: "Why Us", href: "#why", id: "why" },
  { label: "Journey", href: "#journey", id: "journey" },
  { label: "FAQ", href: "#faq", id: "faq" },
]

const ANNOUNCEMENTS = ["Doctor-Led Hair Care", "3-in-1 Hair Therapy", "Personalised Treatment Plan"]
const ANNOUNCEMENTS_SET = Array.from({ length: 4 }, () => ANNOUNCEMENTS).flat()

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
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
    <header className="sticky top-0 z-50 px-3 sm:px-5">
      <div
        className={`relative mb-2 overflow-hidden transition-all duration-300 ${
          scrolled
            ? "mx-auto w-full max-w-[1180px] rounded-full border border-[#eadfe0] bg-white/90 shadow-[0_12px_34px_-16px_rgba(35,31,32,0.35)] backdrop-blur-[12px]"
            : "-mx-3 w-[calc(100%+1.5rem)] border border-transparent bg-[#231f20] backdrop-blur-[8px] sm:-mx-5 sm:w-[calc(100%+2.5rem)]"
        }`}
      >
        <div className="overflow-hidden py-1.5 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="header-marquee gap-8">
            {[...ANNOUNCEMENTS_SET, ...ANNOUNCEMENTS_SET].map((announcement, index) => (
              <span
                key={index}
                aria-hidden={index >= ANNOUNCEMENTS_SET.length}
                className={`flex flex-none items-center gap-8 whitespace-nowrap text-[0.72rem] font-semibold uppercase tracking-wide transition-colors duration-300 ${
                  scrolled ? "text-[#231f20]" : "text-white/90"
                }`}
              >
                {announcement}
                <span aria-hidden className={scrolled ? "text-[#f52227]/60" : "text-[#f52227]"}>
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-4 rounded-full pl-4 pr-2 transition-all duration-300 sm:h-16 sm:pl-5 sm:pr-2.5 ${
          scrolled
            ? "border border-[#eadfe0] bg-white/90 shadow-[0_12px_34px_-16px_rgba(35,31,32,0.35)] backdrop-blur-[12px]"
            : "border border-transparent bg-white/70 backdrop-blur-[8px]"
        }`}
      >
        <a href="#top" aria-label="Go to top" className="flex flex-none items-center">
          <Image
            src="/logo.png"
            alt="Infinity Aesthetics and Clinic"
            width={500}
            height={250}
            priority
            className="h-auto w-28 sm:w-36"
          />
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 rounded-full bg-[#f8f2f2] p-1 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-all duration-200 ${
                active === item.id
                  ? "bg-white text-[#f52227] shadow-[0_2px_8px_-2px_rgba(35,31,32,0.2)]"
                  : "text-[#62595c] hover:text-[#f52227]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-2 sm:gap-3">
          <a
            href="tel:+919892811033"
            onClick={() => track("call_click", { branch: "Reshape Clinic" })}
            className="hidden text-[0.85rem] font-semibold text-[#231f20] transition-colors hover:text-[#f52227] sm:inline-block"
          >
            +91 9892811033
          </a>
          <a
            href="#book"
            className="btn-wave inline-flex items-center justify-center rounded-full bg-[#f52227] px-4 py-2.5 text-[0.82rem] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#cf1c20] sm:px-6 sm:text-[0.88rem]"
          >
            <span className="relative z-10 sm:hidden">Book</span>
            <span className="relative z-10 hidden sm:inline">Book Consultation</span>
          </a>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-full border border-[#eadfe0] text-[#231f20] lg:hidden"
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
          mobileOpen
            ? "max-h-96 border-[#eadfe0] opacity-100"
            : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-1 p-3">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                active === item.id
                  ? "bg-[#f52227] text-white"
                  : "text-[#62595c] hover:bg-[#f8f2f2] hover:text-[#f52227]"
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
