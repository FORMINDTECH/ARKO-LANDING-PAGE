import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import WebSystemSection from "@/components/WebSystemSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PlansSection from "@/components/PlansSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 sm:pt-28">
        <Hero />
        <ProblemSection />
        <WebSystemSection />
        <SolutionSection />
        <ShowcaseSection />
        <TestimonialsSection />
        <PlansSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
