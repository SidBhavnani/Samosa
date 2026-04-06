"use client";

import { cn } from "@/app/_hooks/utils";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/_contexts/CartContext";

// Sample product data
const SAMOSA_PRODUCT = {
  id: "samosa-game-1",
  name: "SAMOSA - Desi Party Game",
  price: 29.99,
  image: "/assets/game-box.png",
};

export default function StickyCartButton({ showStickyCart }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(SAMOSA_PRODUCT);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl transition-transform duration-300",
        showStickyCart ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <p className="font-bold text-lg">{SAMOSA_PRODUCT.name}</p>
          <p className="text-primary font-bold text-xl">
            ${SAMOSA_PRODUCT.price}
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 font-bold px-8 h-12 rounded-full shadow-lg"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
