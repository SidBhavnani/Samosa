"use client";

import Image from "next/image";
import { AnimatedSection } from "../AnimatedSection";

import decorativeStrip from "@/public/assets/decorative-strip.png";
import gameBoard from "@/public/assets/photos/board-closeup.jpg";

export default function BoardSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative strip (flipped) */}
      <div className="relative w-full">
        <Image
          src={decorativeStrip}
          alt=""
          aria-hidden="true"
          className="w-full h-auto"
          style={{ transform: "scaleY(-1)" }}
          priority
        />
      </div>

      {/* Game board */}
      <AnimatedSection variant="zoom-in">
        <div className="relative w-full h-[25vh] md:h-[30vh] lg:h-[35vh]">
          <Image
            src={gameBoard}
            alt="SAMOSA game board with colorful spinner and cards"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </AnimatedSection>
    </section>
  );
}
