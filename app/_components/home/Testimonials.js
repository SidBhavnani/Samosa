"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { PrismicNextImage } from "@prismicio/next";
import { useCallback, useEffect, useState } from "react";

export default function Testimonials({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1,
  );

  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, data.reviews.length - visibleCount);

  const next = useCallback(
    () => setCurrentIndex((i) => Math.min(i + 1, maxIndex)),
    [maxIndex],
  );
  const prev = useCallback(
    () => setCurrentIndex((i) => Math.max(i - 1, 0)),
    [],
  );

  // console.log(data.reviews);

  return (
    <section className="py-16 md:py-24 bg-samosa-yellow-green overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection variant="fade-up" className="mb-10">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bystander uppercase text-primary leading-[1.1] tracking-normal">
              Reviews
            </h2>

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

        {/* Grid layout - 3 cards */}
        {/* <div className="grid md:grid-cols-3 gap-4 md:gap-6"> */}
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
                {data.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-samosa-cream rounded-2xl p-6 flex flex-col shrink-0 shadow-sm"
                    style={{
                      width: `calc(${100 / visibleCount}% - ${((visibleCount - 1) * 16) / visibleCount}px)`,
                    }}
                  >
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(review.review.data.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-secondary fill-secondary"
                        />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed flex-1 mb-6 text-foreground">
                      {review.review.data.review}
                    </p>

                    {review.review.data.images?.length > 0 && (
                      <div className={`grid gap-2 mb-6 grid-cols-2`}>
                        {review.review.data.images.map((image, i) => (
                          <div
                            key={i}
                            className="relative aspect-[4/3] overflow-hidden rounded-lg"
                          >
                            <PrismicNextImage
                              field={image.image}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-10 h-10 relative overflow-hidden rounded-full flex items-center justify-center bg-primary font-bold text-sm">
                        {review.review.data.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">
                          {review.review.data.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {review.review.data.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
