import CallToAction from "@/components/landing/cta";
import FAQSection from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Newsletter from "@/components/landing/newsletter";
import Stats from "@/components/landing/stats";
import Testimonials from "@/components/landing/testimonials";

export default function page() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <CallToAction />
      <FAQSection />
      <Newsletter />
    </>
  );
}
