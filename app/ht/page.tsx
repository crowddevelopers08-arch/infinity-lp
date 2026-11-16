import type { Metadata } from "next";
import HairTransplantQuestion from "@/component/hair-transplants/HairTransplantQuestion";

export const metadata: Metadata = {
  title: "Hair Transplant Consultation",
  description: "Answer a few quick questions to check your eligibility and book a hair transplant consultation.",
};

export default function HairTransplantFunnelPage() {
  return <HairTransplantQuestion />;
}
