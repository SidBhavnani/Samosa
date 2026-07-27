import Link from "next/link";
import { AnimatedSection } from "../AnimatedSection";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

export default function HowToPlay({ data }) {
  return (
    <section
      className="py-6 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#3D63A6" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection variant="fade-up" className="text-center mb-6">
          <h2 className="text-3xl text-white md:text-4xl lg:text-5xl font-bystander uppercase mb-4 tracking-normal leading-[1.1]">
            {data.how_to_play_title}
          </h2>
          <p
            className="text-lg md:text-xl text-white/80 font-sans font-semibold"
            dangerouslySetInnerHTML={{ __html: data.how_to_play_subtitle }}
          />
        </AnimatedSection>

        {/* Steps - Clean card layout matching reference */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {data.how_to_play_steps.map((item, index) => (
              <AnimatedSection
                key={index}
                variant="zoom-in"
                delay={index * 100}
              >
                <div className="flex flex-col items-center h-full">
                  {/* Step badge */}
                  <div className="px-6 py-2 rounded-full bg-secondary text-primary-foreground font-bold text-sm mb-4 shadow-md">
                    Step {item.step}
                  </div>
                  {/* Card */}
                  <div className="bg-card rounded-2xl p-6 shadow-sm w-full text-center flex flex-col items-center flex-1 justify-center">
                    <span className="text-4xl md:text-5xl mb-4">
                      {item.emoji}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-foreground text-center mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-xs md:text-sm text-center leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* SAMOSA chaos line + CTA */}
          <AnimatedSection
            variant="fade-up"
            delay={500}
            className="text-center mt-6"
          >
            <p
              className="text-lg md:text-xl text-white/80 mb-2 font-sans font-semibold"
              dangerouslySetInnerHTML={{ __html: data.how_to_play_description }}
            />
            <div className="mt-4">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-8 font-bold rounded-full shadow-lg"
                asChild
              >
                <Link href="/how-to-play#how-to-play-video">
                  <Play className="mr-2 h-4 w-4" />
                  Watch The Full Video
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
