"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { LuArrowUpRight, LuCheck } from "react-icons/lu"

type Condition = {
  name: string
  shortName: string
  icon: string
  description: string
  listLabel?: string
  list: string[]
  image: string
}

const CONDITIONS: Condition[] = [
  {
    name: "Board-Certified Dermatologist",
    shortName: "Medical Expertise",
    icon: "/infinity-icon-1.png",
    description:
      "Your treatment is planned and performed by Dr Narendra Nikumbh, a board-certified dermatologist with 12+ years of extensive expertise in hair restoration.",
    list: [],
    image: "/dermologiesed1.jpg",
  },
  {
    name: "Doctor-Led Hair Transplants",
    shortName: "Doctor-Led Care",
    icon: "/infinity-icon-2.png",
    description:
      "Every hair transplant procedure is personally performed by the doctor, not delegated to technicians.",
    list: ["Every graft.", "Every angle.", "Every decision."],
    image: "/Hair-Transplants.avif",
  },
  {
    name: "Honest, Personalised Consultations",
    shortName: "Honest Guidance",
    icon: "/infinity-icon-3.png",
    description:
      "We believe patients deserve clear answers, not sales pitches. If you're not the right candidate for a hair transplant, we'll tell you honestly and recommend alternatives better suited to your condition.",
    list: [],
    image: "/Consultations.avif",
  },
  {
    name: "Natural Hairline Design",
    shortName: "Natural Design",
    icon: "/infinity-icon-4.png",
    description:
      "Every hairline is designed according to your facial proportions, age, existing density, and future pattern of hair loss to create results that look naturally yours.",
    list: [],
    image: "/natural-line-treatment.avif",
  },
  {
    name: "Advanced Hair Restoration Techniques",
    shortName: "Advanced Techniques",
    icon: "/infinity-icon-5.png",
    description:
      "We use advanced FUE-based techniques and meticulous graft handling to maximise graft survival and promote healthy, natural hair growth.",
    listLabel: "Techniques",
    list: [
      "HFD BIO FUE",
      "Advanced BIO FUE",
      "BIO FUE",
      "Standard FUE",
    ],
    image: "/Restoration1.jpg",
  },
  {
    name: "Is Hair Loss Affecting Your Confidence?",
    shortName: "Confidence & Care",
    icon: "/infinity-icon-6.png",
    description:
      "Hair loss can change more than your appearance. When it begins to affect how you live, seeking professional guidance becomes important.",
    listLabel: "You may notice",
    list: [
      "Avoiding photographs",
      "Wearing caps more often",
      "Checking your hairline repeatedly",
      "Feeling less confident socially",
    ],
    image: "/hair-loss.jpg",
  },
]

