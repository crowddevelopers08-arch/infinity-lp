import type { Metadata } from "next"
import Link from "next/link"
import { LuArrowLeft, LuCheck } from "react-icons/lu"
import PageFooter from "@/component/generic/PageFooter"
import PageHeader from "@/component/generic/PageHeader"

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your hair consultation request has been received by Infinity Aesthetics Clinic.",
  robots: { index: false, follow: false },
}

export default function GenericThankYouPage() {
  return (
    <main className="min-h-screen bg-[#fffafa] font-[family-name:var(--font-merriweather)] text-[#231f20]">
      <PageHeader />
      <section className="relative overflow-hidden px-5 py-16 sm:py-20">
        <span aria-hidden className="absolute -left-24 top-1/4 size-72 rounded-full border-[40px] border-[#f52227]/5" />
        <span aria-hidden className="absolute -right-28 bottom-0 size-96 rounded-full border-[54px] border-[#231f20]/5" />
        <div className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-[#eadfe0] bg-white px-6 py-10 text-center shadow-[0_30px_80px_rgba(35,31,32,0.12)] sm:px-12 sm:py-12">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#f52227] text-white shadow-[0_14px_35px_rgba(245,34,39,0.25)]">
            <LuCheck className="size-10" strokeWidth={2.4} />
          </span>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#f52227]">Request Received</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-[#231f20] sm:text-4xl">Thank You</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#62595c] sm:text-base">
            Your hair consultation request has been submitted successfully. Our clinic team will contact you shortly to help plan your hair analysis.
          </p>
          <p className="mx-auto mt-4 max-w-md border-l-2 border-[#f52227] pl-4 text-left text-sm font-bold leading-relaxed text-[#231f20]">
            The right treatment begins with the right diagnosis.
          </p>
          <Link href="/generic" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#231f20] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#f52227]">
            <LuArrowLeft className="size-4" /> Return to Home
          </Link>
        </div>
      </section>
      <PageFooter />
    </main>
  )
}
