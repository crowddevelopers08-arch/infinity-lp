import Image from "next/image"
import { LuArrowUpRight } from "react-icons/lu"

const services = [
  { title: "Understanding Your Concerns", category: "and Expectations", image: "/images-1.avif" },
  { title: "Assessing Your Scalp and ", category: "Pattern of Hair Loss", image: "/images-2.jpg" },
  { title: "Identifying the ", category: "Underlying Cause", image: "/ima.jpg" },
  { title: "Discussing Suitable ", category: "Treatment Options", image: "/images-4.avif" },
  { title: "Creating a Personalised Hair ", category: "Restoration Roadmap", image: "/images-5.avif" },
]

export default function GenericQualityServices() {
  return (
    <section id="our-approach" className="relative overflow-hidden border-y border-[#f4e9e9] bg-[#fffafa] px-5 py-6 font-[family-name:var(--font-inter)] sm:px-8 lg:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(245,34,39,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(245,34,39,0.025)_1px,transparent_1px)] [background-size:42px_42px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-36 size-[360px] rounded-full bg-[#f52227]/[0.055] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-44 -right-28 size-[420px] rounded-full bg-[#f52227]/[0.045] blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[2px] text-[#231f20] before:h-[2px] before:w-9 before:rounded-full before:bg-[#f52227] before:content-['']">
            <span className="size-1.5 rounded-full bg-[#f52227]" aria-hidden="true" />
            Our Approach
          </span>
        </div>
        <h2 className="mx-auto mt-1 max-w-[850px] text-center font-[family-name:var(--font-merriweather)] text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.03em] text-[#231f20]">
          Our Approach to{" "}
          <span className="relative inline-block text-[#f52227] after:absolute after:-bottom-2 after:left-[5%] after:h-[3px] after:w-[90%] after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#f52227] after:to-transparent after:content-['']">
            Hair Restoration
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-[900px] text-center text-[clamp(0.78rem,1vw,0.875rem)] leading-[1.75] text-[#62595c]">
          Hair restoration isn&apos;t about recommending the most advanced treatment; it&apos;s about recommending the right one.
        </p>
        <p className="mt-3 text-center font-[family-name:var(--font-merriweather)] text-[clamp(0.78rem,1vw,0.875rem)] font-bold text-[#231f20]">
          Every consultation includes:
        </p>

        <div className="mt-7 overflow-hidden pb-3 [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]">
          <div className="flex w-max animate-[reshape-marquee_48s_linear_infinite] gap-6 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...services, ...services].map((service, index) => (
            <article
              key={`${service.title}-${index}`}
              aria-hidden={index >= services.length}
              className="relative flex min-h-[420px] w-[290px] flex-none flex-col items-center rounded-[24px] bg-white px-6 pb-9 pt-11 text-center sm:w-[320px]"
            >
              <div className="relative aspect-square w-full max-w-[230px] overflow-hidden rounded-full bg-[#f4f4f4]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 230px, (max-width: 1280px) 24vw, 230px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="mt-auto pt-4">
                <h3 className="font-[family-name:var(--font-merriweather)] text-[clamp(0.95rem,1.35vw,1.08rem)] font-bold leading-snug text-[#111113]">
                  {service.title}
                </h3>
                <p className="mt-3 text-[clamp(0.78rem,1vw,0.575rem)] font-bold uppercase tracking-[1.6px] text-[#62595c]">
                  {service.category}
                </p>
              </div>

              <a
                href="#appointment"
                tabIndex={index >= services.length ? -1 : undefined}
                aria-label={`Learn more about ${service.title}`}
                className="absolute -bottom-0.5 -right-0.5 grid size-[68px] place-items-center rounded-full border-[10px] border-[#fffafa] bg-white text-[#231f20] transition-colors hover:text-[#f52227]"
              >
                <LuArrowUpRight className="size-5" strokeWidth={2} />
              </a>
            </article>
          ))}
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-[850px] text-center font-[family-name:var(--font-merriweather)] text-[clamp(0.78rem,1vw,0.875rem)] font-bold leading-relaxed text-[#231f20]">
          Because successful hair restoration begins with the right diagnosis.
        </p>
      </div>
    </section>
  )
}
