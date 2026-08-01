import Image from "next/image"
import { LuArrowUpRight } from "react-icons/lu"

export default function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-[#171415] font-[family-name:var(--font-merriweather)] text-white">
      <Image
        src="/final-cta-consultation.png"
        alt="Dr Narendra Nikumbh discussing a hair and scalp assessment with a patient"
        fill
        priority={false}
        sizes="100vw"
        className="-z-20 object-cover object-[68%_center] sm:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,15,16,0.98)_0%,rgba(18,15,16,0.92)_40%,rgba(18,15,16,0.58)_65%,rgba(18,15,16,0.18)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      <div className="mx-auto flex min-h-[620px] max-w-[1440px] items-center px-5 py-8 sm:px-8 sm:py-12 lg:px-16 xl:px-20">
        <div className="max-w-3xl">

          <h2 id="final-cta-title" className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.15rem]">
            Don&apos;t Decide on a Hair Transplant Until You Know You Actually Need One.
          </h2>

          <div className="mt-6 border-l-4 border-[#f52227] pl-5 sm:pl-6">
            <p className="text-sm leading-relaxed text-white/75">
              The best hair restoration journey doesn&apos;t begin with surgery.
            </p>
            <p className="mt-1 text-base font-bold leading-relaxed text-white sm:text-lg">
              It begins with the right diagnosis.
            </p>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/75">
            Meet with <strong className="text-white">Dr Narendra Nikumbh</strong> for a comprehensive hair assessment and
            receive honest, personalised guidance based on your condition, not a one-size-fits-all recommendation.
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">
            Whether your hair can still be preserved or a hair transplant is the right next step, we&apos;ll help you
            make an informed decision with confidence.
          </p>

          <a
            href="#book"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#f52227] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(245,34,39,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#231f20]"
          >
            Book Your Hair Consultation Today
            <LuArrowUpRight className="size-5" strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </section>
  )
}
