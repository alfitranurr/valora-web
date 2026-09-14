import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { Destinations } from "@/components/home/Destinations";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { WhyValora } from "@/components/home/WhyValora";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedServices />
      <Destinations />
      <FeaturedPackages />
      <WhyValora />
      <HowItWorks />
      <FinalCTA />
    </>
  );
}
