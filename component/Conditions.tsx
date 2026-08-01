"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useInView } from "framer-motion"
import type { IconType } from "react-icons"
import {
  LuSprout,
  LuShieldCheck,
  LuUserCheck,
  LuLayers,
  LuLeaf,
  LuSparkles,
  LuCheck,
  LuArrowRight,
} from "react-icons/lu"

/**
 * Treatment / Hair Conditions — an editorial "sticky scroll reveal". The left
 * rail narrates each hair condition in tall scroll steps; a pinned cinematic
 * frame on the right wipes between visuals as each step reaches the middle of
 * the viewport. The active step is bright, the rest recede.
 *
 * IMPORTANT: the section must NOT be an `overflow` scroll container (that breaks
 * `position: sticky`). We use `overflow-clip`, which hides the decorative blooms
 * without establishing a scroll container, so the sticky frame still pins.
 *
 * On mobile the sticky frame is dropped; each step carries its own inline visual.
 */

type Condition = {
  name: string
  icon: IconType
  description: string
  listLabel?: string
  list: string[]
  image: string
  featured?: boolean
}

/* Placeholder images — replace each `image` with a real treatment photo. */
const conditions: Condition[] = [
  {
    name: "Board-Certified Dermatologist",
    icon: LuShieldCheck,
    description:
      "Your treatment is planned and performed by Dr Narendra Nikumbh, a board-certified dermatologist with 12+ years of extensive expertise in hair restoration.",
    list: [],
    // image: "https://res.cloudinary.com/n0ccg2u6/image/upload/regrow_hx1biq.png",
    image: "/dermologies.avif",
  },
  {
    name: "Doctor-Led Hair Transplants",
    icon: LuUserCheck,
    description:
      "Every hair transplant procedure is personally performed by the doctor, not delegated to technicians.",
    list: ["Every graft.", "Every angle.", "Every decision."],
    // image: "https://res.cloudinary.com/n0ccg2u6/image/upload/loss_nrv9dx.png",
    image: "/Hair-Transplants.avif",
  },
  {
    name: "Honest, Personalised Consultations",
    icon: LuSparkles,
    description:
      "We believe patients deserve clear answers, not sales pitches. If you're not the right candidate for a hair transplant, we'll tell you honestly and recommend alternatives that are better suited to your condition.",
    list: [],
    // image: "https://res.cloudinary.com/n0ccg2u6/image/upload/bald_i39yp8.png",
    image: "/consultation.avif",
  },
  {
    name: "Natural Hairline Design",
    icon: LuLayers,
    description:
      "A successful hair transplant shouldn't look like you've had one. Every hairline is designed according to your facial proportions, age, existing density, and future pattern of hair loss to create results that look yours naturally.",
    list: [],
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/hairthinning_urxqij.png",
  },
  {
    name: "Advanced Hair Restoration Techniques",
    icon: LuSprout,
    description:
      "To maximise survival and promote healthy, natural hair growth, we use advanced FUE-based techniques such as Sapphire Hair Transplant and Bio FUE protocols, as well as meticulous graft handling.",
    listLabel: "Techniques :",
    list: [
      "HFD BIO FUE Technique",
      "Advance BIO FUE Technique",
      "BIO FUE Technique",
      "Standard FUE Technique",
    ],
    // image: "https://res.cloudinary.com/n0ccg2u6/image/upload/scalp_dvynfh.png",
    image: "/Restoration.avif",
  },
  {
    name: "Is Hair Loss Starting to Affect Your Confidence?",
    icon: LuLeaf,
    description:
      "Hair loss often changes more than your appearance. It changes the way you live. These aren't just cosmetic concerns. They're signs that hair loss is beginning to affect your quality of life. And that's when seeking professional guidance becomes important.",
    listLabel: "You may find yourself :",
    list: [
      "Adjusting your hairstyle before every meeting.",
      "Avoiding photographs or videos.",
      "Feeling older than your actual age.",
      "Wearing caps more often than you'd like.",
      "Losing confidence during interviews, presentations, or social gatherings.",
      "Constantly checking your hairline in the mirror.",
    ],
    image: "/hair-loss.jpg",
    // image: "https://res.cloudinary.com/n0ccg2u6/image/upload/hair-trinity_yud9gy.jpg",
    featured: true,
  },
]

const viewportOnce = { once: true, margin: "-80px" } as const

