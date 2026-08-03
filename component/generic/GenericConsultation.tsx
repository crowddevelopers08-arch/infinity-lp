"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { LuChevronDown, LuPhone, LuUserRound } from "react-icons/lu"

const concerns = [
  "Excessive hair fall",
  "Hair thinning or reduced density",
  "Receding hairline",
  "Male pattern baldness",
  "Patchy hair loss",
  "Hair transplant consultation",
  "Previous treatment did not work",
  "Other hair concern",
]

export default function GenericConsultation() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "generic consult",
          name: String(formData.get("name") || "").trim(),
          phone: String(formData.get("phone") || "").trim(),
          concern: String(formData.get("concern") || "").trim(),
          pageUrl: window.location.href,
        }),
      })

      const result = (await response.json()) as { success?: boolean; error?: string }
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to submit your consultation")

      form.reset()
      router.push("/thank-you")
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="appointment" className="relative overflow-hidden bg-[#231f20] px-5 py-14 sm:px-8 lg:py-20">
      <div aria-hidden="true" className="absolute -left-32 -top-32 size-[380px] rounded-full bg-[#f52227]/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-44 right-[20%] size-[360px] rounded-full bg-[#f52227]/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1250px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div className="text-white">
          <span className="inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[2px] text-white before:h-[2px] before:w-9 before:rounded-full before:bg-[#f52227] before:content-['']">
            <span className="size-1.5 rounded-full bg-[#f52227]" aria-hidden="true" />
            Start Your Journey
          </span>
          <h2 className="mt-4 max-w-[650px] font-[family-name:var(--font-merriweather)] text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.03em] text-white">
            Ready to Take the First Step Towards{" "}
            <span className="text-[#ff5b5f]">Healthier Hair?</span>
          </h2>
          <p className="mt-5 max-w-[620px] font-[family-name:var(--font-inter)] text-[clamp(0.78rem,1vw,0.875rem)] leading-[1.8] text-white/70">
            Whether you&apos;re experiencing early hair fall, noticeable thinning, or considering a hair transplant, our specialists are here to help you understand your options and create a treatment plan that&apos;s right for you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] border border-white/10 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-8"
        >
          <h3 className="font-[family-name:var(--font-merriweather)] text-[clamp(0.95rem,1.35vw,1.08rem)] font-bold text-[#231f20]">
            Book Your Hair Consultation
          </h3>
          <p className="mt-2 text-[0.78rem] leading-relaxed text-[#62595c]">Share your details and our clinic team will contact you shortly.</p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-2 block text-[0.78rem] font-bold text-[#231f20]">Name</span>
              <span className="flex items-center rounded-xl border border-[#eadfe0] bg-[#fffafa] px-4 transition focus-within:border-[#f52227] focus-within:ring-2 focus-within:ring-[#f52227]/10">
                <LuUserRound className="size-5 shrink-0 text-[#f52227]" />
                <input name="name" type="text" autoComplete="name" required placeholder="Enter your name" className="w-full bg-transparent px-3 py-3.5 text-sm text-[#231f20] outline-none placeholder:text-[#62595c]/55" />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-[0.78rem] font-bold text-[#231f20]">Phone</span>
              <span className="flex items-center rounded-xl border border-[#eadfe0] bg-[#fffafa] px-4 transition focus-within:border-[#f52227] focus-within:ring-2 focus-within:ring-[#f52227]/10">
                <LuPhone className="size-5 shrink-0 text-[#f52227]" />
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="Enter your phone number" className="w-full bg-transparent px-3 py-3.5 text-sm text-[#231f20] outline-none placeholder:text-[#62595c]/55" />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-[0.78rem] font-bold text-[#231f20]">Concern</span>
              <span className="relative block">
                <select name="concern" required defaultValue="" className="w-full appearance-none rounded-xl border border-[#eadfe0] bg-[#fffafa] px-4 py-3.5 pr-11 text-sm text-[#231f20] outline-none transition focus:border-[#f52227] focus:ring-2 focus:ring-[#f52227]/10">
                  <option value="" disabled>Select your hair concern</option>
                  {concerns.map((concern) => <option key={concern} value={concern}>{concern}</option>)}
                </select>
                <LuChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-[#f52227]" />
              </span>
            </label>
          </div>

          {error && <p role="alert" className="mt-4 rounded-xl bg-[#fff0f0] px-4 py-3 text-[0.78rem] text-[#cf1c20]">{error}</p>}

          <button type="submit" disabled={isSubmitting} className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-[18px] bg-[#f52227] px-6 font-[family-name:var(--font-merriweather)] text-[0.8rem] font-bold uppercase tracking-[0.8px] text-white transition-colors hover:bg-[#231f20] disabled:cursor-wait disabled:opacity-65">
            {isSubmitting ? "Submitting..." : "Book Your Hair Consultation"}
          </button>
        </form>
      </div>
    </section>
  )
}
