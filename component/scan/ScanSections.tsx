import Image from "next/image"
import type { ReactNode } from "react"
import {
  LuArrowRight,
  LuCheck,
  LuClipboardList,
  LuFlaskConical,
  LuLock,
  LuHandHeart,
  LuMessagesSquare,
  LuScanFace,
  LuSparkles,
  LuSprout,
  LuSyringe,
  LuUserRoundCheck,
} from "react-icons/lu"
import { IMAGES, PERSONALIZATION_FACTORS, TREATMENTS, TREATMENT_NOTE, type TreatmentId } from "./scanData"

/* ── shared bits ─────────────────────────────────────────────── */

export function ScanCta({
  children,
  dark = false,
  inverted = false,
  size = "md",
}: {
  children: ReactNode
  dark?: boolean
  /** White button for use on a red background. */
  inverted?: boolean
  size?: "md" | "lg"
}) {
  const tone = inverted
    ? "bg-white text-[#f52227] shadow-[0_14px_34px_rgba(35,31,32,0.28)] hover:bg-[#231f20] hover:text-white"
    : dark
      ? "bg-[#f52227] text-white shadow-[0_12px_30px_rgba(245,34,39,0.28)] hover:bg-white hover:text-[#231f20]"
      : "bg-[#f52227] text-white shadow-[0_12px_30px_rgba(245,34,39,0.28)] hover:bg-[#231f20]"
  return (
    <a
      href="#scan"
      className={`btn-wave group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 ${
        size === "lg" ? "whitespace-nowrap px-7 py-4 text-base sm:px-10 sm:py-5 sm:text-lg" : "px-7 py-3.5 text-sm"
      } ${tone}`}
    >
      <LuScanFace className="relative z-10 size-5" strokeWidth={2.1} aria-hidden />
      <span className="relative z-10">{children}</span>
      <LuArrowRight className="relative z-10 size-4 transition-transform group-hover:translate-x-1" aria-hidden />
    </a>
  )
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest sm:text-sm ${
        light ? "text-[#ff5b5f]" : "text-[#f52227]"
      }`}
    >
      <span aria-hidden className="h-0.5 w-7 rounded-full bg-gradient-to-r from-[#f52227] to-[#231f20]" />
      {children}
    </p>
  )
}

const TREATMENT_ICONS: Record<TreatmentId, typeof LuSyringe> = {
  prp: LuSyringe,
  gfc: LuFlaskConical,
  transplant: LuSprout,
  care: LuHandHeart,
}

/* ── SECTION 1 · Hero ───────────────────────────────────────── */

export function ScanHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#eadfe0] bg-white text-[#231f20]">
      <div className="relative mx-auto flex max-w-5xl items-center justify-center px-5 pb-10 pt-7 text-center sm:min-h-[540px] sm:px-8 sm:pb-16 sm:pt-14 lg:min-h-[580px] lg:pb-20 lg:pt-16">
        <div className="min-w-0">
          <div className="hero-slow-item hero-slow-left hero-delay-1">
            <Kicker>Scalp Scan &amp; Hair Assessment</Kicker>
          </div>

          <h1 className="hero-slow-item hero-slow-left hero-delay-2 mt-4 text-[2.15rem] font-bold leading-[1.2] tracking-tight sm:text-5xl sm:leading-[1.15] lg:text-6xl">
            Understand Your{" "}
            <span className="inline-block font-black italic text-[#f52227]">
              Hair Loss.
            </span>{" "}
            <span className="whitespace-nowrap">Discover the</span>{" "}
            <span className="mt-2 inline-flex -rotate-1 items-center rounded-full border border-[#f52227] bg-[#f52227]/10 px-3 py-0.5 text-[0.72em] shadow-[0_0_0_3px_rgba(245,34,39,0.08)] sm:mt-0 sm:text-[0.82em]">
              Right Restoration Approach.
            </span>
          </h1>

          <p className="hero-slow-item hero-slow-left hero-delay-3 mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#62595c] sm:mt-6 sm:text-xl">
            Know your hair concerns with an expert-led scalp assessment and explore personalized restoration options
            at Infinity Aesthetics.
          </p>

          <ul className="hero-slow-item hero-slow-left hero-delay-4 mt-6 flex flex-wrap justify-center gap-2.5 sm:mt-9 sm:gap-3">
            {["Expert Guidance", "Personalized Recommendations", "Advanced Hair Restoration Options"].map((point) => (
              <li
                key={point}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#eadfe0] bg-white px-5 py-2.5 text-sm font-bold text-[#231f20] shadow-[0_5px_16px_rgba(31,42,55,0.06)] sm:text-base"
              >
                <span className="grid size-6 place-items-center rounded-full bg-[#f52227] text-white">
                  <LuCheck className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="hero-slow-item hero-slow-left hero-delay-5 mt-7 sm:mt-10">
            <ScanCta size="lg">Scan My Scalp</ScanCta>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Corner brackets + sweeping line that frame an image like a live scan. */
export function ScanFrame() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-4 z-[1]">
      <span className="absolute left-0 top-0 size-10 rounded-tl-2xl border-l-[3px] border-t-[3px] border-[#f52227]" />
      <span className="absolute right-0 top-0 size-10 rounded-tr-2xl border-r-[3px] border-t-[3px] border-[#f52227]" />
      <span className="absolute bottom-0 left-0 size-10 rounded-bl-2xl border-b-[3px] border-l-[3px] border-[#f52227]" />
      <span className="absolute bottom-0 right-0 size-10 rounded-br-2xl border-b-[3px] border-r-[3px] border-[#f52227]" />
      <span className="scan-line absolute inset-x-2 h-16 bg-gradient-to-b from-transparent via-[#f52227]/25 to-transparent">
        <span className="absolute inset-x-0 top-1/2 h-0.5 bg-[#f52227] shadow-[0_0_14px_2px_rgba(245,34,39,0.6)]" />
      </span>
    </div>
  )
}

/* ── SECTION 2 · Problem awareness ──────────────────────────── */

const CONCERN_TILES = [
  { label: "Hair Fall", image: IMAGES.hairFall },
  { label: "Thinning", image: IMAGES.thinning },
  { label: "Receding Hairlines", image: IMAGES.receding },
  { label: "Bald Patches", image: IMAGES.patchy },
]

export function ProblemAwareness() {
  return (
    <section className="bg-[#fffafa] px-5 py-10 text-[#231f20] sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-[1280px] items-center gap-7 sm:gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Kicker>Know the Cause</Kicker>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl">
            Every Hair Loss Concern Needs a{" "}
            <span className="font-black italic text-[#f52227]">Different Approach.</span>
          </h2>
          <p className="mt-4 max-w-xl border-l-4 sm:mt-5 border-[#f52227] bg-white px-5 py-4 text-sm leading-relaxed text-[#62595c] shadow-[0_5px_16px_rgba(31,42,55,0.06)] sm:text-base">
            Hair fall, thinning, receding hairlines and bald patches can have different causes. Understanding your
            scalp condition and hair loss pattern helps identify the right approach for your hair restoration journey.
          </p>
          <div className="mt-8 hidden lg:block">
            <ScanCta>Understand my Hair Concern</ScanCta>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {CONCERN_TILES.map((tile, index) => (
            <figure
              key={tile.label}
              className={`group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#231f20] ${index % 2 ? "translate-y-6" : ""}`}
            >
              <Image
                src={tile.image}
                alt={tile.label}
                fill
                sizes="(max-width: 1024px) 45vw, 300px"
                className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#171415]/85 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-3 bottom-3 rounded-full bg-white/95 px-3 py-2 text-center text-xs font-bold text-[#231f20] sm:text-sm">
                {tile.label}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* mobile: button sits below the images */}
        <div className="mt-4 sm:mt-6 lg:hidden">
          <ScanCta>Understand my Hair Concern</ScanCta>
        </div>
      </div>
    </section>
  )
}

