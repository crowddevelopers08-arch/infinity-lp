import Image from "next/image"

const CANDIDATE_SIGNS = [
  {
    title: "Have a receding hairline or advanced pattern baldness.",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/bald_i39yp8.png",
  },
  {
    title: "Have thinning over the crown with a healthy donor area.",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/hairthinning_urxqij.png",
  },
  {
    title: "Have realistic expectations about the outcome.",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/regrow_hx1biq.png",
  },
  {
    title: "Have stable hair loss.",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/loss_nrv9dx.png",
  },
  {
    title: "Want a permanent, natural-looking solution.",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/hair-trinity_yud9gy.jpg",
  },
  {
    title: "Have already explored or completed medical hair loss treatments.",
    image: "https://res.cloudinary.com/n0ccg2u6/image/upload/scalp_dvynfh.png",
  },
]

function CandidateCard({ title, image, number }: { title: string; image: string; number: number }) {
  return (
    <article className="relative flex min-h-72 w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-[#231f20] p-7 text-white sm:w-[340px] sm:p-8">
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 640px) 280px, 340px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/35 via-[#111111]/10 to-[#111111]/95" />

      <div className="relative z-10 flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-full bg-[#f52227] text-sm font-bold text-white">
          {String(number).padStart(2, "0")}
        </span>
        <span className="grid size-9 place-items-center rounded-full border border-white/40 bg-[#111111]/20 text-white backdrop-blur-sm">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none">
            <path
              d="m7 12 3.2 3.2L17.5 8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <h3 className="relative z-10 mt-14 text-base font-bold leading-snug tracking-tight text-white sm:text-lg">
        {title}
      </h3>
    </article>
  )
}

export default function WhyChooseUs() {
  const cards = [...CANDIDATE_SIGNS, ...CANDIDATE_SIGNS]

  return (
    <section className="overflow-hidden bg-white py-6 font-[family-name:var(--font-merriweather)] text-[#231f20] sm:py-8 lg:py-10">
      <div className="mx-auto max-w-[1180px] px-5 text-center sm:px-8">
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
          <span className="border-b border-[#f52227]/40 pb-1 text-xs font-bold uppercase tracking-widest text-[#ff5b5f] sm:text-sm">
            Hair Transplant Candidacy
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

        <div className="mx-auto mt-2 max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#231f20] sm:text-4xl lg:text-[2.15rem]">
            Who Is a{" "}
            <span className="relative inline-block px-1">
              <span aria-hidden className="absolute inset-x-0 bottom-0.5 h-3 -rotate-1 bg-[#f52227]" />
              <span className="relative">Good Candidate</span>
            </span>{" "}
            for a{" "}
            <span className="relative inline-block px-1">
              <span aria-hidden className="absolute inset-x-0 bottom-0.5 h-3 rotate-1 bg-[#f52227]" />
              <span className="relative">Hair Transplant?</span>
            </span>
          </h2>
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#62595c]">
          You may benefit from a hair transplant if you:
        </p>
      </div>

      <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <div className="candidate-marquee flex w-max gap-5">
          {cards.map((card, index) => (
            <div key={`${card.title}-${index}`} aria-hidden={index >= CANDIDATE_SIGNS.length}>
              <CandidateCard
                title={card.title}
                image={card.image}
                number={(index % CANDIDATE_SIGNS.length) + 1}
              />
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-3xl px-5 text-center text-sm font-bold leading-relaxed sm:px-8">
        The best way to know is through a detailed consultation and scalp evaluation.
      </p>
    </section>
  )
}
