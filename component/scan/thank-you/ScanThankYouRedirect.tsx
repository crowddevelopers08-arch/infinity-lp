"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LuArrowLeft } from "react-icons/lu"

const REDIRECT_SECONDS = 10
const TARGET = "/scan"

export default function ScanThankYouRedirect() {
  const router = useRouter()
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS)

  useEffect(() => {
    router.prefetch(TARGET)
    const tick = window.setInterval(() => setSeconds((value) => (value > 0 ? value - 1 : 0)), 1000)
    const redirect = window.setTimeout(() => router.push(TARGET), REDIRECT_SECONDS * 1000)
    return () => {
      window.clearInterval(tick)
      window.clearTimeout(redirect)
    }
  }, [router])

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <Link
        href={TARGET}
        className="inline-flex items-center gap-2 rounded-full border border-[#231f20] px-6 py-3 text-sm font-bold text-[#231f20] transition-colors hover:bg-[#231f20] hover:text-white"
      >
        <LuArrowLeft className="size-4" aria-hidden />
        Back to Scalp Scan
      </Link>
      <p className="text-xs font-bold text-[#62595c]">
        Taking you back in {seconds} second{seconds === 1 ? "" : "s"}&hellip;
      </p>
    </div>
  )
}
