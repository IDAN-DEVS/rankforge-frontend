
import FAQSection from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";

export default function page() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <FAQSection />
    </>
  );
}
