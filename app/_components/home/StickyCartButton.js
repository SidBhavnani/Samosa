"use client";

import { cn } from "@/app/_hooks/utils";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/_contexts/CartContext";
import { useProduct } from "../ProductProvider";

// Sample product data
const SAMOSA_PRODUCT = {
  id: "samosa-game-1",
  name: "SAMOSA - Desi Party Game",
  price: 29.99,
  image: "/assets/game-box.png",
};

export default function StickyCartButton({ showStickyCart }) {
  const { addItem, adding } = useCart();
  const product = useProduct();

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
          "hidden md:block fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl transition-transform duration-300",
          showStickyCart ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="font-bold text-lg">{product?.title}</p>
            <p className="text-primary font-bold text-xl">
              {formatPrice(
                product?.variants.edges[0].node.price.amount,
                product?.variants.edges[0].node.price.currencyCode,
              )}
            </p>
          </div>
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

      {/* Mobile */}
      <div
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
      </div>
    </>
  );
}
