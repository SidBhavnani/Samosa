"use client";

import { useEffect, useRef, useState } from "react";
import AboutSection from "./_components/home/AboutSection";
import BoardSection from "./_components/home/BoardSection";
import CTASection from "./_components/home/CTASection";
import { GameNightGallery } from "./_components/home/GameNightGallery";
import HeroSection from "./_components/home/HeroSection";
import HowToPlay from "./_components/home/HowToPlay";
import StatsSection from "./_components/home/StatsSection";
import Testimonials from "./_components/home/Testimonials";
import StickyCartButton from "./_components/home/StickyCartButton";

export default function Home() {
  const [showStickyCart, setShowStickyCart] = useState(false);
  const ctaSectionRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowStickyCart(window.scrollY > 600);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeroSection />
      <StatsSection />
      {/* All sections after stats bar wrapped for parallax layering */}
      <div className="relative" style={{ zIndex: 20 }}>
        <AboutSection />
        <BoardSection />
        <HowToPlay />
        <Testimonials />
        <GameNightGallery />
        <CTASection ctaSectionRef={ctaSectionRef} />
        <StickyCartButton showStickyCart={showStickyCart} />
      </div>
    </>
  );
}
