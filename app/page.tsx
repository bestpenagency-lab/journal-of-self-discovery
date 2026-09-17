import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ForYouSection from "@/components/ForYouSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import PricingCTA from "@/components/PricingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ForYouSection />
      <GuaranteeSection />
      <PricingCTA />
      <Footer />
    </main>
  );
}
