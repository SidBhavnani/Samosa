"use client";

import { AnimatedSection } from "../AnimatedSection";

const specs = [
  { label: "200", value: "Double-sided cards" },
  { label: "1800+", value: "Unique challenges" },
  { label: "4", value: "Ways to play" },
];

export default function WhatsInsideSection() {
  return (
    <>
      <div className="bg-secondary overflow-hidden py-3">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-primary-foreground font-bystander text-lg uppercase tracking-wider mx-2 flex items-center gap-2"
            >
              {[
                "🎬 Bollywood",
                "🍛 Desi Vibes",
                "💃 Dance Round",
                "🏏 Cricket Talk",
                "🎲 Game Night",
                "😂 Pure Chaos",
                "🎵 Music Round",
                "🔥 Spicy Cards",
              ].map((text, j) => (
                <span key={j} className="flex items-center gap-2">
                  <span>{text}</span>
                  <span>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* What's Inside - Stats Section */}
      <section className="overflow-hidden bg-samosa-blue">
        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
          <AnimatedSection variant="fade-up" className="text-center mb-10">
            <h2 className="text-[32px] md:text-[44px] lg:text-[56px] font-bystander uppercase mb-4 tracking-normal leading-[1.1]">
              <span className="text-samosa-cream">What&apos;s </span>
              <span className="text-secondary">Inside</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection variant="fade-up" delay={200}>
            <div className="flex justify-center items-center divide-x-2 divide-white/30 max-w-3xl mx-auto">
              {specs.map((item, index) => (
                <div
                  key={index}
                  className="text-center px-4 md:px-8 lg:px-16 flex-1"
                >
                  <p className="text-[24px] md:text-[36px] lg:text-[52px] font-bystander text-samosa-cream leading-none uppercase tracking-normal">
                    {item.label}
                  </p>
                  <p className="text-[9px] md:text-[12px] lg:text-[13px] font-sans font-bold uppercase tracking-[0.12em] text-secondary mt-2 leading-tight">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
