"use client";

import { cn } from "@/app/_hooks/utils";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/_contexts/CartContext";
import { useProduct } from "../ProductProvider";
import { useEffect, useState } from "react";

// Sample product data
const SAMOSA_PRODUCT = {
  id: "samosa-game-1",
  name: "SAMOSA - Desi Party Game",
  price: 29.99,
  image: "/assets/game-box.png",
};

export default function StickyCartButton() {
  const [showStickyCart, setShowStickyCart] = useState(false);
  const { addItem, adding } = useCart();
  const product = useProduct();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowStickyCart(window.scrollY > 600);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // console.log(product);

  const handleAddToCart = () => {
    addItem(product.variants.edges[0].node.id, 1);
  };

  const formatPrice = (price, currencyCode = "GBP") => {
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: currencyCode,
    }).format(price);
  };

  return (
    <>
      {/* Desktop */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 bg-[#f3f0a1] backdrop-blur-md border-t border-border/40 shadow-2xl transition-transform duration-300",
          showStickyCart ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <p className="font-bold text-sm md:text-base text-foreground leading-tight line-clamp-2">
            {product?.title}
          </p>
          <div className="flex flex-col items-center gap-1 shrink-0">
            <p className="text-primary font-bold text-base leading-none">
              {formatPrice(
                product?.variants.edges[0].node.price.amount,
                product?.variants.edges[0].node.price.currencyCode,
              )}
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 font-bold px-4 h-9 rounded-full shadow-lg"
              // className="bg-primary hover:bg-primary/90 font-bold px-8 h-12 rounded-full shadow-lg"
              size="sm"
              onClick={handleAddToCart}
              disabled={adding}
            >
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      {/* <div
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl transition-transform duration-300",
          showStickyCart ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <p className="font-bold text-lg">{product?.title}</p>
          <div className="flex items-center justify-between">
            <p className="text-primary font-bold text-xl">
              {formatPrice(
                product?.variants.edges[0].node.price.amount,
                product?.variants.edges[0].node.price.currencyCode,
              )}
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 font-bold px-8 h-12 rounded-full shadow-lg"
              onClick={handleAddToCart}
              disabled={adding}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div> */}
    </>
  );
}
