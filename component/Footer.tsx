"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { LuChevronLeft, LuChevronRight, LuHeartPulse, LuMapPin, LuMessageCircle, LuPhone, LuX } from "react-icons/lu"

const QUICK_LINKS = [
  { label: "Process", href: "#process", id: "process" },
  { label: "Hair Analysis", href: "#hair", id: "hair" },
  { label: "Conditions", href: "#conditions", id: "conditions" },
  { label: "Why Us", href: "#why", id: "why" },
  { label: "Journey", href: "#journey", id: "journey" },
  { label: "FAQ", href: "#faq", id: "faq" },
]

const GALLERY_IMAGES = [
  "/img-1.JPG",
  "/img-2.JPG",
  "/img-3.JPG",
  "/img-4.webp",
  "/img-5.webp",
  "/img-6.webp",
  "/img-7.webp",
  "/img-8.webp",
  "/img-9.webp",
]

export default function Footer() {
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const closeGallery = () => setActiveImage(null)
  const showPrevious = () => setActiveImage((current) => current === null ? current : (current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  const showNext = () => setActiveImage((current) => current === null ? current : (current + 1) % GALLERY_IMAGES.length)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeImage === null) return
      if (event.key === "Escape") setActiveImage(null)
      if (event.key === "ArrowLeft") setActiveImage((current) => current === null ? current : (current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
      if (event.key === "ArrowRight") setActiveImage((current) => current === null ? current : (current + 1) % GALLERY_IMAGES.length)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeImage])

  return (
    <footer className="relative overflow-hidden bg-[#171415] font-[family-name:var(--font-merriweather)] text-white">
      <div aria-hidden className="absolute -right-24 top-16 size-96 rounded-full border border-white/5" />
      <div aria-hidden className="absolute -right-8 top-32 size-72 rounded-full border border-[#f52227]/15" />
      <div aria-hidden className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#f52227] via-[#ef565a] to-[#231f20]" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-4 pt-12 sm:px-8 sm:pt-16 lg:px-16 xl:px-20">
        <div className="grid gap-10 border-b border-white/10 pb-8 lg:grid-cols-[1.25fr_0.75fr_0.9fr_1.1fr] lg:gap-12">
          <div>
            <a href="#" aria-label="Infinity Aesthetics Clinic home" className="inline-flex rounded-xl bg-white px-4 py-3">
              <Image src="/logo.png" alt="Infinity Aesthetics Clinic" width={176} height={64} className="h-12 w-auto object-contain" />
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Doctor-led hair restoration built around accurate diagnosis, personalised planning, and natural-looking
              long-term outcomes.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 border-l-2 border-[#f52227] pl-4">
              <LuHeartPulse className="size-6 text-[#f52227]" strokeWidth={1.8} />
              <p className="text-sm font-bold leading-relaxed text-white">Expertise before procedures.</p>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Quick Links</h2>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
                    <LuChevronRight className="size-4 text-[#f52227] transition-transform group-hover:translate-x-1" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-white/60">
              <li className="flex items-start gap-3">
                <LuPhone className="mt-0.5 size-4 shrink-0 text-[#f52227]" />
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-white/80">Phone</span>
                  <a href="tel:+919892811033" className="transition-colors hover:text-white">+91 98928 11033</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <LuMessageCircle className="mt-0.5 size-4 shrink-0 text-[#f52227]" />
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-white/80">WhatsApp</span>
                  <a
                    href="https://wa.me/919892811033"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    +91 98928 11033
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <LuMapPin className="mt-0.5 size-4 shrink-0 text-[#f52227]" />
                <address className="not-italic">
                  <span className="block text-xs font-bold uppercase tracking-wider text-white/80">Clinic Address</span>
                  Shri Ramkrishna Netralaya, Infinity Aesthetics Clinic, Shop No. 5, 1st Floor, Dosti Imperia,
                  beside Ghodbunder Service Road, opposite R-Mall, Manpada, Thane West, Maharashtra 400607
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Gallery</h2>
            <div className="mt-5 grid max-w-[220px] grid-cols-3 gap-1.5">
              {GALLERY_IMAGES.map((src, index) => (
                <button
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Open gallery image ${index + 1}`}
                  key={src}
                  className="group relative aspect-square overflow-hidden rounded-md border border-white/10 bg-white/5"
                >
                  <Image
                    src={src}
                    alt={`Infinity Aesthetics Clinic gallery ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 28vw, 50px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-[#f52227]/0 transition-colors duration-300 group-hover:bg-[#f52227]/20" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-3 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Infinity Aesthetics Clinic. All rights reserved.</p>
          <a href="/privacy-policy" className="text-white/60 hover:text-white">
            Privacy Policy
          </a>
          <p>Hair restoration guidance should always begin with a qualified medical assessment.</p>
        </div>
      </div>

      {activeImage !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image ${activeImage + 1}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-8"
          onClick={closeGallery}
        >
          <button type="button" onClick={closeGallery} aria-label="Close gallery" className="absolute right-3 top-3 z-10 rounded-full bg-white/15 p-2.5 text-white transition hover:bg-[#f52227] sm:right-5 sm:top-5 sm:p-3">
            <LuX className="size-5 sm:size-6" />
          </button>
          <button type="button" onClick={(event) => { event.stopPropagation(); showPrevious() }} aria-label="Previous image" className="absolute bottom-5 left-5 rounded-full bg-white/15 p-3 text-white transition hover:bg-[#f52227] sm:bottom-auto sm:left-7 sm:top-1/2 sm:-translate-y-1/2">
            <LuChevronLeft className="size-6 sm:size-7" />
          </button>
          <div className="relative mt-8 h-[68vh] w-full max-w-5xl sm:mt-0 sm:h-[75vh]" onClick={(event) => event.stopPropagation()}>
            <Image src={GALLERY_IMAGES[activeImage]} alt={`Infinity Aesthetics Clinic gallery ${activeImage + 1}`} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-contain" priority />
          </div>
          <button type="button" onClick={(event) => { event.stopPropagation(); showNext() }} aria-label="Next image" className="absolute bottom-5 right-5 rounded-full bg-white/15 p-3 text-white transition hover:bg-[#f52227] sm:bottom-auto sm:right-7 sm:top-1/2 sm:-translate-y-1/2">
            <LuChevronRight className="size-6 sm:size-7" />
          </button>
        </div>
      )}
    </footer>
  )
}
