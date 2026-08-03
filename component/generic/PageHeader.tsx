import Image from "next/image"
import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"

export default function ageHeader() {
  return (
    <header className="border-b border-[#eadfe0] bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/generic" aria-label="Infinity Aesthetics Clinic home">
          <Image src="/logo.png" alt="Infinity Aesthetics Clinic" width={170} height={60} className="h-12 w-auto object-contain" priority />
        </Link>
        <Link href="/generic" className="inline-flex items-center gap-2 text-sm font-bold text-[#62595c] transition-colors hover:text-[#f52227]">
          <LuArrowLeft className="size-4" /> Back to Home
        </Link>
      </div>
    </header>
  )
}
