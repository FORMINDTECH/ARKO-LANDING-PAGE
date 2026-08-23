import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import PlansSection from "@/components/PlansSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <ShowcaseSection />
        <PlansSection />
      </main>
      <Footer />
    </>
  );
}
