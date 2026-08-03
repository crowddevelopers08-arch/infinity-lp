"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { LuMenu, LuPhone, LuX } from "react-icons/lu"

const navigation = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about-us" },
  { label: "Hair Concerns", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Our Approach", href: "#our-approach" },
  { label: "Contact", href: "#appointment" },
]

function InfinityLogo() {
  return (
    <Link href="/generic" aria-label="Infinity Aesthetics Clinic home" className="flex shrink-0 items-center">
      <Image
        src="/logo.png"
        alt="Infinity Aesthetics Clinic"
        width={500}
        height={250}
        priority
        className="h-auto w-[170px] sm:w-[205px]"
      />
    </Link>
  )
}

export default function GenericHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="w-full border-b border-[#f2f2f2] bg-white font-sans text-[#39383d]">
      <div className="mx-auto flex min-h-[76px] w-full max-w-[1810px] items-center px-4 sm:min-h-[84px] sm:px-8 lg:h-[92px] lg:px-14">
        <InfinityLogo />

        <a href="tel:+919892811033" className="ml-8 hidden shrink-0 items-center gap-3 lg:flex 2xl:ml-16 2xl:gap-3.5">
          <span className="grid size-[44px] place-items-center rounded-full border border-[#e5e5e5] text-[#4c4b50] 2xl:size-[47px]">
            <LuPhone className="size-[22px] fill-current text-[#f52227]" />
          </span>
          <span className="leading-none">
            <strong className="block text-[clamp(0.9rem,1vw,1.0625rem)] font-semibold tracking-[0.2px]">+91 98928 11033</strong>
            <span className="mt-2 block text-[clamp(0.65rem,0.7vw,0.75rem)] font-semibold uppercase tracking-[1.5px]">Free Call</span>
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className="ml-auto hidden h-full items-center gap-7 xl:flex 2xl:gap-8"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex h-full items-center whitespace-nowrap px-1 text-[clamp(0.78rem,0.8vw,0.9375rem)] font-semibold uppercase tracking-[1.35px] transition-colors after:absolute after:bottom-5 after:left-1/2 after:h-0.5 after:-translate-x-1/2 after:rounded-full after:bg-[#f52227] after:transition-all after:duration-300 hover:text-[#f52227] hover:after:w-full 2xl:tracking-[1.5px] ${
                item.href === "#top"
                  ? "text-[#f52227] after:w-full"
                  : "text-[#3f3e43] after:w-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5 xl:ml-7 2xl:gap-6">

          <a
            href="#appointment"
            className="relative hidden h-[44px] items-center justify-center overflow-hidden rounded-[18px] bg-[#f52227] px-5 font-[family-name:var(--font-merriweather)] text-[14px] font-bold uppercase tracking-[1.2px] text-white before:absolute before:left-1/2 before:top-1/2 before:h-[220%] before:w-[145%] before:-translate-x-1/2 before:-translate-y-1/2 before:animate-[spin_2.8s_linear_infinite] before:bg-[conic-gradient(#cf1c20_0deg,#cf1c20_245deg,#ffffff_275deg,#ffffff_300deg,#cf1c20_330deg)] before:content-[''] after:absolute after:inset-[2px] after:rounded-[16px] after:bg-[#f52227] after:content-[''] lg:flex 2xl:px-7"
          >
            <span className="relative z-10">Book Appointment</span>
          </a>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-11 place-items-center text-[#35353a] xl:hidden"
          >
            {mobileOpen ? <LuX className="size-7" /> : <LuMenu className="size-7" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#f2f2f2] px-4 py-3 lg:hidden">
        <a href="tel:+919892811033" className="flex min-w-0 items-center gap-2.5 text-[#231f20]">
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#eadfe0] text-[#f52227]">
            <LuPhone className="size-4 fill-current" />
          </span>
          <span className="min-w-0">
            <strong className="block whitespace-nowrap text-[clamp(0.75rem,3.4vw,0.95rem)] font-semibold">+91 98928 11033</strong>
            <span className="block text-[0.62rem] font-semibold uppercase tracking-wider text-[#62595c]">Free Call</span>
          </span>
        </a>
        <a
          href="#appointment"
          className="relative shrink-0 overflow-hidden rounded bg-[#f52227] px-3.5 py-3 font-[family-name:var(--font-merriweather)] text-[clamp(0.68rem,2.8vw,0.8rem)] font-bold uppercase tracking-[0.7px] text-white shadow-[0_5px_14px_rgba(245,34,39,0.18)] before:absolute before:left-1/2 before:top-1/2 before:h-[220%] before:w-[145%] before:-translate-x-1/2 before:-translate-y-1/2 before:animate-[spin_2.8s_linear_infinite] before:bg-[conic-gradient(#cf1c20_0deg,#cf1c20_245deg,#ffffff_275deg,#ffffff_300deg,#cf1c20_330deg)] before:content-[''] after:absolute after:inset-[2px] after:rounded-[2px] after:bg-[#f52227] after:content-[''] sm:px-5"
        >
          <span className="relative z-10">Book Appointment</span>
        </a>
      </div>

      <nav
        aria-label="Mobile navigation"
        className={`overflow-hidden border-t bg-white transition-all duration-300 xl:hidden ${
          mobileOpen ? "max-h-96 border-[#eadfe0] opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`rounded-lg px-3 py-3 text-center text-[clamp(0.75rem,3vw,0.875rem)] font-semibold uppercase tracking-[0.8px] transition-colors ${
                item.href === "#top" ? "bg-[#f52227] text-white" : "bg-[#fff5f5] text-[#231f20] hover:text-[#f52227]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
