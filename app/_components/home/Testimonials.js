import { Star } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { PrismicNextImage } from "@prismicio/next";

export default function Testimonials({ data }) {
  const testimonials = [
    data.review_1.data,
    data.review_2.data,
    data.review_3.data,
  ];

  return (
    <section className="py-16 md:py-24 bg-samosa-yellow-green overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection variant="fade-up" className="mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bystander uppercase text-primary leading-[1.1] tracking-normal">
            Reviews
          </h2>
        </AnimatedSection>

        {/* Grid layout - 3 cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} variant="fade-up" delay={index * 100}>
              <div className="bg-samosa-cream rounded-2xl p-6 h-full flex flex-col shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-secondary fill-secondary"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-6 text-foreground">
                  {testimonial.review}
                </p>

                {testimonial.images.length > 0 && (
                  <div className={`grid gap-2 mb-6 grid-cols-2`}>
                    {testimonial.images.map((image, i) => (
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
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
