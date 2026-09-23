import type { Metadata } from "next"
import ScrollReveal from "@/component/ScrollReveal"
import ScanFlow from "@/component/scan/ScanFlow"
import ScanFooter from "@/component/scan/ScanFooter"
import ScanHeader from "@/component/scan/ScanHeader"
import { ScanMobileBar } from "@/component/scan/ScanMobileBar"
import {
  AssessmentCta,
  AssessmentProcess,
  HowItWorks,
  Personalization,
  ProblemAwareness,
  ScanHero,
  TransplantEligibility,
  TreatmentOptions,
  WhyChooseScan,
} from "@/component/scan/ScanSections"
import "./scan.css"

export const metadata: Metadata = {
  title: "Scalp Scan & Hair Assessment",
  description:
    "Know your hair concerns with an expert-led scalp assessment and explore personalized restoration options at Infinity Aesthetics.",
}

export default function ScanPage() {
  return (
    <main className="scan-page min-h-screen bg-white font-[family-name:var(--font-merriweather)] text-[#231f20]">
      <ScanHeader />
      <ScanHero />
      <ScrollReveal><ProblemAwareness /></ScrollReveal>
      <ScrollReveal><AssessmentProcess /></ScrollReveal>
      <ScrollReveal><HowItWorks /></ScrollReveal>
      <ScrollReveal><TreatmentOptions /></ScrollReveal>
      <ScrollReveal><Personalization /></ScrollReveal>
      <ScrollReveal><WhyChooseScan /></ScrollReveal>
      <ScrollReveal><TransplantEligibility /></ScrollReveal>
      <ScrollReveal><AssessmentCta /></ScrollReveal>
      <ScanFooter />
      <ScanFlow />
      <ScanMobileBar />
    </main>
  )
}