export default function Conditions() {
  const [activeIndex, setActiveIndex] = useState(0)
  const titleRowRef = useRef<HTMLDivElement>(null)
  const titleRefs = useRef<Array<HTMLButtonElement | null>>([])
  const active = CONDITIONS[activeIndex]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % CONDITIONS.length)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const row = titleRowRef.current
    const title = titleRefs.current[activeIndex]
    if (!row || !title || window.innerWidth >= 1024) return

    row.scrollTo({
      left: title.offsetLeft - row.offsetLeft - 20,
      behavior: "smooth",
    })
  }, [activeIndex])

  return (
    <section
      id="conditions"
      aria-labelledby="conditions-heading"
      className="relative overflow-hidden bg-white py-8 font-[family-name:var(--font-merriweather)] text-[#231f20] sm:py-10 lg:py-10"
    >
      <div aria-hidden className="absolute -left-40 top-1/3 size-96 rounded-full bg-[#f52227]/5 blur-3xl" />
      <div aria-hidden className="absolute -right-40 -top-32 size-[32rem] rounded-full border-[90px] border-[#f52227]/[0.025]" />

      <div className="relative mx-auto max-w-[1420px] px-5 sm:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <Wing />
            <span className="border-b border-[#f52227]/50 pb-1 text-xs font-bold uppercase tracking-widest text-[#f52227] sm:text-sm">
              Why Infinity
            </span>
            <Wing flipped />
          </div>

          <h2
            id="conditions-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.15rem]"
          >
            Expertise Behind Every{" "}
            <span className="font-black italic text-[#f52227]">Natural Result</span>{" "}
            <span className="inline-flex -rotate-1 items-center rounded-full border border-[#f52227] bg-[#f52227]/10 px-3 py-0.5 text-[0.82em] shadow-[0_0_0_3px_rgba(245,34,39,0.08)]">
              Matters
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#62595c]">
            A hair transplant is more than a procedure. It is a medical decision shaped by diagnosis,
            planning, and the expertise behind every graft.
          </p>
        </header>

        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-7">
          <div ref={titleRowRef} className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] lg:grid lg:h-full lg:grid-rows-6 lg:overflow-visible lg:pb-0">
            {CONDITIONS.map((condition, index) => {
              const selected = index === activeIndex

              return (
                <button
                  key={condition.name}
                  ref={(element) => {
                    titleRefs.current[index] = element
                  }}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={selected}
                  className={
                    "group flex min-w-[245px] items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-300 lg:min-w-0 " +
                    (selected
                      ? "border-[#f52227] bg-[#f52227] text-white shadow-[0_15px_35px_-20px_rgba(245,34,39,0.8)]"
                      : "border-[#eadfe0] bg-white text-[#342e30] shadow-[0_8px_24px_-20px_rgba(35,31,32,0.35)] hover:border-[#f52227]/35 hover:bg-[#fff8f8]")
                  }
                >
                  <span
                    className={
                      "grid size-10 shrink-0 place-items-center rounded-xl transition-colors " +
                      (selected ? "bg-white text-[#f52227]" : "bg-[#fff0f0] text-[#f52227]")
                    }
                  >
                    <Image
                      src={condition.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 object-contain"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className={"block text-[10px] font-bold uppercase tracking-[0.16em] " + (selected ? "text-white/70" : "text-[#62595c]/60")}>
                      0{index + 1}
                    </span>
                    <span className="mt-0.5 block text-sm font-bold leading-snug">{condition.shortName}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <article className="overflow-hidden rounded-[26px] border border-[#eadfe0] bg-white text-[#231f20] shadow-[0_24px_65px_-28px_rgba(35,31,32,0.32)]">
            <div className="relative h-[240px] overflow-hidden sm:h-[275px] lg:h-[285px]">
              <Image
                key={active.image}
                src={active.image}
                alt={active.name}
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 1024px) 94vw, 62vw"
                className="animate-[hero-image-zoom-in_1.3s_cubic-bezier(0.16,1,0.3,1)_both] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171415]/75 via-transparent to-transparent" />
              {/* <div className="absolute bottom-5 left-5 flex items-center gap-3 sm:bottom-7 sm:left-7">
                <span className="grid size-12 place-items-center rounded-full bg-[#f52227] text-white shadow-lg">
                  <ActiveIcon className="size-6" strokeWidth={1.8} />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                  Infinity Hair Restoration
                </span>
              </div> */}
            </div>

            <div className="p-5 sm:p-6 lg:p-6">
              <div className="flex items-start gap-4">
                <span className="hidden text-5xl font-black leading-none text-[#f52227]/15 sm:block">
                  0{activeIndex + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold leading-tight sm:text-2xl">{active.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#62595c]">{active.description}</p>
                </div>
              </div>

              {active.list.length > 0 && (
                <div className="mt-4 border-t border-[#eadfe0] pt-4">
                  {active.listLabel && (
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#231f20]">
                      {active.listLabel}
                    </p>
                  )}
                  <div className="overflow-hidden sm:hidden">
                    <div className="condition-chip-marquee flex w-max">
                      {[0, 1].map((copy) => (
                        <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-2 pr-2">
                          {active.list.map((item) => (
                            <span
                              key={`${copy}-${item}`}
                              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#fff0f0] px-3 py-1.5 text-xs font-semibold text-[#342e30]"
                            >
                              <LuCheck className="size-3.5 text-[#f52227]" strokeWidth={2.5} />
                              {item}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="hidden flex-wrap gap-2 sm:flex">
                    {active.list.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#fff0f0] px-3 py-1.5 text-xs font-semibold text-[#342e30]"
                      >
                        <LuCheck className="size-3.5 text-[#f52227]" strokeWidth={2.5} />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                href="#book"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#231f20] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#f52227]"
              >
                Book Your Consultation
                <LuArrowUpRight className="size-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
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
