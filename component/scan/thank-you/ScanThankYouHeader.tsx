import Image from "next/image"
import Link from "next/link"
import { LuPhone } from "react-icons/lu"
import { IMAGES, PHONE_DISPLAY, PHONE_TEL } from "../scanData"

export default function ScanThankYouHeader() {
  return (
    <header className="border-b border-[#eadfe0] bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
        <Link href="/scan" aria-label="Back to scalp scan">
          <Image src={IMAGES.logo} alt="Infinity Aesthetics Clinic" width={170} height={60} priority className="h-11 w-auto object-contain sm:h-12" />
        </Link>
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex items-center gap-2 rounded-full border border-[#eadfe0] bg-[#fffafa] px-4 py-2.5 text-sm font-bold text-[#231f20] transition-colors hover:border-[#f52227] hover:text-[#f52227]"
        >
          <LuPhone className="size-4 text-[#f52227]" aria-hidden />
          <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  )
}
