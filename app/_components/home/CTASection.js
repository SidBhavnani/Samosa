"use client";

import Image from "next/image";
import { AnimatedSection } from "../AnimatedSection";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/_contexts/CartContext";

import gameBox from "@/public/assets/game-box.png";

const SAMOSA_PRODUCT = {
  id: "samosa-game-1",
  name: "SAMOSA - Desi Party Game",
  price: 29.99,
  image: "/assets/game-box.png", // important: use public path for cart
};

export default function CTASection({ ctaSectionRef }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(SAMOSA_PRODUCT);
  };

  return (
    <section
      ref={ctaSectionRef}
      className="py-20 md:py-28 bg-muted relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <AnimatedSection variant="fade-right" className="relative">
              <div className="relative flex justify-center">
                {/* Floating badges */}
                <div className="absolute -top-4 -left-4 md:left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-float z-10">
                  🔥 Bestseller
                </div>

                <div className="absolute -bottom-2 -right-4 md:right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-float animation-delay-300 z-10">
                  ⭐ 4.9 Rating
                </div>

                <div className="absolute top-1/2 -right-8 md:-right-4 bg-background text-foreground px-3 py-2 rounded-full font-bold text-xs shadow-lg animate-float animation-delay-500 z-10 hidden md:block">
                  1800+ Words
                </div>

                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl scale-75" />

                {/* Image */}
                <div className="relative w-full max-w-xs md:max-w-sm aspect-square">
                  <Image
                    src={gameBox}
                    alt="SAMOSA Game Box"
                    fill
                    className="object-contain drop-shadow-2xl hover:rotate-[-3deg] hover:scale-105 transition-all duration-500"
                    priority
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Right */}
            <AnimatedSection variant="fade-left" delay={200}>
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bystander uppercase mb-4">
                  <span className="text-primary">Ready to Play?</span>
                </h2>

                <p className="text-lg text-secondary font-semibold mb-8 max-w-md mx-auto lg:mx-0">
                  It's simple - add to cart.
                </p>

                {/* Price box */}
                <div className="bg-background rounded-2xl p-6 shadow-lg mb-6 max-w-sm mx-auto lg:mx-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-3xl font-bold">
                        ${SAMOSA_PRODUCT.price}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Shipping</p>
                      <p className="text-sm font-bold text-accent">
                        FREE over $50
                      </p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-bold shadow-xl hover:scale-[1.02] rounded-xl"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>

                {/* Trust */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    In Stock
                  </span>

                  <span className="flex items-center gap-1.5">
                    📦 Ships in 24h
                  </span>

                  <span className="flex items-center gap-1.5">
                    🔒 Secure checkout
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
