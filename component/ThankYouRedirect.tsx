"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const REDIRECT_SECONDS = 10

function safePath(from: string | undefined) {
  if (from && from.startsWith("/") && !from.startsWith("//")) return from
  return "/"
}

export default function ThankYouRedirect({ from }: { from?: string }) {
  const router = useRouter()
  const target = safePath(from)
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS)

  useEffect(() => {
    router.prefetch(target)

    const tick = window.setInterval(() => {
      setSeconds((value) => (value > 0 ? value - 1 : 0))
    }, 1000)
    const redirect = window.setTimeout(() => router.push(target), REDIRECT_SECONDS * 1000)

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(redirect)
    }
  }, [router, target])

  return (
    <p className="mt-8 text-sm font-bold text-[#62595c]">
      Taking you back in {seconds} second{seconds === 1 ? "" : "s"}&hellip;
    </p>
  )
}
