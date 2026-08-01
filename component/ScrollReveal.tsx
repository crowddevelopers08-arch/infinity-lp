"use client"

import { useEffect, useRef, type ReactNode } from "react"

export default function ScrollReveal({ children, extraSlow = false }: { children: ReactNode; extraSlow?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const revealItems = Array.from(
      element.querySelectorAll<HTMLElement>(
        "header > div, h1, h2, h3, p, figure, img:not([alt='']), a, button, summary",
      ),
    ).filter((item) => !item.closest("[aria-hidden='true']") && !item.closest("script"))

    revealItems.forEach((item, index) => {
      item.classList.add("page-scroll-item")
      item.classList.add(index % 2 === 0 ? "page-scroll-from-left" : "page-scroll-from-right")
      const delayStep = extraSlow ? 180 : 120
      const maximumDelay = extraSlow ? 3060 : 2040
      item.style.setProperty("--page-reveal-delay", `${Math.min(index * delayStep, maximumDelay)}ms`)
    })

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
      element.classList.add("is-visible")
      return
    }

    let observer: IntersectionObserver | undefined
    let revealTimer: ReturnType<typeof setTimeout> | undefined
    let secondFrame = 0

    // Two frames guarantee that an initially visible section (the hero) paints
    // its hidden item states before the reveal class is applied.
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return

            const show = () => element.classList.add("is-visible")
            if (extraSlow) revealTimer = setTimeout(show, 350)
            else show()

            observer?.unobserve(element)
          },
          {
            threshold: 0.08,
            rootMargin: "0px 0px -8% 0px",
          },
        )

        observer.observe(element)
      })
    })

    return () => {
      window.cancelAnimationFrame(firstFrame)
      window.cancelAnimationFrame(secondFrame)
      if (revealTimer) clearTimeout(revealTimer)
      observer?.disconnect()
    }
  }, [extraSlow])

  return (
    <div ref={containerRef} className={`page-scroll-reveal ${extraSlow ? "page-scroll-reveal-extra-slow" : ""}`}>
      {children}
    </div>
  )
}
