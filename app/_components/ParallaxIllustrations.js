"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import jalebi from "@/public/assets/illustrations/jalebi.png";
import bagSunglasses from "@/public/assets/illustrations/bag-sunglasses.png";
import cricket from "@/public/assets/illustrations/cricket.png";
import samosaIllust from "@/public/assets/illustrations/samosa-illust.png";
import swirlIllust from "@/public/assets/illustrations/swirl-illust.png";
import cardStack from "@/public/assets/illustrations/card-stack.png";
import polaroidPhotos from "@/public/assets/illustrations/polaroid-photos.png";
import samosaSnack from "@/public/assets/illustrations/samosa-snack.png";
import chaiGlass from "@/public/assets/illustrations/chai-glass.png";
import cardSheets from "@/public/assets/illustrations/card-sheets.png";
import polaroidBangles from "@/public/assets/illustrations/polaroid-bangles.png";

const illustrations = [
  {
    src: jalebi,
    alt: "Jalebi",
    baseClassName: "w-[6.25rem] md:w-[8.75rem] lg:w-[11.25rem]",
    speed: 0.35,
    rotationFactor: 0.02,
    initialTop: "65vh",
    initialRight: "4%",
    idleAnimation: "",
    baseRotation: 0,
  },
  {
    src: bagSunglasses,
    alt: "Bag with sunglasses",
    baseClassName: "w-[7.5rem] md:w-[10.625rem] lg:w-[13.75rem]",
    speed: 0.35,
    rotationFactor: 0.02,
    initialTop: "85vh",
    initialRight: "25%",
    idleAnimation: "",
    baseRotation: 0,
  },
  {
    src: cricket,
    alt: "Cricket bat",
    baseClassName: "w-16 md:w-22 lg:w-28",
    speed: 0.28,
    rotationFactor: 0,
    initialTop: "130vh",
    initialRight: "5%",
    idleAnimation: "animate-float-gentle",
    baseRotation: -25,
  },
  {
    src: samosaIllust,
    alt: "Samosa",
    baseClassName: "w-[12.5rem] md:w-[17.5rem] lg:w-[22.5rem]",
    speed: 0.35,
    rotationFactor: 0.02,
    initialTop: "50vh",
    initialLeft: "36%",
    idleAnimation: "",
    baseRotation: -12,
  },
  {
    src: swirlIllust,
    alt: "Swirl",
    baseClassName: "w-14 md:w-20 lg:w-24",
    speed: 0.4,
    rotationFactor: 0.03,
    initialTop: "220vh",
    initialRight: "6%",
    idleAnimation: "",
    baseRotation: 0,
  },
  {
    src: cardStack,
    alt: "Card stack",
    baseClassName: "w-20 md:w-28 lg:w-36",
    speed: 0.32,
    rotationFactor: 0.015,
    initialTop: "110vh",
    initialLeft: "5%",
    idleAnimation: "",
    baseRotation: 8,
  },
  {
    src: polaroidPhotos,
    alt: "Polaroid photos",
    baseClassName: "w-[7rem] md:w-[10rem] lg:w-[13rem]",
    speed: 0.35,
    rotationFactor: 0.02,
    initialTop: "78vh",
    initialLeft: "8%",
    idleAnimation: "",
    baseRotation: -6,
  },
  {
    src: samosaSnack,
    alt: "Samosa Snack",
    baseClassName: "w-16 md:w-24 lg:w-32",
    speed: 0.3,
    rotationFactor: 0.015,
    initialTop: "25vh",
    initialRight: "5%",
    idleAnimation: "",
    baseRotation: -10,
  },
  {
    src: chaiGlass,
    alt: "Chai",
    baseClassName: "w-20 md:w-28 lg:w-36",
    speed: 0.3,
    rotationFactor: 0.015,
    initialTop: "45vh",
    initialRight: "18%",
    idleAnimation: "",
    baseRotation: 12,
  },
  {
    src: cardSheets,
    alt: "Card Sheets",
    baseClassName: "w-24 md:w-36 lg:w-44",
    speed: 0.3,
    rotationFactor: 0.015,
    initialTop: "25vh",
    initialRight: "5%",
    idleAnimation: "",
    baseRotation: -10,
  },
  {
    src: polaroidBangles,
    alt: "Polaroid Bangles",
    baseClassName: "w-20 md:w-28 lg:w-36",
    speed: 0.3,
    rotationFactor: 0.015,
    initialTop: "45vh",
    initialRight: "18%",
    idleAnimation: "",
    baseRotation: 12,
  },
];

function ParallaxElement({ illust, index }) {
  const ref = useRef(null);
  const rafId = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const y = scrollY * illust.speed;
      const rotation = illust.baseRotation + scrollY * illust.rotationFactor;

      const scrollProgress = scrollY / (documentHeight - windowHeight);
      const opacity =
        scrollProgress > 0.85
          ? Math.max(0, 1 - (scrollProgress - 0.85) / 0.15)
          : 1;

      ref.current.style.transform = `translateY(${-y}px) rotate(${rotation}deg)`;
      ref.current.style.opacity = String(opacity);

      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        rafId.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [illust]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`
        absolute object-contain drop-shadow-xl pointer-events-none
        ${illust.baseClassName}
        ${illust.idleAnimation}
      `}
      style={{
        top: illust.initialTop,
        left: illust.initialLeft,
        right: illust.initialRight,
        willChange: "transform, opacity",
        zIndex: 10 + index,
      }}
    >
      <Image
        src={illust.src}
        alt={illust.alt}
        className="w-full h-auto"
        priority={false}
      />
    </div>
  );
}

export function ParallaxIllustrations({ exclude = [] }) {
  const filtered =
    exclude.length > 0
      ? illustrations.filter((i) => !exclude.includes(i.alt))
      : illustrations;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 12 }}
    >
      {filtered.map((illust, index) => (
        <ParallaxElement key={illust.alt} illust={illust} index={index} />
      ))}
    </div>
  );
}
