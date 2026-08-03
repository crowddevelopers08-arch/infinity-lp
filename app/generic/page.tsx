import GenericAbout from "@/component/generic/GenericAbout"
import GenericConsultation from "@/component/generic/GenericConsultation"
import Footer from "@/component/generic/Footer"
import GenericHeader from "@/component/generic/GenericHeader"
import GenericHero from "@/component/generic/GenericHero"
import GenericQualityServices from "@/component/generic/GenericQualityServices"
import GenericRoadmap from "@/component/generic/GenericRoadmap"
import GenericSolutions from "@/component/generic/GenericSolutions"

export default function GenericPage() {
  return (
    <main id="top" className="min-h-screen bg-white">
      <GenericHeader />
      <GenericHero />
      <GenericAbout />
      <GenericSolutions />
      <GenericRoadmap />
      <GenericQualityServices />
      <GenericConsultation />
      <Footer />
    </main>
  )
}
