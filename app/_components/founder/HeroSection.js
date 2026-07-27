"use client";

import { AnimatedSection } from "../AnimatedSection";
import { useParallax } from "@/app/_hooks/useParallax";
import { PrismicNextImage } from "@prismicio/next";

export default function HeroSection({ data }) {
  const leftSamosa = useParallax(0.3, 0.02);
  const rightSamosa = useParallax(0.2, -0.015);

  return (
    <section className="relative bg-primary pt-32 md:pt-40 pb-16 md:pb-24 h-[400px] md:h-[480px] overflow-hidden flex items-center justify-center">
      {/* Floating chai images */}
      <div
        className="hidden md:block absolute -left-6 md:-left-4 top-[35%] w-[127px] md:w-[177px] lg:w-[215px]"
        style={{
          zIndex: 5,
          transform: `translateY(${leftSamosa.y}px) rotate(${25 + leftSamosa.rotation}deg)`,
        }}
      >
        <PrismicNextImage
          field={data.hero_illustration}
          alt=""
          width={215}
          height={215}
        />
      </div>

      <div
        className="hidden md:block absolute -right-6 md:-right-4 bottom-[5%] w-[152px] md:w-[215px] lg:w-[253px]"
        style={{
          zIndex: 5,
          transform: `translateY(${rightSamosa.y}px) rotate(${-20 + rightSamosa.rotation}deg)`,
        }}
      >
        <PrismicNextImage
          field={data.hero_illustration}
          alt=""
          width={253}
          height={253}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <AnimatedSection variant="fade-up" delay={100}>
          <h1 className="text-[92px] md:text-[139px] lg:text-[185px] font-bystander uppercase leading-[1] tracking-normal text-center">
            <span className="text-secondary">Our </span>
            <span className="text-samosa-cream">Story</span>
          </h1>
        </AnimatedSection>
        <AnimatedSection variant="fade-up" delay={300}>
          <div className="flex max-w-[340px] md:max-w-3xl mx-auto mt-6 h-32 sm:h-28 items-center gap-3 md:gap-6">
            <div className="relative aspect-[4/5] h-full">
              <PrismicNextImage
                field={data.hero_image}
                fill
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
            <p className="text-samosa-cream/80 font-sans font-semibold text-sm md:text-base lg:text-lg text-left italic">
              {data.hero_quote}
              <span className="block mt-2 not-italic text-secondary text-xs md:text-sm font-semibold tracking-wide uppercase">
                {data.hero_byline}
              </span>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
