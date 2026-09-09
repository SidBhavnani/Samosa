import { Star } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { PrismicNextImage } from "@prismicio/next";

export default function Testimonials({ data }) {
  return (
    <section className="py-16 md:py-24 bg-samosa-yellow-green overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <AnimatedSection variant="fade-up" className="mb-10">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bystander uppercase text-primary leading-[1.1] tracking-normal">
              Reviews
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" delay={200}>
          <div className="relative overflow-hidden">
            <div className="flex w-max animate-reviews">
              {/* First set */}

              {data.reviews.map((review) => (
                <ReviewCard key={`a-${review.review.uid}`} review={review} />
              ))}

              {/* Duplicate set */}
              {data.reviews.map((review) => (
                <ReviewCard key={`b-${review.review.uid}`} review={review} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-samosa-cream rounded-2xl p-6 flex flex-col shrink-0 shadow-sm w-[clamp(360px,30vw,480px)] mr-6">
      <div className="flex gap-0.5 mb-4">
        {[...Array(review.review.data.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-secondary fill-secondary" />
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
          <p className="font-semibold text-sm">{review.review.data.name}</p>
          <p className="text-muted-foreground text-xs">
            {review.review.data.location}
          </p>
        </div>
      </div>
    </div>
  );
}
