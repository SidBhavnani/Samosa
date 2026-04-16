"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import pinkStrip from "@/public/assets/pink-strip.png";
import playSectionBg from "@/public/assets/play-section-bg.png";
import tableCircle from "@/public/assets/table-circle.png";
import samosaCard from "@/public/assets/samosa-card.png";
import place from "@/public/assets/icons/place.png";
import object from "@/public/assets/icons/object.png";
import person from "@/public/assets/icons/person.png";
import bolly from "@/public/assets/icons/bolly.png";
import food from "@/public/assets/icons/food.png";
import random from "@/public/assets/icons/random.png";
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Users,
  Package,
  UtensilsCrossed,
  Clapperboard,
  CircleHelp,
} from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/app/_contexts/CartContext";
import { cn } from "@/app/_hooks/utils";
import { AnimatedSection } from "../AnimatedSection";
import Image from "next/image";

const cardCategories1 = [
  {
    id: "place",
    label: "PLACE",
    // icon: MapPin,
    icon: place,
    clue: "HOME OF THE TAJ MAHAL",
    answer: "AGRA",
    color: "text-samosa-gold",
  },
  {
    id: "person",
    label: "PERSON",
    // icon: Users,
    icon: person,
    clue: "INDIA'S FAMOUS WOMAN CHEF",
    answer: "TARLA DALAL",
    color: "text-samosa-orange",
  },
  {
    id: "object",
    label: "OBJECT",
    // icon: Package,
    icon: object,
    clue: "STRINGED INSTRUMENT OF INDIA",
    answer: "SITAR",
    color: "text-samosa-object",
  },
  {
    id: "food",
    label: "FOOD",
    // icon: UtensilsCrossed,
    icon: food,
    clue: "SOUTH INDIAN DIP WITH COCONUT",
    answer: "COCONUT CHUTNEY",
    color: "text-primary",
  },
  {
    id: "bolly",
    label: "BOLLY",
    // icon: Clapperboard,
    icon: bolly,
    clue: "SRK DISCO HIT FROM OM SHANTI OM",
    answer: "DARD-E-DISCO",
    color: "text-samosa-blue",
  },
  {
    id: "random",
    label: "RANDOM",
    // icon: CircleHelp,
    icon: random,
    clue: "LARGEST LAND ANIMAL",
    answer: "ELEPHANT",
    color: "text-samosa-random",
  },
];

const cardCategories2 = [
  {
    id: "place",
    label: "PLACE",
    // icon: MapPin,
    icon: place,
    clue: "Maharashtra's favourite berry-filled weekend escape",
    answer: "MAHABALESHWAR",
    color: "text-samosa-gold",
  },
  {
    id: "person",
    label: "PERSON",
    // icon: Users,
    icon: person,
    clue: "The younger, more lovable Malik brother",
    answer: "ARMAAN MALIK",
    color: "text-samosa-orange",
  },
  {
    id: "object",
    label: "OBJECT",
    // icon: Package,
    icon: object,
    clue: "What lights up every doorstep on Diwali night",
    answer: "DIYA",
    color: "text-samosa-object",
  },
  {
    id: "food",
    label: "FOOD",
    // icon: UtensilsCrossed,
    icon: food,
    clue: "The tall pink glass at every Irani café",
    answer: "FALOODA",
    color: "text-primary",
  },
  {
    id: "bolly",
    label: "BOLLY",
    // icon: Clapperboard,
    icon: bolly,
    clue: "A mother's undying faith that her sons will return",
    answer: "MERE KARAN ARJUN AAYENGE",
    color: "text-samosa-blue",
  },
  {
    id: "random",
    label: "RANDOM",
    // icon: CircleHelp,
    icon: random,
    clue: "The show that owned every Indian household's 8pm slot",
    answer: "KYONKI SAAS BHI KABHI BAHU THI",
    color: "text-samosa-random",
  },
];

