"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const RESULTS = [
  "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695486/bfaf-1.jpg",
  "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695486/bfaf-2.jpg",
  "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695487/bfaf-3.jpg",
  "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695487/bfaf-4.jpg",
  "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695487/bfaf-5.jpg",
  "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695487/bfaf-6.jpg",
  "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695488/bfaf-7.jpg",
  "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695488/bfaf-8.jpg",
  "https://res.cloudinary.com/x6ec5hqm/image/upload/v1786695488/bfaf-9.jpg",
].map((src, index) => ({
  src,
  alt: "Hair restoration before and after result " + (index + 1),
}));

const AUTOPLAY_DELAY = 5500;

export default function BeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % RESULTS.length);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex(
      (current) => (current - 1 + RESULTS.length) % RESULTS.length,
    );
  }, []);

  useEffect(() => {
    const timer = window.setInterval(showNext, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [showNext]);

  useEffect(() => {
    const carousel = carouselRef.current;
    const card = cardRefs.current[activeIndex];
    if (!carousel || !card) return;

    carousel.scrollTo({
      left: card.offsetLeft - carousel.offsetLeft,
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <section
      id="results"
      aria-labelledby="before-after-heading"
      className="overflow-hidden py-6 font-[family-name:var(--font-merriweather)] sm:py-8 bg-[#fffafa]"
    >
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="order-1 inline-flex w-fit items-center gap-3 text-[13px] font-bold uppercase tracking-[2px] text-[#231f20] before:h-[2px] before:w-9 before:rounded-full before:bg-[#f52227] before:content-['']">
            <span
              className="size-1.5 rounded-full bg-[#f52227]"
              aria-hidden="true"
            />
            Real Patient Results
          </span>

          <h1 className="order-2 mt-4 max-w-[720px] font-[family-name:var(--font-merriweather)] text-[clamp(1.85rem,3.4vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.03em] text-[#231f20]">
            See the Difference.{" "}
            <span className="relative inline-block text-[#f52227] after:absolute after:-bottom-2 after:left-[5%] after:h-[3px] after:w-[90%] after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#f52227] after:to-transparent after:content-['']">
              Before &amp; After .
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#5f585a] sm:text-base">
            Explore real hair restoration transformations achieved through
            careful planning, precision, and personalised treatment.
          </p>
        </div>

        <div
          className="relative mx-auto mt-5 max-w-5xl select-none sm:mt-6"
          onContextMenu={(event) => event.preventDefault()}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const distance =
              event.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(distance) > 45) {
              if (distance < 0) showNext();
              else showPrevious();
            }
            touchStartX.current = null;
          }}
        >
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-4 overflow-hidden scroll-smooth px-1 py-3 sm:gap-5"
          >
            {RESULTS.map((result, index) => (
              <div
                key={result.src}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className={
                  "relative h-[280px] min-w-0 flex-[0_0_100%] snap-start overflow-hidden rounded-2xl border-4 border-white bg-white  duration-500 sm:h-[300px] sm:basis-[calc(50%-0.625rem)] lg:h-[320px] lg:basis-[calc(33.333%-0.834rem)] " +
                  (index === activeIndex ? "" : "scale-100")
                }
              >
                <Image
                  src={result.src}
                  alt={result.alt}
                  fill
                  priority={index < 3}
                  draggable={false}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 320px"
                  className="pointer-events-none object-cover"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous result"
            className="absolute -left-3 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl text-[#231f20] shadow-lg transition hover:bg-[#f52227] hover:text-white sm:-left-8 sm:size-12"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Show next result"
            className="absolute -right-3 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl text-[#231f20] shadow-lg transition hover:bg-[#f52227] hover:text-white sm:-right-8 sm:size-12"
          >
            <span aria-hidden>›</span>
          </button>
        </div>

        <div
          className="mt-3 flex justify-center gap-2"
          aria-label="Select a result"
        >
          {RESULTS.map((result, index) => (
            <button
              key={result.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={"Show result " + (index + 1)}
              aria-current={index === activeIndex ? "true" : undefined}
              className={
                "h-2 rounded-full transition-all duration-300 " +
                (index === activeIndex
                  ? "w-8 bg-[#f52227]"
                  : "w-2 bg-[#231f20]/25 hover:bg-[#231f20]/50")
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
