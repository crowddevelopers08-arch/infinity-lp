"use client"

import { useRef } from "react"

const VIDEOS = [
  { src: "https://res.cloudinary.com/muif2bou/video/upload/v1790069158/in-video-1.mp4", },
  { src: "https://res.cloudinary.com/muif2bou/video/upload/v1790069034/in-video-3.mp4", },
  { src: "https://res.cloudinary.com/muif2bou/video/upload/v1790069001/in-video-4.mp4", },
  { src: "https://res.cloudinary.com/muif2bou/video/upload/v1790068990/in-video-2.mp4", },
]

export default function PatientVideos() {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  const pauseOtherVideos = (activeIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (index !== activeIndex && video && !video.paused) video.pause()
    })
  }

  return (
    <section
      id="patient-videos"
      aria-labelledby="patient-videos-heading"
      className="relative overflow-hidden py-8 font-[family-name:var(--font-merriweather)] sm:py-10 lg:py-12"
    >
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#fffafa]/80 to-white/90" />
      <div aria-hidden className="absolute -left-36 top-10 size-80 rounded-full bg-[#f52227]/5 blur-3xl" />
      <div aria-hidden className="absolute -right-40 bottom-0 size-96 rounded-full bg-[#f52227]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1420px] px-5 sm:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <Wing />
            <span className="border-b border-[#f52227]/50 pb-1 text-xs font-bold uppercase tracking-widest text-[#f52227] sm:text-sm">
              Inside Infinity Clinic
            </span>
            <Wing flipped />
          </div>

          <h2
            id="patient-videos-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#231f20] sm:text-4xl lg:text-[2.15rem]"
          >
            See Our Care{" "}
            <span className="font-black italic text-[#f52227]">In Action</span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-[#62595c] sm:text-base">
            Step inside Infinity Aesthetics Clinic and discover the thoughtful consultation,
            precision, and personalised attention behind every patient journey.
          </p>
        </header>

        <div className="-mx-5 mt-7 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0">
          <div className="flex min-w-max snap-x snap-mandatory gap-4 lg:grid lg:min-w-0 lg:grid-cols-4 lg:gap-5">
            {VIDEOS.map((video, index) => (
              <article
                key={video.src}
                className="group relative w-[76vw] max-w-[290px] shrink-0 snap-center overflow-hidden rounded-[24px] border border-[#eadfe0] bg-white p-2 shadow-[0_18px_45px_-28px_rgba(35,31,32,0.45)] transition duration-300 hover:-translate-y-1 hover:border-[#f52227]/40 hover:shadow-[0_24px_55px_-26px_rgba(245,34,39,0.28)] sm:w-[42vw] lg:w-auto lg:max-w-none"
              >
                <div className="relative aspect-[9/16] overflow-hidden rounded-[18px] bg-[#231f20]">
                  <video
                    ref={(element) => {
                      videoRefs.current[index] = element
                    }}
                    controls
                    playsInline
                    preload="metadata"
                    onPlay={() => pauseOtherVideos(index)}
                    className="size-full object-cover"
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video element.
                  </video>

                  <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/15 bg-[#231f20]/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    Infinity Clinic
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-1 text-center text-xs font-semibold text-[#62595c] lg:hidden">
          Swipe to explore all four videos
        </p>
      </div>
    </section>
  )
}

function Wing({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 22"
      className={"h-5 w-10 text-[#f52227] " + (flipped ? "-scale-x-100" : "")}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
    >
      <path d="M42 18C31 18 29 4 20 4" />
      <path d="M42 14C34 14 32 8 27 8" opacity=".65" />
      <path d="M42 22C27 22 25 1 12 1" opacity=".35" />
    </svg>
  )
}
