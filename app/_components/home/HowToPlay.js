import Link from "next/link";
import { AnimatedSection } from "../AnimatedSection";
import { Button } from "../ui/button";
import { Play } from "lucide-react";
import { cn } from "@/app/_hooks/utils";

export default function HowToPlay() {
  return (
    <section
      className="py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#3D63A6" }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection variant="fade-up" className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bystander uppercase mb-4 tracking-normal leading-[1.1]">
            <span className="text-white">How to </span>
            <span className="text-white">Play</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 font-sans font-semibold">
            <span className="text-white font-semibold">Aim of the game</span>:
            Be the first team to get around the board from Start to Finish.
          </p>
        </AnimatedSection>

        {/* Steps - Clean card layout matching reference */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                step: "01",
                title: "Split into teams",
                desc: "Divide the group into teams of 2 or more",
                emoji: "👥",
                color: "bg-secondary",
              },
              {
                step: "02",
                title: "Grab a stack of cards",
                desc: "Grab a stack of cards",
                emoji: "🃏",
                color: "bg-secondary",
              },
              {
                step: "03",
                title: "Describe, act, sing or dance",
                desc: "...clues about the words without saying the words themselves",
                emoji: "🎭",
                color: "bg-secondary",
              },
              {
                step: "04",
                title: "Guess",
                desc: "...as many words as possible correctly",
                emoji: "🏆",
                color: "bg-secondary",
              },
            ].map((item, index) => (
              <AnimatedSection
                key={index}
                variant="zoom-in"
                delay={index * 100}
              >
                <div className="flex flex-col items-center h-full">
                  {/* Step badge */}
                  <div
                    className={cn(
                      "px-6 py-2 rounded-full text-primary-foreground font-bold text-sm mb-4 shadow-md",
                      item.color,
                    )}
                  >
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
                      {item.desc}
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
            className="text-center mt-12"
          >
            <p className="text-lg md:text-xl text-white/80 mb-2 font-sans font-semibold">
              <span className="text-white font-semibold">Land on a SAMOSA</span>{" "}
              and everyone plays at once for the same point
              <br />- watch the SAMOSA chaos unfold 🔥
            </p>
            <div className="mt-6">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-8 font-bold rounded-full shadow-lg"
                asChild
              >
                <Link href="/how-to-play">
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
