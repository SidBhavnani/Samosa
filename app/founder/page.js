"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Quote,
} from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { AnimatedSection } from "@/app/_components/AnimatedSection";
import { useParallax } from "@/app/_hooks/useParallax";

import chaiGlass from "@/public/assets/illustrations/chai-glass.png";
import samosaIllust from "@/public/assets/illustrations/samosa-illust.png";
import swirlIllust from "@/public/assets/illustrations/swirl-illust.png";
import jalebi from "@/public/assets/illustrations/jalebi.png";
import cardStack from "@/public/assets/illustrations/card-stack.png";
import founderPhoto from "@/public/assets/photos/board-setup.jpg";
import { OurStorySection } from "@/app/_components/founder/OurStorySection";
import desiIconsRow from "@/public/assets/illustrations/desi-icons-row.png";

const values = [
  {
    title: "Authentic Representation",
    description:
      "We celebrate Desi culture in all its beautiful, chaotic glory.",
    emoji: "❤️",
  },
  {
    title: "Community First",
    description:
      "Built by and for the Desi community. Your stories inspire us.",
    emoji: "👥",
  },
  {
    title: "Joy & Connection",
    description:
      "Bringing people together through laughter, one game at a time.",
    emoji: "✨",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/samosagame",
  },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/samosagame" },
  { name: "Facebook", icon: Facebook, url: "https://facebook.com/samosagame" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com/@samosagame" },
];

// KEEP <img> for parallax (do NOT convert this)
function FloatingIcon({ src, className, speed = 0.2, baseRotation = 0 }) {
  const ref = useRef(null);
  const rafId = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      const y = scrollY * speed;
      const rotation = baseRotation + scrollY * 0.02;
      ref.current.style.transform = `translateY(${-y}px) rotate(${rotation}deg)`;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        rafId.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [speed, baseRotation]);

  return (
    <img
      ref={ref}
      src={src.src}
      alt=""
      aria-hidden="true"
      className={`absolute pointer-events-none select-none object-contain drop-shadow-lg ${className || ""}`}
      style={{ willChange: "transform", zIndex: 5 }}
    />
  );
}

