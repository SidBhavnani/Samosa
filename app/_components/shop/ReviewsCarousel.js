"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatedSection } from "../AnimatedSection";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function ReviewsCarousel({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3,
  );

  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, data.reviews_carousel.length - visibleCount);

  const next = useCallback(
    () => setCurrentIndex((i) => Math.min(i + 1, maxIndex)),
    [maxIndex],
  );
  const prev = useCallback(
    () => setCurrentIndex((i) => Math.max(i - 1, 0)),
    [],
  );

  // console.log(data.reviews_carousel[0]);

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
              {data.featured_review_text}
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
                  // transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                  transform: `translateX(calc(-${currentIndex * (100 / visibleCount)}% - ${visibleCount === 1 ? currentIndex * 16 : 0}px))`,
                }}
              >
                {data?.reviews_carousel?.map((review, index) => (
                  <div
                    key={index}
                    className="bg-primary-foreground/10 rounded-2xl p-6 backdrop-blur-sm border border-primary-foreground/10 shrink-0"
                    style={{
                      width: `calc(${100 / visibleCount}% - ${((visibleCount - 1) * 16) / visibleCount}px)`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground font-sans font-bold text-sm">
                        {review.review.data.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-primary-foreground font-sans font-bold text-sm">
                          {review.review.data.name} (
                          {review.review.data.location})
                        </p>
                        <div className="flex gap-0.5">
                          {Array.from({
                            length: review.review.data.rating,
                          }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 fill-samosa-gold text-samosa-gold"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-primary-foreground/80 font-sans text-sm leading-relaxed">
                      {review.review.data.review}
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
