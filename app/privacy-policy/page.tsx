import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Infinity Aesthetics Clinic website and consultation enquiries.",
}

const SECTIONS = [
  ["Information We Collect", "When you request a consultation, we may collect your name, phone number, selected hair concern, the page from which you submitted the form, and the submission date and time."],
  ["How We Use Your Information", "We use your information to respond to your enquiry, arrange a consultation, understand your stated concern, maintain enquiry records, and improve our website experience."],
  ["Medical Information", "The website form is intended for initial enquiries only and is not a substitute for a medical consultation. Please avoid submitting sensitive medical documents through the general enquiry form."],
  ["Storage and Service Providers", "Submissions may be stored in clinic-controlled records and processed through enquiry-management providers, including Google Sheets or TeleCRM when configured."],
  ["Information Sharing", "We do not sell your personal information. Information may be shared with authorised clinic staff and service providers when necessary to respond to your request, operate the website, comply with law, or protect legitimate rights and safety."],
  ["Data Retention and Security", "We retain enquiry information only for as long as reasonably necessary for follow-up, clinic administration, legal obligations, and dispute prevention. No internet transmission or storage system can be guaranteed completely secure."],
  ["Your Choices", "You may ask the clinic to review, correct, or delete your enquiry information, subject to applicable legal and record-keeping requirements. You may also ask us to stop non-essential follow-up communication."],
  ["Policy Updates", "We may update this policy when our website, services, or legal obligations change. The latest version will be published on this page with its effective date."],
] as const

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fffafa] font-[family-name:var(--font-merriweather)] text-[#231f20]">
      <header className="border-b border-[#eadfe0] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" aria-label="Infinity Aesthetics Clinic home">
            <Image src="/logo.png" alt="Infinity Aesthetics Clinic" width={170} height={60} className="h-12 w-auto object-contain" priority />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#62595c] transition-colors hover:text-[#f52227]">
            <LuArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-xs font-bold uppercase tracking-widest text-[#f52227]">Infinity Aesthetics Clinic</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-[#62595c]">Effective date: 1 August 2026</p>
        <p className="mt-6 text-sm leading-relaxed text-[#62595c] sm:text-base">
          This policy explains how Infinity Aesthetics Clinic collects, uses, stores, and protects information submitted through this website.
        </p>
        <div className="mt-10 space-y-8">
          {SECTIONS.map(([title, content]) => (
            <section key={title} className="border-l-2 border-[#f52227] pl-5 sm:pl-6">
              <h2 className="text-lg font-bold leading-snug sm:text-xl">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#62595c] sm:text-base">{content}</p>
            </section>
          ))}
        </div>
        <section className="mt-10 rounded-2xl bg-[#231f20] p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold">Contact About Privacy</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            To make a privacy request, contact Infinity Aesthetics Clinic through its official contact channels and identify the enquiry information concerned.
          </p>
        </section>
      </article>
    </main>
  )
}
