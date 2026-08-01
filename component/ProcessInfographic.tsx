import Image from "next/image"

const STEPS = [
  {
    title: "Bright Lights",
    description: "They stop worrying about bright lights.",
    icon: "/icon-1.png",
    color: "#f52227",
    left: "17.5%",
    top: "64%",
    copyPosition: "bottom",
  },
  {
    title: "Photographs",
    description: "They stop avoiding photographs.",
    icon: "/icon-2.png",
    color: "#62595c",
    left: "38.5%",
    top: "22%",
    copyPosition: "top",
  },
  {
    title: "Their Hairstyle",
    description: "They stop adjusting their hairstyle every few minutes.",
    icon: "/icon-3.png",
    color: "#ef565a",
    left: "59%",
    top: "64%",
    copyPosition: "bottom",
  },
  {
    title: "Meetings",
    description: "They stop feeling self-conscious in meetings.",
    icon: "/icon-4.png",
    color: "#231f20",
    left: "79.5%",
    top: "22%",
    copyPosition: "top",
  },
]

export default function ProcessInfographic() {
  return (
    <section id="hair" aria-labelledby="restoration-impact-title" className="overflow-hidden bg-white py-6 sm:py-8 lg:py-5">
      <header className="relative z-20 mx-auto max-w-3xl bg-white px-5 text-center">
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
            Patient Experience
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
          id="restoration-impact-title"
          className="mt-2 text-3xl font-bold leading-tight tracking-tight text-[#231f20] sm:text-4xl lg:text-[2.15rem]"
        >
          Hair Restoration Is About{" "}
          <span className="relative inline-block px-1">
            <span aria-hidden className="absolute inset-x-0 bottom-0.5 h-3 -rotate-1 bg-[#f52227]" />
            <span className="relative text-black">More Than Hair</span>
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#62595c]">
          Our patients often tell us the biggest transformation isn&apos;t what they see in the mirror. It&apos;s what
          they stop thinking about.
        </p>
      </header>

      <div className="mt-6 space-y-6 px-5 sm:hidden">
        {STEPS.map((step) => (
          <div key={`mobile-${step.title}`} className="flex items-start gap-4 text-left">
            <div className="grid size-14 shrink-0 place-items-center rounded-full border-4 border-white shadow-[0_7px_9px_rgba(0,0,0,0.24),0_0_0_1px_rgba(0,0,0,0.08)]">
              <div className="grid size-full place-items-center rounded-full" style={{ backgroundColor: step.color }}>
                <Image
                  src={step.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 object-contain brightness-0 invert"
                />
              </div>
            </div>
            <div>
              <h3 className="text-[11px] font-bold uppercase leading-snug tracking-[0.08em] text-[#231f20]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#62595c]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto pb-2 [scrollbar-width:thin] sm:mt-5 sm:block">
        <div className="relative mx-0 aspect-[1000/500] min-w-[720px] max-w-[1180px] sm:mx-auto sm:aspect-[1000/420] lg:aspect-[1000/450]">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 520"
            className="absolute inset-0 size-full"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="process-wave" x1="55" y1="0" x2="945" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#f52227" />
                <stop offset=".34" stopColor="#62595c" />
                <stop offset=".66" stopColor="#ef565a" />
                <stop offset="1" stopColor="#231f20" />
              </linearGradient>
            </defs>
            <path
              d="M55 235 C55 322 114 352 175 333 C249 310 245 125 385 114 C500 105 465 331 590 333 C708 335 670 113 795 114 C888 115 932 151 945 235"
              stroke="url(#process-wave)"
              strokeWidth="14"
              strokeLinecap="butt"
            />
          </svg>

          {STEPS.map((step) => {
            const copyIsTop = step.copyPosition === "top"

            return (
              <article
                key={`${step.title}-${step.left}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: step.left, top: step.top }}
              >
                <div
                  className={`absolute left-1/2 w-48 -translate-x-1/2 text-center ${
                    copyIsTop ? "bottom-[5rem]" : "top-[5rem]"
                  }`}
                >
                  <h2 className="text-[11px] font-bold uppercase leading-snug tracking-[0.08em] text-[#231f20] sm:text-xs">
                    {step.title}
                  </h2>
                  <span className="mx-auto mt-1.5 block h-px w-9 bg-[#bfc4c5]" />
                  <p className="mx-auto mt-2 max-w-74 text-[10px] leading-relaxed text-[#62595c] sm:text-[13px]">
                    {step.description}
                  </p>
                </div>

                <div className="grid size-[70px] place-items-center rounded-full border-[6px] border-white shadow-[0_7px_9px_rgba(0,0,0,0.24),0_0_0_1px_rgba(0,0,0,0.08)] sm:size-[78px]">
                  <div className="grid size-full place-items-center rounded-full" style={{ backgroundColor: step.color }}>
                    <Image
                      src={step.icon}
                      alt=""
                      width={30}
                      height={30}
                      className="size-7 object-contain brightness-0 invert sm:size-[30px]"
                    />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <p className="relative z-10 mx-auto mt-0 max-w-3xl px-5 text-center text-sm font-semibold leading-relaxed text-[#231f20] sm:-mt-16 lg:-mt-12">
        Because confidence returns long before the compliments do, that&apos;s what successful hair restoration
        truly means.
      </p>
    </section>
  )
}
