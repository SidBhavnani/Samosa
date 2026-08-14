"use client";

import { useParallax } from "@/app/_hooks/useParallax";
import { AnimatedSection } from "@/app/_components/AnimatedSection";
import Image from "next/image";
import {
  CircleHelp,
  Clapperboard,
  MapPin,
  Music,
  Package,
  Play,
  ShoppingCart,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import TryMeSection from "@/app/_components/home/TryMeSection";
import { Button } from "../ui/button";
import YouTubeShort from "./YouTubeShort";
import { useCart } from "@/app/_contexts/CartContext";
import { PrismicNextImage } from "@prismicio/next";

// Card categories with answers for the interactive demo (same as homepage)
const cardCategories = [
  {
    id: "place",
    label: "PLACE",
    icon: MapPin,
    clue: "HOME OF THE TAJ MAHAL",
    answer: "AGRA",
    color: "text-samosa-gold",
  },
  {
    id: "person",
    label: "PERSON",
    icon: Users,
    clue: "INDIA'S FAMOUS WOMAN CHEF",
    answer: "TARLA DALAL",
    color: "text-samosa-orange",
  },
  {
    id: "object",
    label: "OBJECT",
    icon: Package,
    clue: "STRINGED INSTRUMENT OF INDIA",
    answer: "SITAR",
    color: "text-secondary",
  },
  {
    id: "food",
    label: "FOOD",
    icon: UtensilsCrossed,
    clue: "SOUTH INDIAN DIP WITH COCONUT",
    answer: "COCONUT CHUTNEY",
    color: "text-primary",
  },
  {
    id: "bolly",
    label: "BOLLY",
    icon: Clapperboard,
    clue: "SRK DISCO HIT FROM OM SHANTI OM",
    answer: "DARD-E-DISCO",
    color: "text-samosa-blue",
  },
  {
    id: "random",
    label: "RANDOM",
    icon: CircleHelp,
    clue: "LARGEST LAND ANIMAL",
    answer: "ELEPHANT",
    color: "text-samosa-green",
  },
];

// Game variations
const variations = [
  {
    title: "Speed Round",
    description: "Cut the timer to 15 seconds for an extra challenge.",
    emoji: "⚡",
  },
  {
    title: "Team Challenge",
    description: "Both teams play simultaneously. First to guess wins!",
    emoji: "🏆",
  },
  {
    title: "Custom Rules",
    description: "Create your own! No talking, only humming, everyone dances.",
    emoji: "✨",
  },
];

export default function HowToPlayPage({ product, data, homepage, steps, cta }) {
  const heroImageParallax = useParallax(0.15);

  const { addItem, adding } = useCart();

  const handleAddToCart = () => {
    addItem(product.variants.edges[0].node.id, 1);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(price);

  return (
    <div className="min-h-screen">
      {/* HERO - Full-width background image with overlaid text */}
      <section className="relative h-[320px] pt-8 md:pt-0 md:h-[520px] flex items-center overflow-hidden bg-samosa-yellow-green">
        <div className="absolute inset-0 w-full h-full">
          <PrismicNextImage
            field={data.hero_banner}
            className="w-full h-full object-cover"
            fill
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-left flex flex-col items-start pt-16">
          <AnimatedSection variant="fade-up">
            <h1 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-5">
              <span className="text-primary">{data.hero_title} </span>
              <span className="text-secondary">
                {data.hero_title_highlight}
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection variant="fade-up" delay={200}>
            <p
              className="text-base md:text-lg text-primary font-sans font-semibold mb-8"
              dangerouslySetInnerHTML={{ __html: data.hero_text }}
            />
          </AnimatedSection>
          {/* <AnimatedSection variant="fade-up" delay={300}>
            <button className="flex items-center gap-2 px-8 h-12 bg-samosa-cream hover:bg-samosa-cream/90 text-primary font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-base">
              <Play className="w-5 h-5" />
              Watch reel
            </button>
          </AnimatedSection> */}
        </div>
      </section>

      {/* SEE IT IN ACTION */}
      <section
        className="pt-10 pb-16 md:pt-16 md:pb-28 bg-background"
        id="how-to-play-video"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <AnimatedSection variant="fade-up">
              <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-4">
                <span className="text-primary">See it </span>
                <span className="text-secondary">in Action.</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection variant="fade-up" delay={200}>
              <p className="text-base md:text-lg text-muted-foreground leading-snug font-sans font-semibold">
                Watch our quick tutorial to see how a round plays out.
                <br />
                <span className="text-secondary">Spoiler: it gets loud.</span>
              </p>
            </AnimatedSection>
          </div>

          {/* Video placeholder */}
          <AnimatedSection variant="zoom-in" delay={300}>
            <div className="aspect-[9/16] md:aspect-video max-w-7xl mx-auto rounded-2xl overflow-hidden relative shadow-xl bg-muted flex items-center justify-center">
              {/* <p className="text-muted-foreground font-semibold">
                Video coming soon
              </p> */}
              <YouTubeShort videoId={data.youtube_video_id} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* STEP BY STEP - Cobalt blue with board photo anchor */}
      <section
        className="overflow-hidden"
        style={{ backgroundColor: "#3D63A6" }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
          <AnimatedSection variant="fade-up" className="text-center mb-6">
            <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase mb-4 tracking-normal leading-[1.1]">
              <span className="text-secondary">
                {data.aim_title_highlight}{" "}
              </span>
              <span className="text-samosa-cream">{data.aim_title}</span>
            </h2>
            <p className="text-base md:text-xl text-samosa-cream/80 font-sans font-semibold">
              {data.aim_subtitle}
            </p>
          </AnimatedSection>

          {/* Board image - landscape */}
          <AnimatedSection variant="zoom-in" delay={100} className="mb-10">
            <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <div className="w-full h-[220px] md:h-[340px] lg:h-[420px] relative">
                <PrismicNextImage
                  field={data.aim_image}
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            </div>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {steps.map((step, index) => (
                <AnimatedSection
                  key={index}
                  variant="zoom-in"
                  delay={index * 100}
                >
                  <div className="flex flex-col items-center h-full">
                    {/* Step badge */}
                    <div className="px-6 py-2 rounded-full bg-secondary text-primary-foreground font-bold text-sm mb-4 shadow-md">
                      Step {step.step}
                    </div>
                    {/* Card */}
                    <div className="bg-card rounded-2xl p-6 shadow-sm w-full text-center flex flex-col items-center flex-1 justify-center">
                      <span className="text-4xl md:text-5xl mb-4">
                        {step.emoji}
                      </span>
                      <h3 className="text-base md:text-lg font-bold text-foreground text-center mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm text-center leading-relaxed font-semibold">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Land on a SAMOSA + CTA */}
            <AnimatedSection
              variant="fade-up"
              delay={500}
              className="text-center mt-12"
            >
              <h3 className="text-[28px]/[1] md:text-[36px]/[36px] font-bystander uppercase leading-[1.1] text-samosa-cream mb-3 flex items-center justify-center gap-3">
                {data.aim_text_line_1}
                <div className="h-10 w-10 md:h-12 md:w-12 inline-block relative">
                  <PrismicNextImage
                    field={data.aim_text_illustration}
                    className="h-full w-full object-cover"
                    fill
                  />
                </div>
              </h3>
              <p className="text-base md:text-xl text-samosa-cream/80 font-sans font-semibold mb-2">
                {data.aim_text_line_2}
              </p>
              <p className="text-sm md:text-lg text-samosa-cream/80 font-sans font-semibold mb-6">
                {data.aim_text_line_3}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <TryMeSection data={homepage} />

      {/* Photo strip transition into Make It Your Own */}
      <div className="w-full h-[35vh] overflow-hidden relative">
        <PrismicNextImage
          field={data.image_strip}
          className="w-full h-full object-cover"
          fill
        />
      </div>

      {/* MAKE IT YOUR OWN - Lime-yellow */}
      {/* <section className="py-28 md:py-36 bg-samosa-yellow-green">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">
            <div className="flex flex-col h-full">
              <AnimatedSection variant="fade-right">
                <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-[0.03em] mb-4">
                  <span className="text-primary">Make it </span>
                  <span className="text-secondary">Your Own.</span>
                </h2>
              </AnimatedSection>
              <AnimatedSection variant="fade-right" delay={200}>
                <p className="text-base md:text-lg text-muted-foreground leading-snug font-sans font-semibold">
                  The base game is just the beginning.
                  <br />
                  <span className="text-secondary">
                    Try these variations to keep things fresh.
                  </span>
                </p>
              </AnimatedSection>
              <AnimatedSection
                variant="fade-up"
                delay={400}
                className="mt-8 flex-1 min-h-0"
              >
                <div className="rounded-2xl overflow-hidden relative bg-samosa-cream shadow-md h-full max-h-[260px]">
                  <Image
                    src={gameplayAction}
                    alt="Friends playing Samosa game"
                    className="w-full h-full object-cover"
                    fill
                  />
                </div>
              </AnimatedSection>
            </div>

            <div className="space-y-5">
              {variations.map((variation, index) => (
                <AnimatedSection
                  key={variation.title}
                  variant="fade-left"
                  delay={index * 100}
                >
                  <div className="flex items-start gap-5 p-10 py-10 bg-samosa-cream rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="text-4xl flex-shrink-0">
                      {variation.emoji}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1 text-lg">
                        {variation.title}
                      </h3>
                      <p className="text-muted-foreground text-base">
                        {variation.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* SAMOSA VIBES - Warm gradient background */}
      {/* <section className="py-16 md:py-20 bg-samosa-cream overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection variant="fade-up" className="text-center mb-16">
              <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-4">
                <span className="text-primary">SAMOSA </span>
                <span className="text-secondary">Vibes</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto font-sans font-semibold">
                Scan, play, and keep the energy high while you play!
              </p>
            </AnimatedSection>

            <AnimatedSection variant="zoom-in" delay={100}>
              <div
                className="relative rounded-3xl p-10 md:p-14"
                style={{ backgroundColor: "#F5F0E8" }}
              >
                <div className="absolute top-6 right-8 text-4xl opacity-20 rotate-12">
                  🎵
                </div>
                <div className="absolute bottom-8 left-6 text-3xl opacity-15 -rotate-12">
                  🎶
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-center">
                  <div className="text-center">
                    <div className="w-44 h-44 bg-samosa-cream rounded-2xl mx-auto flex items-center justify-center shadow-md border border-primary/10">
                      <span className="text-muted-foreground font-sans">
                        QR Code
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground font-sans font-semibold">
                      Scan to open in Spotify
                    </p>
                  </div>

                  <div className="bg-samosa-cream rounded-2xl p-8 h-56 flex items-center justify-center shadow-md border border-primary/10">
                    <div className="text-center space-y-3">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Music className="h-7 w-7 text-primary" />
                      </div>
                      <p className="text-primary font-sans font-bold text-lg">
                        Playlist coming soon
                      </p>
                      <p className="text-muted-foreground text-sm font-sans">
                        The ultimate SAMOSA game night soundtrack 🔥
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section> */}

      {/* CLOSING CTA - Split layout like homepage */}
      <section className="py-20 md:py-28 bg-samosa-cream relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left - Product showcase with floating elements */}
              <AnimatedSection variant="fade-right" className="relative">
                <div className="relative flex justify-center">
                  <div className="absolute -top-4 -left-4 md:left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-float z-10">
                    {cta.cta_badge_1}
                  </div>
                  <div className="absolute -bottom-2 -right-4 md:right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-float animation-delay-300 z-10">
                    {cta.cta_badge_2}
                  </div>
                  <div className="absolute top-1/2 -right-8 md:-right-4 bg-background text-foreground px-3 py-2 rounded-full font-bold text-xs shadow-lg animate-float animation-delay-500 z-10 hidden md:block">
                    {cta.cta_badge_3}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl scale-75" />
                  <div className="relative w-full aspect-[4/3] max-w-xs md:max-w-sm drop-shadow-2xl hover:rotate-[-3deg] hover:scale-105 transition-all duration-500">
                    <Image
                      src={product.images.edges[0].node.url}
                      alt="SAMOSA Game Box"
                      className="w-full h-full object-contain"
                      fill
                    />
                  </div>
                </div>
              </AnimatedSection>

              {/* Right - CTA content */}
              <AnimatedSection variant="fade-left" delay={200}>
                <div className="text-center lg:text-left">
                  <h2 className="text-[38px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal mb-4">
                    <span className="text-primary">{data.cta_title} </span>
                    <span className="text-secondary">
                      {data.cta_title_highlight}
                    </span>
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground font-sans font-semibold mb-8 max-w-md mx-auto lg:mx-0">
                    {data.cta_subtitle}
                  </p>

                  <div className="bg-background rounded-2xl p-6 shadow-lg mb-6 max-w-sm mx-auto lg:mx-0">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-3xl font-bold text-foreground">
                          {formatPrice(
                            product.variants.edges[0].node.price.amount,
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        {cta.minimum_shipping > 0 ? (
                          <>
                            <p className="text-sm text-muted-foreground">
                              Shipping
                            </p>
                            <p className="text-sm font-bold text-accent">
                              FREE over {formatPrice(cta.minimum_shipping)}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-bold text-muted-foreground">
                              Free UK & US
                            </p>
                            <p className="text-sm font-bold text-muted-foreground">
                              Shipping
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 rounded-xl"
                      onClick={handleAddToCart}
                      disabled={adding}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      In Stock
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-base">📦</span>
                      Ships in 48h
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-base">🔒</span>
                      Secure checkout
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
