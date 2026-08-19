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

import { OurStorySection } from "@/app/_components/founder/OurStorySection";
import HeroSection from "@/app/_components/founder/HeroSection";
import SubscribeSection from "@/app/_components/founder/SubscribeSection";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

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

// KEEP <img> for parallax (do NOT convert this)
// function FloatingIcon({ src, className, speed = 0.2, baseRotation = 0 }) {
//   const ref = useRef(null);
//   const rafId = useRef(0);
//   const ticking = useRef(false);

//   useEffect(() => {
//     const update = () => {
//       if (!ref.current) return;
//       const scrollY = window.scrollY;
//       const y = scrollY * speed;
//       const rotation = baseRotation + scrollY * 0.02;
//       ref.current.style.transform = `translateY(${-y}px) rotate(${rotation}deg)`;
//       ticking.current = false;
//     };

//     const onScroll = () => {
//       if (!ticking.current) {
//         ticking.current = true;
//         rafId.current = requestAnimationFrame(update);
//       }
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     update();

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       cancelAnimationFrame(rafId.current);
//     };
//   }, [speed, baseRotation]);

//   return (
//     <img
//       ref={ref}
//       src={src.src}
//       alt=""
//       aria-hidden="true"
//       className={`absolute pointer-events-none select-none object-contain drop-shadow-lg ${className || ""}`}
//       style={{ willChange: "transform", zIndex: 5 }}
//     />
//   );
// }

export async function generateMetadata() {
  const client = createClient();
  const metadata = await client.getSingle("metadata");

  return {
    title: metadata?.data.our_story_title,
    description: metadata?.data.our_story_description,
  };
}

export default async function FounderPage() {
  const client = createClient();
  const page = await client.getSingle("our_story");
  const globalNav = await client.getSingle("global_nav");

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <HeroSection data={page.data} />

      <div className="relative z-20">
        <OurStorySection data={page.data} />

        {/* Pull Quote - Full-width accent strip */}
        <section className="bg-secondary py-10 md:py-14">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection variant="fade-up">
              <div className="flex items-center justify-center gap-6 md:gap-10">
                <Quote className="h-8 w-8 md:h-10 md:w-10 text-secondary-foreground/30 flex-shrink-0 rotate-180" />
                <p className="text-lg md:text-2xl lg:text-3xl font-bystander uppercase leading-[1.2] tracking-normal text-secondary-foreground text-center max-w-3xl">
                  {page.data.quote}
                  <span className="text-primary">
                    {page.data.quote_highlight}
                  </span>
                </p>
                <Quote className="h-8 w-8 md:h-10 md:w-10 text-secondary-foreground/30 flex-shrink-0" />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* More Than a Game - Editorial split */}
        <section className="py-20 md:py-28 bg-background relative overflow-hidden">
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
                  <PrismicNextImage
                    field={page.data.more_than_a_game_image}
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
                    {page.data.more_than_a_game_paragraphs.map((paragraph) => (
                      <p key={paragraph.paragraph}>{paragraph.paragraph}</p>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* Values - Horizontal layout on magenta */}
        {/* <section className="py-20 md:py-28 bg-primary">
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
        </section> */}

        {/* Founder Portrait + Community CTA */}
        <SubscribeSection data={page.data} globalNav={globalNav.data} />
      </div>
    </div>
  );
}