/* ── SECTION 3 · Scalp scan / assessment process ───────────── */

const ASSESSMENT_STEPS = [
  {
    title: "Share Your Hair Concern",
    copy: "Tell us about your hair fall, thinning, baldness or scalp-related concerns.",
    icon: LuClipboardList,
  },
  {
    title: "Provide Your Hair Details",
    copy: "Share relevant information about your hair condition or scalp images, if required.",
    icon: LuScanFace,
  },
  {
    title: "Get Expert Guidance",
    copy: "Our team will review your concern and help you understand possible next steps.",
    icon: LuUserRoundCheck,
  },
  {
    title: "Explore Suitable Options",
    copy: "Discuss available hair restoration approaches based on your assessment.",
    icon: LuSparkles,
  },
]

export function AssessmentProcess() {
  return (
    <section id="assessment" className="relative overflow-hidden bg-[#171415] px-5 py-10 text-white sm:px-8 sm:py-20 lg:px-12">
      <span aria-hidden className="absolute -right-24 top-10 size-96 rounded-full border border-white/5" />
      <span aria-hidden className="absolute -right-8 top-28 size-72 rounded-full border border-[#f52227]/15" />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <Kicker light>Scalp Scan</Kicker>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl">
            Scan Your Scalp. Understand Your Hair.{" "}
            <span className="font-black italic text-[#ff5b5f]">Plan Your Next Step.</span>
          </h2>
        </div>

        <ol className="mt-7 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {ASSESSMENT_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition-all sm:p-6 duration-300 hover:-translate-y-1 hover:border-[#f52227]/60 hover:bg-white/[0.07]"
            >
              <span aria-hidden className="absolute -right-2 -top-4 text-7xl font-black text-white/[0.06]">
                0{index + 1}
              </span>
              <span className="grid size-12 place-items-center rounded-2xl bg-[#f52227] text-white shadow-[0_10px_24px_rgba(245,34,39,0.3)]">
                <step.icon className="size-6" aria-hidden />
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#ff5b5f] sm:mt-5">Step 0{index + 1}</p>
              <h3 className="mt-1.5 text-lg font-bold leading-snug">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{step.copy}</p>
            </li>
          ))}
        </ol>

        <div className="mt-7 text-center sm:mt-10">
          <ScanCta dark>Start My Scalp Scan</ScanCta>
        </div>
      </div>
    </section>
  )
}