const cardCategories3 = [
  {
    id: "place",
    label: "PLACE",
    // icon: MapPin,
    icon: place,
    clue: "Old Delhi's most legendary breakfast lane",
    answer: "PARANTHE WALI GALI",
    color: "text-samosa-gold",
  },
  {
    id: "person",
    label: "PERSON",
    // icon: Users,
    icon: person,
    clue: "The Indian who runs the world's most creative software empire",
    answer: "SHANTANU NARAYEN",
    color: "text-samosa-orange",
  },
  {
    id: "object",
    label: "OBJECT",
    // icon: Package,
    icon: object,
    clue: "The sacred pot at every Hindu puja",
    answer: "KALASH",
    color: "text-samosa-object",
  },
  {
    id: "food",
    label: "FOOD",
    // icon: UtensilsCrossed,
    icon: food,
    clue: "Delhi's most beloved crunchy street snack",
    answer: "PAPRI CHAAT",
    color: "text-primary",
  },
  {
    id: "bolly",
    label: "BOLLY",
    // icon: Clapperboard,
    icon: bolly,
    clue: "Three friends, one epic European road trip",
    answer: "ZINDAGI NA MILEGI DOBARA",
    color: "text-samosa-blue",
  },
  {
    id: "random",
    label: "RANDOM",
    // icon: CircleHelp,
    icon: random,
    clue: "When India's two biggest music apps became one",
    answer: "JIOSAAVN",
    color: "text-samosa-random",
  },
];

const cards = [cardCategories1, cardCategories2, cardCategories3];

const SAMOSA_PRODUCT = {
  id: "samosa-game-1",
  name: "SAMOSA - Desi Party Game",
  price: 29.99,
  image: "/assets/game-box.png",
};

