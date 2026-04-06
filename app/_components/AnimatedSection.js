"use client";

import { useScrollAnimation } from "@/app/_hooks/useScrollAnimation";
import { cn } from "@/app/_hooks/utils";

const variantStyles = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "zoom-in": {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
  },
  "zoom-out": {
    initial: "opacity-0 scale-105",
    animate: "opacity-100 scale-100",
  },
};

export function AnimatedSection({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const styles = variantStyles[variant];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible ? styles.animate : styles.initial,
        className,
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function AnimatedChildren({
  children,
  className,
  childClassName,
  variant = "fade-up",
  staggerDelay = 100,
  duration = 500,
  threshold = 0.1,
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const styles = variantStyles[variant];

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "transition-all ease-out",
                isVisible ? styles.animate : styles.initial,
                childClassName,
              )}
              style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${index * staggerDelay}ms`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
