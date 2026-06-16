"use client";

import { Send, Star } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { Button } from "../ui/button";
import { useState } from "react";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !rating || !reviewText.trim()) return;

    setIsSubmitting(true);
    // const { error } = await supabase.from("reviews").insert({
    //   name: name.trim(),
    //   location: location.trim() || null,
    //   rating,
    //   review_text: reviewText.trim(),
    // });

    setIsSubmitting(false);

    // if (error) {
    //   toast({
    //     title: "Oops!",
    //     description:
    //       "Something went wrong submitting your review. Please try again.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setSubmitted(true);
    // toast({
    //   title: "Thank you!",
    //   description: "Your review has been submitted.",
    // });
  };

  if (submitted) {
    return (
      <section className="py-16 md:py-20 bg-samosa-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection variant="fade-up">
            <div className="text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-sans font-black text-xs uppercase tracking-[0.12em] px-4 py-2 rounded-full mb-6">
                <Send className="h-3.5 w-3.5" />
                Submitted
              </div>
              <h3 className="text-[28px] md:text-[36px] font-bystander uppercase leading-[1.1] tracking-normal text-primary mb-3">
                THANK YOU!
              </h3>
              <p className="text-primary/70 font-sans font-semibold text-base">
                Your review means the world to us. Keep the chaos going!
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-samosa-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection variant="fade-up">
          <div className="max-w-2xl mx-auto text-center">
            {/* Heading */}
            <h3 className="text-[32px] md:text-[48px] lg:text-[56px] font-bystander uppercase leading-[1.1] tracking-normal mb-10">
              <span className="text-primary">ADD YOUR </span>
              <span className="text-secondary">REVIEW</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {/* Name & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-primary font-sans font-semibold text-sm mb-2">
                    Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-white border-2 border-primary/20 text-primary font-sans text-sm placeholder:text-primary/40 outline-none focus:border-primary/40 transition-colors shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-primary font-sans font-semibold text-sm mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                    className="w-full px-5 py-4 rounded-xl bg-white border-2 border-primary/20 text-primary font-sans text-sm placeholder:text-primary/40 outline-none focus:border-primary/40 transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-primary font-sans font-semibold text-sm mb-2">
                  Your rating <span className="text-secondary">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1;
                    const isFilled = starValue <= (hoverRating || rating);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            isFilled
                              ? "fill-samosa-gold text-samosa-gold"
                              : "fill-transparent text-primary/30"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-primary font-sans font-semibold text-sm mb-2">
                  Your review <span className="text-secondary">*</span>
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us what you loved about the game..."
                  required
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl bg-white border-2 border-primary/20 text-primary font-sans text-sm placeholder:text-primary/40 outline-none focus:border-primary/40 transition-colors resize-none shadow-sm"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={
                  isSubmitting || !name.trim() || !rating || !reviewText.trim()
                }
                className="w-full py-7 text-base font-sans font-black uppercase tracking-[0.15em] rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