export default function TryMeSection() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCard, setSelectedCard] = useState(() => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    return randomIndex;
  });
  const [demoStep, setDemoStep] = useState(1);
  const [timerProgress, setTimerProgress] = useState(100);
  const [timerSeconds, setTimerSeconds] = useState(20);
  const cardCategories = cards[selectedCard];

  const timerRef = useRef(null);

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(SAMOSA_PRODUCT);
  };

  const handleTryMe = () => {
    setDemoStep(2);
  };

  const startTimer = useCallback(() => {
    setTimerProgress(100);
    setTimerSeconds(20);

    if (timerRef.current) clearInterval(timerRef.current);

    const start = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - elapsed / 200);
      const secs = Math.max(0, Math.ceil((20000 - elapsed) / 1000));

      setTimerProgress(remaining);
      setTimerSeconds(secs);

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setDemoStep(4);
      }
    }, 50);
  }, []);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setDemoStep(3);
    startTimer();
  };

  const handleDemoReset = () => {
    setSelectedCategory(null);
    setDemoStep(1);
    setTimerProgress(100);
    setTimerSeconds(20);
    setTimeout(() => {
      setSelectedCard((currentCard) =>
        currentCard + 1 >= cards.length ? 0 : currentCard + 1,
      );
    }, 500);

    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section
      id="try-cards"
      className="pt-16 md:pt-[4.5rem] pb-12 md:pb-14 bg-background relative overflow-hidden"
    >
      {/* Pink strip - top */}
      {/* <Image
        src={pinkStrip}
        alt=""
        fill
        className="object-contain pointer-events-none select-none"
        priority
      /> */}
      {/* Background illustration */}
      <div className="absolute top-7 left-0 w-full h-full">
        <Image
          src={playSectionBg}
          alt=""
          fill
          className="object-contain pointer-events-none select-none"
        />
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Centered section background circle */}
          <div
            className="absolute top-1/2 left-1/2 w-[130%] max-w-[550px] pointer-events-none select-none"
            style={{ zIndex: 0, transform: "translate(-50%, -50%)" }}
          >
            <Image
              src={tableCircle}
              alt=""
              aria-hidden="true"
              width={550}
              height={550}
              className="w-full h-auto"
              priority
            />
          </div>
          <AnimatedSection variant="fade-up" delay={150}>
            <h2 className="relative z-10 mb-6 md:mb-8 text-[36px] md:text-[42px] lg:text-[50px] font-bystander uppercase leading-[1.1] tracking-normal whitespace-nowrap -translate-y-3 md:-translate-y-4">
              <span className="text-primary">Play a Round of Samosa</span>
              <br />
              <span className="text-accent">in 20 Seconds</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection variant="zoom-in" delay={200}>
            <div
              className="min-h-[520px] md:min-h-[560px] flex flex-col items-center justify-center max-w-lg mx-auto relative overflow-visible"
              style={{ perspective: "1000px" }}
            >
              {/* Content aligned to the same visual center as the table circle */}
              <div className="relative z-10 flex w-full flex-col items-center pt-16 md:pt-20">
                {/* Card flip container */}
                <div
                  className="relative w-full max-w-sm transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform:
                      demoStep >= 2 ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front of card - Samosa card */}
                  <div
                    className="w-full"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image
                      src={samosaCard}
                      alt="SAMOSA game card"
                      width={400}
                      height={600}
                      className="w-full rounded-xl shadow-lg"
                    />
                  </div>

                  {/* Back of card - Categories card */}
                  <div
                    className="absolute inset-0 w-full bg-card rounded-xl shadow-lg p-2 md:p-3 flex flex-col justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="space-y-5">
                      {cardCategories.map((cat) => {
                        const isSelected = selectedCategory?.id === cat.id;
                        const isRevealed = demoStep === 4;
                        const showAnswer = isSelected && isRevealed;
                        // const IconComp = cat.icon;

                        return (
                          <button
                            key={cat.id}
                            onClick={() =>
                              demoStep === 2 && handleCategorySelect(cat)
                            }
                            disabled={demoStep !== 2}
                            className={cn(
                              "flex items-center gap-3 w-full text-left transition-all duration-300",
                              demoStep === 2 &&
                                "hover:scale-105 cursor-pointer",
                            )}
                          >
                            {/* <IconComp
                              className={cn("h-5 w-5 shrink-0", cat.color)}
                            /> */}
                            <Image
                              src={cat.icon}
                              alt={cat.label}
                              height={20}
                              className="shrink-0"
                            />
                            <span
                              className={cn(
                                "font-black text-base/4 font-bystander uppercase tracking-wide",
                                cat.color,
                              )}
                            >
                              {cat.label}:
                            </span>
                            <span
                              className={cn(
                                "font-black font-bystander text-foreground text-base/4 uppercase tracking-wide transition-all duration-500 ml-2",
                                !showAnswer && "blur-md select-none",
                              )}
                            >
                              {cat.answer}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Timer bar */}
                {demoStep === 3 && (
                  <div className="mt-6 animate-fade-in">
                    <span className="bg-secondary text-secondary-foreground px-6 py-2 rounded">
                      {selectedCategory?.clue}
                    </span>
                    <div className="pt-4">
                      <div className="flex items-center justify-center mb-2 w-full">
                        <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{timerSeconds}s</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full transition-all duration-100"
                          style={{ width: `${timerProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* All revealed state */}
                {demoStep === 4 && (
                  <div className="mt-6 text-center animate-fade-in">
                    <div className="flex items-center justify-center gap-2 text-samosa-green mb-3">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-bold text-sm">
                        Answer Revealed!
                      </span>
                    </div>
                    <button
                      onClick={handleDemoReset}
                      className="text-sm text-primary font-semibold hover:underline transition-all"
                    >
                      Play again →
                    </button>
                  </div>
                )}

                {/* Floating speech bubble */}
                {demoStep === 1 && (
                  <button
                    onClick={handleTryMe}
                    className="animate-float cursor-pointer group mt-6 relative z-30"
                    style={{ transform: "rotate(8deg)" }}
                  >
                    <div className="relative bg-secondary text-secondary-foreground px-6 py-3 rounded-lg shadow-lg font-black italic text-lg uppercase tracking-wide group-hover:scale-110 group-hover:animate-wiggle transition-all duration-300">
                      Try Me! 👆
                      <div className="absolute -top-2 left-6 w-4 h-4 bg-secondary rotate-45" />
                    </div>
                  </button>
                )}

                {demoStep === 2 && (
                  <div
                    className="animate-float group mt-6 relative z-30"
                    style={{ transform: "rotate(-5deg)" }}
                  >
                    <div className="relative bg-secondary text-secondary-foreground px-6 py-3 rounded-lg shadow-lg font-black italic text-lg uppercase tracking-wide">
                      Choose a Category! 👆
                      <div className="absolute -top-2 left-8 w-4 h-4 bg-secondary rotate-45" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Subtle CTA below demo */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-muted-foreground text-sm font-semibold">
              Love it? The real game has{" "}
              <span className="font-bold text-foreground">
                1800+ challenges
              </span>
              .
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 h-12 px-8 font-bold rounded-full shadow-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Pink strip - bottom (reflected) */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-[100px]">
        <Image
          src={pinkStrip}
          alt=""
          fill
          className="object-cover pointer-events-none select-none"
        />
      </div> */}
    </section>
  );
}
