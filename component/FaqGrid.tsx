import { LuChevronDown, LuCircleHelp } from "react-icons/lu"

const FAQS = [
  {
    question: "Does everyone with hair loss need a hair transplant?",
    answer:
      "No. Many patients can benefit from medical management or advanced hair regrowth treatments before surgery becomes necessary.",
  },
  {
    question: "Is the procedure painful?",
    answer:
      "Hair transplantation is performed under local anaesthesia, making the procedure comfortable for most patients.",
  },
  {
    question: "How natural will my results look?",
    answer:
      "Our focus is to create hairlines and density that complement your facial features and blend naturally with your existing hair.",
  },
  {
    question: "How long does recovery take?",
    answer:
      "Most patients resume routine activities within 3–5 days, while hair growth develops gradually over the following months.",
  },
  {
    question: "Will the doctor perform my procedure personally?",
    answer:
      "Indeed. At Infinity Aesthetics Clinic, Dr Narendra Nikumbh personally handles every hair transplant procedure; he has already performed over 3000+ hair transplants.",
  },
]

export default function FaqGrid() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white px-5 py-12 font-[family-name:var(--font-merriweather)] sm:px-8 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="mx-auto max-w-[1280px]">
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <svg aria-hidden="true" viewBox="0 0 44 22" className="h-5 w-10 text-[#f52227]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6">
              <path d="M42 18C31 18 29 4 20 4" />
              <path d="M42 14C34 14 32 8 27 8" opacity=".65" />
              <path d="M42 22C27 22 25 1 12 1" opacity=".35" />
            </svg>
            <span className="border-b border-[#f52227]/40 pb-1 text-xs font-bold uppercase tracking-widest text-[#f52227] sm:text-sm">
              FAQ
            </span>
            <svg aria-hidden="true" viewBox="0 0 44 22" className="h-5 w-10 -scale-x-100 text-[#f52227]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6">
              <path d="M42 18C31 18 29 4 20 4" />
              <path d="M42 14C34 14 32 8 27 8" opacity=".65" />
              <path d="M42 22C27 22 25 1 12 1" opacity=".35" />
            </svg>
          </div>
          <h2 id="faq-title" className="mt-2 text-3xl font-bold leading-tight tracking-tight text-[#231f20] sm:text-4xl lg:text-[2.15rem]">
            Frequently{" "}
            <span className="relative inline-block font-black italic text-[#f52227]">
              Asked Questions
              <span aria-hidden className="absolute -bottom-1 left-0 h-0.5 w-full origin-left -rotate-1 bg-[#f52227]" />
            </span>
          </h2>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {FAQS.map((faq, index) => (
            <details
              key={faq.question}
              className={`group relative overflow-hidden border border-[#eadfe0] bg-[#fffafa] px-6 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f52227]/45 hover:shadow-[0_18px_40px_rgba(35,31,32,0.09)] sm:px-7 ${
                index === FAQS.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.625rem)]" : ""
              }`}
            >
              <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[#f52227]" />
              <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f52227] text-white">
                  <LuCircleHelp className="size-5" strokeWidth={2} />
                </span>
                <h3 className="min-w-0 flex-1 text-base font-bold leading-snug text-[#231f20] sm:text-lg">
                  {faq.question}
                </h3>
                <LuChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#62595c] transition-transform duration-300 group-open:rotate-180"
                  strokeWidth={2.2}
                />
              </summary>
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="ml-14 pt-4 text-sm leading-relaxed text-[#62595c]">{faq.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
