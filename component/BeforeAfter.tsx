"use client"

import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

const RESULTS = Array.from({ length: 9 }, (_, index) => ({
  src: "/bfaf-" + (index + 1) + ".jpg",
  alt: "Hair restoration before and after result " + (index + 1),
}))

const AUTOPLAY_DELAY = 5500

export default function BeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % RESULTS.length)
  }, [])

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + RESULTS.length) % RESULTS.length)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(showNext, AUTOPLAY_DELAY)
    return () => window.clearInterval(timer)
  }, [showNext])

  return (
    <section
      id="results"
      aria-labelledby="before-after-heading"
      className="overflow-hidden bg-[#f8f5f5] py-6 font-[family-name:var(--font-merriweather)] sm:py-8"
    >
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 44 22"
              className="h-5 w-10 text-[#f52227]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.6"
            >
              <path d="M42 18C31 18 29 4 20 4" />
              <path d="M42 14C34 14 32 8 27 8" opacity=".65" />
              <path d="M42 22C27 22 25 1 12 1" opacity=".35" />
            </svg>
            <span className="border-b border-[#f52227]/40 pb-1 text-xs font-bold uppercase tracking-widest text-[#f52227] sm:text-sm">
              Real Patient Results
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 44 22"
              className="h-5 w-10 -scale-x-100 text-[#f52227]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.6"
            >
              <path d="M42 18C31 18 29 4 20 4" />
              <path d="M42 14C34 14 32 8 27 8" opacity=".65" />
              <path d="M42 22C27 22 25 1 12 1" opacity=".35" />
            </svg>
          </div>

          <h2
            id="before-after-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#231f20] sm:text-4xl lg:text-[2.15rem]"
          >
            See the{" "}
            <span className="relative inline-block font-black italic text-[#f52227]">
              Difference.
              <span aria-hidden className="absolute -bottom-1 left-0 h-0.5 w-full origin-left -rotate-1" />
            </span>{" "}
            <span className="inline-flex -rotate-1 items-center rounded-full border border-[#f52227] bg-[#f52227]/10 px-3 py-0.5 text-[0.82em] text-[#231f20] shadow-[0_0_0_3px_rgba(245,34,39,0.08)]">
              Before &amp; After
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#5f585a] sm:text-base">
            Explore real hair restoration transformations achieved through careful planning,
            precision, and personalised treatment.
          </p>
        </div>

        <div
          className="relative mx-auto mt-5 max-w-[520px] select-none sm:mt-6"
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
          <div className="absolute inset-y-8 -left-[18%] hidden w-[38%] rotate-[-2deg] overflow-hidden rounded-2xl opacity-25 shadow-xl lg:block">
            <Image
              src={RESULTS[(activeIndex - 1 + RESULTS.length) % RESULTS.length].src}
              alt=""
              fill
              sizes="360px"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-y-8 -right-[18%] hidden w-[38%] rotate-[2deg] overflow-hidden rounded-2xl opacity-25 shadow-xl lg:block">
            <Image
              src={RESULTS[(activeIndex + 1) % RESULTS.length].src}
              alt=""
              fill
              sizes="360px"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 aspect-[5/4] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_22px_65px_rgba(35,31,32,0.2)] sm:rounded-[28px] sm:border-[7px]">
            {RESULTS.map((result, index) => (
              <Image
                key={result.src}
                src={result.src}
                alt={result.alt}
                fill
                priority={index === 0}
              sizes="(max-width: 768px) 94vw, 520px"
                className={
                  "object-cover transition-[opacity,transform] duration-700 ease-out " +
                  (index === activeIndex
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-[1.02] opacity-0")
                }
              />
            ))}

            {/* <span className="absolute left-3 top-3 rounded-full bg-[#231f20]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm sm:left-5 sm:top-5 sm:text-xs">
              Patient Result {activeIndex + 1}
            </span> */}
          </div>

          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous result"
            className="absolute -left-5 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl text-[#231f20] shadow-lg transition hover:bg-[#f52227] hover:text-white sm:-left-6 sm:size-12"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Show next result"
            className="absolute -right-5 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl text-[#231f20] shadow-lg transition hover:bg-[#f52227] hover:text-white sm:-right-6 sm:size-12"
          >
            <span aria-hidden>›</span>
          </button>
        </div>

        <div className="mt-3 flex justify-center gap-2" aria-label="Select a result">
          {RESULTS.map((result, index) => (
            <button
              key={result.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={"Show result " + (index + 1)}
              aria-current={index === activeIndex ? "true" : undefined}
              className={
                "h-2 rounded-full transition-all duration-300 " +
                (index === activeIndex
                  ? "w-8 bg-[#f52227]"
                  : "w-2 bg-[#231f20]/25 hover:bg-[#231f20]/50")
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