export default function Conditions() {
  const [active, setActive] = useState(0)
  const handleActive = useCallback((i: number) => setActive(i), [])
  const current = conditions[active]

  return (
    <section
      id="conditions"
      data-no-cine
      className="relative overflow-clip bg-white py-14 font-[family-name:var(--font-merriweather)] sm:py-16 lg:py-8 max-[470px]:py-6"
    >
      {/* Soft light blooms for depth. */}
      <div
        className="pointer-events-none absolute -left-24 top-40 h-96 w-96 rounded-full bg-[#231f20]/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-40 h-[28rem] w-[28rem] rounded-full bg-[#f52227]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        {/* Section heading. */}
        <div className="mx-auto max-w-[82ch] text-center">
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
              Why Infinity
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

          <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.15rem]">
            Why Patients Choose{" "}
            <span className="relative inline-block font-black italic text-[#f52227]">
              Infinity Aesthetics
              <span aria-hidden className="absolute -bottom-1 left-0 h-0.5 w-full origin-left -rotate-1 bg-[#f52227]" />
            </span>{" "}
            <span className="inline-flex -rotate-1 items-center rounded-full border border-[#f52227] bg-[#f52227]/10 px-3 py-0.5 text-[0.82em] text-[#231f20] shadow-[0_0_0_3px_rgba(245,34,39,0.08)]">Clinic</span>
          </h2>
          <p className="mx-auto mt-4 text-sm leading-relaxed text-[#62595c]">
            A Hair Transplant Is More Than a Procedure. It&apos;s a Medical Decision.
          </p>
        </div>

        <div className="mt-8 grid gap-x-16 lg:mt-14 lg:grid-cols-[1fr_1.05fr]">
          {/* LEFT — the scrolling narrative. */}
          <div className="relative">
            {conditions.map((c, i) => (
              <TextBlock
                key={c.name}
                condition={c}
                index={i}
                isActive={i === active}
                onActive={handleActive}
              />
            ))}
          </div>

          {/* RIGHT — the pinned, wiping frame (desktop only): image + heading. */}
          <div className="hidden lg:block">
            <div className="sticky top-[12vh] h-[76vh]">
                <div className="relative h-full w-full overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(35,31,32,0.28)] ring-1 ring-inset ring-white/30">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    initial={{ clipPath: "inset(0 0 100% 0)" }}
                    animate={{ clipPath: "inset(0 0 0% 0)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute inset-0"
                  >
                    {/* Slow ken-burns drift keeps the frame alive while pinned. */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1.12 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 6, ease: "easeOut" }}
                    >
                      <Visual condition={current} priority />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Framing washes for legibility + depth. */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/10 to-[#111111]/30"
                  aria-hidden="true"
                />

                {/* Bottom caption — heading only. */}
                {/* <div className="absolute inset-x-7 bottom-7">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={active}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="display text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-4xl"
                    >
                      {current.name}
                    </motion.h3>
                  </AnimatePresence>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Left narrative step — reports itself active when it crosses centre.        */
/* -------------------------------------------------------------------------- */
function TextBlock({
  condition,
  index,
  isActive,
  onActive,
}: {
  condition: Condition
  index: number
  isActive: boolean
  onActive: (i: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  // Active while the step's centre sits within the middle band of the viewport.
  const inView = useInView(ref, { margin: "-48% 0px -48% 0px" })
  const Icon = condition.icon

  useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <div
      ref={ref}
      className={`relative flex min-h-0 flex-col justify-center border-l py-9 pl-6 transition-colors duration-500 lg:min-h-[76vh] lg:py-12 lg:pl-8 ${
        isActive ? "border-[#f52227]" : "border-[#231f20]/10"
      }`}
    >
      {/* Active marker dot on the rail. */}
      <span
        className={`absolute -left-[7px] top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full ring-4 ring-white transition-all duration-500 lg:block ${
          isActive ? "scale-100 bg-[#f52227]" : "scale-75 bg-[#231f20]/15"
        }`}
        aria-hidden="true"
      />

      {/* Oversized ghost numeral — an editorial accent above the title. */}
      <span
        className="pointer-events-none absolute right-1 -top-2 select-none display text-[5.5rem] font-bold leading-none tracking-tighter text-[#231f20]/[0.045] lg:text-[7.5rem]"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        animate={{ opacity: isActive ? 1 : 0.5 }}
      >
        {/* Eyebrow — icon badge + program label. */}
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 flex-none items-center justify-center rounded-2xl border transition-colors duration-500 ${
              isActive
                ? "border-[#f52227] bg-[#fff5f5] text-[#231f20]"
                : "border-[#eadfe0] bg-white text-[#62595c]"
            }`}
          >
            <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-[#62595c]">
            Infinity Hair Restoration
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-[#231f20] sm:text-3xl lg:text-[2.15rem]">
          {condition.name}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#62595c]">{condition.description}</p>

        {condition.list.length > 0 && <MetaList label={condition.listLabel} items={condition.list} />}

        <a
          href="#book"
          className="group/btn mt-8 inline-flex w-fit items-center justify-center rounded-full bg-[#f52227] px-6 py-3 text-sm font-bold leading-none text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#cf1c20] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f52227]"
        >
          <span className="inline-flex items-center gap-2">
            Book Your Consultation
            <LuArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </span>
        </a>

        {/* Mobile visual — the sticky frame is desktop-only. */}
        <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_16px_50px_rgba(35,31,32,0.15)] lg:hidden">
          <Visual condition={condition} priority={index === 0} />
        </div>
      </motion.div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Meta list — the "Best For" label + items as readable check-chips.          */
/* -------------------------------------------------------------------------- */
function MetaList({ label, items }: { label?: string; items: string[] }) {
  return (
    <div className="mt-6">
      {label && (
        <p className="text-xs font-bold uppercase tracking-widest text-[#231f20]">{label}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#eadfe0] bg-white px-3 py-1.5 text-sm font-medium text-[#62595c]"
          >
            <LuCheck className="h-3.5 w-3.5 flex-none text-[#f52227]" strokeWidth={2.5} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Visual — a real photo, or a branded navy panel as a fallback.              */
/* -------------------------------------------------------------------------- */
function Visual({ condition, priority }: { condition: Condition; priority?: boolean }) {
  if (!condition.image) return <BrandPanel />
  return (
    <Image
      src={condition.image}
      alt={condition.name}
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 50vw"
      className="object-cover"
    />
  )
}

/** Branded deep-navy panel with a soft peach bloom, used only as a fallback. */
function BrandPanel() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#231f20]">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#f52227]/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.1]" aria-hidden="true">
        <div className="absolute inset-12 rounded-2xl border border-white" />
        <div className="absolute inset-x-12 top-1/2 h-px bg-white" />
        <div className="absolute inset-y-12 left-1/2 w-px bg-white" />
      </div>
    </div>
  )
}
