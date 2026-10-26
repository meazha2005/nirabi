import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import FeaturedProject from "@/components/FeaturedProject";
import HomeServicesOverview from "@/components/HomeServicesOverview";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import HomeProjectsSpotlight from "@/components/HomeProjectsSpotlight";
import StyleQuiz from "@/components/StyleQuiz";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedProject />
      <HomeServicesOverview />
      <BeforeAfterSection />
      <HomeProjectsSpotlight />
      <StyleQuiz />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
