'use client'
import { useState } from "react";
import AboutSection from "@/components/aboutSection";
import HeroSection from "@/components/heroSection";
import CallOut from "@/components/callOut";
import Testimoni from "@/components/testimoni";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import FindPlace from "@/components/findPlace";
import SplashScreen from "@/components/ui/SplashScreen";
import { motion } from "framer-motion";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Navbar />
          <div>
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
          </div>
          <Footer />
          </motion.div>
        </>
      )}
    </>
  );
}
