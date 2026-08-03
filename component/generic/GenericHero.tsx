"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { LuPlay } from "react-icons/lu"

const slides = [
  {
    image: "/final-cta-consultation.png",
    mobileImage: "/final-mbl.png",
    position: "object-[68%_center] sm:object-center",
    badge: "Infinity",
    tagline: "Diagnosis · Restoration · Confidence",
    heading: "Advanced Hair Restoration & Treatments in Thane",
    description: "Doctor-led diagnosis, personalised hair regrowth therapies, and advanced hair transplant solutions designed around your unique needs.",
  },
  {
    image: "/Have-realistic.png",
    mobileImage: "/Have-realistic-mble.png",
    position: "object-[64%_center] sm:object-center",
    badge: "Natural Results",
    tagline: "Personalised · Precise · Doctor-Led",
    heading: "The Right Plan for Healthier Hair",
    description: "Understand the cause of your hair loss and discover a personalised treatment pathway focused on long-term, natural-looking restoration.",
  },
]

export default function GenericHero() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [])

  const slide = slides[activeSlide]

  return (
    <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#171415] sm:min-h-[680px] lg:min-h-[610px]">
      {slides.map((item, index) => (
        <div key={item.image} className="contents">
          <Image
            src={item.mobileImage}
            alt={index === 0 ? "Hair restoration doctor consulting with a patient" : "Patient reviewing healthy natural-looking hair"}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`-z-20 object-cover transition-[opacity,transform] duration-1000 ease-in-out sm:hidden ${
              index === activeSlide ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
            }`}
          />
          <Image
            src={item.image}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={`-z-20 hidden object-cover transition-[opacity,transform] duration-1000 ease-in-out sm:block ${item.position} ${
              index === activeSlide ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
            }`}
          />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(23,20,21,0.98)_0%,rgba(23,20,21,0.88)_30%,rgba(35,31,32,0.52)_57%,rgba(35,31,32,0.12)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[#f52227]/[0.06]" />

      <div className="mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 lg:px-16 xl:px-20">
        <div key={activeSlide} className="max-w-[650px] text-white">
          <div className="hero-slow-item hero-slow-left hero-delay-1 inline-flex max-w-full items-stretch overflow-hidden rounded-[5px] bg-white text-[#231f20] shadow-sm">
            <span className="flex shrink-0 items-center bg-[#f52227] px-2 py-2 text-[0.5rem] font-bold uppercase tracking-[0.3px] text-white min-[360px]:px-2.5 min-[360px]:text-[0.6rem] min-[360px]:tracking-[0.7px] sm:px-3 sm:text-[0.72rem] sm:tracking-[1.2px]">{slide.badge}</span>
            <span className="flex min-w-0 items-center whitespace-nowrap px-1.5 py-2 text-[0.43rem] font-bold uppercase tracking-[0.1px] min-[360px]:px-2 min-[360px]:text-[0.55rem] min-[360px]:tracking-[0.55px] sm:px-3 sm:text-[0.72rem] sm:tracking-[1.6px]">{slide.tagline}</span>
          </div>

          <h1 className="hero-slow-item hero-slow-left hero-delay-2 mt-4 font-[family-name:var(--font-merriweather)] text-[clamp(2.05rem,3.4vw,4rem)] font-black uppercase leading-[1.18] tracking-[-0.04em] text-white">
            {slide.heading}
          </h1>

          <p className="hero-slow-item hero-slow-left hero-delay-3 mt-3 max-w-[570px] font-[family-name:var(--font-inter)] text-[clamp(0.85rem,1.2vw,1.05rem)] leading-[1.8] text-white/85">
            {slide.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 sm:gap-5">
            <a href="#appointment" className="hero-slow-item hero-slow-left hero-delay-4 relative inline-flex min-h-[56px] items-center justify-center overflow-hidden rounded-[18px] bg-[#f52227] px-7 font-[family-name:var(--font-merriweather)] text-[0.78rem] font-bold uppercase tracking-[1.1px] text-white before:absolute before:left-1/2 before:top-1/2 before:h-[220%] before:w-[145%] before:-translate-x-1/2 before:-translate-y-1/2 before:animate-[spin_2.8s_linear_infinite] before:bg-[conic-gradient(#cf1c20_0deg,#cf1c20_245deg,#ffffff_275deg,#ffffff_300deg,#cf1c20_330deg)] before:content-[''] after:absolute after:inset-[2px] after:rounded-[16px] after:bg-[#f52227] after:content-[''] hover:bg-white">
              <span className="relative z-10">Book Consultation</span>
            </a>
            <a href="#services" className="hero-slow-item hero-slow-left hero-delay-5 inline-flex min-h-[56px] items-center justify-center gap-3 rounded-[18px] border-2 border-white/75 px-7 font-[family-name:var(--font-merriweather)] text-[0.78rem] font-bold uppercase tracking-[1.1px] text-white transition-colors hover:border-[#f52227] hover:bg-[#f52227]">
              <LuPlay className="size-4 fill-current" />
              Explore Treatments
            </a>
          </div>
        </div>
      </div>

      <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex lg:right-14">
        {slides.map((item, index) => (
          <button
            key={item.image}
            type="button"
            aria-label={`Show hero slide ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={`rounded-full transition-all ${index === activeSlide ? "size-4 border-2 border-white p-[3px] shadow-[0_0_0_2px_rgba(255,255,255,0.25)]" : "size-2.5 bg-white"}`}
          >
            {index === activeSlide && <span className="block size-full rounded-full bg-[#f52227]" />}
          </button>
        ))}
      </div>
    </section>
  )
}
