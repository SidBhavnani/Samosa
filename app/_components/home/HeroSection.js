import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/app/_components/AnimatedSection";
import { ParallaxIllustrations } from "@/app/_components/ParallaxIllustrations";

import { Button } from "@/app/_components/ui/button";
import { ShoppingCart, Play } from "lucide-react";

import gameBox from "@/public/assets/game-box.png";
import samosaIllust from "@/public/assets/illustrations/samosa-illust.png";
import heroCardsStack from "@/public/assets/hero-cards-stack.png";
import { useCart } from "@/app/_contexts/CartContext";

const SAMOSA_PRODUCT = {
  id: "samosa-game-1",
  name: "SAMOSA - Desi Party Game",
  price: 29.99,
  image: "/assets/game-box.png", // important: use public path for cart
};

export default function HeroSection() {
  const { addItem, adding } = useCart();

  const handleAddToCart = () => {
    addItem();
  };

  return (
    <section className="relative overflow-hidden bg-magenta-glow pt-32 md:pt-40 pb-4 md:pb-6">
      {/* Headline — both lines sized to bleed edges equally */}
      <div className="relative w-full px-2">
        <h1 className="font-bystander uppercase text-center leading-[0.92] tracking-[-0.01em] select-none whitespace-nowrap">
          <span
            className="block text-secondary"
            style={{
              fontSize: "clamp(3rem, 10vw, 11rem)",
              textShadow: "0 4px 18px rgba(0,0,0,0.22)",
            }}
          >
            The&nbsp;Ultimate&nbsp;Desi
          </span>
          <span
            className="block text-samosa-yellow-light"
            style={{
              fontSize: "clamp(3rem, 10vw, 11rem)",
              marginTop: "-0.04em",
              textShadow: "0 4px 18px rgba(0,0,0,0.22)",
            }}
          >
            Party&nbsp;Game
          </span>
        </h1>
      </div>

      {/* Stage — product box + decor sit lower so DESI PARTY GAME stays visible */}
      <div className="relative -mt-[2vw] md:-mt-[1vw] h-[48vw] md:h-[32vw] lg:h-[28vw] max-h-[440px]">
        {/* Game box — centered, lowered so headline below stays visible */}
        <div className="absolute inset-x-0 top-[4%] flex justify-center z-20">
          <div
            className="w-[48%] md:w-[40%] lg:w-[36%] max-w-[480px] drop-shadow-2xl animate-hero-bob"
            style={{ ["--bob-rot"]: "0deg", animationDuration: "5s" }}
          >
            <Image
              src={gameBox}
              alt="SAMOSA Game Box — The Ultimate Desi Party Game"
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Absolute Chaos Included — short blue pill with speech-bubble tail */}
        <div
          className="absolute left-[2%] md:left-[28%] top-[4%] md:top-[12%] z-40 animate-hero-bob"
          style={{ ["--bob-rot"]: "-4deg", animationDuration: "6s" }}
        >
          <div className="relative">
            <div
              className="bg-samosa-blue text-primary-foreground rounded-[2rem] shadow-xl font-sans font-extrabold uppercase tracking-wide text-center leading-[1.05]"
              style={{
                padding:
                  "clamp(0.6rem, 1.4vw, 1.4rem) clamp(1.4rem, 2.2vw, 2.2rem)",
                fontSize: "clamp(0.85rem, 1.55vw, 1.6rem)",
              }}
            >
              <span className="block">Absolute</span>
              <span className="block">
                Chaos{" "}
                <span aria-hidden="true" className="emoji">
                  💃
                </span>
              </span>
              <span className="block">Included</span>
            </div>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-1.5 right-10 w-3 h-3 md:-bottom-2 md:right-12 md:w-4 md:h-4 bg-samosa-blue rotate-45" />
            {/* <div
              className="absolute"
              style={{
                right: "17%",
                bottom: "clamp(-8px, -1vw, -6px)",
                width: 0,
                height: 0,
                borderLeft: "clamp(6px, 0.75vw, 11px) solid transparent",
                borderRight: "clamp(6px, 0.75vw, 11px) solid transparent",
                borderTop:
                  "clamp(11px, 1.3vw, 18px) solid hsl(var(--samosa-blue))",
              }}
              aria-hidden="true"
            /> */}
          </div>
        </div>

        {/* Samosa triangle — left side, below the chaos bubble */}
        <div
          className="absolute left-[12%] md:left-[22%] top-[55%] md:top-[42%] w-[16%] md:w-[10%] max-w-[140px] drop-shadow-2xl animate-hero-bob pointer-events-none z-30"
          style={{ ["--bob-rot"]: "-14deg", animationDuration: "4.5s" }}
        >
          <Image
            src={samosaIllust}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Try Me pill — short orange pill with speech-bubble tail */}
        <button
          onClick={() => {
            const section = document.getElementById("try-cards");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute right-[4%] md:right-[26%] xl:right-[28%] 2xl:right-[30%] top-[20%] md:top-[36%] z-40 animate-hero-bob group"
          style={{ ["--bob-rot"]: "0deg", animationDuration: "4s" }}
          aria-label="Try me"
        >
          <div className="relative">
            <div
              className="bg-secondary text-secondary-foreground rounded-full shadow-xl font-sans font-extrabold uppercase tracking-wide group-hover:scale-110 transition-transform duration-300 flex items-center gap-1.5 whitespace-nowrap"
              style={{
                padding:
                  "clamp(0.50rem, 0.95vw, 0.95rem) clamp(1rem, 1.6vw, 1.5rem)",
                fontSize: "clamp(0.75rem, 1.15vw, 1.15rem)",
              }}
            >
              Try Me{" "}
              <span aria-hidden="true" className="emoji">
                👆
              </span>
            </div>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-1.5 left-8 w-3 h-3 md:-bottom-2 md:left-12 md:w-4 md:h-4 bg-secondary rotate-45" />
            {/* <div
              className="absolute"
              style={{
                left: "28%",
                bottom: "clamp(-14px, -1.4vw, -10px)",
                width: 0,
                height: 0,
                borderLeft: "clamp(8px, 0.9vw, 14px) solid transparent",
                borderRight: "clamp(8px, 0.9vw, 14px) solid transparent",
                borderTop:
                  "clamp(14px, 1.6vw, 22px) solid hsl(var(--secondary))",
              }}
              aria-hidden="true"
            /> */}
          </div>
        </button>

        {/* Stacked SAMOSA cards — bottom right, overlapping box corner */}
        <div
          className="absolute right-[8%] md:right-[20%] xl:right-[22%] 2xl:right-[26%] bottom-[-6%] md:bottom-[-8%] w-[28%] md:w-[18%] max-w-[260px] drop-shadow-2xl animate-hero-bob pointer-events-none z-40"
          style={{ ["--bob-rot"]: "0deg", animationDuration: "6s" }}
        >
          <Image
            src={heroCardsStack}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CTAs — centered at bottom of hero */}
      <div className="relative z-30 flex flex-wrap justify-center items-center gap-3 md:gap-4 pt-1 pb-3 md:pb-4 px-4">
        <Button
          size="lg"
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-11 md:h-12 px-6 md:px-8 text-sm md:text-base font-sans font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent hover:bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/70 hover:border-primary-foreground h-11 md:h-12 px-6 md:px-8 text-sm md:text-base font-sans font-semibold transition-all duration-300 rounded-full"
          asChild
        >
          <Link href="/how-to-play">
            <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            How to play
          </Link>
        </Button>
      </div>
    </section>
  );
}
