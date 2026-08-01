"use client"

import { FormEvent, useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LuCheck, LuPhone, LuSparkles, LuUserRound, LuX } from "react-icons/lu"

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const nameInputRef = useRef<HTMLInputElement>(null)
  const titleId = useId()
  const router = useRouter()

  useEffect(() => {
    const openFromTrigger = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const trigger = target.closest<HTMLAnchorElement | HTMLButtonElement>(
        'a[href="#book"], button[data-book-consultation]',
      )
      if (!trigger) return
      event.preventDefault()
      setSubmitted(false)
      setSubmitError("")
      setIsOpen(true)
    }

    document.addEventListener("click", openFromTrigger)
    return () => document.removeEventListener("click", openFromTrigger)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 120)

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [isOpen])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Consultation Modal",
          name: String(formData.get("name") || "").trim(),
          phone: String(formData.get("phone") || "").trim(),
          concern: String(formData.get("concern") || "").trim(),
          pageUrl: window.location.href,
        }),
      })

      const result = (await response.json()) as { success?: boolean; error?: string }
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to submit your request")
      }

      form.reset()
      setSubmitted(true)
      setIsOpen(false)
      router.push("/thank-you")
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#171415]/80 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false)
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#f52227] via-[#ef565a] to-[#231f20]" />
        <button
          type="button"
          aria-label="Close consultation form"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-5 grid size-10 place-items-center rounded-full bg-[#fff0f0] text-[#231f20] transition-colors hover:bg-[#f52227] hover:text-white"
        >
          <LuX className="size-5" />
        </button>

        <div className="px-5 py-7 sm:px-8 sm:py-8">
          {!submitted ? (
            <>
              <div className="pr-12">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f52227]">
                  <LuSparkles className="size-4" />
                  Hair Consultation
                </span>
                <h2 id={titleId} className="mt-2 text-2xl font-bold leading-tight text-[#231f20] sm:text-3xl">
                  Book Your Hair Analysis
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#62595c]">
                  Share a few details and our clinic team will contact you to plan your consultation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-[#231f20]">Name</span>
                  <span className="flex items-center rounded-xl border border-[#eadfe0] bg-[#fffafa] px-4 transition focus-within:border-[#f52227] focus-within:ring-2 focus-within:ring-[#f52227]/10">
                    <LuUserRound className="size-5 shrink-0 text-[#f52227]" />
                    <input
                      ref={nameInputRef}
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Enter your name"
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-[#231f20] outline-none placeholder:text-[#62595c]/55"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-[#231f20]">Phone</span>
                  <span className="flex items-center rounded-xl border border-[#eadfe0] bg-[#fffafa] px-4 transition focus-within:border-[#f52227] focus-within:ring-2 focus-within:ring-[#f52227]/10">
                    <LuPhone className="size-5 shrink-0 text-[#f52227]" />
                    <input
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      placeholder="Enter your phone number"
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-[#231f20] outline-none placeholder:text-[#62595c]/55"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-[#231f20]">Concern</span>
                  <select
                    name="concern"
                    required
                    defaultValue=""
                    className="w-full cursor-pointer rounded-xl border border-[#eadfe0] bg-[#fffafa] px-4 py-3.5 text-sm text-[#231f20] outline-none transition focus:border-[#f52227] focus:ring-2 focus:ring-[#f52227]/10"
                  >
                    <option value="" disabled>Select your concern</option>
                    <option value="Excessive hair fall">Excessive hair fall</option>
                    <option value="Hair thinning or low density">Hair thinning or low density</option>
                    <option value="Receding hairline">Receding hairline</option>
                    <option value="Bald patches">Bald patches</option>
                    <option value="Scalp concern">Scalp concern</option>
                    <option value="Hair transplant consultation">Hair transplant consultation</option>
                    <option value="Post-transplant care">Post-transplant care</option>
                    <option value="Other hair concern">Other hair concern</option>
                  </select>
                </label>

                {submitError && (
                  <p role="alert" className="rounded-xl border border-[#f52227]/20 bg-[#fff0f0] px-4 py-3 text-sm leading-relaxed text-[#cf1c20]">
                    {submitError}
                  </p>
                )}

                <p className="text-center text-xs leading-relaxed text-[#62595c]">
                  By submitting, you agree to our{" "}
                  <Link
                    href="/privacy-policy"
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-[#f52227] underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-full bg-[#f52227] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(245,34,39,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#231f20] disabled:cursor-wait disabled:opacity-65 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Submitting..." : "Request Consultation"}
                </button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center sm:py-10">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#f52227] text-white shadow-[0_12px_30px_rgba(245,34,39,0.25)]">
                <LuCheck className="size-8" strokeWidth={2.4} />
              </span>
              <h2 id={titleId} className="mt-5 text-2xl font-bold text-[#231f20] sm:text-3xl">Thank You</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#62595c]">
                Your consultation request has been received. Our clinic team will contact you shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-6 rounded-full border border-[#231f20] px-6 py-3 text-sm font-bold text-[#231f20] transition-colors hover:bg-[#231f20] hover:text-white"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
