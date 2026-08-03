"use client"

import Image from "next/image"
import { useState } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const solutions = [
  {
    title: "Excessive Hair Fall",
    description: "Noticing more hair on your pillow, in the shower, or while combing? Early diagnosis can help identify the cause and slow down further hair loss before it progresses.",
    treatments: "PRP • GFC • PGFRP™ • IAC Hair Regrowth System",
    image: "/hair-loss.jpg",
  },
  {
    title: "Hair Thinning & Reduced Density",
    description: "If your hair has become finer, lacks volume, or your scalp is becoming more visible, customised hair regrowth treatments can help strengthen existing follicles and improve overall density.",
    treatments: "PGFRP™ • IAC Hair Regrowth System",
    image: "/Reduced-Density.avif",
  },
  {
    title: "Receding Hairline & Male Pattern Baldness",
    description: "A receding hairline or progressive baldness can affect both your appearance and confidence. Depending on the stage of hair loss, we recommend medical management, advanced hair regrowth therapies, or hair transplantation for natural-looking restoration.",
    treatments: "Hair Regrowth Therapies • Hair Transplant",
    image: "/Hair-Transplants.avif",
  },
  {
    title: "Patchy Hair Loss",
    description: "Hair loss in patches often requires a thorough medical evaluation to identify the underlying cause before beginning treatment.",
    treatments: "Medical Evaluation • Targeted Hair Restoration Therapies",
    image: "/patchy.jpg",
  },
  {
    title: "Advanced Hair Loss",
    description: "If you've experienced significant hair loss and have a healthy donor area, a hair transplant can help restore natural hair density and redefine your hairline.",
    treatments: "Advanced Hair Transplant",
    image: "/Advanced-Hair-Loss.avif",
  },
  {
    title: "Previous Hair Treatments Didn't Work?",
    description: "Not every treatment works for every patient. If you've tried PRP or other therapies without seeing the desired results, we'll evaluate your hair, review your treatment history, and recommend the next best step.",
    treatments: "PGFRP™ • IAC Hair Regrowth System • Hair Transplant",
    image: "/Previous-Hair.avif",
  },
]

export default function GenericSolutions() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
  const [mobileSlide, setMobileSlide] = useState(0)

  const toggleCard = (title: string) => {
    setExpandedCards((current) => {
      const next = new Set(current)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }

  const showPreviousSlide = () => {
    setMobileSlide((current) => (current - 1 + solutions.length) % solutions.length)
  }

  const showNextSlide = () => {
    setMobileSlide((current) => (current + 1) % solutions.length)
  }

  const renderCard = (solution: (typeof solutions)[number]) => {
    const isExpanded = expandedCards.has(solution.title)

    return (
      <article key={solution.title} className="flex h-full flex-col items-center text-center">
        <div className="relative size-[118px] rounded-full border-[4px] border-[#ffd9d9] p-[3px] sm:size-[124px]">
          <div className="relative size-full overflow-hidden rounded-full bg-[#fff5f5]">
            <Image
              src={solution.image}
              alt={solution.title}
              fill
              sizes="124px"
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>

        <h3 className="mt-3 flex min-h-[2.75rem] items-center justify-center font-[family-name:var(--font-merriweather)] text-[clamp(0.95rem,1.35vw,1.08rem)] font-black leading-snug text-[#171417] sm:mt-4 sm:min-h-[3.25rem]">
          {solution.title}
        </h3>
        <div
          className={`mt-1.5 min-h-[3.2em] w-full max-w-[310px] overflow-hidden transition-[max-height] duration-500 ease-in-out sm:mt-2 ${
            isExpanded ? "max-h-64" : "max-h-[3.2em]"
          }`}
        >
          <p className={`font-[family-name:var(--font-inter)] text-[clamp(0.78rem,1vw,0.875rem)] leading-[1.6] text-[#39343a] ${isExpanded ? "" : "line-clamp-2"}`}>
            {solution.description}
          </p>
        </div>
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => toggleCard(solution.title)}
          className="mt-2 min-h-5 font-[family-name:var(--font-inter)] text-[0.75rem] font-bold text-[#f52227] underline decoration-[#f52227]/40 underline-offset-4 transition-colors hover:text-[#231f20]"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
        <p className="mt-4 font-[family-name:var(--font-merriweather)] text-[0.78rem] font-bold text-[#231f20] sm:mt-3">
          Recommended Treatments :
        </p>
        <p className="mt-1 min-h-[2.5rem] max-w-[310px] font-[family-name:var(--font-inter)] text-[0.78rem] font-semibold leading-[1.55] text-[#f52227]">
          {solution.treatments}
        </p>
      </article>
    )
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden border-y border-[#f4e9e9] bg-[#fffafa] px-5 py-6 sm:px-8 sm:py-14 lg:py-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(245,34,39,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(245,34,39,0.025)_1px,transparent_1px)] [background-size:42px_42px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-36 size-[360px] rounded-full bg-[#f52227]/[0.055] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-44 -right-28 size-[420px] rounded-full bg-[#f52227]/[0.045] blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1120px]">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[2px] text-[#231f20] before:h-[2px] before:w-9 before:rounded-full before:bg-[#f52227] before:content-['']">
            <span className="size-1.5 rounded-full bg-[#f52227]" aria-hidden="true" />
            Hair Concerns
          </span>
        </div>
        <h2 className="mx-auto mt-3 max-w-[720px] text-center font-[family-name:var(--font-merriweather)] text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.03em] text-[#231f20]">
          What Brings{" "}
          <span className="relative inline-block text-[#f52227] after:absolute after:-bottom-2 after:left-[5%] after:h-[3px] after:w-[90%] after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#f52227] after:to-transparent after:content-['']">
            You to Us?
          </span>
        </h2>

        <div className="relative mt-8 sm:hidden">
          <button
            type="button"
            aria-label="Previous hair concern"
            onClick={showPreviousSlide}
            className="absolute left-[calc(50%-125px)] top-10 z-20 grid size-9 place-items-center rounded-full border border-[#f52227]/25 bg-white text-[#f52227] shadow-[0_6px_18px_rgba(35,31,32,0.1)] transition-transform active:scale-95 min-[360px]:size-10"
          >
            <LuChevronLeft className="size-5" />
          </button>
          <div key={solutions[mobileSlide].title} className="animate-fade-in-up px-10">
            {renderCard(solutions[mobileSlide])}
          </div>
          <button
            type="button"
            aria-label="Next hair concern"
            onClick={showNextSlide}
            className="absolute right-[calc(50%-125px)] top-10 z-20 grid size-9 place-items-center rounded-full border border-[#f52227]/25 bg-white text-[#f52227] shadow-[0_6px_18px_rgba(35,31,32,0.1)] transition-transform active:scale-95 min-[360px]:size-10"
          >
            <LuChevronRight className="size-5" />
          </button>
          <div className="mt-4 flex justify-center gap-2" aria-label={`Slide ${mobileSlide + 1} of ${solutions.length}`}>
            {solutions.map((solution, index) => (
              <button
                key={solution.title}
                type="button"
                aria-label={`Show ${solution.title}`}
                onClick={() => setMobileSlide(index)}
                className={`h-1.5 rounded-full transition-all ${index === mobileSlide ? "w-6 bg-[#f52227]" : "w-1.5 bg-[#f52227]/25"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 hidden gap-x-14 gap-y-11 sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10">
          {solutions.map(renderCard)}
        </div>
      </div>
    </section>
  )
}
