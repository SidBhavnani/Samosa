"use client";

import { Share2 } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { Button } from "../ui/button";

export default function ProductInfo({ product }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(price);

  return (
    <div className="flex-1 space-y-5 min-w-0">
      {/* Title */}
      <AnimatedSection variant="fade-left" delay={100}>
        <h1 className="text-[32px] md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-normal">
          <span className="text-secondary">{product.title}</span>
        </h1>
      </AnimatedSection>

      {/* Price */}
      <p className="text-[32px] md:text-[38px] font-sans font-bold text-primary leading-none">
        {formatPrice(product.variants.edges[0].node.price.amount)}
      </p>

      {/* Bundle Pricing */}
      <div className="rounded-xl px-4 py-3 space-y-1">
        <p className="text-primary font-sans font-bold text-xs uppercase tracking-[0.1em] mb-1">
          🎉 Bundle & Save
        </p>
        <p className="text-primary/80 font-sans font-semibold text-sm">
          Buy 2 for £XX each
        </p>
        <p className="text-primary/80 font-sans font-semibold text-sm">
          Buy 3 for £XX each
        </p>
        <p className="text-primary/80 font-sans font-semibold text-sm">
          Buy 4+ for £XX each
        </p>
      </div>

      {/* Add to Cart */}
      <Button
        // onClick={handleAddToCart}
        className="w-full py-7 text-base font-sans font-black uppercase tracking-[0.15em] rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all text-lg"
      >
        ADD TO CART
      </Button>

      {/* Buy Now */}
      <Button
        asChild
        className="w-full py-6 text-base font-sans font-bold uppercase tracking-[0.1em] rounded-full bg-primary/10 text-primary border-2 border-primary/30 hover:bg-primary/20 transition-all"
      >
        <a
          href="https://www.playsamosa.com/products/samosa"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy Now
        </a>
      </Button>

      {/* Description */}
      <div
        className="pt-2 space-y-3 text-primary/70 font-sans font-semibold text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      ></div>

      {/* Share */}
      <button className="flex items-center gap-2 text-primary/50 hover:text-primary text-xs font-sans uppercase tracking-[0.15em] transition-colors">
        <Share2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );
}
