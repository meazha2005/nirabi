import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import HomeServicesOverview from "@/components/HomeServicesOverview";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <HomeServicesOverview />
      <FinalCTA />
    </>
  );
}
