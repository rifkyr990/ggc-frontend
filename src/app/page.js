import AboutSection from "@/components/aboutSection";
import FindPlace from "@/components/findPlace";
import HeroSection from "@/components/heroSection";
import CallOut from "@/components/callOut"; 

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FindPlace />
      <CallOut />
    </div>
  );
}
