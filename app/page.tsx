import AboutClinic from "@/component/AboutClinic";
import BeautyLab from "@/component/BeautyLab";
import Conditions from "@/component/Conditions";
import Header from "@/component/Header";
import WorkProcessSection from "@/component/our-services";
import ProcessInfographic from "@/component/ProcessInfographic";
import FaqShowcase from "@/component/hero";
import TrustFirst from "@/component/TrustFirst";
import WhyChooseUs from "@/component/WhyChooseUs";
import FaqGrid from "@/component/FaqGrid";
import FinalCta from "@/component/FinalCta";
import Footer from "@/component/Footer";
import ScrollReveal from "@/component/ScrollReveal";
import ConsultationModal from "@/component/ConsultationModal";

export default function Home() {
  return (
<>
<Header />
<FaqShowcase />
<ScrollReveal><AboutClinic /></ScrollReveal>
<ScrollReveal><TrustFirst /></ScrollReveal>
<ScrollReveal><Conditions /></ScrollReveal>
<ScrollReveal><WhyChooseUs /></ScrollReveal>
<ScrollReveal><BeautyLab /></ScrollReveal>
<ScrollReveal><WorkProcessSection /></ScrollReveal>
<ScrollReveal><ProcessInfographic /></ScrollReveal>
<ScrollReveal><FaqGrid /></ScrollReveal>
<ScrollReveal><FinalCta /></ScrollReveal>
<ScrollReveal><Footer /></ScrollReveal>
<ConsultationModal />
</>
  );
}
