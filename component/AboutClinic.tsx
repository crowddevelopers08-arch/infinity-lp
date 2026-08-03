import Image from "next/image"

const FEATURES = [
  {
    title: "Medical treatment",
    description: "Some patients need medical treatment to slow down hair fall.",
  },
  {
    title: "Advanced regrowth therapies",
    description: "Some benefit from advanced hair regrowth therapies.",
  },
  {
    title: "Hair transplantation",
    description: "Others are ideal candidates for a hair transplant.",
  },
]

function FeatureIcon() {
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#f52227] shadow-sm">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
        <circle cx="12" cy="12" r="7.25" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8.5 12.25 10.8 14.5l4.9-5.2M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function AboutClinic() {
  return (
    <section
      id="why"
      className="overflow-hidden bg-[#1c1c1f] font-[family-name:var(--font-merriweather)] text-white"
    >
      <div className="mx-auto grid max-w-[1180px] items-center px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12 lg:py-8">
        <div className="relative order-2 mx-auto my-12 w-full max-w-[580px] lg:order-none lg:my-0">
          <div className="absolute -bottom-3 -left-3 h-full w-full rounded-[50%] border-[7px] border-[#f52227]" />

          <div className="relative aspect-[0.82/1] overflow-hidden rounded-[50%] bg-[#231f20]">
            <Image
              src="/image-about.avif"
              alt="A doctor discussing a personalised treatment plan with a patient"
              fill
              sizes="(max-width: 1024px) 90vw, 510px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#231f20]/35 via-transparent to-[#f52227]/10" />
          </div>

          <div className="absolute -bottom-2 right-0 grid size-36 place-items-center rounded-full bg-[#1c1c1f] shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:-right-4 sm:size-40">
            <svg aria-hidden="true" viewBox="0 0 160 160" className="absolute inset-0 size-full animate-[spin_24s_linear_infinite]">
              <defs>
                <path
                  id="experience-ring"
                  d="M 80,80 m -57,0 a 57,57 0 1,1 114,0 a 57,57 0 1,1 -114,0"
                />
              </defs>
              <text
                fill="white"
                fontSize="12.5"
                fontWeight="700"
                letterSpacing="3"
                style={{ fontFamily: "var(--font-merriweather), Merriweather, Georgia, serif" }}
              >
                <textPath href="#experience-ring">YEARS EXPERIENCE  •  BOOK CONSULT • </textPath>
              </text>
            </svg>
            <span className="grid size-14 place-items-center rounded-full bg-[#f52227] text-base font-bold leading-none text-white sm:text-lg">
              20+
            </span>
          </div>
        </div>

        <div className="contents lg:block lg:pl-1">
          <div className="order-1 inline-flex items-center gap-3">
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
            <span className="border-b border-[#f52227]/40 pb-1 text-xs font-bold uppercase tracking-widest text-[#ff5b5f] sm:text-sm">
              Our Approach
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

          <div className="order-1 mt-2 max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.15rem]">
              Every{" "}
              <span className="relative inline-block font-black italic text-[#ff5b5f]">
                Hair Loss Journey
                <span aria-hidden className="absolute -bottom-1 left-0 h-0.5 w-full origin-left -rotate-1" />
              </span>{" "}
              Is Different. {" "}
              <span className="inline-flex -rotate-1 items-center rounded-full border border-[#f52227] bg-[#f52227]/10 px-3 py-0.5 text-[0.82em] text-white shadow-[0_0_0_3px_rgba(245,34,39,0.08)]">
                Your Treatment
              </span>
              {" "}Should Be Too.
            </h2>
          </div>

          <p className="order-1 mt-3 max-w-xl text-sm font-normal leading-relaxed text-white/65 sm:mt-5">
            Many people believe hair transplantation is the only answer to hair loss. It isn&apos;t.
          </p>

          <div className="order-3 mt-5 space-y-1 sm:space-y-5">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <FeatureIcon />
                <div>
                  <h3 className="text-base font-bold leading-snug tracking-tight sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-sm font-normal leading-relaxed text-white/60">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="order-3 mt-4 max-w-xl border-l-2 border-[#f52227] pl-6 text-sm font-normal leading-relaxed text-white/70">
            The key is knowing which stage you&apos;re in and choosing the treatment that gives you the best
            long-term outcome.
          </p>

          <p className="order-3 mt-4 max-w-xl text-sm font-bold leading-relaxed text-white">
            That&apos;s why we don&apos;t begin with procedures. We begin with diagnosis.
          </p>

          <a
            href="#book"
            className="order-3 mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/80 px-7 py-3 text-sm font-bold leading-none text-white transition-colors hover:border-[#f52227] hover:bg-[#f52227] sm:mt-6"
          >
            Contact
            <span aria-hidden className="text-lg leading-none">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