export default function FounderPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const leftSamosa = useParallax(0.3, 0.02);
  const rightSamosa = useParallax(0.2, -0.015);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative bg-primary pt-32 md:pt-40 pb-16 md:pb-24 h-[480px] overflow-hidden flex items-center justify-center">
        {/* Floating chai images */}
        <div
          className="absolute -left-6 md:-left-4 top-[35%] w-[127px] md:w-[177px] lg:w-[215px]"
          style={{
            zIndex: 5,
            transform: `translateY(${leftSamosa.y}px) rotate(${25 + leftSamosa.rotation}deg)`,
          }}
        >
          <Image src={chaiGlass} alt="" width={215} height={215} />
        </div>

        <div
          className="absolute -right-6 md:-right-4 bottom-[5%] w-[152px] md:w-[215px] lg:w-[253px]"
          style={{
            zIndex: 5,
            transform: `translateY(${rightSamosa.y}px) rotate(${-20 + rightSamosa.rotation}deg)`,
          }}
        >
          <Image src={chaiGlass} alt="" width={253} height={253} />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <AnimatedSection variant="fade-up" delay={100}>
            <h1 className="text-[92px] md:text-[139px] lg:text-[185px] font-bystander uppercase leading-[1] tracking-normal text-center">
              <span className="text-secondary">Our </span>
              <span className="text-samosa-cream">Story</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection variant="fade-up" delay={300}>
            <p className="text-samosa-cream/80 font-sans font-semibold text-sm md:text-base lg:text-lg text-center max-w-3xl mx-auto mt-6 leading-relaxed italic">
              &quot;I made SAMOSA so South Asians can feel seen and finally play
              a game that bridges generations and reflects the world we actually
              grew up in.&quot;
              <span className="block mt-2 not-italic text-secondary text-xs md:text-sm font-semibold tracking-wide uppercase">
                — Aanchal Khandelwal, Founder
              </span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="relative z-20">
        <OurStorySection />

        {/* Pull Quote - Full-width accent strip */}
        <section className="bg-secondary py-10 md:py-14">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection variant="fade-up">
              <div className="flex items-center justify-center gap-6 md:gap-10">
                <Quote className="h-8 w-8 md:h-10 md:w-10 text-secondary-foreground/30 flex-shrink-0 rotate-180" />
                <p className="text-xl md:text-2xl lg:text-3xl font-bystander uppercase leading-[1.2] tracking-normal text-secondary-foreground text-center max-w-3xl">
                  I wanted to create a game where being Desi isn&apos;t just
                  acknowledged —{" "}
                  <span className="text-primary">
                    it&apos;s the whole point.
                  </span>
                </p>
                <Quote className="h-8 w-8 md:h-10 md:w-10 text-secondary-foreground/30 flex-shrink-0" />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* More Than a Game - Editorial split */}
        <section className="py-20 md:py-28 bg-background relative overflow-hidden">
          {/* Floating parallax illustrations */}
          <FloatingIcon
            src={samosaIllust}
            className="w-[80px] md:w-[110px] lg:w-[140px] -left-8 md:-left-4 top-[15%]"
            speed={0.15}
            baseRotation={-15}
          />
          <FloatingIcon
            src={swirlIllust}
            className="w-[60px] md:w-[80px] lg:w-[100px] -right-6 md:-right-2 top-[25%]"
            speed={0.22}
            baseRotation={10}
          />
          <FloatingIcon
            src={jalebi}
            className="w-[70px] md:w-[100px] lg:w-[120px] -left-6 md:-left-2 bottom-[10%]"
            speed={0.18}
            baseRotation={20}
          />
          <FloatingIcon
            src={cardStack}
            className="w-[65px] md:w-[90px] lg:w-[110px] -right-8 md:-right-4 bottom-[15%]"
            speed={0.12}
            baseRotation={-8}
          />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div className="flex flex-col justify-between h-full">
                <AnimatedSection variant="fade-right">
                  <h2 className="text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-4">
                    <span className="text-primary">More than</span>
                    <br />
                    <span className="text-secondary">a game.</span>
                  </h2>
                </AnimatedSection>
                <AnimatedSection variant="fade-up" delay={300}>
                  {/* <div className="container mx-auto px-4"> */}
                  <Image
                    src={desiIconsRow}
                    alt="Desi cultural icons"
                    width={400}
                    height={120}
                    className="w-full max-w-md"
                  />
                  {/* </div> */}
                </AnimatedSection>
              </div>
              <div>
                <AnimatedSection variant="fade-left" delay={200}>
                  <div className="space-y-4 text-lg text-muted-foreground leading-relaxed font-sans font-semibold">
                    <p>
                      SAMOSA isn&apos;t just a game – it&apos;s a celebration of
                      who we are. From Bollywood classics to auntie gossip, from
                      cricket legends to festival traditions, every card is
                      designed to make you laugh, dance, and connect with your
                      roots.
                    </p>
                    <p>
                      Today, SAMOSA has brought joy to thousands of game nights
                      across the world. But this is just the beginning.
                      We&apos;re building a community that celebrates Desi
                      culture in all its beautiful, chaotic glory.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Values - Horizontal layout on magenta */}
        <section className="py-20 md:py-28 bg-primary">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection variant="fade-up" className="mb-14 text-center">
              <h2 className="text-[53px] font-bystander uppercase leading-[1.1] tracking-normal">
                <span className="text-samosa-cream">What We </span>
                <span className="text-secondary">Believe.</span>
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <AnimatedSection
                  key={value.title}
                  variant="fade-up"
                  delay={index * 100}
                  className="h-full"
                >
                  <div className="bg-samosa-cream/10 backdrop-blur-sm rounded-2xl p-8 h-full border border-white/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl mb-5">{value.emoji}</div>
                    <h3 className="font-bold text-lg mb-2 text-samosa-cream font-sans">
                      {value.title}
                    </h3>
                    <p className="text-samosa-cream/60 text-sm leading-relaxed font-sans">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Portrait + Community CTA */}
        <section className="py-20 md:py-28 bg-samosa-yellow-green">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Left - Founder photo */}
                <AnimatedSection variant="fade-right">
                  <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src={founderPhoto}
                      alt="SAMOSA board game setup"
                      fill
                      className="object-cover"
                    />
                  </div>
                </AnimatedSection>

                {/* Right - CTA content */}
                <AnimatedSection variant="fade-left" delay={200}>
                  <div>
                    <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-4">
                      <span className="text-primary">Be Part of the </span>
                      <br />
                      <span className="text-secondary">SAMOSA Family.</span>
                    </h2>
                    <p className="text-muted-foreground mb-8 text-lg font-sans font-semibold max-w-md">
                      Stay updated with new releases, tips, and exclusive
                      content.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-3 mb-8">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary transition-all duration-300 hover:scale-110"
                          aria-label={social.name}
                        >
                          <social.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>

                    {/* Newsletter */}
                    <div className="max-w-sm">
                      {isSubscribed ? (
                        <div className="bg-primary/10 rounded-xl p-6">
                          <Mail className="h-8 w-8 text-primary mb-2" />
                          <p className="text-foreground font-semibold">
                            Thanks for subscribing!
                          </p>
                          <p className="text-muted-foreground text-sm font-sans">
                            Check your inbox for a welcome surprise 🎉
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubscribe} className="flex gap-2">
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="rounded-full"
                          />
                          <Button
                            type="submit"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                          >
                            Subscribe
                          </Button>
                        </form>
                      )}
                      <p className="text-muted-foreground text-xs mt-3 font-sans">
                        Join 10,000+ SAMOSA fans. No spam, just good vibes.
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
