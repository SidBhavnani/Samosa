import { Star } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";

const testimonials = [
  {
    quote:
      'The game almost tore my entire house apart. For a small group of four playing, you would think there was at least 20 in the room. There was a lot of shouting "how did you not get that!!" To "omg we got it!!" within seconds of each card 😂',
    name: "Vidhi",
    location: "New York, US",
    highlight: "tore my entire house apart",
  },
  {
    quote:
      "I was pleasantly surprised by how accessible and inclusive the game was. Even without deep Bollywood knowledge, there were plenty of cards for kids and elders to enjoy. It's been a hit with every group I've played with, and unlike most board games, everyone's excited to play Samosa again.",
    name: "Haroon",
    location: "London, UK",
    highlight: "accessible and inclusive",
  },
  {
    quote:
      "It is such an easy game to pick up and play with almost anyone. From my 5 year old niece to my 65 year old parents! The fast paced nature of it and the varying topics on each card means you can easily keep playing rounds, switching teams and not get bored of it any time soon. The relatability of the words/phrases on each card makes it so much more fun and is definitely why we played several rounds each time we opened Samosa!",
    name: "Rupa",
    location: "Wolverhampton, UK",
    highlight: "easy game to pick up",
  },
];

export default function Testimonials() {
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
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-secondary fill-secondary"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-6 text-foreground">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
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
