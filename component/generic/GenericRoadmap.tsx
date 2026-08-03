const steps = [
  {
    eyebrow: "Clinical Expertise",
    title: "Board-Certified Dermatologist",
    description: "Every treatment plan is developed after a thorough consultation and clinical assessment.",
    stage: "Benefit 1",
    color: "#f52227",
    iconPath: "/generic-icon-1.png",
  },
  {
    eyebrow: "Care Built Around You",
    title: "Personalised Hair Restoration Plans",
    description: "Your treatment is tailored to your stage of hair loss, scalp condition, and long-term goals.",
    stage: "Benefit 2",
    color: "#f52227",
    iconPath: "/generic-icon-2.png",
  },
  {
    eyebrow: "Complete Solutions",
    title: "Advanced Hair Restoration Techniques",
    description: "From non-surgical hair regrowth therapies to advanced hair transplant procedures, we offer comprehensive solutions under one roof.",
    stage: "Benefit 3",
    color: "#f52227",
    iconPath: "/generic-icon-3.png",
  },
  {
    eyebrow: "Specialist Precision",
    title: "Doctor-Led Procedures",
    description: "Hair transplant and needle-based treatments are personally performed by Dr. Narendra Nikumbh, ensuring precision, consistency, and personalised care.",
    stage: "Benefit 4",
    color: "#f52227",
    iconPath: "/generic-icon-4.png",
  },
  {
    eyebrow: "Naturally You",
    title: "Focus on Natural Results",
    description: "Whether restoring density or designing a new hairline, our goal is to achieve results that look natural and complement your features.",
    stage: "Benefit 5",
    color: "#f52227",
    iconPath: "/generic-icon-5.png",
  },
]

export default function GenericRoadmap() {
  return (
    <section id="why-us" className="bg-white px-5 py-6 font-[family-name:var(--font-inter)] sm:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-[1540px]">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[2px] text-[#231f20] before:h-[2px] before:w-9 before:rounded-full before:bg-[#f52227] before:content-['']">
            <span className="size-1.5 rounded-full bg-[#f52227]" aria-hidden="true" />
            Why Infinity
          </span>
        </div>
        <h2 className="mx-auto mt-3 max-w-[850px] text-center font-[family-name:var(--font-merriweather)] text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.03em] text-[#231f20]">
          Why Choose{" "}
          <span className="relative inline-block text-[#f52227] after:absolute after:-bottom-2 after:left-[5%] after:h-[3px] after:w-[90%] after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#f52227] after:to-transparent after:content-['']">
            Infinity Aesthetics Clinic?
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-[1050px] text-center text-[clamp(0.78rem,1vw,0.875rem)] leading-[1.75] text-[#929297]">
          Expert-led, personalised hair restoration care focused on safe treatment planning and natural-looking results.
        </p>

        <div className="relative mt-6 hidden lg:block">
          <div className="absolute left-0 right-0 top-[77px] h-[10px] bg-[#eadfe0]" />
          <div className="grid grid-cols-5 gap-2">
            {steps.map(({ eyebrow, title, description, stage, color, iconPath }) => (
              <article key={stage} className="relative flex min-w-0 flex-col px-3">
                <div className="flex h-[77px] items-center gap-3 pl-1">
                  <span
                    className="relative z-10 grid size-[58px] shrink-0 place-items-center rounded-full border-2 border-[#f52227] bg-white"
                  >
                    <span
                      aria-hidden="true"
                      className="size-9 bg-[#f52227] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                      style={{ maskImage: `url(${iconPath})`, WebkitMaskImage: `url(${iconPath})` }}
                    />
                  </span>
                  <strong className="max-w-[135px] text-[13px] font-bold leading-[1.15]" style={{ color }}>
                    {eyebrow}
                  </strong>
                </div>

                <span className="ml-[29px] h-[38px] w-px" style={{ backgroundColor: color }} />
                <span className="ml-[26px] size-[7px] rounded-full" style={{ backgroundColor: color }} />

                <div className="min-h-[155px] pt-4">
                  <h3 className="font-[family-name:var(--font-merriweather)] text-[clamp(0.95rem,1.35vw,1.08rem)] font-bold text-[#18181c]">{title}</h3>
                  <p className="mt-2 max-w-[225px] text-[clamp(0.78rem,1vw,0.875rem)] leading-[1.65] text-[#626267]">{description}</p>
                </div>

                <div className="mt-auto bg-[#fff0f0] py-2 text-center text-[clamp(0.75rem,1vw,0.875rem)] font-bold" style={{ color }}>
                  {stage}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-xl space-y-5 lg:hidden">
          <div className="absolute bottom-8 left-[27px] top-8 w-1 rounded-full bg-[#d6d6d8]" />
          {steps.map(({ eyebrow, title, description, stage, color, iconPath }) => (
            <article key={stage} className="relative flex gap-4 rounded-xl border border-[#ececee] bg-[#fafafa] p-4 shadow-[0_8px_22px_rgba(35,31,32,0.05)]">
              <span
                className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-2 border-[#f52227] bg-white shadow-[0_5px_12px_rgba(245,34,39,0.18)]"
              >
                <span
                  aria-hidden="true"
                  className="size-7 bg-[#f52227] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                  style={{ maskImage: `url(${iconPath})`, WebkitMaskImage: `url(${iconPath})` }}
                />
              </span>
              <div>
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.8px]" style={{ color }}>
                  {stage} · {eyebrow}
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-merriweather)] text-[clamp(0.95rem,1.35vw,1.08rem)] font-bold text-[#18181c]">{title}</h3>
                <p className="mt-1.5 text-[clamp(0.78rem,1vw,0.875rem)] leading-[1.65] text-[#626267]">{description}</p>
              </div>
            </article>
          ))}
        </div>
                <div className="mt-6 flex justify-center lg:mt-8">
          <a
            href="#appointment"
            className="relative inline-flex min-h-[46px] items-center justify-center overflow-hidden rounded-[18px] bg-[#f52227] px-7 font-[family-name:var(--font-merriweather)] text-[clamp(0.75rem,1vw,0.875rem)] font-bold uppercase tracking-[1px] text-white before:absolute before:left-1/2 before:top-1/2 before:h-[220%] before:w-[145%] before:-translate-x-1/2 before:-translate-y-1/2 before:animate-[spin_2.8s_linear_infinite] before:bg-[conic-gradient(#cf1c20_0deg,#cf1c20_245deg,#ffffff_275deg,#ffffff_300deg,#cf1c20_330deg)] before:content-[''] after:absolute after:inset-[2px] after:rounded-[16px] after:bg-[#f52227] after:content-[''] sm:px-9"
          >
            <span className="relative z-10">Book Your Consultation</span>
          </a>
        </div>
      </div>
    </section>
  )
}
