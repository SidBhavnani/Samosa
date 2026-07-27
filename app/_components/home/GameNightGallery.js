"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { cn } from "@/app/_hooks/utils";
import { AnimatedSection } from "../AnimatedSection";
import { PrismicNextImage } from "@prismicio/next";

export function GameNightGallery({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(0);

  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          data.image_gallery.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCount((prev) => prev + 1);
            }, i * 120);
          });
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [data.image_gallery]);

  return (
    <section
      ref={sectionRef}
      className="pt-16 md:pt-24 pb-4 bg-magenta-glow-soft overflow-hidden flex flex-col"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection variant="fade-up" className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bystander text-background uppercase">
            The chaos is <span className="text-secondary italic">real.</span>
          </h2>
          <p className="text-background/50 text-lg mt-4 max-w-md mx-auto font-sans font-semibold">
            Real people. Real game nights. Real fun.
          </p>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {data.image_gallery.map((item, index) => (
            <div
              key={index}
              className={cn(
                "relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-700 aspect-square",
                visibleCount > index
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-8",
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <PrismicNextImage
                  field={item.image}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-700",
                    hoveredIndex === index ? "scale-110" : "scale-100",
                  )}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                  unoptimized={item.gif}
                />
              </div>

              {/* GIF badge */}
              {item.gif && (
                <div className="absolute top-3 right-3 z-20">
                  <div className="relative">
                    <span className="absolute inset-0 bg-secondary rounded-full animate-ping opacity-40" />
                    <span className="relative bg-secondary text-secondary-foreground text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent flex items-end p-4 transition-opacity duration-300",
                  hoveredIndex === index ? "opacity-100" : "opacity-0",
                )}
              >
                <p className="text-background font-bold text-sm md:text-base">
                  {item.label}
                </p>
              </div>

              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/30 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="mt-10 md:mt-12 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-6 mr-6">
              {data.gallery_ticker.map((text, i) => (
                <span
                  key={i}
                  className="text-background/70 font-display font-bold text-2xl md:text-3xl uppercase px-4"
                >
                  {text.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
