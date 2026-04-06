"use client";

import Image from "next/image";
import { AnimatedSection } from "../AnimatedSection";
import partyVibesGif from "@/public/assets/photos/party-vibes.gif";

export default function AboutSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left - GIF */}
          <AnimatedSection variant="zoom-in" className="h-full lg:self-stretch">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-[440px] lg:h-full lg:min-h-0">
              <Image
                src={partyVibesGif}
                alt="Friends having fun playing SAMOSA"
                fill
                className="object-cover object-top"
                priority
                unoptimized
              />
            </div>
          </AnimatedSection>

          {/* Right - Content */}
          <div className="h-full">
            <AnimatedSection variant="fade-left">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bystander uppercase leading-[1.1] tracking-normal mb-4"
                style={{ fontSize: "50px" }}
              >
                <span className="text-primary">YOUR NEW </span>
                <span className="text-secondary">FAVOURITE</span>
                <br />
                <span className="text-primary">PARTY GAME IS HERE.</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection variant="fade-left" delay={200}>
              <p className="text-lg text-muted-foreground leading-snug mb-4 font-sans font-semibold">
                SAMOSA is a{" "}
                <span className="text-secondary">fast, unpredictable,</span>
                <br />
                <span className="text-secondary">
                  unapologetically desi
                </span>{" "}
                party board game.
              </p>

              <p className="text-lg text-muted-foreground leading-snug mb-6 font-sans font-semibold">
                The game offers a unique space to embrace and
                <br />
                share your true, desi-self with friends and family!
              </p>
            </AnimatedSection>

            <AnimatedSection variant="fade-left" delay={300} className="mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="border-l-2 border-secondary pl-4">
                  <span className="text-2xl mb-2 block">🏠</span>
                  <p className="font-bold text-primary text-base mb-1">
                    Culturally rich
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Includes 1,800 words that offer endless entertainment and
                    connect you to your South Asian roots
                  </p>
                </div>

                <div className="border-l-2 border-secondary pl-4">
                  <span className="text-2xl mb-2 block">🧐</span>
                  <p className="font-bold text-primary text-base mb-1">
                    Easy to learn
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Simple rules make SAMOSA accessible regardless of gaming
                    experience or age
                  </p>
                </div>

                <div className="border-l-2 border-secondary pl-4">
                  <span className="text-2xl mb-2 block">🙌🏽</span>
                  <p className="font-bold text-primary text-base mb-1">
                    Interactive gameplay
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Use shared memories and desi knowledge to win with friends
                    and family
                  </p>
                </div>

                <div className="border-l-2 border-secondary pl-4">
                  <span className="text-2xl mb-2 block">👴🧑‍🦱👧👶</span>
                  <p className="font-bold text-primary text-base mb-1">
                    Multi-generational
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Perfect for everyone — from grandparents to kids
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