/* ── SECTION 4 · How it works ───────────────────────────────── */

const HOW_STEPS = [
  {
    title: "Tell Us About Your Hair",
    copy: "Answer a few simple questions about your hair fall, thinning, baldness or scalp concerns.",
  },
  {
    title: "Share Your Hair Details",
    copy: "Provide the required information or images to help our team understand your hair condition.",
  },
  {
    title: "Speak With Our Experts",
    copy: "Connect with our team to discuss your concerns and get guidance on the next steps.",
  },
  {
    title: "Explore Your Hair Restoration Options",
    copy: "Understand whether hair care solutions, regenerative treatments or hair transplantation may be suitable for your condition.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-5 py-10 text-[#231f20] sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative order-2 mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:order-none lg:max-w-[480px]">
          <div className="relative aspect-square overflow-hidden rounded-full bg-[#f5eeee]">
            <Image
              src={IMAGES.consult}
              alt="Infinity Aesthetics Clinic doctor consulting with a patient"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
          <span aria-hidden className="absolute -inset-3 rounded-full border border-dashed border-[#f52227]/40" />
          <span className="absolute bottom-6 right-2 inline-flex items-center gap-2 rounded-full bg-[#231f20] px-5 py-2.5 text-xs font-bold text-white shadow-xl sm:text-sm">
            <LuMessagesSquare className="size-4 text-[#ff5b5f]" aria-hidden />4 simple steps
          </span>
        </div>

        <div className="order-1 lg:order-none">
          <Kicker>How It Works</Kicker>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl">
            A Simple Process to <span className="font-black italic text-[#f52227]">Understand Your Hair Loss</span>{" "}
            Better
          </h2>

          <ol className="relative mt-6 space-y-5 sm:mt-8 sm:space-y-6 before:absolute before:bottom-4 before:left-[1.2rem] before:top-4 before:w-0.5 before:bg-gradient-to-b before:from-[#f52227] before:to-[#eadfe0]">
            {HOW_STEPS.map((step, index) => (
              <li key={step.title} className="relative flex gap-5">
                <span className="relative z-10 grid size-10 flex-none place-items-center rounded-full border-2 border-[#f52227] bg-white text-sm font-black text-[#f52227]">
                  {index + 1}
                </span>
                <div className="pt-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#f52227]">Step {index + 1}</p>
                  <h3 className="mt-1 text-lg font-bold leading-snug">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#62595c]">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-9 hidden lg:block">
            <ScanCta>Start My Scalp Scan</ScanCta>
          </div>
        </div>

        {/* mobile: button sits below the image */}
        <div className="order-3 lg:hidden">
          <ScanCta>Start My Scalp Scan</ScanCta>
        </div>
      </div>
    </section>
  )
}

/* ── SECTION 5 · Treatment options ──────────────────────────── */

export function TreatmentOptionCard({ id, title, description }: { id: TreatmentId; title: string; description: string }) {
  const Icon = TREATMENT_ICONS[id]
  return (
    <article className="group relative h-full overflow-hidden rounded-[1.5rem] border border-[#eadfe0] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f52227] hover:shadow-[0_26px_50px_-28px_rgba(35,31,32,0.35)]">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#f52227] to-[#231f20] transition-transform duration-500 group-hover:scale-x-100" />
      <span className="grid size-12 place-items-center rounded-2xl bg-[#fff0f0] text-[#f52227] transition-colors group-hover:bg-[#f52227] group-hover:text-white">
        <Icon className="size-6" aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-bold leading-snug text-[#231f20]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#62595c]">{description}</p>
    </article>
  )
}

export function TreatmentOptions() {
  return (
    <section id="options" className="bg-[#fffafa] px-5 py-10 text-[#231f20] sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          <Kicker>Treatment Options</Kicker>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl">
            Explore Hair Restoration Options{" "}
            <span className="font-black italic text-[#f52227]">Based on Your Assessment</span>
          </h2>
        </div>

        <div className="mt-7 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {TREATMENTS.map((treatment) => (
            <TreatmentOptionCard key={treatment.id} {...treatment} />
          ))}
        </div>

        <p className="mx-auto mt-5 flex max-w-2xl items-start gap-3 rounded-2xl sm:mt-8 border border-[#f52227]/20 bg-white px-5 py-4 text-sm leading-relaxed text-[#62595c]">
          <span className="mt-0.5 rounded-full bg-[#f52227] px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
            Note
          </span>
          {TREATMENT_NOTE}
        </p>
      </div>
    </section>
  )
}

/* ── SECTION 6 · Personalization ────────────────────────────── */

export function Personalization() {
  return (
    <section className="bg-white px-5 py-10 text-[#231f20] sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-[1280px] items-center gap-6 sm:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Kicker>Personalized Plan</Kicker>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl">
            Your Hair Loss Is Unique.{" "}
            <span className="font-black italic text-[#f52227]">Your Treatment Plan Should Be Too.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#62595c] sm:mt-5 sm:text-base">
            Hair loss can vary from person to person. At Infinity Aesthetics, your hair restoration options are
            discussed after considering important factors such as:
          </p>
          <div className="mt-8 hidden lg:block">
            <ScanCta>Get My Personalized Hair Plan</ScanCta>
          </div>
        </div>

        <div>
          <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
            {PERSONALIZATION_FACTORS.map((factor, index) => (
              <li
                key={factor}
                className="flex items-start gap-3 rounded-2xl border border-[#eadfe0] bg-[#fffafa] p-4 transition-colors hover:border-[#f52227]"
              >
                <span className="grid size-8 flex-none place-items-center rounded-full bg-[#f52227] text-xs font-black text-white">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm font-bold leading-snug">{factor}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 sm:mt-8 lg:hidden">
            <ScanCta>Get My Personalized Hair Plan</ScanCta>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SECTION 7 · Why choose us ─────────────────────────────── */

const WHY_POINTS = [
  "Expert-led hair guidance",
  "Advanced hair restoration options",
  "Personalized treatment approach",
  "Support throughout your hair journey",
  "Informed treatment decisions",
]

export function WhyChooseScan() {
  return (
    <section id="why" className="relative overflow-hidden bg-gradient-to-br from-[#fff5f5] via-white to-[#fffafa] px-5 py-10 text-[#231f20] sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-[1280px] items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 mx-auto w-full max-w-[280px] sm:max-w-[400px] lg:order-1 lg:max-w-[460px]">
          <div className="relative aspect-[0.82/1] overflow-hidden rounded-[50%] bg-[#231f20]">
            <Image
              src={IMAGES.about}
              alt="A doctor discussing a personalised treatment plan with a patient"
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-cover"
            />
          </div>
          <span aria-hidden className="absolute -right-3 top-1/4 size-24 rounded-full border-[14px] border-[#f52227]/15" />
        </div>

        <div className="order-1 lg:order-2">
          <Kicker>Why Choose Us</Kicker>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl">
            Why Choose <span className="font-black italic text-[#f52227]">Infinity Aesthetics</span> for Your Hair
            Restoration Journey?
          </h2>
          <ul className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
            {WHY_POINTS.map((point) => (
              <li
                key={point}
                className="flex items-center gap-4 rounded-2xl border-l-4 border-[#f52227] bg-white px-5 py-3.5 text-sm font-bold sm:py-4 shadow-[0_5px_16px_rgba(31,42,55,0.07)] sm:text-base"
              >
                <LuCheck className="size-5 flex-none text-[#f52227]" strokeWidth={3} aria-hidden />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-9 hidden lg:block">
            <ScanCta>Get My Hair Assessment</ScanCta>
          </div>
        </div>

        {/* mobile: button sits below the image */}
        <div className="order-3 lg:hidden">
          <ScanCta>Get My Hair Assessment</ScanCta>
        </div>
      </div>
    </section>
  )
}

/* ── SECTION 8 · Hair transplant eligibility ───────────────── */

export function TransplantEligibility() {
  return (
    <section id="eligibility" className="relative isolate overflow-hidden bg-[#171415] text-white">
      <Image
        src={IMAGES.finalCta}
        alt="Dr Narendra Nikumbh discussing a hair and scalp assessment with a patient"
        fill
        sizes="100vw"
        className="-z-20 hidden object-cover object-center lg:block"
      />
      <div className="absolute inset-0 -z-10 hidden lg:block bg-[linear-gradient(90deg,rgba(18,15,16,0.98)_0%,rgba(18,15,16,0.92)_40%,rgba(18,15,16,0.58)_65%,rgba(18,15,16,0.18)_100%)]" />

      <div className="mx-auto flex max-w-[1280px] items-center px-5 py-10 sm:px-8 sm:py-16 lg:min-h-[520px] lg:px-12">
        <div className="max-w-2xl">
          <Kicker light>Hair Transplant Eligibility</Kicker>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:mt-4 sm:text-4xl">
            Considering{" "}
            <span className="inline-block font-black italic text-[#ff5b5f]">
              Hair Transplant?
            </span>{" "}
            Start With the{" "}
            <span className="inline-flex -rotate-1 items-center rounded-full border border-[#f52227] bg-[#f52227]/10 px-3 py-0.5 text-[0.82em] shadow-[0_0_0_3px_rgba(245,34,39,0.12)]">
              Right Assessment.
            </span>
          </h2>
          <p className="mt-4 border-l-4 border-[#f52227] pl-5 text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base">
            Before choosing a hair transplant, understand if it suits your hair loss condition. Our team evaluates your
            hair loss stage, goals, donor availability and other factors to guide you better.
          </p>
          <div className="mt-6 sm:mt-8">
            <ScanCta dark>Check My Hair Transplant Eligibility</ScanCta>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SECTION 9 · Final call to action (opens the scalp scan) ── */

const PREVIEW_OPTIONS = ["Hair Fall", "Hair Thinning", "Receding Hairline", "Baldness"]

/** Preview of the scalp scan's question screen; clicking it starts the real scan. */
function ScanPreviewCard() {
  return (
    <a href="#scan" aria-label="Start my scalp scan" className="group relative mx-auto block w-full max-w-sm">
      <span aria-hidden className="absolute -inset-4 rotate-3 rounded-[2rem] bg-white/10" />
      <div
        aria-hidden
        className="relative -rotate-2 rounded-[1.75rem] bg-white p-5 text-[#231f20] shadow-[0_30px_70px_rgba(35,31,32,0.35)] transition-transform duration-500 group-hover:rotate-0 sm:p-6"
      >
        <div className="flex items-center justify-between">
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#f52227]">Sample Question</span>
          <span className="rounded-full bg-[#231f20] px-2.5 py-0.5 text-[0.65rem] font-bold text-white">7 quick steps</span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#eadfe0]">
          <div className="h-full w-[14%] rounded-full bg-gradient-to-r from-[#f52227] to-[#ef565a]" />
        </div>
        <p className="mt-4 text-lg font-bold leading-snug">What&apos;s your primary hair concern?</p>
        <ul className="mt-4 space-y-2">
          {PREVIEW_OPTIONS.map((option) => (
            <li
              key={option}
              className="flex items-center justify-between rounded-xl border border-[#eadfe0] bg-[#fffafa] px-4 py-2.5 text-sm font-bold transition-colors group-hover:border-[#f52227]/40"
            >
              {option}
              <span className="size-5 rounded-full border-2 border-[#eadfe0]" />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#eadfe0] pt-3 text-[0.7rem] text-[#62595c]">
          <span className="flex items-center gap-2">
            <LuScanFace className="size-4 text-[#f52227]" />
            Includes a scalp photo step
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-[#f52227]">
            Start <LuArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </a>
  )
}

function AssessmentCtaActions() {
  return (
    <>
      <ScanCta inverted size="lg">
        Get My Scalp Assessment
      </ScanCta>
      <p className="mx-auto mt-5 flex max-w-lg items-start justify-center gap-2.5 text-left text-xs leading-relaxed text-white/80 sm:mt-7 sm:text-sm lg:mx-0 lg:justify-start">
        <span className="grid size-7 flex-none place-items-center rounded-full bg-white/15">
          <LuLock className="size-3.5" aria-hidden />
        </span>
        Your information will remain confidential. Our team will contact you to understand your concern and guide you
        through the next steps.
      </p>
    </>
  )
}

export function AssessmentCta() {
  return (
    <section id="assessment-form" className="bg-white px-4 py-8 sm:px-8 sm:py-20 lg:px-12">
      <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f52227] via-[#e41f24] to-[#b8181c] text-white shadow-[0_40px_90px_-30px_rgba(245,34,39,0.6)]">
        {/* decoration */}
        <span aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full border-[48px] border-white/10" />
        <span aria-hidden className="absolute -bottom-32 -left-20 size-96 rounded-full bg-[#231f20]/20 blur-2xl" />
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px]"
        />

        <div className="relative grid items-center gap-8 px-5 py-9 sm:gap-12 sm:px-12 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-16 lg:py-16">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/85 sm:text-sm">
              <span aria-hidden className="h-0.5 w-7 rounded-full bg-white/70" />
              Scalp Assessment
            </p>
            <h2 className="mt-3 text-[1.9rem] font-bold sm:mt-4 leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Ready to{" "}
              <span className="font-black italic">
                Understand Your Hair Loss
              </span>{" "}
              Better?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg lg:mx-0">
              Get an initial scalp and hair assessment at Infinity Aesthetics and take the first step towards a
              personalized hair restoration consultation.
            </p>
            <div className="mt-9 hidden lg:block">
              <AssessmentCtaActions />
            </div>
          </div>

          <ScanPreviewCard />

          {/* mobile: button + note sit below the preview card */}
          <div className="text-center lg:hidden">
            <AssessmentCtaActions />
          </div>
        </div>
      </div>
    </section>
  )
}
