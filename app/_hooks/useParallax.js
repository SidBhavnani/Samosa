"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useParallax(speed = 0.5, rotationFactor = 0, fadeStart = 0.85) {
  const [position, setPosition] = useState({
    y: 0,
    opacity: 1,
    rotation: 0,
    scrollDirection: "down",
  });

  const lastScrollY = useRef(0);
  const rafId = useRef(0);
  const ticking = useRef(false);

  const updatePosition = useCallback(() => {
    // ✅ guard for SSR / hydration
    if (typeof window === "undefined") return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollDirection = scrollY > lastScrollY.current ? "down" : "up";
    lastScrollY.current = scrollY;

    const y = scrollY * speed;
    const rotation = scrollY * rotationFactor;

    const scrollProgress = scrollY / (documentHeight - windowHeight);

    const opacity =
      scrollProgress > fadeStart
        ? Math.max(0, 1 - (scrollProgress - fadeStart) / (1 - fadeStart))
        : 1;

    setPosition({
      y,
      opacity,
      rotation,
      scrollDirection,
    });

    ticking.current = false;
  }, [speed, rotationFactor, fadeStart]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      rafId.current = requestAnimationFrame(updatePosition);
    }
  }, [updatePosition]);

  useEffect(() => {
    // ✅ ensure runs only on client
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    updatePosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll, updatePosition]);

  return position;
}
