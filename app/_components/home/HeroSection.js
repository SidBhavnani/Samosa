import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/app/_components/AnimatedSection";
import { ParallaxIllustrations } from "@/app/_components/ParallaxIllustrations";

import { Button } from "@/app/_components/ui/button";
import { ShoppingCart, Play } from "lucide-react";

import gameBox from "@/public/assets/game-box.png";
import { useCart } from "@/app/_contexts/CartContext";

const SAMOSA_PRODUCT = {
  id: "samosa-game-1",
  name: "SAMOSA - Desi Party Game",
  price: 29.99,
  image: "/assets/game-box.png", // important: use public path for cart
};

export default function HeroSection() {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(SAMOSA_PRODUCT);
  };

  return (
    <>
      <ParallaxIllustrations
        exclude={["Card Sheets", "Polaroid Bangles", "Samosa Snack", "Chai"]}
      />

      <section className="relative min-h-screen bg-primary pt-28 lg:pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-foreground/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[calc(100vh-12rem)]">
            {/* LEFT */}
            <div className="lg:col-span-6 xl:col-span-5 text-primary-foreground">
              <AnimatedSection variant="fade-up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bystander uppercase leading-[1.1] tracking-normal mb-5">
                  <span className="text-samosa-cream text-[72px]">
                    The Ultimate
                  </span>
                  <br />
                  <span className="text-secondary text-[72px]">
                    Desi Party Game
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection variant="fade-up" delay={200}>
                <p className="text-secondary text-[18px] md:text-[20px] mb-8 font-sans font-semibold">
                  Absolute chaos included
                </p>
              </AnimatedSection>

              <AnimatedSection variant="fade-up" delay={300}>
                <div className="flex flex-wrap gap-4 items-center">
                  <Button
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-foreground h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-full"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>

                  <Button
                    size="lg"
                    className="bg-samosa-cream hover:bg-samosa-cream/90 text-primary h-12 px-8 text-base font-semibold transition-all duration-300 rounded-full"
                    asChild
                  >
                    <Link href="/how-to-play">
                      <Play className="mr-2 h-5 w-5" />
                      How to play
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-6 xl:col-span-7 relative">
              <AnimatedSection variant="zoom-in" delay={200}>
                <div className="relative flex justify-center lg:justify-end">
                  {/* Blobs */}
                  <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/15 rounded-full blur-2xl" />

                  {/* Floating CTA */}
                  <button
                    onClick={() => {
                      const section = document.getElementById("try-cards");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="absolute -top-2 -right-4 md:top-2 md:right-4 lg:right-0 z-20 animate-float group"
                    style={{ transform: "rotate(8deg)" }}
                  >
                    <div className="relative bg-secondary text-secondary-foreground px-4 py-2 rounded-lg shadow-lg font-black italic text-sm md:text-base uppercase tracking-wide group-hover:scale-110 group-hover:animate-wiggle transition-all duration-300">
                      Try Me! 👆
                      <div className="absolute -bottom-2 left-4 w-4 h-4 bg-secondary rotate-45" />
                    </div>
                  </button>

                  {/* Game Box */}
                  <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                    <Image
                      src={gameBox}
                      alt="SAMOSA Game Box"
                      className="drop-shadow-2xl hover:rotate-[-2deg] hover:scale-[1.02] transition-all duration-700 ease-out"
                      priority
                    />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
