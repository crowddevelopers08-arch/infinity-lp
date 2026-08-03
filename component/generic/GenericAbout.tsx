import Image from "next/image"

export default function GenericAbout() {
  return (
    <section id="about-us" className="bg-white font-[family-name:var(--font-inter)] text-[#3e3d42]">
      <div className="mx-auto grid w-full max-w-[1500px] items-center px-5 py-14 sm:px-8 lg:grid-cols-[minmax(420px,0.92fr)_minmax(500px,1.08fr)] lg:gap-20 lg:px-12 lg:py-20 xl:gap-24">
        <div className="relative order-3 mx-auto mt-10 aspect-square w-full max-w-[440px] overflow-hidden rounded-full bg-[#f5eeee] lg:order-none lg:mt-0 lg:max-w-[645px]">
          <Image
            src="/image-about.avif"
            alt="Infinity Aesthetics Clinic doctor consulting with a patient"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 645px"
            className="object-cover"
          />
        </div>

        <div className="contents lg:block lg:w-full lg:max-w-[750px]">
          <span className="order-1 inline-flex w-fit items-center gap-3 text-[13px] font-bold uppercase tracking-[2px] text-[#231f20] before:h-[2px] before:w-9 before:rounded-full before:bg-[#f52227] before:content-['']">
            <span className="size-1.5 rounded-full bg-[#f52227]" aria-hidden="true" />
            Hair Restoration
          </span>

          <h1 className="order-2 mt-4 max-w-[720px] font-[family-name:var(--font-merriweather)] text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.03em] text-[#231f20]">
            Your Hair Restoration Journey Starts With the{" "}
            <span className="relative inline-block text-[#f52227] after:absolute after:-bottom-2 after:left-[5%] after:h-[3px] after:w-[90%] after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#f52227] after:to-transparent after:content-['']">
              Right Diagnosis
            </span>
          </h1>

          <p className="order-4 mt-8 max-w-[745px] text-[clamp(0.78rem,1vw,0.875rem)] leading-[1.8] text-[#545158] lg:mt-7">
            Hair loss isn&apos;t the same for everyone. Some people need advanced hair regrowth treatments, while others may benefit from a hair transplant. The key is identifying the cause, understanding the stage of hair loss, and choosing the right treatment at the right time.
          </p>
          <p className="order-5 mt-2 max-w-[745px] text-[clamp(0.78rem,1vw,0.875rem)] leading-[1.75] text-[#545158]">
            At Infinity Aesthetics Clinic, every treatment begins with a detailed consultation, scalp assessment, and a personalised hair restoration plan designed around your unique needs.
          </p>

          <a
            href="#appointment"
            className="relative order-6 mt-4 inline-flex min-h-[44px] w-fit items-center justify-center overflow-hidden rounded-[18px] bg-[#f52227] px-7 font-[family-name:var(--font-merriweather)] text-[clamp(0.75rem,1vw,0.875rem)] font-bold uppercase tracking-[1px] text-white before:absolute before:left-1/2 before:top-1/2 before:h-[220%] before:w-[145%] before:-translate-x-1/2 before:-translate-y-1/2 before:animate-[spin_2.8s_linear_infinite] before:bg-[conic-gradient(#cf1c20_0deg,#cf1c20_245deg,#ffffff_275deg,#ffffff_300deg,#cf1c20_330deg)] before:content-[''] after:absolute after:inset-[2px] after:rounded-[16px] after:bg-[#f52227] after:content-[''] sm:px-9"
          >
            <span className="relative z-10">Book Appointment</span>
          </a>
        </div>
      </div>
    </section>
  )
}
