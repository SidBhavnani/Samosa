"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatedSection } from "../AnimatedSection";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Shivani J",
    location: "London, UK",
    initial: "S",
    rating: 5,
    text: '"Absolutely loved the game. A must-have for a family social gathering and desi gang game nights!"',
  },
  {
    name: "Mihar V",
    location: "Amsterdam, NL",
    initial: "M",
    rating: 5,
    text: "\"Now this is a game I didn't know we needed!! Samosa is so much fun to play, can't wait for the release!\"",
  },
  {
    name: "Sakshi A",
    location: "New York, US",
    initial: "S",
    rating: 5,
    text: '"It\'s rare that I can play a game with my whole family - Samosa was such a hit with them!!"',
  },
  {
    name: "Rahul P",
    location: "Toronto, CA",
    initial: "R",
    rating: 5,
    text: '"We played this at a Diwali party and it was the highlight of the night. Everyone was in tears laughing!"',
  },
  {
    name: "Priya M",
    location: "Dubai, UAE",
    initial: "P",
    rating: 5,
    text: '"Finally a game that actually represents our culture! The whole family loved it - from my kids to my grandma."',
  },
];

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3,
  );

  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visibleCount);

  const next = useCallback(
    () => setCurrentIndex((i) => Math.min(i + 1, maxIndex)),
    [maxIndex],
  );
  const prev = useCallback(
    () => setCurrentIndex((i) => Math.max(i - 1, 0)),
    [],
  );

  return (
    <section className="py-16 md:py-20 bg-primary overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection variant="fade-up">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-samosa-gold text-samosa-gold"
                />
              ))}
            </div>
            <blockquote className="text-[24px] md:text-[32px] lg:text-[38px] font-bystander text-primary-foreground leading-[1.2] max-w-3xl mx-auto mb-4">
              &quot;The best party game for desi game nights — pure chaos and
              belly laughs!&quot;
            </blockquote>
            <p className="text-primary-foreground/60 font-sans font-semibold text-sm">
              — Featured Review
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" delay={200}>
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                }}
              >
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-primary-foreground/10 rounded-2xl p-6 backdrop-blur-sm border border-primary-foreground/10 shrink-0"
                    style={{
                      width: `calc(${100 / visibleCount}% - ${((visibleCount - 1) * 16) / visibleCount}px)`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground font-sans font-bold text-sm">
                        {review.initial}
                      </div>
                      <div>
                        <p className="text-primary-foreground font-sans font-bold text-sm">
                          {review.name} ({review.location})
                        </p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 fill-samosa-gold text-samosa-gold"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-primary-foreground/80 font-sans text-sm leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center disabled:opacity-30 hover:bg-secondary/80 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                disabled={currentIndex >= maxIndex}
                className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center disabled:opacity-30 hover:bg-secondary/80 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
