import Image from "next/image"
import { Fragment } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const FEATURES = [
  {
    title: "Step 1: Detailed Hair & Scalp Assessment",
    description: (
      <>
        We evaluate your <strong className="font-semibold text-[#342e30]">scalp health, donor area, and hair density</strong>,
        pattern of hair loss, medical history, and long-term goals before recommending any treatment.
      </>
    ),
    icon: "/our-icon-1.png",
  },
  {
    title: "Step 2: Personalised Hairline Planning",
    description: (
      <>
        No two hairlines are the same. Your <strong className="font-semibold text-[#342e30]">personalised hairline</strong> is
        carefully designed to suit your facial features while considering how your hair may change over the years.
      </>
    ),
    icon: "/our-icon-2.png",
  },
  {
    title: "Step 3: Precision Hair Transplant",
    description: (
      <>
        Using <strong className="font-semibold text-[#342e30]">advanced FUE hair transplant techniques</strong>, healthy hair
        follicles are carefully extracted and implanted while maintaining natural direction, density, and graft survival.
      </>
    ),
    icon: "/our-icon-3.png",
  },
  {
    title: "Step 4: Recovery & Long-Term Hair Growth",
    description: (
      <>
        Regular follow-ups, recovery guidance, and maintenance recommendations support healthy healing and{" "}
        <strong className="font-semibold text-[#342e30]">long-term hair growth</strong>.
      </>
    ),
    icon: "/our-icon-4.png",
    accent: true,
  },
]

function ProcessImage({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full pb-20 lg:pb-14 ${className}`}>
      <div className="relative aspect-[1.5/1] overflow-hidden">
        <Image
          src="/clinic-images.JPG"
          alt="A professional aesthetics facial treatment"
          fill
          sizes="(max-width: 1024px) 100vw, 38vw"
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-6 right-0 bg-[#f52227]/90 px-7 py-5 text-white backdrop-blur-sm sm:left-28 lg:-right-4 lg:left-12 xl:-right-6 xl:left-20">
        <p className="pr-24 text-sm font-bold leading-relaxed tracking-wide">
          Dr Narendra Nikumbh personally performs every stage of the procedure.
        </p>
        <a href="#book" className="mt-3 inline-block rounded-full bg-white px-4 py-2 text-sm font-bold tracking-wide text-black transition-colors duration-300 hover:bg-[#f52227]/90 hover:text-white">
          Book consultation
        </a>

        <div className="absolute bottom-4 right-5 flex overflow-hidden rounded-full bg-[#a9161a]">
          <button type="button" aria-label="Previous slide" className="grid h-8 w-12 place-items-center border-r border-white/20">
            <LuChevronLeft className="size-5" />
          </button>
          <button type="button" aria-label="Next slide" className="grid h-8 w-12 place-items-center">
            <LuChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BeautyLab() {
  return (
    <section id="process" className="overflow-hidden bg-white py-12 font-[family-name:var(--font-merriweather)] text-[#231f20] sm:py-14 lg:py-10">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-10 xl:px-16">
        <header className="mx-auto max-w-3xl text-center">
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
              Our Process
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

          <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-[#231f20] sm:text-4xl lg:text-[2.15rem]">
            Our{" "}
            <span className="relative inline-block font-black italic text-[#f52227]">
              Hair Transplant
              <span aria-hidden className="absolute -bottom-1 left-0 h-0.5 w-full origin-left -rotate-1 bg-[#f52227]" />
            </span>{" "}
            <span className="inline-flex -rotate-1 items-center rounded-full border border-[#f52227] bg-[#f52227]/10 px-3 py-0.5 text-[0.82em] text-[#231f20] shadow-[0_0_0_3px_rgba(245,34,39,0.08)]">Process</span>
          </h2>
          <p className="mx-auto mt-3 max-sm:mt-1 max-w-2xl text-sm leading-relaxed text-[#62595c]">
            Hair restoration doesn&apos;t end after the procedure.
          </p>
        </header>

        <div className="mt-5 max-sm:mt-3 grid w-full items-center gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-10 xl:gap-12">
          <div className="grid sm:grid-cols-2">
            {FEATURES.map((feature, index) => {
              const isLeft = index % 2 === 0
              const isTop = index < 2

              return (
                <Fragment key={feature.title}>
                <article
                  className={`relative px-0 py-2 sm:px-7 sm:py-6 lg:px-7 lg:py-5 xl:px-8 ${
                    isLeft ? "sm:border-r sm:border-[#eadfe0]" : ""
                  } ${isTop ? "sm:border-b sm:border-[#eadfe0]" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <span className="absolute -bottom-2 -right-2 size-11 rounded-full bg-[#fff0f0]" />
                      <Image
                        src={feature.icon}
                        alt=""
                        width={40}
                        height={40}
                        className="relative size-10 object-contain"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(20%) sepia(98%) saturate(4845%) hue-rotate(352deg) brightness(101%) contrast(94%)",
                        }}
                      />
                    </div>

                    <div>
                      <h3
                        className={`text-lg font-bold leading-snug tracking-tight sm:text-lg lg:text-[1.05rem] xl:text-lg ${
                          feature.accent ? "text-[#231f20]" : "text-[#231f20]"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <span aria-hidden className="mt-3 block h-0.5 w-12 bg-[#f52227]" />
                      <p className="mt-3 text-sm leading-relaxed text-[#62595c] sm:text-sm lg:text-[0.82rem] xl:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </article>
                {index === 1 && <ProcessImage className="my-3 sm:hidden" />}
                </Fragment>
              )
            })}
          </div>

          <ProcessImage className="hidden sm:block" />
        </div>
      </div>
    </section>
  )
}
