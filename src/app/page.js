import AboutSection from "@/components/aboutSection";
import FindPlace from "@/components/findPlace";
import HeroSection from "@/components/heroSection";
import CallOut from "@/components/callOut"; 
import Navbar from "@/components/ui/navbar";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <AboutSection />
      <FindPlace />
      <CallOut />
    </div>
  );
}
