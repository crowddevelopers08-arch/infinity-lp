import { LuCheck, LuLock, LuSparkles, LuUserRoundCheck } from "react-icons/lu"
import ScanThankYouRedirect from "./ScanThankYouRedirect"

// Steps 03 and 04 of the page's assessment process — what happens after the details are shared.
const NEXT_STEPS = [
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

export default function ScanThankYouContent() {
  return (
    <section className="relative overflow-hidden px-5 py-14 sm:py-20">
      <span aria-hidden className="absolute -left-24 top-1/4 size-72 rounded-full border-[40px] border-[#f52227]/5" />
      <span aria-hidden className="absolute -right-28 bottom-0 size-96 rounded-full border-[54px] border-[#231f20]/5" />

      <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#eadfe0] bg-white shadow-[0_30px_80px_rgba(35,31,32,0.12)]">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#f52227] via-[#ef565a] to-[#231f20]" />

        <div className="px-6 py-10 text-center sm:px-12 sm:py-12">
          <span className="relative mx-auto grid size-20 place-items-center rounded-full bg-[#f52227] text-white shadow-[0_14px_35px_rgba(245,34,39,0.25)]">
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#f52227]/25" />
            <LuCheck className="relative size-10" strokeWidth={2.4} />
          </span>

          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#f52227]">Scalp Assessment Request Received</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-[#231f20] sm:text-4xl">
            Thank You for Taking the <span className="font-black italic text-[#f52227]">First Step</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#62595c] sm:text-base">
            Your details have been shared with Infinity Aesthetics. Our team will contact you to understand your concern
            and guide you through the next steps.
          </p>

          <ol className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {NEXT_STEPS.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-[#eadfe0] bg-[#fffafa] p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 flex-none place-items-center rounded-xl bg-[#f52227] text-white">
                    <step.icon className="size-5" aria-hidden />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#f52227]">Next {index + 1}</p>
                </div>
                <h2 className="mt-3 text-base font-bold text-[#231f20]">{step.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-[#62595c]">{step.copy}</p>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-6 max-w-md border-l-2 border-[#f52227] pl-4 text-left text-sm font-bold leading-relaxed text-[#231f20]">
            Final treatment recommendations are provided after professional evaluation and consultation.
          </p>

          <p className="mx-auto mt-5 flex max-w-md items-start justify-center gap-2 text-xs leading-relaxed text-[#62595c]">
            <LuLock className="mt-0.5 size-3.5 flex-none text-[#f52227]" aria-hidden />
            Your information will remain confidential.
          </p>

          <ScanThankYouRedirect />
        </div>
      </div>
    </section>
  )
}
