"use client";

import Image from "next/image";
import { AnimatedSection } from "@/app/_components/AnimatedSection";
import decorativeStrip from "@/public/assets/decorative-strip.png";

const stats = [
  { subtitle: "Party Word Game for", number: "4-20+ Players" },
  { subtitle: "Replayable with", number: "1,800 Words" },
  { subtitle: "Every Game Lasts", number: "45-90 Mins" },
];

export default function StatsSection() {
  return (
    <>
      {/* Stats Bar */}
      <section
        className="bg-samosa-yellow-green py-6 md:py-8 relative"
        style={{ zIndex: 8 }}
      >
        <div className="container mx-auto px-4">
          <AnimatedSection variant="fade-up">
            <div className="flex justify-center items-center divide-x-2 divide-secondary/50">
              {stats.map((stat, index) => (
                <div key={index} className="text-center px-5 md:px-10 lg:px-14">
                  <p
                    className="text-[11px] md:text-[13px] lg:text-[16px] font-sans font-bold uppercase tracking-[0.15em] leading-none mb-1"
                    style={{ color: "#DA1963" }}
                  >
                    {stat.subtitle}
                  </p>

                  <p className="text-[40px] font-bystander text-primary leading-none uppercase tracking-normal">
                    {stat.number}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Decorative strip */}
      {/* <div className="w-full relative" style={{ zIndex: 8 }}>
        <Image
          src={decorativeStrip}
          alt=""
          role="presentation"
          aria-hidden="true"
          className="w-full h-auto"
          priority
        />
      </div> */}
    </>
  );
}
