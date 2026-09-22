"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu"
import Reveal from "./Reveal"

const revealOffsets = [
  { x: -28, y: 0 },
  { x: 28, y: 0 },
  { x: 0, y: 24 },
  { x: 0, y: -24 },
]

const photos = [
  { src: "https://res.cloudinary.com/muif2bou/image/upload/v1790064529/doctor1.png", alt: "Infinity Aesthetics Clinic interior", cell: "col-span-3 row-span-6 col-start-1 row-start-1" },
  { src: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695496/hero-3.jpg", alt: "Modern treatment space at Infinity Aesthetics Clinic", cell: "col-span-2 row-span-3 col-start-4 row-start-1" },
  { src: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786701665/IMG_0580.jpg", alt: "Doctor-led consultation at Infinity Aesthetics Clinic", cell: "col-span-2 row-span-3 col-start-4 row-start-4" },
  { src: "https://res.cloudinary.com/muif2bou/image/upload/v1790064732/img-4.webp", alt: "Infinity Aesthetics Clinic treatment room", cell: "col-span-3 row-span-6 col-start-6 row-start-1" },
  { src: "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695495/hero-1.jpg", alt: "Patient care at Infinity Aesthetics Clinic", cell: "col-span-4 row-span-3 col-start-9 row-start-1" },
  { src: "https://res.cloudinary.com/muif2bou/image/upload/v1790064732/img-6.webp", alt: "Clinic equipment and facilities", cell: "col-span-2 row-span-3 col-start-9 row-start-4" },
  { src: "https://res.cloudinary.com/muif2bou/image/upload/v1790064733/img-7.webp", alt: "Welcoming clinic environment", cell: "col-span-2 row-span-3 col-start-11 row-start-4" },
]

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const showPrevious = () => setActiveIndex((current) => current === null ? null : (current - 1 + photos.length) % photos.length)
  const showNext = () => setActiveIndex((current) => current === null ? null : (current + 1) % photos.length)

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null)
      if (event.key === "ArrowLeft") showPrevious()
      if (event.key === "ArrowRight") showNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeIndex])

  return (
    <>
    <section className="relative overflow-hidden bg-white px-4 py-8 font-[family-name:var(--font-merriweather)] text-[#231f20] max-[620px]:hidden sm:px-8 sm:py-10 lg:px-12">
      <div aria-hidden className="absolute -left-40 top-1/3 size-96 rounded-full bg-[#f52227]/5 blur-3xl" />
      <div aria-hidden className="absolute -right-40 -top-32 size-[32rem] rounded-full border-[90px] border-[#f52227]/[0.025]" />

      <div className="relative mx-auto max-w-[1350px]">
        <Reveal className="text-center" x={-24} y={0}>
          <div className="inline-flex items-center justify-center gap-3">
            <Wing />
            <span className="border-b border-[#f52227]/40 pb-1 text-xs font-bold uppercase tracking-widest text-[#f52227] sm:text-sm">
              Our Clinic
            </span>
            <Wing flipped />
          </div>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.15rem]">
            A Look Inside{" "}
            <span className="relative inline-block font-black italic text-[#f52227]">
              Infinity Clinic
              <span aria-hidden className="absolute -bottom-1 left-0 h-0.5 w-full -rotate-1 bg-[#f52227]" />
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#62595c] sm:text-base">
            Explore our modern, welcoming clinic designed around comfort, safety, and personalised care.
          </p>
        </Reveal>

        <div className="mt-7 grid h-auto grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3 lg:h-[560px] lg:grid-cols-12 lg:grid-rows-6 lg:gap-2">
          {photos.map((photo, index) => {
            const offset = revealOffsets[index % revealOffsets.length]

            return (
              <Reveal
                key={photo.src}
                delay={index * 0.09}
                x={offset.x}
                y={offset.y}
                className={"group relative aspect-square overflow-hidden rounded-xl border border-[#eadfe0] bg-[#fff0f0] shadow-[0_16px_38px_-28px_rgba(35,31,32,0.4)] sm:rounded-2xl lg:aspect-auto " + photo.cell + " max-lg:col-span-1 max-lg:row-span-1 max-lg:col-start-auto max-lg:row-start-auto"}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={"Open gallery image " + (index + 1)}
                  className="relative block size-full cursor-zoom-in overflow-hidden"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 46vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#231f20]/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-3 size-2 rounded-full bg-[#f52227] opacity-0 shadow-[0_0_0_5px_rgba(245,34,39,0.18)] transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>

    {activeIndex !== null && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={"Clinic gallery image " + (activeIndex + 1)}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171415]/95 p-3 backdrop-blur-md sm:p-8"
        onClick={() => setActiveIndex(null)}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return
          const distance = event.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(distance) > 45) {
            if (distance < 0) showNext()
            else showPrevious()
          }
          touchStartX.current = null
        }}
      >
        <button
          type="button"
          onClick={() => setActiveIndex(null)}
          aria-label="Close gallery"
          className="absolute right-3 top-3 z-20 grid size-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-[#f52227] sm:right-6 sm:top-6"
        >
          <LuX className="size-5" />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            showPrevious()
          }}
          aria-label="Show previous image"
          className="absolute bottom-5 left-[calc(50%-3.5rem)] z-20 grid size-11 place-items-center rounded-full bg-white text-[#231f20] shadow-xl transition hover:bg-[#f52227] hover:text-white sm:bottom-auto sm:left-6 sm:top-1/2 sm:size-12 sm:-translate-y-1/2"
        >
          <LuChevronLeft className="size-6" />
        </button>

        <div
          className="relative h-[72vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:h-[82vh]"
          onClick={(event) => event.stopPropagation()}
        >
          <Image
            key={photos[activeIndex].src}
            src={photos[activeIndex].src}
            alt={photos[activeIndex].alt}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#231f20]/75 px-4 py-2 text-xs font-bold text-white backdrop-blur sm:bottom-5">
            {activeIndex + 1} / {photos.length}
          </span>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            showNext()
          }}
          aria-label="Show next image"
          className="absolute bottom-5 right-[calc(50%-3.5rem)] z-20 grid size-11 place-items-center rounded-full bg-[#f52227] text-white shadow-xl transition hover:bg-white hover:text-[#231f20] sm:bottom-auto sm:right-6 sm:top-1/2 sm:size-12 sm:-translate-y-1/2"
        >
          <LuChevronRight className="size-6" />
        </button>
      </div>
    )}
    </>
  )
}

function Wing({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 22"
      className={"h-5 w-10 text-[#f52227] " + (flipped ? "-scale-x-100" : "")}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
    >
      <path d="M42 18C31 18 29 4 20 4" />
      <path d="M42 14C34 14 32 8 27 8" opacity=".65" />
      <path d="M42 22C27 22 25 1 12 1" opacity=".35" />
    </svg>
  )
}
