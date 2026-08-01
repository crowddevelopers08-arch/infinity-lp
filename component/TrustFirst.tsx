"use client"

import { useEffect, useRef } from "react"

const DECISIONS = [
  {
    number: "01",
    title: "Preserve",
    copy: "If your existing hair follicles can still be strengthened through non-surgical treatments, we'll recommend that first.",
  },
  {
    number: "02",
    title: "Delay",
    copy: "If medication can delay surgery, we'll tell you.",
  },
  {
    number: "03",
    title: "Wait",
    copy: "If waiting a little longer gives you a better long-term result, we'll explain why.",
  },
]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none">
      <path d="M5 12h13M13 7l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function TrustFirst() {
  const decisionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = decisionsRef.current
    if (!container) return

    const mobileQuery = window.matchMedia("(max-width: 767px)")
    let currentCard = 0

    const timer = window.setInterval(() => {
      if (!mobileQuery.matches || !container.children.length) return

      currentCard = (currentCard + 1) % container.children.length
      const card = container.children[currentCard] as HTMLElement
      container.scrollTo({ left: card.offsetLeft - container.offsetLeft, behavior: "smooth" })
    }, 5200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#fffafa] font-[family-name:var(--font-merriweather)] text-[#231f20]">
      <div aria-hidden className="absolute -right-28 -top-28 size-80 rounded-full border-[54px] border-[#f52227]/5" />
      <div aria-hidden className="absolute -bottom-32 -left-24 size-72 rounded-full border border-[#f52227]/15" />

      <div className="relative mx-auto max-w-[1180px] px-5 py-6 sm:px-8 lg:py-8">
        <div className="grid items-end gap-7 border-b border-[#eadfe0] pb-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="inline-flex items-center gap-3">
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
                Our Honest Approach
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

            <h2 className="mt-2 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.15rem]">
              We Don&apos;t Recommend{" "}
              <span className="relative inline-block px-1">
                <span aria-hidden className="absolute inset-x-0 bottom-0.5 h-3 -rotate-1 bg-[#f52227]" />
                <span className="relative">Hair Transplants</span>
              </span>{" "}
              to{" "}
              <span className="relative inline-block px-1">
                <span aria-hidden className="absolute inset-x-0 bottom-0.5 h-3 rotate-1 bg-[#f52227]" />
                <span className="relative">Everyone.</span>
              </span>
            </h2>
          </div>

          <p className="border-l-2 border-[#f52227] pl-5 text-sm font-bold leading-relaxed text-[#62595c]">
            And that&apos;s exactly why patients trust us.
          </p>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          <div className="relative flex min-h-80 flex-col justify-between overflow-hidden rounded-[2rem] bg-[#231f20] p-7 text-white sm:p-9">
            <div aria-hidden className="absolute -right-20 -top-20 size-64 rounded-full border-[38px] border-[#f52227]/15" />
            <div aria-hidden className="absolute bottom-10 right-10 size-20 rounded-full border border-white/10" />

            <div className="relative grid size-16 place-items-center rounded-2xl bg-[#f52227]">
              <svg aria-hidden="true" viewBox="0 0 32 32" className="size-8" fill="none">
                <path d="M16 4 26 8v7c0 6.2-4.1 10.5-10 13-5.9-2.5-10-6.8-10-13V8l10-4Z" stroke="white" strokeWidth="1.7" />
                <path d="m11.5 16 3 3 6-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="relative mt-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ff5b5f]">Our first priority</span>
              <p className="mt-4 text-xl font-bold leading-snug sm:text-xl">
                And if a hair transplant is the right solution, we&apos;ll create a personalised treatment plan
            designed specifically for your hair loss pattern, facial structure, and future hair goals.
              </p>
            </div>
          </div>

          <div
            ref={decisionsRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block md:space-y-3 md:overflow-visible md:pb-0"
          >
            {DECISIONS.map((decision) => (
              <article
                key={decision.number}
                className="group grid min-w-[88%] snap-start gap-4 rounded-2xl border border-[#eadfe0] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#f52227]/40 hover:shadow-[0_18px_45px_-28px_rgba(35,31,32,0.45)] md:min-w-0 md:grid-cols-[auto_1fr_auto] md:items-center md:p-6"
              >
                <span className="text-sm font-bold text-[#f52227]">{decision.number}</span>
                <div>
                  <h3 className="text-base font-bold leading-snug tracking-tight sm:text-lg">{decision.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#62595c]">{decision.copy}</p>
                </div>
                <span className="hidden text-[#f52227] transition-transform group-hover:translate-x-1 md:block">
                  <ArrowIcon />
                </span>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-5 max-sm:gap-2 rounded-2xl bg-[#231f20] px-6 py-2 max text-white sm:flex-row sm:items-center sm:px-8">
          <p className="max-w-3xl text-sm font-bold leading-relaxed">
            Because replacing hair should never come before trying to preserve it.
          </p>
          <a
            href="#book"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#f52227] px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            Start with diagnosis
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
