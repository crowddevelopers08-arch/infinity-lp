import Image from "next/image"

export default function FaqShowcase() {
  return (
    <section id="hair-analysis" className="relative overflow-hidden bg-gradient-to-br from-white via-[#fffafa] to-[#fff0f0]/60 font-[family-name:var(--font-merriweather)] text-[#231f20]">
      <div aria-hidden className="absolute inset-0 hidden opacity-55 sm:block">
        {/* <span className="absolute -left-1 top-[46%] size-24 rounded-[20px] border-2 border-[#697178] motion-safe:animate-[float_4.5s_ease-in-out_infinite]" /> */}
        {/* <span className="absolute left-[38%] top-8 size-10 rounded-xl border-2 border-[#697178] motion-safe:animate-[float_3.8s_ease-in-out_infinite_reverse]" /> */}
        {/* <span className="absolute left-[43%] -top-8 size-24 rounded-[24px] border-2 border-[#697178] motion-safe:animate-[float_5.2s_ease-in-out_infinite] motion-safe:[animation-delay:-1.4s]" /> */}
        {/* <span className="absolute right-[10%] top-8 size-10 rounded-xl border-2 border-[#697178] motion-safe:animate-[float_4.2s_ease-in-out_infinite_reverse] motion-safe:[animation-delay:-.8s]" />
        <span className="absolute -right-6 top-[38%] size-24 rounded-[20px] border-2 border-[#697178] motion-safe:animate-[float_5s_ease-in-out_infinite] motion-safe:[animation-delay:-2s]" />
        <span className="absolute left-[58%] top-20 grid grid-cols-3 gap-3 motion-safe:animate-[float_4.6s_ease-in-out_infinite_reverse] motion-safe:[animation-delay:-1.2s]">
          {Array.from({ length: 9 }).map((_, index) => (
            <i key={index} className="size-1 rounded-full bg-[#697178]" />
          ))}
        </span> */}
      </div>

      <div className="relative mx-auto grid min-h-0 max-w-[1800px] gap-8 px-5 pb-0 pt-2 sm:px-8 lg:min-h-[590px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-0 lg:px-14 xl:px-20">
        <div className="relative z-10 w-full min-w-0 self-center pb-8 lg:py-3 lg:pr-8">
          <div className="hero-slow-item hero-slow-left hero-delay-1 inline-flex items-center gap-3">
            <svg aria-hidden="true" viewBox="0 0 44 22" className="h-5 w-10 text-[#f52227]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6">
              <path d="M42 18C31 18 29 4 20 4" />
              <path d="M42 14C34 14 32 8 27 8" opacity=".65" />
              <path d="M42 22C27 22 25 1 12 1" opacity=".35" />
            </svg>
            <p className="border-b border-[#f52227]/40 pb-1 text-xs font-bold uppercase tracking-widest text-[#f52227] sm:text-sm">
              Hair Transplant Consultation
            </p>
            <svg aria-hidden="true" viewBox="0 0 44 22" className="h-5 w-10 -scale-x-100 text-[#f52227]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6">
              <path d="M42 18C31 18 29 4 20 4" />
              <path d="M42 14C34 14 32 8 27 8" opacity=".65" />
              <path d="M42 22C27 22 25 1 12 1" opacity=".35" />
            </svg>
          </div>
          <h2 className="hero-slow-item hero-slow-left hero-delay-2 mt-2 w-full text-3xl font-bold leading-tight tracking-tight text-[#231f20] sm:text-4xl lg:text-[2.15rem]">
            Thinking About a{" "}
            <span className="relative inline-block font-black italic text-[#f52227]">
              Hair Transplant?
              <span aria-hidden className="absolute -bottom-1 left-0 h-0.5 w-full origin-left -rotate-1 " />
            </span>{" "}
            Start With the{" "}
            <span className="inline-flex -rotate-1 items-center rounded-full border border-[#f52227] bg-[#f52227]/10 px-3 py-0.5 text-[0.82em] text-[#231f20] shadow-[0_0_0_3px_rgba(245,34,39,0.08)]">
              Right Diagnosis.
            </span>
          </h2>

          <div className="hero-slow-item hero-slow-right hero-delay-3 relative mx-auto my-6 block aspect-[4/5] w-full max-w-md overflow-hidden sm:hidden">
            <div className="relative size-full overflow-hidden">
              <Image
                src="/Dr-Nare.PNG"
                alt="Hair restoration doctor in a modern clinic"
                fill
                sizes="88vw"
                className="hero-image-zoom object-cover object-top"
              />
            </div>
            <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#231f20]/85 px-5 py-2 text-center text-xs font-bold text-white shadow-lg backdrop-blur-sm">
              Dr Narendra Nikumbh
            </p>
          </div>

          <p className="hero-slow-item hero-slow-left hero-delay-4 mt-5 w-full text-sm leading-relaxed text-[#62595c]">
            If you&apos;ve been wondering whether a hair transplant is the right solution, the first step isn&apos;t
            surgery; it&apos;s understanding <em className="font-bold text-[#231f20]">why </em>  you&apos;re losing your hair.
          </p>

          <p className="hero-slow-item hero-slow-right hero-delay-5 mt-3.5 w-full text-sm leading-relaxed text-[#62595c]">
            At Infinity Aesthetics Clinic, every consultation starts with one question:
          </p>

          <p className="hero-slow-item hero-slow-left hero-delay-6 mt-5 w-full border-l-4 border-[#f52227] bg-white px-5 py-2.5 text-base font-bold leading-snug shadow-[0_5px_16px_rgba(31,42,55,0.08)] sm:text-lg">
            Can your existing hair still be saved?
          </p>

          <div className="hero-slow-item hero-slow-right hero-delay-7 mt-3.5 space-y-1 text-sm font-bold leading-relaxed text-[#231f20]">
            <p>If the answer is yes, we&apos;ll tell you.</p>
          </div>

          <p className="hero-slow-item hero-slow-left hero-delay-8 mt-3.5 w-full text-sm leading-relaxed text-[#62595c]">
            If a hair transplant is truly the best option, <strong className="text-[#231f20]">Dr Narendra Nikumbh</strong>, a
            board-certified dermatologist, personally performs every procedure using advanced FUE techniques designed
            to deliver <strong className="text-[#231f20]">natural-looking density, high graft survival, and long-term results</strong>.
          </p>

          <p className="hero-slow-item hero-slow-right hero-delay-9 mt-3.5 w-full text-sm font-bold leading-relaxed text-[#231f20]">
            Because the right treatment is always better than the most expensive one.
          </p>

          <a
            href="#book"
            className="hero-slow-item hero-slow-left hero-delay-10 mt-6 inline-flex rounded-full bg-[#f52227] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#231f20]"
          >
            Book Your Hair Analysis
          </a>
        </div>

        <div className="hero-slow-item hero-slow-right hero-delay-3 relative hidden min-h-[560px] w-full min-w-0 self-stretch overflow-hidden lg:block">
          <Image
            src="/doctors.png"
            alt="Dr Narendra Nikumbh, board-certified dermatologist and hair restoration doctor"
            fill
            priority
            sizes="(max-width: 1024px) 0px, 50vw"
            className="hero-image-zoom object-cover object-top"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-[#231f20]/35 via-transparent to-transparent" /> */}
          <p className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#231f20]/85 px-6 py-2.5 text-center text-sm font-bold text-white shadow-xl backdrop-blur-sm">
            Dr Narendra Nikumbh
          </p>
        </div>

        <div className="hero-slow-item hero-slow-right hero-delay-3 relative mx-auto hidden aspect-[4/2] w-full max-w-md overflow-hidden sm:block lg:hidden">
          <div className="relative size-full overflow-hidden">
            <Image
              src="/doctors.png"
              alt="Hair restoration doctor in a modern clinic"
              fill
              sizes="88vw"
              className="hero-image-zoom object-cover object-top"
            />
          </div>
          <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#231f20]/85 px-5 py-2 text-center text-xs font-bold text-white shadow-lg backdrop-blur-sm">
            Dr Narendra Nikumbh
          </p>
        </div>
      </div>
    </section>
  )
}
