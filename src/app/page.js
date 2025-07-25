import AboutSection from "@/components/aboutSection";
import FindPlace from "@/components/findPlace";
import HeroSection from "@/components/heroSection";
import CallOut from "@/components/callOut"; 
import Testimoni from "@/components/testimoni";
import React from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <section id="tentang">
        <HeroSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <section id="proyek1">
        <FindPlace />
      </section>
      <section id="callout">
        <CallOut />
      </section>
      <section id="testimoni">
        <Testimoni />
      </section>
      <section id="footer">
        <Footer/>
      </section>
    </div>
  );
}
